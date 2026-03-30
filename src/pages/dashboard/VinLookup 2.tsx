// /dashboard/vin-lookup — Dedicated VIN search & report page
import { useEffect, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import {
  Search, Car, Loader2, FileText, AlertTriangle, CheckCircle2, ShieldAlert,
  Users, History, Gauge, Tag, MapPin, Calendar, ChevronDown, ChevronUp,
  AlertCircle, TrendingUp, BarChart3, XCircle, Wrench,
  Lock, Plus, Zap, ArrowRight,
} from "lucide-react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { fetchVehicleHistory } from "../../services/vinApi";
import type {
  VehicleHistoryData, VehicleHistoryEvent,
  VehicleHistoryOwner, VehicleHistoryMileageRecord,
} from "../../types/vin-decoder";
import { saveVinHistory, PlanCards, type UserData, type SubscriptionStatus } from "./DashboardLayout";

// ─── Outlet context ────────────────────────────────────────────────────────────

type OutletCtx = {
  user: UserData;
  credits: number;
  setCredits: React.Dispatch<React.SetStateAction<number>>;
  handleTopUp: () => void;
  handleBuyCredits: (p: "standard" | "deluxe") => void;
  paymentLoading: boolean;
  subscription: SubscriptionStatus | null;
};

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
      <div className="h-px bg-gray-100 w-full" />
      <div className="p-5">{children}</div>
    </Card>
  );
}

// ─── Credit Paywall ────────────────────────────────────────────────────────────

function CreditPaywall({ vin, onBuy, isLoading }: {
  vin: string;
  onBuy: (p: "standard" | "deluxe") => void;
  isLoading: boolean;
}) {
  return (
    <div className="space-y-5">
      <Card>
        <div className="h-0.5 bg-gradient-to-r from-[#FC612D] to-orange-300" />
        <div className="px-6 py-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#FC612D]/10 flex items-center justify-center">
              <Lock size={16} className="text-[#FC612D]" />
            </div>
            <div>
              <p className="text-base font-bold text-gray-900">Report Locked</p>
              <p className="text-xs text-gray-400 font-mono tracking-wider">{vin}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed mb-5">
            We found data for this vehicle. Purchase a credit to unlock the full report — including accident history, ownership records, title checks, and more.
          </p>

          {/* Blurred teaser grid */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
            {["Accidents", "Owners", "Recalls", "Events", "Mileage", "Flags"].map((label) => (
              <div key={label} className="rounded-xl border border-gray-100 p-3 bg-gray-50 select-none">
                <div className="h-5 bg-gray-200 rounded w-8 mb-1.5 blur-sm" />
                <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Inline plan picker */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <Zap size={14} className="text-[#FC612D]" />
          <p className="text-sm font-bold text-gray-900">Choose a plan to unlock this report</p>
        </div>
        <PlanCards onBuy={onBuy} isLoading={isLoading} />
      </Card>
    </div>
  );
}

// ─── Buy More Strip ───────────────────────────────────────────────────────────

function BuyMoreStrip({ credits, onTopUp }: { credits: number; onTopUp: () => void }) {
  return (
    <Card className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#FC612D]/8 flex items-center justify-center shrink-0">
          <Zap size={16} className="text-[#FC612D]" />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">
            {credits > 0 ? `${credits} credit${credits !== 1 ? "s" : ""} remaining` : "No credits left"}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {credits > 0 ? "Search another VIN any time" : "Purchase credits to run your next report"}
          </p>
        </div>
      </div>
      <button
        onClick={onTopUp}
        className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-[#FC612D] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
      >
        <Plus size={13} /> Top Up Credits
      </button>
    </Card>
  );
}

// ─── Report Sections ──────────────────────────────────────────────────────────

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

// ─── Full Report ──────────────────────────────────────────────────────────────

function FullReport({ data, credits, onTopUp }: { data: VehicleHistoryData; credits: number; onTopUp: () => void }) {
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

      <BuyMoreStrip credits={credits} onTopUp={onTopUp} />
    </div>
  );
}

// ─── VinLookup Page ───────────────────────────────────────────────────────────

const VinLookup = () => {
  useDocumentTitle("VIN Lookup — Fraudwall Auto");
  const [searchParams] = useSearchParams();
  const { credits, setCredits, handleTopUp, handleBuyCredits, paymentLoading, subscription } =
    useOutletContext<OutletCtx>();

  const [vin, setVin] = useState("");
  const [report, setReport] = useState<VehicleHistoryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paywallVin, setPaywallVin] = useState<string | null>(null);

  // Auto-run if ?vin= param present (e.g. from history chip)
  useEffect(() => {
    const vinParam = searchParams.get("vin");
    if (vinParam && vinParam.length === 17) {
      setVin(vinParam.toUpperCase());
      runSearch(vinParam.toUpperCase());
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const runSearch = async (v: string) => {
    const clean = v.trim().toUpperCase();
    if (clean.length !== 17) return;

    setIsLoading(true);
    setError(null);
    setPaywallVin(null);
    // Don't clear previous report during load — preserve it if new search fails

    try {
      const result = await fetchVehicleHistory(clean);

      if (result.subscriptionRequired) {
        setPaywallVin(clean);
        setReport(null);
        return;
      }

      setReport(result);
      setPaywallVin(null);
      saveVinHistory(clean, result.vehicleName || clean);
      // Deduct credit optimistically
      setCredits((c) => Math.max(0, c - 1));
    } catch (err: any) {
      if (err.status === 402 || err.status === 403) {
        setPaywallVin(clean);
        setReport(null);
      } else {
        // Keep the old report visible, just show error above
        setError(err?.message || "Failed to fetch report. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); runSearch(vin); };

  return (
    <div className="space-y-5">
      {/* Page title */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">VIN Lookup</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Enter a 17-character Vehicle Identification Number to run a full history report.
        </p>
      </div>

      {/* Search bar — prominent */}
      <Card className="p-5">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={vin}
              onChange={(e) => setVin(e.target.value.toUpperCase())}
              placeholder="Enter 17-character VIN (e.g. 1HGBH41JXMN109186)"
              maxLength={17}
              className="w-full pl-10 pr-14 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FC612D]/20 focus:border-[#FC612D]/50 transition-all"
            />
            <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-bold tabular-nums pointer-events-none transition-colors ${vin.length === 17 ? "text-[#FC612D]" : "text-gray-300"}`}>
              {vin.length}/17
            </span>
          </div>
          <button
            type="submit"
            disabled={vin.length !== 17 || isLoading}
            className="px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-[#FC612D] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0 flex items-center gap-2"
          >
            {isLoading ? <Loader2 size={14} className="animate-spin" /> : <><Search size={14} /> Search</>}
          </button>
        </form>

        {/* Credits badge */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Each search uses <span className="font-semibold text-gray-700">1 credit</span>
          </p>
          <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg ${credits > 0 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
            <Zap size={10} />
            {credits > 0 
              ? `${credits} credit${credits !== 1 ? "s" : ""} available ${subscription?.status === "PENDING" ? "(Pending)" : ""}` 
              : "No credits — top up first"}
          </div>
        </div>
      </Card>

      {/* Loading */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <Loader2 size={28} className="animate-spin text-[#FC612D]" />
          <p className="text-sm font-semibold text-gray-700">Fetching vehicle history…</p>
          <p className="text-xs text-gray-400">This may take a few seconds</p>
        </div>
      )}

      {/* Credit paywall */}
      {paywallVin && !isLoading && (
        <CreditPaywall vin={paywallVin} onBuy={handleBuyCredits} isLoading={paymentLoading} />
      )}

      {/* Generic error */}
      {error && !paywallVin && (
        <Card className="p-6 text-center">
          <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-3">
            <AlertTriangle size={16} className="text-red-400" />
          </div>
          <p className="font-semibold text-gray-900 mb-1">Something went wrong</p>
          <p className="text-sm text-gray-500 mb-4">{error}</p>
          <div className="flex items-center justify-center gap-3">
            <button onClick={() => { setError(null); runSearch(vin); }}
              className="px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-[#FC612D] transition-colors">
              Try again
            </button>
            <button onClick={() => setError(null)}
              className="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors">
              Dismiss
            </button>
          </div>
        </Card>
      )}

      {/* No credits prompt (before any search) */}
      {credits === 0 && !report && !isLoading && !paywallVin && !error && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#FC612D]/10 flex items-center justify-center">
              <Zap size={16} className="text-[#FC612D]" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">You need credits to run a search</p>
              <p className="text-xs text-gray-400 mt-0.5">Pick a plan below to get started</p>
            </div>
          </div>
          <PlanCards onBuy={handleBuyCredits} isLoading={paymentLoading} />
        </Card>
      )}

      {/* Empty state with credits */}
      {credits > 0 && !report && !isLoading && !paywallVin && !error && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Car size={28} className="text-gray-400" />
          </div>
          <p className="text-base font-bold text-gray-700 mb-1">Ready to search</p>
          <p className="text-sm text-gray-400">Enter a VIN above to unlock the full vehicle history report.</p>
          <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-400">
            <Zap size={11} className="text-[#FC612D]" />
            You have <span className="font-bold text-gray-700 mx-0.5">{credits}</span> credit{credits !== 1 ? "s" : ""} ready
          </div>
        </div>
      )}

      {/* Report */}
      {report && !isLoading && (
        <FullReport data={report} credits={credits} onTopUp={handleTopUp} />
      )}

      {/* "New search" prompt + old report preserved when error occurs */}
      {report && error && !isLoading && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3">
          <AlertTriangle size={14} className="text-amber-500 shrink-0" />
          <p className="text-sm text-amber-700 flex-1">New search failed. Showing previous report above.</p>
          <button onClick={() => setError(null)} className="text-amber-400 hover:text-amber-600 shrink-0">
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default VinLookup;
