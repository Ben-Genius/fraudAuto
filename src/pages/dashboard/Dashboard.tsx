import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Search, Car, Loader2, LogOut, Zap, Crown,
  FileText, AlertTriangle, CheckCircle2, ShieldAlert,
  Users, History, Gauge, Tag, MapPin, Calendar,
  ChevronDown, ChevronUp, AlertCircle, TrendingUp,
  BarChart3, XCircle, Wrench, Menu, X, ArrowRight, Shield,
} from "lucide-react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import {
  getStoredUser, logout, fetchVehicleHistory, initiateSubscription,
  type UserData,
} from "../../services/vinApi";
import type {
  VehicleHistoryData, VehicleHistoryEvent,
  VehicleHistoryOwner, VehicleHistoryMileageRecord,
} from "../../types/vin-decoder";
import { Logo } from "../../components/ui/logo";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(key: string) {
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function dotColor(s: string[]) {
  const v = (s[0] || "").toLowerCase();
  if (v.includes("damage") || v.includes("accident")) return "bg-red-400";
  if (v.includes("insurance")) return "bg-orange-400";
  return "bg-gray-300";
}

function srcBadge(s: string[]) {
  const v = (s[0] || "").toLowerCase();
  if (v.includes("damage") || v.includes("accident")) return "bg-red-50 text-red-600 border-red-100";
  if (v.includes("insurance")) return "bg-orange-50 text-orange-600 border-orange-100";
  return "bg-gray-50 text-gray-400 border-gray-100";
}

function srcIcon(s: string[]) {
  const v = (s[0] || "").toLowerCase();
  if (v.includes("insurance")) return <ShieldAlert size={10} />;
  if (v.includes("damage")) return <AlertTriangle size={10} />;
  if (v.includes("dealer")) return <Wrench size={10} />;
  return <FileText size={10} />;
}

// ─── Primitives ───────────────────────────────────────────────────────────────

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-gray-100 w-full" />;
}

function SectionBlock({ title, icon, right, children }: {
  title: string; icon?: React.ReactNode; right?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <Card>
      <div className="flex items-center justify-between px-5 py-3.5">
        <div className="flex items-center gap-2">
          {icon && <span className="text-gray-400">{icon}</span>}
          <span className="text-sm font-semibold text-gray-700">{title}</span>
        </div>
        {right}
      </div>
      <Divider />
      <div className="p-5">{children}</div>
    </Card>
  );
}

// ─── Report sections ──────────────────────────────────────────────────────────

function StatRow({ data }: { data: VehicleHistoryData }) {
  const flags = Object.values(data.titleBrands || {}).filter(
    (v) => v.toLowerCase().includes("records found") && !v.toLowerCase().startsWith("no")
  ).length;
  const tiles = [
    { icon: <AlertTriangle size={14} />, value: data.accidents?.length || 0, label: "Accidents", color: data.accidents?.length ? "text-red-500" : "text-gray-400" },
    { icon: <Users size={14} />, value: data.owners?.length || 0, label: "Owners", color: "text-gray-400" },
    { icon: <ShieldAlert size={14} />, value: data.recalls?.length || 0, label: "Recalls", color: data.recalls?.length ? "text-orange-400" : "text-gray-400" },
    { icon: <History size={14} />, value: data.events?.length || 0, label: "Events", color: "text-[#FC612D]" },
    { icon: <Gauge size={14} />, value: data.mileageRecords?.length || 0, label: "Mileage Pts", color: "text-gray-400" },
    { icon: <Tag size={14} />, value: flags, label: "Title Flags", color: flags > 0 ? "text-red-500" : "text-emerald-500" },
  ];
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
      {tiles.map((t, i) => (
        <Card key={i} className="p-4 flex flex-col gap-2">
          <span className={t.color}>{t.icon}</span>
          <span className="text-2xl font-bold text-gray-900">{t.value}</span>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{t.label}</p>
        </Card>
      ))}
    </div>
  );
}

function OwnersBlock({ owners = [] }: { owners?: VehicleHistoryOwner[] }) {
  const accents = ["bg-[#FC612D]/5 border-[#FC612D]/15", "bg-orange-50 border-orange-100", "bg-amber-50 border-amber-100", "bg-yellow-50 border-yellow-100"];
  return (
    <SectionBlock title="Ownership" icon={<Users size={13} />}
      right={<span className="text-[11px] font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">{owners.length} owners</span>}>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {owners.map((o, i) => (
          <div key={o._id} className={`rounded-xl border p-3 ${accents[i % accents.length]}`}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-4 h-4 rounded-full bg-[#FC612D]/20 text-[9px] font-bold flex items-center justify-center text-[#FC612D]">{i + 1}</div>
              <p className="text-xs font-semibold text-gray-700">{o.type}</p>
            </div>
            <p className="text-[10px] text-gray-400">Since {o.purchasedYear} · {o.state}</p>
            <p className="text-[10px] text-gray-400">{o.ownedDuration}</p>
          </div>
        ))}
      </div>
    </SectionBlock>
  );
}

function EventsBlock({ events = [] }: { events?: VehicleHistoryEvent[] }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? events : events.slice(0, 8);
  return (
    <SectionBlock title="History Events" icon={<History size={13} />}
      right={<span className="text-[11px] font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">{events.length}</span>}>
      <div className="relative pl-5">
        <div className="absolute left-1.5 top-0 bottom-0 w-px bg-gray-100" />
        <div className="space-y-5">
          {shown.map((evt) => (
            <div key={evt._id} className="relative">
              <div className={`absolute -left-5 top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white ${dotColor(evt.source)}`} />
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                <span className="text-[11px] font-mono text-gray-400">{evt.date}</span>
                <span className={`inline-flex items-center gap-1 px-1.5 py-px rounded-md text-[10px] border font-medium ${srcBadge(evt.source)}`}>
                  {srcIcon(evt.source)} {evt.source[0] || "—"}
                </span>
                {evt.odometer && <span className="text-[11px] text-gray-400 flex items-center gap-0.5"><Gauge size={9} /> {evt.odometer} mi</span>}
              </div>
              <p className="text-[11px] text-gray-400 flex items-center gap-1 mb-0.5"><MapPin size={9} className="shrink-0" /> {evt.location}</p>
              <ul className="space-y-0.5">
                {evt.details.map((d, di) => <li key={di} className="text-sm text-gray-700 leading-snug">{d}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {events.length > 8 && (
        <button onClick={() => setExpanded(!expanded)}
          className="mt-5 w-full flex items-center justify-center gap-1.5 text-xs font-medium text-gray-400 hover:text-gray-700 py-2 rounded-xl hover:bg-gray-50 transition-colors">
          {expanded ? <><ChevronUp size={12} /> Show less</> : <><ChevronDown size={12} /> Show all {events.length} events</>}
        </button>
      )}
    </SectionBlock>
  );
}

function AccidentsBlock({ accidents = [] }: { accidents?: VehicleHistoryData["accidents"] }) {
  if (!accidents.length) return (
    <SectionBlock title="Accidents" icon={<AlertTriangle size={13} />}>
      <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
        <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
        <span className="text-sm font-medium text-emerald-700">No accidents reported</span>
      </div>
    </SectionBlock>
  );
  return (
    <SectionBlock title="Accidents" icon={<AlertTriangle size={13} />}
      right={<span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-100">{accidents.length} found</span>}>
      <div className="space-y-2">
        {accidents.map((acc) => (
          <div key={acc._id} className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
            <div className="w-7 h-7 bg-red-500 rounded-lg flex items-center justify-center shrink-0">
              <AlertCircle size={13} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-red-800 text-sm">Accident #{acc.accidentNumber}</p>
              <p className="text-[11px] text-red-500 flex items-center gap-1"><Calendar size={9} /> {acc.date}</p>
              <p className="text-[11px] text-red-500 flex items-center gap-1"><MapPin size={9} /> {acc.location}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionBlock>
  );
}

function MileageBlock({ records = [] }: { records?: VehicleHistoryMileageRecord[] }) {
  const valid = records.filter((r) => r.mileage);
  const max = Math.max(...valid.map((r) => parseInt(r.mileage.replace(/,/g, "")) || 0), 1);
  return (
    <SectionBlock title="Mileage" icon={<Gauge size={13} />}>
      <div className="space-y-3">
        {valid.map((rec, i) => {
          const val = parseInt(rec.mileage.replace(/,/g, "")) || 0;
          const pct = Math.max(6, Math.round((val / max) * 100));
          return (
            <div key={i}>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="font-mono text-gray-400">{rec.date}</span>
                <span className="font-semibold text-gray-700">{rec.mileage} mi</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-[#FC612D]" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </SectionBlock>
  );
}

function TitleBrandsBlock({ brands }: { brands: Record<string, string> }) {
  const flags = Object.entries(brands).filter(([, v]) => v.toLowerCase().includes("records found") && !v.toLowerCase().startsWith("no"));
  const clean = Object.entries(brands).filter(([, v]) => v.toLowerCase().startsWith("no") || v === "no record found");
  return (
    <SectionBlock title="Title Brands" icon={<Tag size={13} />}>
      {flags.length > 0 && (
        <div className="mb-4 space-y-1.5">
          {flags.map(([key]) => (
            <div key={key} className="flex items-center gap-2 p-2.5 bg-red-50 rounded-xl border border-red-100">
              <XCircle size={12} className="text-red-500 shrink-0" />
              <span className="text-xs font-medium text-red-700">{fmt(key)}</span>
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
    </SectionBlock>
  );
}

function RecallsBlock({ recalls = [] }: { recalls?: VehicleHistoryData["recalls"] }) {
  return (
    <SectionBlock title="Recalls" icon={<ShieldAlert size={13} />}
      right={recalls.length > 0
        ? <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">{recalls.length}</span>
        : undefined}>
      {recalls.length === 0 ? (
        <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
          <CheckCircle2 size={12} className="text-emerald-500" />
          <span className="text-sm font-medium text-emerald-700">No open recalls</span>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {recalls.map((r) => (
            <div key={r._id} className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-gray-800">{r.component}</p>
                <p className="text-[10px] text-gray-400 font-mono mt-0.5">{r.recallNumber}</p>
              </div>
              <span className="text-[11px] text-gray-400 whitespace-nowrap">{r.date}</span>
            </div>
          ))}
        </div>
      )}
    </SectionBlock>
  );
}

function SalesBlock({ sales = [] }: { sales?: VehicleHistoryData["salesHistory"] }) {
  if (!sales.length) return null;
  return (
    <SectionBlock title="Sales History" icon={<TrendingUp size={13} />}>
      <div className="space-y-2">
        {sales.map((s) => (
          <div key={s._id} className="flex justify-between items-center p-3 rounded-xl border border-gray-100 hover:bg-gray-50/50 transition-colors">
            <div>
              <p className="font-semibold text-gray-900 text-sm">{s.sellerCity}, {s.sellerState}</p>
              {s.dealerName && <p className="text-xs text-gray-400">{s.dealerName}</p>}
              {s.date && <p className="text-xs text-gray-400 flex items-center gap-1"><Calendar size={8} /> {s.date}</p>}
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">${s.price.toLocaleString()}</p>
              {s.odometer && <p className="text-[11px] text-gray-400 flex items-center gap-0.5 justify-end"><Gauge size={8} /> {s.odometer} mi</p>}
            </div>
          </div>
        ))}
      </div>
    </SectionBlock>
  );
}

function SpecsBlock({ specs = [] }: { specs?: Record<string, any>[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <SectionBlock title="Specifications" icon={<BarChart3 size={13} />}>
      <div className="space-y-1.5">
        {specs.map((group, gi) => {
          const [category, vals] = Object.entries(group)[0];
          if (!vals || !Object.values(vals).some((v) => v !== "" && v !== null)) return null;
          return (
            <div key={gi} className="border border-gray-100 rounded-xl overflow-hidden">
              <button onClick={() => setOpen(open === category ? null : category)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50/50 transition-colors">
                {fmt(category)}
                {open === category ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
              {open === category && (
                <div className="px-4 pb-4 pt-1 grid grid-cols-2 gap-x-5 gap-y-2 border-t border-gray-100">
                  {Object.entries(vals).map(([k, v]) => v !== "" ? (
                    <div key={k}>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wide mt-2">{fmt(k)}</p>
                      <p className="text-sm text-gray-800 font-medium">{String(v)}</p>
                    </div>
                  ) : null)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SectionBlock>
  );
}

// ─── Full report ───────────────────────────────────────────────────────────────

function FullReport({ data }: { data: VehicleHistoryData }) {
  const flags = Object.values(data.titleBrands || {}).filter(
    (v) => v.toLowerCase().includes("records found") && !v.toLowerCase().startsWith("no")
  ).length;

  return (
    <div className="space-y-5">
      <Card>
        <div className="h-0.5 bg-[#FC612D]" />
        <div className="px-6 py-5 flex flex-col sm:flex-row gap-4 sm:items-start justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              {data.vehicleDetails?.body_type && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-gray-100 text-gray-500">
                  <Car size={9} /> {data.vehicleDetails.body_type}
                </span>
              )}
              {flags > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-red-50 text-red-600 border border-red-100">
                  <AlertTriangle size={9} /> {flags} Flag{flags > 1 ? "s" : ""}
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{data.vehicleName}</h2>
            <p className="text-xs font-mono text-gray-400 tracking-widest mt-0.5">{data.vin}</p>
            {data.summary && <p className="text-xs text-gray-500 mt-2 max-w-lg leading-relaxed">{data.summary}</p>}
          </div>
          {data.price?.base_msrp && (
            <div className="shrink-0 text-right">
              <p className="text-[10px] uppercase tracking-wider text-gray-400">Base MSRP</p>
              <p className="text-lg font-bold text-gray-900">${data.price.base_msrp}</p>
            </div>
          )}
        </div>
      </Card>

      <StatRow data={data} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          {(data.accidents?.length || 0) > 0 && <AccidentsBlock accidents={data.accidents} />}
          <OwnersBlock owners={data.owners || []} />
          <EventsBlock events={data.events || []} />
          {(data.salesHistory?.length || 0) > 0 && <SalesBlock sales={data.salesHistory} />}
          <SpecsBlock specs={data.specifications || []} />
        </div>
        <div className="space-y-5">
          <TitleBrandsBlock brands={data.titleBrands || {}} />
          <RecallsBlock recalls={data.recalls || []} />
          {(data.mileageRecords?.length || 0) > 0 && <MileageBlock records={data.mileageRecords} />}
        </div>
      </div>
    </div>
  );
}

// ─── No credits ────────────────────────────────────────────────────────────────

const PLAN_FEATURES = [
  "Full Accident History",
  "Ownership History",
  "Title Brand Checks",
  "Safety Recall Alerts",
  "Odometer Fraud Detection",
  "Market Value Analysis",
  "Full Service History",
  "Auction Records & Photos",
];

function PurchaseCredits({ onBuy, isLoading }: {
  onBuy: (p: "standard" | "deluxe") => void;
  isLoading: boolean;
}) {
  const [selected, setSelected] = useState<"standard" | "deluxe" | null>(null);

  const handleSelect = (plan: "standard" | "deluxe") => {
    if (isLoading) return;
    setSelected(plan);
    onBuy(plan);
  };

  if (isLoading && selected) {
    return (
      <Card className="p-12 flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#FC612D]/8 flex items-center justify-center mb-4">
          <Loader2 size={20} className="text-[#FC612D] animate-spin" />
        </div>
        <p className="text-sm font-semibold text-gray-900 mb-1">Redirecting to Paystack</p>
        <p className="text-xs text-gray-400">
          Opening secure checkout for <span className="font-semibold capitalize">{selected}</span> plan…
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-900">Get Report Credits</h2>
          <p className="text-sm text-gray-400 mt-0.5">Pay as you go — both plans include every feature.</p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
          <Shield size={11} className="text-emerald-500" /> Secure via Paystack
        </div>
      </div>

      {/* Feature list — shared */}
      <Card className="p-5">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Everything included in both plans</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {PLAN_FEATURES.map((f) => (
            <div key={f} className="flex items-center gap-2 text-xs text-gray-600">
              <CheckCircle2 size={12} className="text-[#FC612D] shrink-0" /> {f}
            </div>
          ))}
        </div>
      </Card>

      {/* Plan cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Standard */}
        <div
          onClick={() => handleSelect("standard")}
          className="group relative border border-gray-200 rounded-2xl p-5 flex flex-col gap-4 hover:border-[#FC612D]/50 transition-all cursor-pointer bg-white"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-[#FC612D] transition-colors">
                <Zap size={16} className="text-gray-500 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Standard</p>
                <p className="text-sm font-bold text-gray-900">1 credit</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-black text-gray-900">GHC 50</p>
              <p className="text-[10px] text-gray-400">one-time</p>
            </div>
          </div>
          <button
            disabled={isLoading}
            className="w-full py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 group-hover:bg-gray-900 group-hover:text-white group-hover:border-gray-900 transition-all disabled:opacity-50"
          >
            Choose Standard <ArrowRight size={13} />
          </button>
        </div>

        {/* Deluxe */}
        <div
          onClick={() => handleSelect("deluxe")}
          className="group relative border-2 border-[#FC612D] rounded-2xl p-5 flex flex-col gap-4 cursor-pointer bg-white hover:bg-[#FC612D]/[0.02] transition-colors"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="bg-[#FC612D] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest">
              Best Value
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FC612D] flex items-center justify-center">
                <Crown size={16} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#FC612D] uppercase tracking-widest">Deluxe</p>
                <p className="text-sm font-bold text-gray-900">2 credits</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-black text-gray-900">GHC 120</p>
              <p className="text-[10px] text-gray-400">one-time</p>
            </div>
          </div>
          <button
            disabled={isLoading}
            className="w-full py-2.5 bg-[#FC612D] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Choose Deluxe <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ───────────────────────────────────────────────────────────────────

function Sidebar({ user, credits, onLogout, open, onClose }: {
  user: UserData; credits: number; onLogout: () => void; open: boolean; onClose: () => void;
}) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-60 bg-white border-r border-gray-100 z-40 flex flex-col
        transition-transform duration-200
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-100 flex items-center justify-between">
          <Logo iconClassName="h-7 w-auto" />
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold">
            <Car size={15} /> VIN Lookup
          </div>
        </nav>

        {/* Credits */}
        <div className="px-4 py-3 mx-3 mb-3 rounded-xl border border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">Report Credits</p>
            <span className={`text-xs font-bold ${credits > 0 ? "text-emerald-600" : "text-gray-400"}`}>{credits}</span>
          </div>
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-[#FC612D] rounded-full transition-all" style={{ width: credits > 0 ? "100%" : "0%" }} />
          </div>
          <p className="text-[10px] text-gray-400 mt-1">{credits > 0 ? `${credits} report${credits !== 1 ? "s" : ""} available` : "No credits — purchase to run reports"}</p>
        </div>

        {/* User + logout */}
        <div className="border-t border-gray-100 px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#FC612D]/10 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-[#FC612D]">
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user.firstName} {user.lastName}</p>
              <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
          <button onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors">
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </aside>
    </>
  );
}

// ─── Dashboard ─────────────────────────────────────────────────────────────────

const Dashboard = () => {
  useDocumentTitle("Dashboard");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [user, setUser] = useState<UserData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [vin, setVin] = useState("");
  const [report, setReport] = useState<VehicleHistoryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = getStoredUser();
    if (!stored) { navigate("/login"); return; }
    setUser(stored);

    const vinParam = searchParams.get("vin");
    if (vinParam) { setVin(vinParam); runSearch(vinParam); }
  }, []);

  const runSearch = async (v: string) => {
    const clean = v.trim().toUpperCase();
    if (clean.length !== 17) return;
    setIsLoading(true);
    setError(null);
    setReport(null);
    try {
      setReport(await fetchVehicleHistory(clean));
    } catch (err: any) {
      setError(err?.message || "Failed to fetch report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const [paymentLoading, setPaymentLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); runSearch(vin); };
  const handleLogout = () => { logout(); navigate("/login"); };
  const handleBuyCredits = async (plan: "standard" | "deluxe") => {
    setPaymentLoading(true);
    try {
      const { authorizationUrl } = await initiateSubscription(plan);
      window.location.href = authorizationUrl;
    } catch (err: any) {
      setError(err?.message || "Failed to initiate payment. Please try again.");
      setPaymentLoading(false);
    }
  };

  if (!user) return null;

  const credits = user.availableReportCredits ?? 0;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar user={user} credits={credits} onLogout={handleLogout} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 shrink-0">
          <div className="px-5 py-3 flex items-center gap-3">
            {/* Mobile hamburger */}
            <button onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-900 p-1.5 rounded-lg hover:bg-gray-100 transition-colors shrink-0">
              <Menu size={18} />
            </button>

            {/* VIN search */}
            <form onSubmit={handleSubmit} className="flex gap-2 flex-1 max-w-2xl">
              <div className="relative flex-1">
                <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={vin}
                  onChange={(e) => setVin(e.target.value.toUpperCase())}
                  placeholder="Enter 17-character VIN"
                  maxLength={17}
                  className="w-full pl-9 pr-12 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FC612D]/20 focus:border-[#FC612D]/50 transition-all"
                />
                <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold tabular-nums pointer-events-none transition-colors ${vin.length === 17 ? "text-[#FC612D]" : "text-gray-300"}`}>
                  {vin.length}/17
                </span>
              </div>
              <button type="submit" disabled={vin.length !== 17 || isLoading}
                className="px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-[#FC612D] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0 flex items-center gap-1.5">
                {isLoading ? <Loader2 size={13} className="animate-spin" /> : "Search"}
              </button>
            </form>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-5 py-6 space-y-5">

            {/* Empty / welcome state */}
            {!report && !isLoading && !error && (
              <>
                <div className="pt-2 pb-1">
                  <h1 className="text-xl font-bold text-gray-900">Hello, {user.firstName}</h1>
                  <p className="text-sm text-gray-400 mt-0.5">
                    {credits > 0
                      ? `You have ${credits} credit${credits !== 1 ? "s" : ""} — enter a VIN above to run a report.`
                      : "You have no credits. Purchase one to run a vehicle history report."}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Credits", value: credits.toString(), sub: credits > 0 ? "Available" : "None left", ok: credits > 0 },
                    { label: "Email", value: user.email, sub: user.isEmailVerified ? "Verified" : "Not verified", ok: user.isEmailVerified },
                    { label: "Member since", value: new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }), sub: "Account created", ok: true },
                    { label: "Role", value: user.role.charAt(0).toUpperCase() + user.role.slice(1), sub: "Account type", ok: true },
                  ].map((item) => (
                    <Card key={item.label} className="p-4">
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide mb-1">{item.label}</p>
                      <p className="text-sm font-bold text-gray-900 truncate">{item.value}</p>
                      <p className={`text-[11px] mt-0.5 ${item.ok ? "text-emerald-500" : "text-orange-400"}`}>{item.sub}</p>
                    </Card>
                  ))}
                </div>

                {credits === 0 && <PurchaseCredits onBuy={handleBuyCredits} isLoading={paymentLoading} />}
              </>
            )}

            {/* Loading */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-24 gap-3">
                <Loader2 size={24} className="animate-spin text-[#FC612D]" />
                <p className="text-sm text-gray-400">Fetching vehicle history…</p>
              </div>
            )}

            {/* Error */}
            {error && (
              <Card className="p-6 text-center">
                <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle size={16} className="text-red-400" />
                </div>
                <p className="font-semibold text-gray-900 mb-1">Something went wrong</p>
                <p className="text-sm text-gray-500 mb-4">{error}</p>
                <button onClick={() => { setError(null); runSearch(vin); }}
                  className="px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-[#FC612D] transition-colors">
                  Try again
                </button>
              </Card>
            )}

            {/* Report */}
            {report && <FullReport data={report} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
