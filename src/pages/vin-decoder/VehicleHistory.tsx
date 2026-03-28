"use client";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Loader2, AlertTriangle, CheckCircle2, XCircle, Car, MapPin,
  Calendar, Gauge, ShieldAlert, Users, History, Tag, Wrench,
  ChevronDown, ChevronUp, AlertCircle, TrendingUp, Activity,
  Search, FileText, BarChart3, Lock, ArrowRight,
  Info,
} from "lucide-react";
import {
  fetchVehicleHistory, getSubscriptionStatus,
  type SubscriptionStatus,
} from "../../services/vinApi";
import type {
  VehicleHistoryData, VehicleHistoryEvent, VehicleHistoryOwner,
  VehicleHistoryMileageRecord,
} from "../../types/vin-decoder";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { PlanSelection } from "../../components/vin-decoder/PlanSelection";

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

function Badge({ children, variant = "gray" }: {
  children: React.ReactNode;
  variant?: "gray" | "red" | "orange" | "green" | "brand";
}) {
  const cls = {
    gray: "bg-gray-100 text-gray-500",
    red: "bg-red-50 text-red-600 border border-red-100",
    orange: "bg-orange-50 text-orange-600 border border-orange-100",
    green: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    brand: "bg-[#FC612D]/8 text-[#FC612D] border border-[#FC612D]/15",
  }[variant];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold ${cls}`}>
      {children}
    </span>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Sk({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-100 rounded-xl ${className}`} />;
}

function PageSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-8 space-y-5">
      <Sk className="h-24 rounded-2xl" />
      <div className="grid grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => <Sk key={i} className="h-20" />)}
      </div>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 space-y-4">
          <Sk className="h-40" /><Sk className="h-64" /><Sk className="h-96" />
        </div>
        <div className="space-y-4">
          <Sk className="h-52" /><Sk className="h-40" />
        </div>
      </div>
    </div>
  );
}

// ─── Report Header ────────────────────────────────────────────────────────────

function ReportHeader({
  data, subscription, isLimited,
}: { data: VehicleHistoryData; subscription?: SubscriptionStatus | null; isLimited: boolean }) {
  const flags = Object.values(data.titleBrands || {}).filter(
    (v) => (v as string).toLowerCase().includes("records found") && !(v as string).toLowerCase().startsWith("no")
  ).length;

  return (
    <Card>
      {/* Brand stripe */}
      <div className="h-0.5 bg-gradient-to-r from-[#FC612D] via-[#FF9340] to-[#FFCA42]" />
      <div className="px-6 py-5 flex flex-col sm:flex-row gap-4 sm:items-start justify-between">
        <div className="min-w-0">
          {/* Tags row */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            {data.vehicleDetails?.body_type && (
              <Badge variant="gray">
                <Car size={9} /> {data.vehicleDetails.body_type}
              </Badge>
            )}
            {isLimited && (
              <Badge variant="orange">
                <Lock size={9} /> Limited Preview
              </Badge>
            )}
            {!isLimited && subscription?.hasActivePlan && subscription.plan && (
              <Badge variant="green">
                <CheckCircle2 size={9} />
                {subscription.plan === "deluxe" ? "Deluxe" : "Standard"} Access
              </Badge>
            )}
            {flags > 0 && (
              <Badge variant="red">
                <AlertTriangle size={9} /> {flags} Flag{flags > 1 ? "s" : ""}
              </Badge>
            )}
          </div>

          <h1 className="text-xl font-bold text-gray-900 leading-tight max-w-xs">{data.vehicleName}</h1>
          <p className="text-xs font-mono text-gray-400 tracking-widest mt-0.5">{data.vin}</p>
          {data.summary && (
            <p className="text-xs text-gray-500 leading-relaxed mt-2 max-w-lg">{data.summary}</p>
          )}
        </div>

        {(data.price?.base_msrp || data.retrievedAt) && (
          <div className="shrink-0 text-right">
            {data.price?.base_msrp && (
              <div className="mb-1">
                <p className="text-[10px] uppercase tracking-wider text-gray-400">Base MSRP</p>
                <p className="text-lg font-bold text-gray-900">${data.price.base_msrp}</p>
              </div>
            )}
            <p className="text-[11px] text-gray-400">
              {data.retrievedAt
                ? new Date(data.retrievedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                : new Date().toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

// ─── Stat Tile ────────────────────────────────────────────────────────────────

function StatTile({
  icon, value, label, accent = "text-gray-400", locked = false,
}: {
  icon: React.ReactNode; value: string | number; label: string;
  accent?: string; locked?: boolean;
}) {
  return (
    <Card className="p-4 grid flex-col gap-2.5">
      <div className={`${accent}`}>{icon}</div>
      <div className="flex items-center gap-1.5">
        {locked ? (
          <div className="relative flex items-center">
            <span className="text-2xl font-bold text-gray-900 select-none blur-sm">{value}</span>
            <Lock size={12} className="absolute inset-0 m-auto text-gray-500" />
          </div>
        ) : (
          <span className="text-2xl font-bold text-gray-900">{value}</span>
        )}
      </div>
      <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide leading-none">{label}</p>
    </Card>
  );
}

// ─── Section primitives ───────────────────────────────────────────────────────

function Section({ title, icon, right, children }: {
  title: string; icon?: React.ReactNode; right?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader title={title} icon={icon} right={right} />
      <Divider />
      <div className="p-5">{children}</div>
    </Card>
  );
}

// ─── Blurred Gated Preview ────────────────────────────────────────────────────

function GatedPreview() {
  const owners = [
    { t: "Personal", y: 2018, s: "CA", d: "2 yrs 4 mo" },
    { t: "Corporate", y: 2020, s: "TX", d: "1 yr 7 mo" },
    { t: "Personal", y: 2022, s: "GA", d: "Ongoing" },
  ];
  const events = [
    { dot: "bg-[#FC612D]", date: "01/12/2019", src: "Insurance Reported", loc: "Los Angeles, CA", detail: "Liability claim — structural damage to front end" },
    { dot: "bg-gray-300", date: "08/03/2020", src: "Dealer Service", loc: "Houston, TX", detail: "Oil change, brake pads, wheel alignment" },
    { dot: "bg-red-500", date: "11/20/2020", src: "Accident Recorded", loc: "Dallas, TX", detail: "Collision — airbag deployment noted" },
    { dot: "bg-gray-300", date: "03/14/2021", src: "Odometer Reading", loc: "Atlanta, GA", detail: "Mileage: 58,430 mi at inspection" },
    { dot: "bg-orange-400", date: "07/02/2022", src: "Title Transfer", loc: "Atlanta, GA", detail: "Salvage title issued by state DMV" },
  ];
  const mileage = [
    { d: "Jan 2019", pct: 12, mi: "12,040 mi" },
    { d: "Aug 2020", pct: 38, mi: "38,210 mi" },
    { d: "Nov 2020", pct: 58, mi: "58,430 mi" },
    { d: "Dec 2022", pct: 80, mi: "80,900 mi" },
    { d: "Jun 2023", pct: 100, mi: "101,320 mi" },
  ];

  return (
    <div className="relative rounded-2xl overflow-hidden border border-gray-100 bg-white select-none pointer-events-none">
      {/* Blurred content */}
      <div className="blur-[3px] opacity-60">
        {/* Owners */}
        <div className="px-5 pt-4 pb-4">
          <div className="flex items-center gap-2 mb-3">
            <Users size={13} className="text-gray-400" />
            <span className="text-sm font-semibold text-gray-700">Ownership History</span>
            <span className="ml-auto text-[10px] font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">3 owners</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {owners.map((o, i) => (
              <div key={i} className="rounded-xl border border-gray-100 p-3 bg-gray-50/50">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-4 h-4 rounded-full bg-[#FC612D] text-white text-[9px] font-bold flex items-center justify-center">{i + 1}</div>
                  <span className="text-xs font-semibold text-gray-700">{o.t}</span>
                </div>
                <p className="text-[10px] text-gray-400">Since {o.y} · {o.s}</p>
                <p className="text-[10px] text-gray-400">{o.d}</p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* Events */}
        <div className="px-5 pt-4 pb-4">
          <div className="flex items-center gap-2 mb-3">
            <History size={13} className="text-gray-400" />
            <span className="text-sm font-semibold text-gray-700">History Events</span>
            <span className="ml-auto text-[10px] font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">14 events</span>
          </div>
          <div className="relative pl-5">
            <div className="absolute left-1.5 top-0 bottom-0 w-px bg-gray-100" />
            <div className="space-y-4">
              {events.map((e, i) => (
                <div key={i} className="relative">
                  <div className={`absolute -left-5 top-1.5 w-2 h-2 rounded-full border-2 border-white ${e.dot}`} />
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono text-gray-400">{e.date}</span>
                    <span className="text-[10px] font-medium px-1.5 py-px rounded-md bg-gray-100 text-gray-500">{e.src}</span>
                  </div>
                  <p className="text-[10px] text-gray-400">{e.loc}</p>
                  <p className="text-xs text-gray-600">{e.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Divider />

        {/* Mileage */}
        <div className="px-5 pt-4 pb-5">
          <div className="flex items-center gap-2 mb-3">
            <Gauge size={13} className="text-gray-400" />
            <span className="text-sm font-semibold text-gray-700">Mileage Records</span>
          </div>
          <div className="space-y-2.5">
            {mileage.map((m, i) => (
              <div key={i}>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="font-mono text-gray-400">{m.d}</span>
                  <span className="font-semibold text-gray-500">{m.mi}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#FC612D] to-[#FFCA42]" style={{ width: `${m.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fade overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white" />

      {/* Lock CTA */}
      <div className="absolute bottom-0 inset-x-0 flex flex-col items-center pb-8 px-4 text-center">
        <div className="w-10 h-10 rounded-2xl bg-gray-900 flex items-center justify-center mb-3 shadow-md">
          <Lock size={16} className="text-white" />
        </div>
        <p className="text-sm font-bold text-gray-900">Full history is locked</p>
        <p className="text-xs text-gray-500 mt-0.5 max-w-xs">Subscribe below to unlock all events, records, and details</p>
      </div>
    </div>
  );
}

// ─── Limited View ─────────────────────────────────────────────────────────────

function LimitedView({
  reportData, onSelect,
}: { reportData: VehicleHistoryData; onSelect: (p: "standard" | "deluxe") => void }) {
  const features = [
    "Complete Timeline of Events", "Accident & Damage Records", "Odometer Rollback Check",
    "Theft & Salvage Records", "Open Safety Recalls", "Title Brand History",
    "Full Ownership History", "Technical Specifications",
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">

        {/* Blurred preview */}
        <GatedPreview />

        {/* What's included */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Info size={14} className="text-[#FC612D]" />
            <p className="text-sm font-semibold text-gray-800">What's included in the full report</p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 size={13} className="text-[#FC612D] shrink-0" />
                {f}
              </div>
            ))}
          </div>
          {/* Plan selection */}
          <PlanSelection onSelect={onSelect} />
        </Card>

      </div>




      {/* Disclaimer */}
      <p className="text-[11px] text-gray-400 text-center max-w-lg mx-auto leading-relaxed pb-4">
        FraudWall Auto reports are compiled from various data sources. While we aim for precision, we cannot
        guarantee absolute accuracy. Use this report as a guide in your vehicle purchase decision.
      </p>
    </div>
  );
}

// ─── Full Report Sections ─────────────────────────────────────────────────────

function TitleBrandsSection({ brands }: { brands: Record<string, string> }) {
  const positive = Object.entries(brands).filter(
    ([, v]) => v.toLowerCase().includes("records found") && !v.toLowerCase().startsWith("no")
  );
  const negative = Object.entries(brands).filter(
    ([, v]) => v.toLowerCase().startsWith("no") || v.toLowerCase() === "no record found"
  );
  return (
    <Section title="Title Brands" icon={<Tag size={14} />}>
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

function OwnersSection({ owners = [] }: { owners?: VehicleHistoryOwner[] }) {
  const accents = [
    "bg-[#FC612D]/8 border-[#FC612D]/15 text-[#FC612D]",
    "bg-orange-50 border-orange-100 text-orange-600",
    "bg-amber-50 border-amber-100 text-amber-600",
    "bg-yellow-50 border-yellow-100 text-yellow-600",
  ];
  return (
    <Section
      title="Ownership History" icon={<Users size={14} />}
      right={<span className="text-[11px] font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">{owners.length} owner{owners.length !== 1 ? "s" : ""}</span>}
    >
      <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {owners.map((o, i) => (
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

function EventsTimeline({ events = [] }: { events?: VehicleHistoryEvent[] }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? events : events.slice(0, 8);
  return (
    <Section
      title="History Events" icon={<History size={14} />}
      right={<span className="text-[11px] font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">{events.length}</span>}
    >
      <div className="relative pl-5">
        <div className="absolute left-1.5 top-0 bottom-0 w-px bg-gray-100" />
        <div className="space-y-5">
          {shown.map((evt) => (
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
      {events.length > 8 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-5 w-full flex items-center justify-center gap-1.5 text-xs font-medium text-gray-400 hover:text-gray-700 py-2 rounded-xl hover:bg-gray-50 transition-colors"
        >
          {expanded
            ? <><ChevronUp size={13} /> Show less</>
            : <><ChevronDown size={13} /> Show all {events.length} events</>}
        </button>
      )}
    </Section>
  );
}

function AccidentsSection({ accidents = [] }: { accidents?: VehicleHistoryData["accidents"] }) {
  if (!accidents.length) {
    return (
      <Section title="Accident Records" icon={<AlertTriangle size={14} />}>
        <div className="flex items-center gap-2.5 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
          <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
          <span className="text-sm font-medium text-emerald-700">No accidents reported</span>
        </div>
      </Section>
    );
  }
  return (
    <Section
      title="Accident Records" icon={<AlertTriangle size={14} />}
      right={<span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-100">{accidents.length} found</span>}
    >
      <div className="space-y-2.5">
        {accidents.map((acc) => (
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

function MileageSection({ records = [] }: { records?: VehicleHistoryMileageRecord[] }) {
  const valid = records.filter((r) => r.mileage);
  const max = Math.max(...valid.map((r) => parseInt(r.mileage.replace(/,/g, "")) || 0), 1);
  return (
    <Section title="Mileage Records" icon={<Gauge size={14} />}>
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
                <div className="h-full rounded-full bg-gradient-to-r from-[#FC612D] to-[#FFCA42] transition-all duration-700" style={{ width: `${pct}%` }} />
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
      title="Safety Recalls" icon={<ShieldAlert size={14} />}
      right={recalls.length > 0
        ? <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">{recalls.length}</span>
        : undefined}
    >
      {recalls.length === 0 ? (
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
  if (!sales.length) return null;
  return (
    <Section title="Sales History" icon={<TrendingUp size={14} />}>
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
    <Section title="Vehicle Usage" icon={<Activity size={14} />}>
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
    <Section title="Specifications" icon={<BarChart3 size={14} />}>
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
    ["1st", tx?.first_gear_ratio], ["2nd", tx?.second_gear_ratio], ["3rd", tx?.third_gear_ratio],
    ["4th", tx?.fourth_gear_ratio], ["5th", tx?.fifth_gear_ratio], ["Reverse", tx?.reverse_gear_ratio],
    ["Final Drive", tx?.final_drive_axle_ratio],
  ].filter(([, v]) => v);
  if (!fields.length) return null;
  return (
    <Section title="Transmission" icon={<Car size={14} />}>
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

// ─── Full Report View ─────────────────────────────────────────────────────────

function FullReportView({ reportData }: { reportData: VehicleHistoryData }) {
  const flags = Object.values(reportData.titleBrands || {}).filter(
    (v) => v.toLowerCase().includes("records found") && !v.toLowerCase().startsWith("no")
  ).length;

  const statTiles = [
    { icon: <AlertTriangle size={15} />, value: reportData.accidents?.length || 0, label: "Accidents", accent: reportData.accidents?.length ? "text-red-500" : "text-gray-400" },
    { icon: <Users size={15} />, value: reportData.owners?.length || 0, label: "Owners", accent: "text-gray-400" },
    { icon: <ShieldAlert size={15} />, value: reportData.recalls?.length || 0, label: "Recalls", accent: reportData.recalls?.length ? "text-orange-400" : "text-gray-400" },
    { icon: <History size={15} />, value: reportData.events?.length || 0, label: "Events", accent: "text-[#FC612D]" },
    { icon: <Gauge size={15} />, value: reportData.mileageRecords?.length || 0, label: "Mileage Pts", accent: "text-gray-400" },
    { icon: <Tag size={15} />, value: flags, label: "Title Flags", accent: flags > 0 ? "text-red-500" : "text-emerald-500" },
  ];

  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {statTiles.map((s, i) => <StatTile key={i} {...s} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          {(reportData.accidents?.length || 0) > 0 && <AccidentsSection accidents={reportData.accidents} />}
          <OwnersSection owners={reportData.owners || []} />
          <EventsTimeline events={reportData.events || []} />
          {(reportData.salesHistory?.length || 0) > 0 && <SalesSection sales={reportData.salesHistory} />}
          <SpecsSection specifications={reportData.specifications || []} />
          <TransmissionSection tx={reportData.transmission} />
        </div>
        <div className="space-y-5">
          <TitleBrandsSection brands={reportData.titleBrands || {}} />
          <RecallsSection recalls={reportData.recalls || []} />
          {(reportData.mileageRecords?.length || 0) > 0 && <MileageSection records={reportData.mileageRecords} />}
          <UsageSection usage={reportData.usage || {}} />
        </div>
      </div>
    </>
  );
}

// ─── Search Bar ───────────────────────────────────────────────────────────────

function SearchBar({
  vin, setVin, onSubmit, isLoading,
}: { vin: string; setVin: (v: string) => void; onSubmit: (e: React.FormEvent) => void; isLoading: boolean }) {
  return (
    <form onSubmit={onSubmit} className="flex gap-2 w-full">
      <div className="relative flex-1">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          id="vin-search-input"
          type="text"
          value={vin}
          onChange={(e) => setVin(e.target.value.toUpperCase())}
          placeholder="Enter 17-character VIN"
          maxLength={17}
          className="w-full pl-9 pr-12 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#FC612D]/20 focus:border-[#FC612D]/50 transition-all"
        />
        <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold tabular-nums transition-colors pointer-events-none ${vin.length === 17 ? "text-[#FC612D]" : vin.length > 0 ? "text-gray-300" : "text-gray-200"}`}>
          {vin.length}/17
        </span>
      </div>
      <button
        id="vin-search-btn"
        type="submit"
        disabled={vin.length !== 17 || isLoading}
        className="px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0 flex items-center gap-2"
      >
        {isLoading ? <Loader2 size={14} className="animate-spin" /> : "Search"}
      </button>
    </form>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  const items = [
    { icon: <AlertTriangle size={14} className="text-red-400" />, label: "Accidents", desc: "Reported collision records" },
    { icon: <Tag size={14} className="text-[#FC612D]" />, label: "Title Brands", desc: "Salvage, flood, lemon flags" },
    { icon: <Users size={14} className="text-gray-400" />, label: "Ownership", desc: "Owner count & history" },
    { icon: <Gauge size={14} className="text-amber-400" />, label: "Mileage", desc: "Odometer rollback check" },
    { icon: <ShieldAlert size={14} className="text-orange-400" />, label: "Recalls", desc: "Open safety recall notices" },
    { icon: <TrendingUp size={14} className="text-emerald-400" />, label: "Sales", desc: "Past auction & dealer prices" },
  ];
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-16">
      <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center mb-5 shadow-lg">
        <Car size={22} className="text-white" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-1.5">Vehicle History Report</h2>
      <p className="text-gray-400 text-sm max-w-xs text-center mb-8 leading-relaxed">
        Enter a 17-character VIN above to retrieve a full vehicle history report.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-md w-full">
        {items.map(({ icon, label, desc }) => (
          <div key={label} className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="shrink-0 mt-0.5">{icon}</div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{label}</p>
              <p className="text-[11px] text-gray-400 leading-snug">{desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-1.5 text-xs text-gray-400">
        <ArrowRight size={11} /><span>Enter a VIN in the search bar above</span>
      </div>
    </div>
  );
}

// ─── Error State ──────────────────────────────────────────────────────────────

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
        <AlertTriangle size={18} className="text-red-400" />
      </div>
      <p className="text-base font-bold text-gray-900 mb-1">Something went wrong</p>
      <p className="text-sm text-gray-500 max-w-xs mb-5 leading-relaxed">{message}</p>
      <button
        onClick={onRetry}
        className="px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const VehicleHistory = () => {
  useDocumentTitle("Vehicle History");
  const [vin, setVin] = useState("");
  const [reportData, setReportData] = useState<VehicleHistoryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isLimited = !!reportData?.subscriptionRequired;

  const fetchStatus = useCallback(async () => {
    try { setSubscription(await getSubscriptionStatus()); } catch { /* silent */ }
  }, []);

  useEffect(() => { fetchStatus(); }, [fetchStatus]);

  const handleLookup = useCallback(async (v: string) => {
    const clean = v.trim().toUpperCase();
    if (!clean) return;
    setIsLoading(true);
    setError(null);
    try {
      setReportData(await fetchVehicleHistory(clean));
    } catch (err: any) {
      setError(err?.message || "Failed to fetch vehicle history. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handlePlanSelect = (plan: "standard" | "deluxe") => {
    const vinParam = reportData?.vin ? `&vin=${reportData.vin}` : "";
    navigate(`/register?plan=${plan}${vinParam}`);
  };

  useEffect(() => {
    const v = searchParams.get("vin");
    if (v) { setVin(v); if (v.length >= 17) handleLookup(v); }
  }, [searchParams, handleLookup]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = vin.trim().toUpperCase();
    if (clean.length === 17) {
      if (searchParams.get("vin") === clean) handleLookup(clean);
      else navigate(`/vehicle-history?vin=${clean}`);
    }
  };

  return (
    <div className="min-h-screen  w-full mx-auto pt-16">
      {/* Sticky search bar */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <Car size={14} className="text-[#FC612D]" />
            <span className="text-sm font-semibold text-gray-800 hidden sm:block">Vehicle History</span>
          </div>
          <div className="flex-1">
            <SearchBar vin={vin} setVin={setVin} onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <PageSkeleton />
      ) : error ? (
        <ErrorState message={error} onRetry={() => { setError(null); setReportData(null); }} />
      ) : reportData ? (
        <div className="max-w-[90rem] mx-auto px-5 py-6 space-y-5">
          <ReportHeader data={reportData} subscription={subscription} isLimited={isLimited} />
          {isLimited
            ? <LimitedView reportData={reportData} onSelect={handlePlanSelect} />
            : <FullReportView reportData={reportData} />}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default VehicleHistory;
