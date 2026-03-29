import { useState, useRef, useCallback } from "react";
import {
  AlertTriangle, CheckCircle2, XCircle, Car, MapPin,
  Calendar, Gauge, ShieldAlert, Users, History, Tag, Wrench,
  ChevronDown, ChevronUp, AlertCircle, TrendingUp, Activity,
  FileText, BarChart3, Download, Loader2, Info,
} from "lucide-react";
import type { VehicleHistoryData } from "../../types/vin-decoder";
import autoLogo from "../../assets/images/auto_logo.png";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(key: string) {
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function srcIcon(s: string[]) {
  const v = (s[0] || "").toLowerCase();
  if (v.includes("insurance")) return <ShieldAlert size={11} />;
  if (v.includes("damage")) return <AlertTriangle size={11} />;
  if (v.includes("dealer")) return <Wrench size={11} />;
  return <FileText size={11} />;
}

function srcBadge(s: string[]) {
  const v = (s[0] || "").toLowerCase();
  if (v.includes("damage") || v.includes("accident")) return "bg-red-50 text-red-600 border-red-100";
  if (v.includes("insurance")) return "bg-orange-50 text-orange-600 border-orange-100";
  if (v.includes("dealer")) return "bg-gray-50 text-gray-500 border-gray-100";
  return "bg-gray-50 text-gray-400 border-gray-100";
}

function dotColor(s: string[]) {
  const v = (s[0] || "").toLowerCase();
  if (v.includes("damage") || v.includes("accident")) return "bg-red-500";
  if (v.includes("insurance")) return "bg-orange-400";
  return "bg-gray-300";
}

// ─── Primitives ───────────────────────────────────────────────────────────────

function Divider() {
  return <div className="h-px bg-gray-100 w-full" />;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ title, icon, right }: {
  title: string; icon?: React.ReactNode; right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5">
      <div className="flex items-center gap-2">
        {icon && <span className="text-gray-400">{icon}</span>}
        <span className="text-sm font-semibold text-gray-700">{title}</span>
      </div>
      {right}
    </div>
  );
}

function Section({ title, icon, right, children, id }: {
  title: string; icon?: React.ReactNode; right?: React.ReactNode;
  children: React.ReactNode; id?: string;
}) {
  return (
    <Card>
      <div id={id}>
        <CardHeader title={title} icon={icon} right={right} />
        <Divider />
        <div className="p-5">{children}</div>
      </div>
    </Card>
  );
}

// ─── Stat Tile ────────────────────────────────────────────────────────────────

function StatTile({
  icon, value, label, accent = "text-gray-400",
}: {
  icon: React.ReactNode; value: string | number; label: string; accent?: string;
}) {
  return (
    <Card className="p-4 flex flex-col gap-2.5">
      <div className={accent}>{icon}</div>
      <span className="text-2xl font-bold text-gray-900">{value}</span>
      <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide leading-none">{label}</p>
    </Card>
  );
}

// ─── Section Components ───────────────────────────────────────────────────────

function TitleBrandsSection({ brands }: { brands: Record<string, string> }) {
  const positive = Object.entries(brands).filter(
    ([, v]) => v.toLowerCase().includes("records found") && !v.toLowerCase().startsWith("no")
  );
  const negative = Object.entries(brands).filter(
    ([, v]) => v.toLowerCase().startsWith("no") || v.toLowerCase() === "no record found"
  );
  return (
    <Section title="Title Brands" icon={<Tag size={14} />} id="pdf-title-brands">
      {positive.length > 0 && (
        <div className="mb-4">
          <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-2">Flags Detected</p>
          <div className="space-y-1.5">
            {positive.map(([key]) => (
              <div key={key} className="flex items-center gap-2 p-2.5 bg-red-50 rounded-xl border border-red-100">
                <XCircle size={13} className="text-red-500 shrink-0" />
                <span className="text-xs font-medium text-red-700">{fmt(key)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">Clean Records</p>
        <div className="space-y-1.5">
          {negative.map(([key]) => (
            <div key={key} className="flex items-center gap-1.5 text-xs text-gray-500">
              <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
              {fmt(key)}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function OwnersSection({ owners = [] }: { owners?: VehicleHistoryData["owners"] }) {
  const accents = [
    "bg-[#FC612D]/8 border-[#FC612D]/15 text-[#FC612D]",
    "bg-orange-50 border-orange-100 text-orange-600",
    "bg-amber-50 border-amber-100 text-amber-600",
    "bg-yellow-50 border-yellow-100 text-yellow-600",
  ];
  return (
    <Section
      title="Ownership History" icon={<Users size={14} />} id="pdf-owners"
      right={<span className="text-[11px] font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">{owners?.length ?? 0} owner{(owners?.length ?? 0) !== 1 ? "s" : ""}</span>}
    >
      <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {(owners ?? []).map((o, i) => (
          <div key={o._id} className={`rounded-xl border p-3.5 ${accents[i % accents.length]}`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-current/20 text-[10px] font-bold flex items-center justify-center">{i + 1}</div>
              <p className="font-semibold text-xs">{o.type}</p>
            </div>
            <p className="text-[10px] opacity-70">Purchased: {o.purchasedYear}</p>
            <p className="text-[10px] opacity-70">State: {o.state}</p>
            <p className="text-[10px] opacity-60 mt-0.5">{o.ownedDuration.trim()}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function EventsTimeline({ events = [] }: { events?: VehicleHistoryData["events"] }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? events : (events ?? []).slice(0, 8);
  return (
    <Section
      title="History Events" icon={<History size={14} />} id="pdf-events"
      right={<span className="text-[11px] font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">{events?.length ?? 0}</span>}
    >
      <div className="relative pl-5">
        <div className="absolute left-1.5 top-0 bottom-0 w-px bg-gray-100" />
        <div className="space-y-5">
          {(shown ?? []).map((evt) => (
            <div key={evt._id} className="relative">
              <div className={`absolute -left-5 top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm ${dotColor(evt.source)}`} />
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                <span className="text-[11px] font-mono text-gray-400">{evt.date}</span>
                <span className={`inline-flex items-center gap-1 px-1.5 py-px rounded-md text-[10px] border font-medium ${srcBadge(evt.source)}`}>
                  {srcIcon(evt.source)} {evt.source[0] || "—"}
                </span>
                {evt.odometer && (
                  <span className="text-[11px] text-gray-400 flex items-center gap-0.5">
                    <Gauge size={9} /> {evt.odometer} mi
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-400 flex items-center gap-1 mb-1">
                <MapPin size={9} className="shrink-0" /> {evt.location}
              </p>
              <ul className="space-y-0.5">
                {evt.details.map((d, di) => (
                  <li key={di} className="text-sm text-gray-700 leading-snug">{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {(events?.length ?? 0) > 8 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-5 w-full flex items-center justify-center gap-1.5 text-xs font-medium text-gray-400 hover:text-gray-700 py-2 rounded-xl hover:bg-gray-50 transition-colors"
        >
          {expanded
            ? <><ChevronUp size={13} /> Show less</>
            : <><ChevronDown size={13} /> Show all {events?.length} events</>}
        </button>
      )}
    </Section>
  );
}

function AccidentsSection({ accidents = [] }: { accidents?: VehicleHistoryData["accidents"] }) {
  if (!(accidents?.length)) {
    return (
      <Section title="Accident Records" icon={<AlertTriangle size={14} />} id="pdf-accidents">
        <div className="flex items-center gap-2.5 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
          <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
          <span className="text-sm font-medium text-emerald-700">No accidents reported</span>
        </div>
      </Section>
    );
  }
  return (
    <Section
      title="Accident Records" icon={<AlertTriangle size={14} />} id="pdf-accidents"
      right={<span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-100">{accidents?.length} found</span>}
    >
      <div className="space-y-2.5">
        {(accidents ?? []).map((acc) => (
          <div key={acc._id} className="flex items-start gap-3 p-3.5 bg-red-50 rounded-xl border border-red-100">
            <div className="w-7 h-7 bg-red-500 rounded-lg flex items-center justify-center shrink-0">
              <AlertCircle size={13} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-red-800 text-sm">Accident #{acc.accidentNumber}</p>
              <p className="text-[11px] text-red-500 flex items-center gap-1 mt-0.5"><Calendar size={9} /> {acc.date}</p>
              <p className="text-[11px] text-red-500 flex items-center gap-1"><MapPin size={9} /> {acc.location}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function MileageSection({ records = [] }: { records?: VehicleHistoryData["mileageRecords"] }) {
  const valid = (records ?? []).filter((r) => r.mileage);
  const max = Math.max(...valid.map((r) => parseInt(r.mileage.replace(/,/g, "")) || 0), 1);
  return (
    <Section title="Mileage Records" icon={<Gauge size={14} />} id="pdf-mileage">
      <div className="space-y-3">
        {valid.map((rec, i) => {
          const val = parseInt(rec.mileage.replace(/,/g, "")) || 0;
          const pct = Math.max(6, Math.round((val / max) * 100));
          const isDanger = (rec as any).other === "danger";
          return (
            <div key={i}>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="font-mono text-gray-400">{rec.date}</span>
                <span className={`font-semibold ${isDanger ? "text-red-600" : "text-gray-700"}`}>{rec.mileage} mi</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${isDanger ? "bg-red-400" : "bg-gradient-to-r from-[#FC612D] to-[#FFCA42]"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function RecallsSection({ recalls = [] }: { recalls?: VehicleHistoryData["recalls"] }) {
  return (
    <Section
      title="Safety Recalls" icon={<ShieldAlert size={14} />} id="pdf-recalls"
      right={recalls && recalls.length > 0
        ? <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">{recalls.length}</span>
        : undefined}
    >
      {!recalls?.length ? (
        <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
          <CheckCircle2 size={13} className="text-emerald-500" />
          <span className="text-sm font-medium text-emerald-700">No open recalls</span>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {recalls.map((r) => (
            <div key={r._id} className="py-3 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{r.component}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 font-mono">{r.recallNumber}</p>
                </div>
                <span className="text-[11px] text-gray-400 whitespace-nowrap mt-0.5">{r.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

function SalesSection({ sales = [] }: { sales?: VehicleHistoryData["salesHistory"] }) {
  if (!sales?.length) return null;
  return (
    <Section title="Sales History" icon={<TrendingUp size={14} />} id="pdf-sales">
      <div className="space-y-2.5">
        {sales.map((s) => (
          <div key={s._id} className="p-3.5 rounded-xl border border-gray-100 flex flex-col sm:flex-row gap-3 justify-between sm:items-center hover:bg-gray-50/50 transition-colors">
            <div>
              <p className="font-semibold text-gray-900 text-sm">{s.sellerCity}, {s.sellerState}</p>
              {s.dealerName && <p className="text-xs text-gray-400 mt-0.5">{s.dealerName}</p>}
              {s.date && <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><Calendar size={9} /> {s.date}</p>}
            </div>
            <div className="text-right">
              <p className="text-base font-bold text-gray-900">${s.price.toLocaleString()}</p>
              {s.odometer && <p className="text-[11px] text-gray-400 flex items-center gap-0.5 justify-end"><Gauge size={9} /> {s.odometer} mi</p>}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function UsageSection({ usage }: { usage: Record<string, string> }) {
  const found = Object.entries(usage).filter(
    ([, v]) => v.toLowerCase().includes("records found") && !v.toLowerCase().startsWith("no")
  );
  const clean = Object.entries(usage).filter(
    ([, v]) => v.toLowerCase().startsWith("no") || v === "no records found"
  );
  return (
    <Section title="Vehicle Usage" icon={<Activity size={14} />} id="pdf-usage">
      {found.length > 0 && (
        <div className="mb-3 space-y-1.5">
          {found.map(([key]) => (
            <div key={key} className="flex items-center gap-2 text-xs text-orange-700 bg-orange-50 rounded-lg px-3 py-2 border border-orange-100">
              <AlertCircle size={12} className="shrink-0" /> {fmt(key)}
            </div>
          ))}
        </div>
      )}
      <div className="space-y-1.5">
        {clean.map(([key]) => (
          <div key={key} className="flex items-center gap-1.5 text-xs text-gray-500">
            <CheckCircle2 size={11} className="text-emerald-400 shrink-0" /> {fmt(key)}
          </div>
        ))}
      </div>
    </Section>
  );
}

function SpecsSection({ specifications }: { specifications: Record<string, any>[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <Section title="Specifications" icon={<BarChart3 size={14} />} id="pdf-specs">
      <div className="space-y-1.5">
        {specifications.map((group, gi) => {
          const [category, vals] = Object.entries(group)[0];
          const hasData = vals && Object.values(vals).some((v) => v !== "" && v !== null);
          if (!hasData) return null;
          return (
            <div key={gi} className="border border-gray-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === category ? null : category)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50/50 transition-colors"
              >
                {fmt(category)}
                {open === category ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </button>
              {open === category && (
                <div className="px-4 pb-4 pt-1 grid grid-cols-2 gap-x-5 gap-y-2 border-t border-gray-100">
                  {Object.entries(vals).map(([k, v]) =>
                    v !== "" ? (
                      <div key={k}>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wide mt-2">{fmt(k)}</p>
                        <p className="text-sm text-gray-800 font-medium">{String(v)}</p>
                      </div>
                    ) : null
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function TransmissionSection({ tx }: { tx?: VehicleHistoryData["transmission"] }) {
  const fields = [
    ["Type", tx?.type], ["Description", tx?.description], ["Speeds", tx?.number_of_speeds],
    ["1st Gear", tx?.first_gear_ratio], ["2nd Gear", tx?.second_gear_ratio],
    ["3rd Gear", tx?.third_gear_ratio], ["4th Gear", tx?.fourth_gear_ratio],
    ["5th Gear", tx?.fifth_gear_ratio], ["Reverse", tx?.reverse_gear_ratio],
    ["Final Drive", tx?.final_drive_axle_ratio],
  ].filter(([, v]) => v);
  if (!fields.length) return null;
  return (
    <Section title="Transmission" icon={<Car size={14} />} id="pdf-transmission">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {fields.map(([label, val]) => (
          <div key={label} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">{label}</p>
            <p className="text-sm font-semibold text-gray-800 mt-0.5">{val}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── Price Section ────────────────────────────────────────────────────────────

function PriceSection({ price }: { price: NonNullable<VehicleHistoryData["price"]> }) {
  const fields = [
    { label: "Base MSRP", value: price.base_msrp },
  ] as const;

  return (
    <Section title="Pricing" icon={<TrendingUp size={14} />} id="pdf-price">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {fields.filter(f => f.value).map(({ label, value }) => (
          <div key={label} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">{label}</p>
            <p className="text-base font-bold text-gray-800 mt-0.5">${value}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── Inspections Section ──────────────────────────────────────────────────────

function InspectionsSection({ inspections }: { inspections?: any[] }) {
  if (!inspections?.length) return null;
  return (
    <Section title="Inspections" icon={<CheckCircle2 size={14} />} id="pdf-inspections">
      <div className="space-y-2.5">
        {inspections.map((insp: any, i: number) => (
          <div key={i} className="p-3.5 rounded-xl border border-gray-100 hover:bg-gray-50/50 transition-colors">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-mono text-[11px] text-gray-400">{insp.date}</span>
              <span className="px-2 py-0.5 text-[10px] rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100 font-medium">
                {insp.details?.split("\n")[0] || "Inspection"}
              </span>
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={9} />{insp.location}</p>
            {insp.odometer && (
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                <Gauge size={9} /> {parseInt(insp.odometer).toLocaleString()} mi
                {insp.odometer_km && ` · ${insp.odometer_km} km`}
              </p>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── OEM Options Section ──────────────────────────────────────────────────────

function OemOptionsSection({ oemOptions }: { oemOptions?: any[] }) {
  const [open, setOpen] = useState<string | null>(null);
  if (!oemOptions?.length) return null;

  const grouped: Record<string, any[]> = {};
  oemOptions.forEach((group) => {
    const [cat, items] = Object.entries(group)[0] as [string, any[]];
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(...items);
  });

  return (
    <Section title="OEM Options & Packages" icon={<Info size={14} />} id="pdf-oem">
      <div className="space-y-1.5">
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat} className="border border-gray-100 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen(open === cat ? null : cat)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50/50 transition-colors"
            >
              <span className="capitalize">{fmt(cat)}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400 bg-gray-100 rounded-md px-2 py-0.5">{items.length}</span>
                {open === cat ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </div>
            </button>
            {open === cat && (
              <div className="border-t border-gray-100 divide-y divide-gray-50">
                {items.map((item, i) => {
                  const d = item.description;
                  return (
                    <div key={i} className="px-4 py-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 leading-snug">{d.package_name}</p>
                          {d.package_features?.length > 0 && (
                            <ul className="mt-1.5 space-y-0.5">
                              {d.package_features.map((f: string, fi: number) => (
                                <li key={fi} className="text-xs text-gray-500 flex items-start gap-1.5">
                                  <span className="text-gray-300 mt-0.5">•</span>{f}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div className="shrink-0 text-right">
                          {d.package_price && (
                            <p className="text-sm font-bold text-gray-900">${d.package_price}</p>
                          )}
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${d.package_type === "Standard" ? "bg-gray-100 text-gray-500" : "bg-[#FC612D]/8 text-[#FC612D]"}`}>
                            {d.package_type}
                          </span>
                          {d.package_code && (
                            <p className="text-[10px] font-mono text-gray-300 mt-0.5">{d.package_code}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── PDF Download ─────────────────────────────────────────────────────────────

async function downloadPDF(reportData: VehicleHistoryData, logoDataUrl: string, logoAspect = 5) {
  const { default: jsPDF } = await import("jspdf");

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = 210;
  const pageH = 297;
  const margin = 15;
  const colW = pageW - margin * 2;
  let y = margin;

  const brand = "#FC612D";
  const darkGray = "#1a1a1a";
  const midGray = "#6b7280";
  const lightGray = "#f3f4f6";
  const lineGray = "#e5e7eb";

  const checkPage = (needed = 10) => {
    if (y + needed > pageH - margin) {
      doc.addPage();
      y = margin;
      drawPageHeader();
    }
  };

  const drawPageHeader = () => {
    // Orange accent bar
    doc.setFillColor(252, 97, 45);
    doc.rect(0, 0, pageW, 1.2, "F");

    let textX = margin + 24;
    // Logo in the header (small, left side)
    if (logoDataUrl) {
      try {
        const h = 5;
        const w = h * logoAspect;
        doc.addImage(logoDataUrl, "PNG", margin, 2.5, w, h, undefined, "FAST");
        textX = margin + w + 4;
      } catch {
        doc.setFontSize(7);
        doc.setFont("helvetica", "bold");
        doc.setTextColor("#FC612D");
        doc.text("FraudWall Auto", margin, 7);
      }
    } else {
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      doc.setTextColor("#FC612D");
      doc.text("FraudWall Auto", margin, 7);
    }

    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(midGray);
    doc.text("Confidential Vehicle History Report", textX, 6.5);
    doc.text(`VIN: ${reportData.vin}`, pageW - margin, 6.5, { align: "right" });
    y = Math.max(y, 12);
  };

  const sectionTitle = (title: string) => {
    checkPage(14);
    doc.setFillColor(252, 97, 45, 0.08);
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(margin, y, colW, 8, 1.5, 1.5, "F");
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(brand);
    doc.text("▐  " + title.toUpperCase(), margin + 3, y + 5.5);
    y += 11;
  };

  const kv = (label: string, value: string, indent = 0) => {
    checkPage(7);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(midGray);
    doc.text(label + ":", margin + indent, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(darkGray);
    const lines = doc.splitTextToSize(value, colW - 45 - indent);
    doc.text(lines, margin + 45 + indent, y);
    y += Math.max(6, lines.length * 4.5);
  };

  const greenBadge = (text: string) => {
    checkPage(7);
    doc.setFillColor(209, 250, 229);
    doc.roundedRect(margin, y, colW, 7, 1.5, 1.5, "F");
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#065f46");
    doc.text("✓  " + text, margin + 3, y + 4.8);
    y += 9;
  };

  const redBadge = (text: string) => {
    checkPage(7);
    doc.setFillColor(254, 226, 226);
    doc.roundedRect(margin, y, colW, 7, 1.5, 1.5, "F");
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#991b1b");
    doc.text("✗  " + text, margin + 3, y + 4.8);
    y += 9;
  };

  const orangeBadge = (text: string) => {
    checkPage(7);
    doc.setFillColor(255, 237, 213);
    doc.roundedRect(margin, y, colW, 7, 1.5, 1.5, "F");
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#92400e");
    doc.text("⚠  " + text, margin + 3, y + 4.8);
    y += 9;
  };

  const divider = () => {
    checkPage(5);
    doc.setDrawColor(lineGray);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageW - margin, y);
    y += 4;
  };

  // ── Cover Page ──────────────────────────────────────────────────────────────

  // Top orange accent stripe
  doc.setFillColor(252, 97, 45);
  doc.rect(0, 0, pageW, 1.5, "F");

  // White logo bar
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 1.5, pageW, 22, "F");

  // Logo on the white bar
  if (logoDataUrl) {
    try {
      let w = 55;
      let h = w / logoAspect;
      if (h > 15) {
        h = 15;
        w = h * logoAspect;
      }
      doc.addImage(logoDataUrl, "PNG", margin, 12.5 - (h / 2), w, h, undefined, "FAST");
    } catch {
      // Fallback text
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.setTextColor("#FC612D");
      doc.text("FraudWall Auto", margin, 16);
    }
  } else {
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#FC612D");
    doc.text("FraudWall Auto", margin, 16);
  }

  // "VEHICLE HISTORY REPORT" tag on the right of white bar
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(midGray);
  doc.text("VEHICLE HISTORY REPORT", pageW - margin, 14, { align: "right" });

  // Dark hero band (starts after white bar)
  doc.setFillColor(17, 24, 39);
  doc.rect(0, 23.5, pageW, 48, "F");

  // Orange divider between white bar and dark band
  doc.setFillColor(252, 97, 45);
  doc.rect(0, 23.5, pageW, 1, "F");

  // Vehicle name in dark band
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text(reportData.vehicleName, margin, 37);

  // VIN
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(156, 163, 175);
  doc.text(`VIN: ${reportData.vin}`, margin, 46);

  // Date
  doc.setFontSize(8);
  doc.setTextColor(107, 114, 128);
  const dateStr = reportData.retrievedAt
    ? new Date(reportData.retrievedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  doc.text(`Generated: ${dateStr}`, margin, 54);

  // Bottom of cover band — orange accent
  doc.setFillColor(252, 97, 45);
  doc.rect(0, 71.5, pageW, 1, "F");

  y = 78;

  // Summary card
  const flags = Object.values(reportData.titleBrands || {}).filter(
    (v) => (v as string).toLowerCase().includes("records found") && !(v as string).toLowerCase().startsWith("no")
  ).length;

  const stats = [
    { label: "Accidents", value: String(reportData.accidents?.length || 0), warn: (reportData.accidents?.length || 0) > 0 },
    { label: "Owners", value: String(reportData.owners?.length || 0), warn: false },
    { label: "Recalls", value: String(reportData.recalls?.length || 0), warn: (reportData.recalls?.length || 0) > 0 },
    { label: "Events", value: String(reportData.events?.length || 0), warn: false },
    { label: "Mileage Pts", value: String(reportData.mileageRecords?.length || 0), warn: false },
    { label: "Title Flags", value: String(flags), warn: flags > 0 },
  ];

  const tileW = (colW - 10) / 3;
  const tileH = 18;
  let tx2 = margin;
  let ty2 = y;

  stats.forEach((s, i) => {
    if (i === 3) { tx2 = margin; ty2 = y + tileH + 3; }
    doc.setFillColor(s.warn ? 254 : 249, s.warn ? 226 : 250, s.warn ? 226 : 251);
    doc.roundedRect(tx2, ty2, tileW, tileH, 2, 2, "F");
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(s.warn ? "#dc2626" : darkGray);
    doc.text(s.value, tx2 + tileW / 2, ty2 + 10, { align: "center" });
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(midGray);
    doc.text(s.label.toUpperCase(), tx2 + tileW / 2, ty2 + 16, { align: "center" });
    tx2 += tileW + 5;
  });

  y = ty2 + tileH + 8;

  // Summary text
  if (reportData.summary) {
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(55, 65, 81);
    const summaryLines = doc.splitTextToSize(reportData.summary, colW);
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * 4.5 + 6;
  }

  divider();

  // ── Vehicle Details ─────────────────────────────────────────────────────────

  drawPageHeader();
  sectionTitle("Vehicle Details");
  if (reportData.year) kv("Year", reportData.year);
  if (reportData.make) kv("Make", reportData.make);
  if (reportData.vehicleModel) kv("Model", reportData.vehicleModel);
  if (reportData.vehicleDetails?.body_type) kv("Body Type", reportData.vehicleDetails.body_type);
  if (reportData.price?.base_msrp) kv("Base MSRP", `$${reportData.price.base_msrp} USD`);
  y += 4;

  // ── Accidents ───────────────────────────────────────────────────────────────

  divider();
  sectionTitle("Accident Records");
  if ((reportData.accidents?.length || 0) === 0) {
    greenBadge("No accident records found");
  } else {
    for (const acc of reportData.accidents || []) {
      redBadge(`Accident #${acc.accidentNumber} — ${acc.date} — ${acc.location}`);
    }
  }
  y += 4;

  // ── Ownership ───────────────────────────────────────────────────────────────

  divider();
  sectionTitle(`Ownership History (${reportData.owners?.length || 0} owners)`);
  for (const [i, o] of (reportData.owners || []).entries()) {
    checkPage(18);
    doc.setFillColor(253, 246, 241);
    doc.roundedRect(margin, y, colW, 16, 2, 2, "F");
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(brand);
    doc.text(`#${i + 1}  ${o.type}`, margin + 3, y + 5.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(darkGray);
    doc.text(`Purchased: ${o.purchasedYear}   State: ${o.state}   Duration: ${o.ownedDuration}`, margin + 3, y + 12);
    y += 19;
  }
  y += 4;

  // ── Title Brands ────────────────────────────────────────────────────────────

  divider();
  sectionTitle("Title Brands");
  const positive = Object.entries(reportData.titleBrands || {}).filter(
    ([, v]) => v.toLowerCase().includes("records found") && !v.toLowerCase().startsWith("no")
  );
  const negative = Object.entries(reportData.titleBrands || {}).filter(
    ([, v]) => v.toLowerCase().startsWith("no") || v.toLowerCase() === "no record found"
  );

  if (positive.length) {
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#dc2626");
    doc.text("FLAGS DETECTED", margin, y);
    y += 6;
    for (const [key] of positive) {
      redBadge(fmt(key));
    }
    y += 2;
  }

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#059669");
  doc.text("CLEAN RECORDS", margin, y);
  y += 6;
  for (const [key] of negative) {
    greenBadge(fmt(key));
  }
  y += 4;

  // ── Recalls ─────────────────────────────────────────────────────────────────

  divider();
  sectionTitle(`Safety Recalls (${reportData.recalls?.length || 0})`);
  if (!reportData.recalls?.length) {
    greenBadge("No open safety recalls");
  } else {
    for (const r of reportData.recalls) {
      checkPage(14);
      doc.setFillColor(255, 237, 213);
      doc.roundedRect(margin, y, colW, 12, 2, 2, "F");
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor("#92400e");
      doc.text(r.component, margin + 3, y + 5);
      doc.setFont("helvetica", "normal");
      doc.text(`Recall #${r.recallNumber}   ${r.date}`, margin + 3, y + 10);
      y += 15;
    }
  }
  y += 4;

  // ── Mileage Records ─────────────────────────────────────────────────────────

  if ((reportData.mileageRecords?.length || 0) > 0) {
    divider();
    sectionTitle("Mileage Records");
    for (const rec of reportData.mileageRecords || []) {
      if (!rec.mileage) continue;
      checkPage(8);
      const isDanger = (rec as any).other === "danger";
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(isDanger ? "#dc2626" : darkGray);
      doc.text(`${rec.date}`, margin, y);
      doc.setFont("helvetica", "bold");
      doc.text(`${rec.mileage} mi`, pageW - margin - 20, y, { align: "right" });
      if (isDanger) {
        doc.setFontSize(7);
        doc.setTextColor("#dc2626");
        doc.text("⚠ Odometer anomaly", margin + 35, y);
      }
      y += 6;
    }
    y += 4;
  }

  // ── Inspections ─────────────────────────────────────────────────────────────

  const inspections = (reportData as any).inspections;
  if (inspections?.length) {
    divider();
    sectionTitle("Inspections");
    for (const insp of inspections) {
      checkPage(12);
      doc.setFillColor(lightGray);
      doc.roundedRect(margin, y, colW, 10, 1.5, 1.5, "F");
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(darkGray);
      doc.text(`${insp.date}  ·  ${insp.location}`, margin + 3, y + 4.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(midGray);
      const detail = (insp.details || "").replace(/\n/g, " ");
      doc.text(doc.splitTextToSize(detail, colW - 10)[0], margin + 3, y + 9);
      y += 13;
    }
    y += 4;
  }

  // ── Usage ───────────────────────────────────────────────────────────────────

  divider();
  sectionTitle("Vehicle Usage");
  const usageFound = Object.entries(reportData.usage || {}).filter(
    ([, v]) => v.toLowerCase().includes("records found") && !v.toLowerCase().startsWith("no")
  );
  const usageClean = Object.entries(reportData.usage || {}).filter(
    ([, v]) => v.toLowerCase().startsWith("no")
  );
  for (const [key] of usageFound) orangeBadge(fmt(key));
  for (const [key] of usageClean) greenBadge(fmt(key));
  y += 4;

  // ── Transmission ────────────────────────────────────────────────────────────

  if (reportData.transmission?.type) {
    divider();
    sectionTitle("Transmission");
    const tx = reportData.transmission;
    if (tx.type) kv("Type", tx.type);
    if (tx.description) kv("Description", tx.description);
    if (tx.number_of_speeds) kv("Speeds", tx.number_of_speeds);
    if (tx.first_gear_ratio) kv("1st Gear Ratio", tx.first_gear_ratio);
    if (tx.second_gear_ratio) kv("2nd Gear Ratio", tx.second_gear_ratio);
    if (tx.third_gear_ratio) kv("3rd Gear Ratio", tx.third_gear_ratio);
    if (tx.fourth_gear_ratio) kv("4th Gear Ratio", tx.fourth_gear_ratio);
    if (tx.reverse_gear_ratio) kv("Reverse Gear", tx.reverse_gear_ratio);
    if (tx.final_drive_axle_ratio) kv("Final Drive", tx.final_drive_axle_ratio);
    y += 4;
  }

  // ── History Events (summary) ─────────────────────────────────────────────────

  if ((reportData.events?.length || 0) > 0) {
    divider();
    sectionTitle(`History Events (${reportData.events?.length})`);
    for (const evt of (reportData.events || []).slice(0, 20)) {
      checkPage(16);
      const isDangerous = evt.source.some(s =>
        s.toLowerCase().includes("damage") || s.toLowerCase().includes("accident") || s.toLowerCase().includes("salvage")
      );
      doc.setFillColor(isDangerous ? 254 : 249, isDangerous ? 226 : 250, isDangerous ? 226 : 251);
      const detailText = evt.details.join(" · ").replace(/\n/g, " ");
      const lines = doc.splitTextToSize(detailText, colW - 8);
      const boxH = 8 + lines.length * 4;
      doc.roundedRect(margin, y, colW, boxH, 1.5, 1.5, "F");

      doc.setFontSize(7.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(isDangerous ? "#dc2626" : darkGray);
      doc.text(`${evt.date}  ${evt.source[0] || ""}  ${evt.location || ""}`, margin + 3, y + 5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(isDangerous ? "#991b1b" : midGray);
      doc.text(lines, margin + 3, y + 10);
      y += boxH + 3;
    }
    if ((reportData.events?.length || 0) > 20) {
      doc.setFontSize(8);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(midGray);
      doc.text(`... and ${(reportData.events?.length || 0) - 20} more events`, margin, y);
      y += 8;
    }
    y += 4;
  }

  // ── Footer with logo ─────────────────────────────────────────────────────────

  const totalPages = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFillColor(17, 24, 39);
    doc.rect(0, pageH - 10, pageW, 10, "F");
    // Logo in footer
    let footerTextX = margin + 20;
    if (logoDataUrl) {
      try {
        const h = 4.5;
        const w = h * logoAspect;
        doc.addImage(logoDataUrl, "PNG", margin, pageH - 7.25, w, h, undefined, "FAST");
        footerTextX = margin + w + 4;
      } catch { /* silent */ }
    }
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(107, 114, 128);
    doc.text("Confidential Vehicle History Report", footerTextX, pageH - 4.5);
    doc.text(`Page ${i} of ${totalPages}`, pageW - margin, pageH - 4.5, { align: "right" });
  }

  const filename = `FraudWall-Report-${reportData.vin}-${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(filename);
}

// ─── Main Full Report View ────────────────────────────────────────────────────

interface FullReportViewProps {
  reportData: VehicleHistoryData;
}

export function FullReportView({ reportData }: FullReportViewProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const flags = Object.values(reportData.titleBrands || {}).filter(
    (v) => v.toLowerCase().includes("records found") && !v.toLowerCase().startsWith("no")
  ).length;

  const handleDownload = useCallback(async () => {
    setIsDownloading(true);
    try {
      // Load logo as base64 data URL for embedding in PDF
      let logoDataUrl = "";
      let logoAspect = 5;
      try {
        const resp = await fetch(autoLogo);
        const blob = await resp.blob();
        logoDataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
        
        logoAspect = await new Promise<number>((resolve) => {
          const img = new Image();
          img.onload = () => resolve(img.width / img.height);
          img.onerror = () => resolve(5);
          img.src = logoDataUrl;
        });
      } catch {
        // If fetching logo fails, PDF will fall back to text branding
        console.warn("Could not load logo for PDF");
      }
      await downloadPDF(reportData, logoDataUrl, logoAspect);
    } catch (e) {
      console.error("PDF generation failed", e);
    } finally {
      setIsDownloading(false);
    }
  }, [reportData]);

  const statTiles = [
    { icon: <AlertTriangle size={15} />, value: reportData.accidents?.length || 0, label: "Accidents", accent: (reportData.accidents?.length || 0) > 0 ? "text-red-500" : "text-gray-400" },
    { icon: <Users size={15} />, value: reportData.owners?.length || 0, label: "Owners", accent: "text-gray-400" },
    { icon: <ShieldAlert size={15} />, value: reportData.recalls?.length || 0, label: "Recalls", accent: (reportData.recalls?.length || 0) > 0 ? "text-orange-400" : "text-gray-400" },
    { icon: <History size={15} />, value: reportData.events?.length || 0, label: "Events", accent: "text-[#FC612D]" },
    { icon: <Gauge size={15} />, value: reportData.mileageRecords?.length || 0, label: "Mileage Pts", accent: "text-gray-400" },
    { icon: <Tag size={15} />, value: flags, label: "Title Flags", accent: flags > 0 ? "text-red-500" : "text-emerald-500" },
  ];

  return (
    <div ref={reportRef} className="space-y-5">
      {/* Download Action Bar */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-100 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FC612D] to-[#FF9340] flex items-center justify-center shadow-sm">
            <FileText size={14} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{reportData.vehicleName} — Full Report</p>
            <p className="text-[11px] text-gray-400">
              VIN: <span className="font-mono">{reportData.vin}</span>
              {reportData.retrievedAt && (
                <> · {new Date(reportData.retrievedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</>
              )}
            </p>
          </div>
        </div>
        <button
          id="download-pdf-btn"
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
        >
          {isDownloading ? (
            <><Loader2 size={14} className="animate-spin" /> Generating PDF…</>
          ) : (
            <><Download size={14} /> Download PDF</>
          )}
        </button>
      </div>

      {/* Using Personally / Logo brand strip */}
      {(reportData.titleBrands || reportData.usage) && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Quick flags */}
          {[
            {
              label: "Salvage",
              value: (reportData.titleBrands?.["Salvage brand"] || "").toLowerCase().includes("records found"),
              redLabel: "Salvage Title", greenLabel: "No Salvage"
            },
            {
              label: "Accidents",
              value: (reportData.accidents?.length || 0) > 0,
              redLabel: `${reportData.accidents?.length} Accident${(reportData.accidents?.length || 0) > 1 ? "s" : ""}`,
              greenLabel: "No Accidents"
            },
            {
              label: "Recalls",
              value: (reportData.recalls?.length || 0) > 0,
              redLabel: `${reportData.recalls?.length} Open Recall${(reportData.recalls?.length || 0) > 1 ? "s" : ""}`,
              greenLabel: "No Open Recalls"
            },
            {
              label: "Loan / Lien",
              value: (reportData.titleBrands?.["Loan/lien record"] || "").toLowerCase().includes("records found"),
              redLabel: "Loan/Lien Recorded", greenLabel: "No Loan/Lien"
            },
          ].map(({ label, value, redLabel, greenLabel }) => (
            <div
              key={label}
              className={`rounded-2xl border px-4 py-3.5 flex items-center gap-3 ${value ? "bg-red-50 border-red-100" : "bg-emerald-50 border-emerald-100"}`}
            >
              {value
                ? <XCircle size={16} className="text-red-500 shrink-0" />
                : <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />}
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-400">{label}</p>
                <p className={`text-sm font-bold ${value ? "text-red-700" : "text-emerald-700"}`}>
                  {value ? redLabel : greenLabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stat Tiles */}
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {statTiles.map((s, i) => <StatTile key={i} {...s} />)}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-5">
          <AccidentsSection accidents={reportData.accidents} />
          <OwnersSection owners={reportData.owners} />
          <EventsTimeline events={reportData.events} />
          <InspectionsSection inspections={(reportData as any).inspections} />
          {(reportData.salesHistory?.length || 0) > 0 && <SalesSection sales={reportData.salesHistory} />}
          <OemOptionsSection oemOptions={(reportData as any).oemOptions} />
          <SpecsSection specifications={reportData.specifications || []} />
          <TransmissionSection tx={reportData.transmission} />
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* FraudWall branding card */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-5 text-white">
            <img src={autoLogo} alt="FraudWall Auto" className="h-7 object-contain mb-3 brightness-0 invert" />
            <p className="text-xs text-gray-400 leading-relaxed">
              This report is compiled from Federal Motor Vehicle records, state agencies, auction houses, and independent sources.
            </p>
            <div className="mt-3 pt-3 border-t border-gray-700">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Report ID</p>
              <p className="text-xs font-mono text-gray-300 mt-0.5">{(reportData as any)._id || reportData.vin}</p>
            </div>
          </div>

          <TitleBrandsSection brands={reportData.titleBrands || {}} />
          <RecallsSection recalls={reportData.recalls} />
          {(reportData.mileageRecords?.length || 0) > 0 && <MileageSection records={reportData.mileageRecords} />}
          <UsageSection usage={reportData.usage || {}} />
          {reportData.price?.base_msrp && <PriceSection price={reportData.price} />}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-50 rounded-2xl border border-gray-100 px-5 py-4 flex gap-3">
        <Info size={14} className="text-gray-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-gray-400 leading-relaxed">
          FraudWall Auto reports are compiled from various public and private data sources including Federal Motor Vehicle records, state DMVs, insurance providers, and auto auction data. While we aim for precision, we cannot guarantee absolute accuracy of all records. Use this report as one of several tools in your vehicle purchase decision. Data retrieved on {reportData.retrievedAt ? new Date(reportData.retrievedAt).toLocaleDateString() : "N/A"}.
        </p>
      </div>
    </div>
  );
}

export default FullReportView;
