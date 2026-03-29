"use client";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Loader2, AlertTriangle, CheckCircle2, Car,
  Gauge, ShieldAlert, Users, History, Tag,
  Search, Lock, ArrowRight,
  Info, TrendingUp, FlaskConical,
} from "lucide-react";
import {
  fetchVehicleHistory, getSubscriptionStatus,
  type SubscriptionStatus,
} from "../../services/vinApi";
import type { VehicleHistoryData } from "../../types/vin-decoder";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { PlanSelection } from "../../components/vin-decoder/PlanSelection";
import { FullReportView } from "../../components/vin-decoder/FullReportView";

// ─── Demo Fixture Data ────────────────────────────────────────────────────────

const DEMO_DATA: VehicleHistoryData = {
  vehicleName: "2003 Pontiac Vibe",
  vin: "5Y2SL62813Z471208",
  year: "2003",
  make: "Pontiac",
  vehicleModel: "Vibe",
  service: "vin-full-report",
  retrievedAt: "2026-03-29T16:14:28.156Z",
  summary:
    "The 2003 Pontiac Vibe Base is a compact car that comes with a 1.8L I-4 123HP engine and a 4-speed automatic transmission. It has AWD, 4-wheel ABS, air conditioning, power mirrors and 16\" steel wheels.",
  vehicleDetails: { body_type: "Hatchback", rear_door_type: "", doors: "4" } as any,
  price: { base_msrp: "19,785" },
  accidents: [
    { _id: "acc1", accidentNumber: 1, date: "04/20/2012", location: "OH" },
  ],
  owners: [
    { _id: "own1", type: "Owner 1", purchasedYear: 2003, state: "TX", ownedDuration: "4 year(s) 5 month(s)" },
    { _id: "own2", type: "Owner 2", purchasedYear: 2007, state: "OH", ownedDuration: "18 year(s) 3 month(s)" },
  ],
  recalls: [
    { _id: "rec1", date: "01/27/2015", recallNumber: "15V043 / N140877", component: "Safety" },
    { _id: "rec2", date: "02/21/2024", recallNumber: "15V286 / N242437060", component: "Safety" },
  ],
  mileageRecords: [
    { date: "07/09/2003", mileage: "1,670", status: "records found", other: "success" } as any,
    { date: "10/02/2004", mileage: "35,140", status: "records found", other: "success" } as any,
    { date: "09/09/2006", mileage: "68,431", status: "records found", other: "success" } as any,
    { date: "09/29/2007", mileage: "86,375", status: "records found", other: "success" } as any,
    { date: "12/01/2007", mileage: "90,057", status: "records found", other: "success" } as any,
    { date: "04/11/2012", mileage: "119,587", status: "records found", other: "success" } as any,
    { date: "04/13/2012", mileage: "119,587", status: "records found", other: "danger" } as any,
  ],
  events: [
    { _id: "e1", date: "07/09/2003", location: "AMES, IA", source: ["Federal Motor Vehicle Records"], odometer: "1,670", details: ["Title"] },
    { _id: "e2", date: "10/02/2004", location: "LEAGUE CITY, TX", source: ["Independent Emission Source"], odometer: "35,140", details: ["Passed Emission Inspection"] },
    { _id: "e3", date: "11/03/2004", location: "LEAGUE CITY, TX", source: ["Federal Motor Vehicle Records"], odometer: "35,140", details: ["Title(Lien Reported)"] },
    { _id: "e4", date: "09/09/2006", location: "LEAGUE CITY, TX", source: ["Independent Emission Source"], odometer: "68,431", details: ["Passed Emission Inspection"] },
    { _id: "e5", date: "09/29/2007", location: "LEAGUE CITY, TX", source: ["State Agency"], odometer: "86,375", details: ["Passed Emission Inspection", "Passed Safety Inspection"] },
    { _id: "e6", date: "12/01/2007", location: "HILLIARD, OH", source: ["Federal Motor Vehicle Records"], odometer: "90,057", details: ["Title"] },
    { _id: "e7", date: "04/02/2012", location: "NORWICH, OH", source: ["State Agency"], odometer: null, details: ["Front Impact with Another Vehicle(Case #:20128038939)", "Severe Damage Reported", "Vehicle Damage Reported as Disabling", "Vehicle Was Towed", "Accident Reported(Report #:102425)"] },
    { _id: "e8", date: "04/11/2012", location: "OH", source: ["Auto Auction"], odometer: "119,587", details: ["Reported at Auto Auction"] },
    { _id: "e9", date: "04/13/2012", location: "COLUMBUS, OH", source: ["Federal Motor Vehicle Records"], odometer: "119,587", details: ["Title", "Salvage", "Damaged"] },
    { _id: "e10", date: "04/20/2012", location: "OH", source: ["Auto Auction"], odometer: null, details: ["Auction Announced as Salvage, Extent of Damage Unknown"] },
    { _id: "e11", date: "06/13/2012", location: "", source: ["Independent Source"], odometer: null, details: ["Vehicle Exported TO GHANA"] },
    { _id: "e12", date: "01/27/2015", location: "", source: ["Manufacturer"], odometer: null, details: ["Manufacturer Recall — NHTSA Recall 15V043 / Mfr. Recall N140877", "Safety: SUPPLEMENTAL RESTRAINT SYSTEM AIR BAG CONTROL MODULE", "Status: Remedy Available"] },
    { _id: "e13", date: "02/21/2024", location: "", source: ["Manufacturer"], odometer: null, details: ["Manufacturer Recall — NHTSA Recall 15V286 / Mfr. Recall N242437060", "Safety: DO NOT DRIVE – FRONT PASSENGER AIR BAG INFLATOR MODULE", "Status: Remedy Available"] },
  ],
  salesHistory: [],
  titleBrands: {
    "No fire brand": "no records found",
    "No hail brand": "no records found",
    "No flood brand": "no records found",
    "No junk or scrapped brand": "no records found",
    "No manufacturer buyback": "no records found",
    "No lemon brand": "no records found",
    "Salvage brand": "records found",
    "No rebuilt or rebuildable brand": "no records found",
    "No odometer brand (EML or NAM)": "no records found",
    "No insurance loss record": "no records found",
    "No titled to an insurance company record": "no records found",
    "No auction lemon/manufacturer buyback record": "no records found",
    "No abandoned title record": "no records found",
    "No grey market title record": "no records found",
    "Loan/lien record": "records found",
    "No repossessed record": "no records found",
    "No corrected title record": "no records found",
    "No duplicate title record": "no records found",
    "No theft record": "no records found",
    "Auction brand": "no record found",
    "No non-title fire damaged record": "no records found",
    "No non-title hail damaged record": "no records found",
    "No non-title flood damaged record": "no records found",
    "No auction junk or scrapped record": "no records found",
    "No auction rebuilt or rebuildable record": "no records found",
    "Salvage auction record": "records found",
    "Damaged or major damage incident record": "records found",
    "No structural damage or structural alteration record": "no records found",
    "No recycling facility record": "no records found",
    "No crash test record": "no records found",
  },
  usage: {
    "Used Personally": "records found",
    "Fleet vehicle": "no records found",
    "Used as a Rental": "no records found",
    "Lease records": "no records found",
    "Taxi": "no records found",
    "Livery": "no records found",
    "Police Use": "no records found",
    "Government Use": "no records found",
    "Drivers Ed": "no records found",
    "Used Commercially": "no records found",
  },
  transmission: {
    type: "Automatic",
    code: "MX0",
    number_of_speeds: "4",
    description: "4 speed automatic",
    power_takeoff: "",
    first_gear_ratio: "2.92",
    second_gear_ratio: "1.56",
    third_gear_ratio: "1",
    fourth_gear_ratio: "0.7",
    fifth_gear_ratio: "",
    reverse_gear_ratio: "2.38",
    final_drive_axle_ratio: "4.16",
    transfer_case_gear_ratio_high: "",
    transfer_case_gear_ratio_low: "",
    transfer_case_model: "",
    transfer_case_power_takeoff: "",
  } as any,
  specifications: [
    { steering: { type: "Pwr Rack & Pinion", overall_ratio: "19.5", turns_to_turns_ratio: "3.4" } },
    { braking: { type: "Pwr", primary_abs_system: "4-Wheel", front_disc: "Yes", rear_drum: "Yes" } },
    { suspensions: { front_type: "Independent", rear_type: "Double Wishbone" } },
    { seating: { number_of_seats: "5", max_seating_capacity: "5" } },
    { tires: { front_tire_size: "205/55R16", rear_tire_size: "205/55R16", type: "All-season", front_tire_pressure_psi: "35", rear_tire_pressure_psi: "32" } },
    { engine: { type: "Gas L4", code: "LV6", cylinders_configuration: "I-4", displacement: 1800, drivetype: "AWD", valves: "16", engine_location: "Front" } },
    { fuel: { type: "Gasoline", grade: "Regular Unleaded" } },
    { mpg: { epa_city_economy: "26", epa_hwy_economy: "31", epa_combined_economy: "28" } },
  ],
} as any;

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
            {!isLimited && subscription?.status === "ACTIVE" && subscription.plan && (
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
      <div className="blur-[3px] opacity-60">
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white" />
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
  onSelect,
}: { reportData: VehicleHistoryData; onSelect: (p: "standard" | "deluxe") => void }) {
  const features = [
    "Complete Timeline of Events", "Accident & Damage Records", "Odometer Rollback Check",
    "Theft & Salvage Records", "Open Safety Recalls", "Title Brand History",
    "Full Ownership History", "Technical Specifications",
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <GatedPreview />
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
          <PlanSelection onSelect={onSelect} />
        </Card>
      </div>
      <p className="text-[11px] text-gray-400 text-center max-w-lg mx-auto leading-relaxed pb-4">
        FraudWall Auto reports are compiled from various data sources. While we aim for precision, we cannot
        guarantee absolute accuracy. Use this report as a guide in your vehicle purchase decision.
      </p>
    </div>
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

  const loadDemoData = () => {
    setVin(DEMO_DATA.vin);
    setError(null);
    setReportData(DEMO_DATA);
  };

  return (
    <div className="min-h-screen w-full mx-auto pt-16">
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
          {/* DEV: Load demo button */}
          <button
            id="load-demo-btn"
            onClick={loadDemoData}
            title="Load hardcoded demo data"
            className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-amber-300 bg-amber-50 text-amber-700 text-xs font-semibold hover:bg-amber-100 transition-all"
          >
            <FlaskConical size={13} />
            <span className="hidden sm:inline">Demo</span>
          </button>
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
