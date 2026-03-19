"use client";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Loader2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Car,
  MapPin,
  Calendar,
  Gauge,
  ShieldAlert,
  Users,
  History,
  Tag,
  Wrench,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  TrendingUp,
  Activity,
  Search,
  FileText,
  BarChart3,
} from "lucide-react";
import { fetchVehicleHistory } from "../../services/vinApi";
import type {
  VehicleHistoryData,
  VehicleHistoryEvent,
  VehicleHistoryOwner,
  VehicleHistoryMileageRecord,
} from "../../types/vin-decoder";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatKey(key: string) {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function getSourceIcon(sources: string[]) {
  const src = (sources[0] || "").toLowerCase();
  if (src.includes("insurance")) return <ShieldAlert size={14} />;
  if (src.includes("damage")) return <AlertTriangle size={14} />;
  if (src.includes("dealer")) return <Wrench size={14} />;
  return <FileText size={14} />;
}

function getSourceColor(sources: string[]) {
  const src = (sources[0] || "").toLowerCase();
  if (src.includes("damage") || src.includes("accident")) return "bg-red-100 text-red-700 border-red-200";
  if (src.includes("insurance")) return "bg-orange-100 text-orange-700 border-orange-200";
  if (src.includes("dealer")) return "bg-blue-100 text-blue-700 border-blue-200";
  return "bg-gray-100 text-gray-600 border-gray-200";
}

function getDotColor(sources: string[]) {
  const src = (sources[0] || "").toLowerCase();
  if (src.includes("damage") || src.includes("accident")) return "bg-red-500";
  if (src.includes("insurance")) return "bg-orange-400";
  if (src.includes("dealer")) return "bg-blue-500";
  return "bg-gray-400";
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  icon,
  value,
  label,
  accent,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  accent: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-2 hover:shadow-md transition-shadow duration-200">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${accent}`}>
        {icon}
      </div>
      <div className="text-2xl font-semibold text-gray-900 leading-none">{value}</div>
      <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</div>
    </div>
  );
}

function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
        <span className="text-gray-500">{icon}</span>
        <h2 className="font-semibold text-gray-900 text-sm tracking-wide uppercase">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

// ─── Title Brands Section ─────────────────────────────────────────────────────

function TitleBrandsSection({ brands }: { brands: Record<string, string> }) {
  const positive = Object.entries(brands).filter(([, v]) =>
    v.toLowerCase().includes("records found") && !v.toLowerCase().startsWith("no")
  );
  const negative = Object.entries(brands).filter(
    ([, v]) => v.toLowerCase().startsWith("no") || v.toLowerCase() === "no record found"
  );

  return (
    <SectionCard title="Title Brands" icon={<Tag size={16} />}>
      {positive.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-2">
            Flags Detected
          </p>
          <div className="space-y-2">
            {positive.map(([key]) => (
              <div
                key={key}
                className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100"
              >
                <XCircle size={16} className="text-red-500 shrink-0" />
                <span className="text-sm text-red-700 font-medium">{formatKey(key)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">
          Clean Records
        </p>
        <div className="space-y-1.5 mt-2">
          {negative.map(([key]) => (
            <div key={key} className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle2 size={14} className="text-green-400 shrink-0" />
              <span>{formatKey(key)}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

// ─── Owners Section ───────────────────────────────────────────────────────────

function OwnersSection({ owners }: { owners: VehicleHistoryOwner[] }) {
  const colors = [
    "bg-blue-50 border-blue-200 text-blue-700",
    "bg-violet-50 border-violet-200 text-violet-700",
    "bg-amber-50 border-amber-200 text-amber-700",
    "bg-emerald-50 border-emerald-200 text-emerald-700",
  ];

  return (
    <SectionCard title="Ownership History" icon={<Users size={16} />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {owners.map((owner, i) => (
          <div
            key={owner._id}
            className={`rounded-xl border p-4 ${colors[i % colors.length]}`}
          >
            <p className="font-bold text-sm mb-1">{owner.type}</p>
            <p className="text-xs opacity-80">Purchased: {owner.purchasedYear}</p>
            <p className="text-xs opacity-80">State: {owner.state}</p>
            <p className="text-xs opacity-80 mt-1">{owner.ownedDuration.trim()}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Timeline Section ─────────────────────────────────────────────────────────

function EventsTimeline({ events }: { events: VehicleHistoryEvent[] }) {
  const [expanded, setExpanded] = useState(false);
  const displayed = expanded ? events : events.slice(0, 8);

  return (
    <SectionCard title="History Events" icon={<History size={16} />}>
      <div className="relative pl-5">
        {/* Vertical line */}
        <div className="absolute left-1.5 top-2 bottom-2 w-px bg-gray-100" />

        <div className="space-y-5">
          {displayed.map((evt) => (
            <div key={evt._id} className="relative flex gap-4">
              {/* Dot */}
              <div
                className={`absolute -left-5 top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm ${getDotColor(
                  evt.source
                )}`}
              />

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-gray-400">{evt.date}</span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border font-medium ${getSourceColor(
                      evt.source
                    )}`}
                  >
                    {getSourceIcon(evt.source)}
                    {evt.source[0] || "—"}
                  </span>
                  {evt.odometer && (
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Gauge size={11} />
                      {evt.odometer} mi
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-500 flex items-center gap-1 mb-1.5">
                  <MapPin size={11} className="shrink-0" />
                  {evt.location}
                </p>

                <ul className="space-y-0.5">
                  {evt.details.map((d, di) => (
                    <li key={di} className="text-sm text-gray-700 leading-snug">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {events.length > 8 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-5 w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-800 py-2 rounded-xl hover:bg-gray-50 transition-colors"
        >
          {expanded ? (
            <>
              <ChevronUp size={16} /> Show less
            </>
          ) : (
            <>
              <ChevronDown size={16} /> Show all {events.length} events
            </>
          )}
        </button>
      )}
    </SectionCard>
  );
}

// ─── Accidents Section ────────────────────────────────────────────────────────

function AccidentsSection({ accidents }: { accidents: VehicleHistoryData["accidents"] }) {
  if (!accidents.length) {
    return (
      <SectionCard title="Accidents" icon={<AlertTriangle size={16} />}>
        <div className="flex items-center gap-3 text-green-600">
          <CheckCircle2 size={18} />
          <span className="text-sm font-medium">No accidents reported</span>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Accidents" icon={<AlertTriangle size={16} />}>
      <div className="space-y-3">
        {accidents.map((acc) => (
          <div
            key={acc._id}
            className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-100"
          >
            <div className="w-8 h-8 bg-red-500 rounded-xl flex items-center justify-center shrink-0">
              <AlertCircle size={16} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-red-800 text-sm">
                Accident #{acc.accidentNumber}
              </p>
              <p className="text-xs text-red-600 mt-0.5 flex items-center gap-1">
                <Calendar size={11} /> {acc.date}
              </p>
              <p className="text-xs text-red-600 flex items-center gap-1">
                <MapPin size={11} /> {acc.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Mileage Records ──────────────────────────────────────────────────────────

function MileageSection({ records }: { records: VehicleHistoryMileageRecord[] }) {
  const valid = records.filter((r) => r.mileage);
  return (
    <SectionCard title="Mileage Records" icon={<Gauge size={16} />}>
      <div className="space-y-3">
        {valid.map((rec, i) => {
          const pct =
            i === 0
              ? 8
              : Math.min(
                100,
                Math.round(
                  (parseInt(rec.mileage.replace(/,/g, "")) /
                    parseInt(
                      (valid[valid.length - 1]?.mileage || "100").replace(/,/g, "")
                    )) *
                  100
                )
              );
          return (
            <div key={i}>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span className="font-mono">{rec.date}</span>
                <span className="font-semibold text-gray-800">{rec.mileage} mi</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-violet-500 rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

// ─── Recalls Section ──────────────────────────────────────────────────────────

function RecallsSection({ recalls }: { recalls: VehicleHistoryData["recalls"] }) {
  return (
    <SectionCard title="Safety Recalls" icon={<ShieldAlert size={16} />}>
      {recalls.length === 0 ? (
        <div className="flex items-center gap-2 text-green-600 text-sm">
          <CheckCircle2 size={16} /> No recalls on file
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {recalls.map((r) => (
            <div key={r._id} className="py-3 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{r.component}</p>
                  <p className="text-xs text-gray-400 mt-0.5 font-mono">{r.recallNumber}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{r.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}

// ─── Sales History ────────────────────────────────────────────────────────────

function SalesSection({ sales }: { sales: VehicleHistoryData["salesHistory"] }) {
  if (!sales.length) return null;
  return (
    <SectionCard title="Sales History" icon={<TrendingUp size={16} />}>
      <div className="space-y-3">
        {sales.map((s) => (
          <div
            key={s._id}
            className="p-4 border border-gray-100 rounded-xl flex flex-col sm:flex-row gap-4 justify-between sm:items-center"
          >
            <div>
              <p className="font-semibold text-gray-900 text-sm">
                {s.sellerCity}, {s.sellerState}
              </p>
              {s.dealerName && (
                <p className="text-xs text-gray-400">{s.dealerName}</p>
              )}
              {s.date && (
                <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                  <Calendar size={11} /> {s.date}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">
                ${s.price.toLocaleString()}
              </p>
              {s.odometer && (
                <p className="text-xs text-gray-400 flex items-center gap-1 justify-end">
                  <Gauge size={11} /> {s.odometer} mi
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Usage Section ────────────────────────────────────────────────────────────

function UsageSection({ usage }: { usage: Record<string, string> }) {
  const found = Object.entries(usage).filter(
    ([, v]) => v.toLowerCase().includes("records found") && !v.toLowerCase().startsWith("no")
  );
  const clean = Object.entries(usage).filter(
    ([, v]) => v.toLowerCase().startsWith("no") || v === "no records found"
  );

  return (
    <SectionCard title="Vehicle Usage" icon={<Activity size={16} />}>
      {found.length > 0 && (
        <div className="mb-4 space-y-1">
          {found.map(([key]) => (
            <div key={key} className="flex items-center gap-2 text-sm text-orange-700">
              <AlertCircle size={14} className="shrink-0 text-orange-400" />
              {formatKey(key)}
            </div>
          ))}
        </div>
      )}
      <div className="space-y-1 mt-2">
        {clean.map(([key]) => (
          <div key={key} className="flex items-center gap-2 text-xs text-gray-400">
            <CheckCircle2 size={12} className="text-green-400 shrink-0" />
            <span>{formatKey(key)}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Specs Section ────────────────────────────────────────────────────────────

function SpecsSection({ specifications }: { specifications: Record<string, any>[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <SectionCard title="Specifications" icon={<BarChart3 size={16} />}>
      <div className="space-y-2">
        {specifications.map((group, gi) => {
          const [category, vals] = Object.entries(group)[0];
          const hasData = vals && Object.values(vals).some((v) => v !== "" && v !== null);
          if (!hasData) return null;

          return (
            <div key={gi} className="border border-gray-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === category ? null : category)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {formatKey(category)}
                {open === category ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>
              {open === category && (
                <div className="px-4 pb-4 grid grid-cols-2 gap-x-6 gap-y-1.5 border-t border-gray-100">
                  {Object.entries(vals).map(([k, v]) =>
                    v !== "" ? (
                      <div key={k}>
                        <p className="text-xs text-gray-400 uppercase tracking-wide mt-2">
                          {formatKey(k)}
                        </p>
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
    </SectionCard>
  );
}

// ─── Transmission Section ─────────────────────────────────────────────────────

function TransmissionSection({ tx }: { tx: VehicleHistoryData["transmission"] }) {
  const fields = [
    ["Type", tx.type],
    ["Description", tx.description],
    ["Speeds", tx.number_of_speeds],
    ["1st Gear", tx.first_gear_ratio],
    ["2nd Gear", tx.second_gear_ratio],
    ["3rd Gear", tx.third_gear_ratio],
    ["4th Gear", tx.fourth_gear_ratio],
    ["5th Gear", tx.fifth_gear_ratio],
    ["Reverse", tx.reverse_gear_ratio],
    ["Final Drive", tx.final_drive_axle_ratio],
  ].filter(([, v]) => v);

  return (
    <SectionCard title="Transmission" icon={<Car size={16} />}>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {fields.map(([label, val]) => (
          <div key={label} className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
            <p className="text-sm font-semibold text-gray-800 mt-0.5">{val}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Search Form (inline) ─────────────────────────────────────────────────────

function SearchBar({
  vin,
  setVin,
  onSubmit,
  isLoading,
}: {
  vin: string;
  setVin: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}) {
  return (
    <form onSubmit={onSubmit} className="flex gap-2 w-full">
      <div className="relative flex-1">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          id="vin-search-input"
          type="text"
          value={vin}
          onChange={(e) => setVin(e.target.value.toUpperCase())}
          placeholder="Enter 17-character VIN"
          maxLength={17}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
        />
      </div>
      <button
        id="vin-search-btn"
        type="submit"
        disabled={vin.length !== 17 || isLoading}
        className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        {isLoading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          "Search"
        )}
      </button>
    </form>
  );
}

// ─── Report Header ────────────────────────────────────────────────────────────

function VehicleReportHeader({ data }: { data: VehicleHistoryData }) {
  const flagCount = Object.values(data.titleBrands).filter(
    (v) => v.toLowerCase().includes("records found") && !v.toLowerCase().startsWith("no")
  ).length;

  return (
    <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 md:p-8 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-medium">
              <Car size={12} /> {data.vehicleDetails.body_type || "Vehicle"}
            </span>
            {flagCount > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/30 rounded-full text-xs font-medium text-red-200 border border-red-400/30">
                <AlertTriangle size={12} /> {flagCount} Flag{flagCount > 1 ? "s" : ""}
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">
            {data.vehicleName}
          </h1>
          <p className="text-gray-300 text-sm font-mono mb-4">VIN: {data.vin}</p>

          <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">
            {data.summary}
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-right shrink-0">
          {data.price.base_msrp && (
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Base MSRP</p>
              <p className="text-xl font-bold">${data.price.base_msrp}</p>
            </div>
          )}
          <p className="text-xs text-gray-500">
            Retrieved: {new Date(data.retrievedAt).toLocaleDateString()}
          </p>
          <p className="text-xs text-gray-500">{data.service}</p>
        </div>
      </div>
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

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleLookup = useCallback(async (vinNumber: string) => {
    const clean = vinNumber.trim().toUpperCase();
    if (!clean) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchVehicleHistory(clean);
      setReportData(data);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch vehicle history. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const vinParam = searchParams.get("vin");
    if (vinParam) {
      setVin(vinParam);
      if (vinParam.length >= 17) handleLookup(vinParam);
    }
  }, [searchParams, handleLookup]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = vin.trim().toUpperCase();
    if (clean.length === 17) {
      if (searchParams.get("vin") === clean) {
        handleLookup(clean);
      } else {
        navigate(`/vehicle-history?vin=${clean}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* ── Sub-header search bar (sticks below global navbar) ── */}
      <div className="mx-10  rounded-sm sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2 text-sm md:text-base font-semibold text-gray-800 shrink-0">
          <Car size={18} className="text-gray-600" />
          Vehicle History
        </div>
        <div className="w-full md:max-w-md lg:max-w-xl">
          <SearchBar
            vin={vin}
            setVin={setVin}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* ── Content ── */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
          <p className="text-gray-500 text-sm">Fetching vehicle history…</p>
        </div>
      ) : error ? (
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <AlertTriangle size={40} className="text-red-400 mx-auto mb-4" />
          <p className="text-red-600 font-medium mb-2">Something went wrong</p>
          <p className="text-sm text-gray-500">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setReportData(null);
            }}
            className="mt-6 px-4 py-2 bg-gray-900 text-white text-sm rounded-xl"
          >
            Try again
          </button>
        </div>
      ) : reportData ? (
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 space-y-6">
          {/* Report header */}
          <VehicleReportHeader data={reportData} />

          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <StatCard
              icon={<AlertTriangle size={16} className="text-red-600" />}
              value={reportData.accidents.length}
              label="Accidents"
              accent="bg-red-100"
            />
            <StatCard
              icon={<Users size={16} className="text-violet-600" />}
              value={reportData.owners.length}
              label="Owners"
              accent="bg-violet-100"
            />
            <StatCard
              icon={<ShieldAlert size={16} className="text-orange-600" />}
              value={reportData.recalls.length}
              label="Recalls"
              accent="bg-orange-100"
            />
            <StatCard
              icon={<History size={16} className="text-blue-600" />}
              value={reportData.events.length}
              label="Events"
              accent="bg-blue-100"
            />
            <StatCard
              icon={<Gauge size={16} className="text-emerald-600" />}
              value={reportData.mileageRecords.length}
              label="Mileage Records"
              accent="bg-emerald-100"
            />
            <StatCard
              icon={<Tag size={16} className="text-amber-600" />}
              value={
                Object.values(reportData.titleBrands).filter(
                  (v) =>
                    v.toLowerCase().includes("records found") &&
                    !v.toLowerCase().startsWith("no")
                ).length
              }
              label="Title Flags"
              accent="bg-amber-100"
            />
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: main column */}
            <div className="lg:col-span-2 space-y-6">
              {reportData.accidents.length > 0 && (
                <AccidentsSection accidents={reportData.accidents} />
              )}
              <OwnersSection owners={reportData.owners} />
              <EventsTimeline events={reportData.events} />
              {reportData.salesHistory.length > 0 && (
                <SalesSection sales={reportData.salesHistory} />
              )}
              <SpecsSection specifications={reportData.specifications} />
              <TransmissionSection tx={reportData.transmission} />
            </div>

            {/* Right: sidebar */}
            <div className="space-y-6">
              <TitleBrandsSection brands={reportData.titleBrands} />
              <RecallsSection recalls={reportData.recalls} />
              {reportData.mileageRecords.length > 0 && (
                <MileageSection records={reportData.mileageRecords} />
              )}
              <UsageSection usage={reportData.usage} />
            </div>
          </div>
        </div>
      ) : (
        /* Empty / hero state */
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center mb-6 shadow-xl">
            <Car size={28} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Vehicle History</h2>
          <p className="text-gray-500 text-sm max-w-sm mb-8">
            Enter a 17-character VIN above to get a full vehicle history report
            including accidents, owners, title brands, recall notices and more.
          </p>
          <div className="flex flex-wrap gap-3 justify-center text-xs text-gray-400">
            {["Accidents", "Title Brands", "Ownership", "Mileage", "Recalls", "Sales"].map(
              (label) => (
                <span
                  key={label}
                  className="px-3 py-1 rounded-full bg-white border border-gray-200"
                >
                  {label}
                </span>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleHistory;
