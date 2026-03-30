// /dashboard — Account overview page
import { useOutletContext, useNavigate } from "react-router-dom";
import {
  Car, Clock, Zap, CreditCard, BadgeCheck, CalendarDays, UserCircle2,
  ArrowRight, ShieldCheck, FileSearch,
} from "lucide-react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { getVinHistory, PlanCards, type UserData, type SubscriptionStatus } from "./DashboardLayout";

type OutletCtx = {
  user: UserData;
  credits: number;
  handleTopUp: () => void;
  handleBuyCredits: (p: "standard" | "deluxe") => void;
  paymentLoading: boolean;
  subscription: SubscriptionStatus | null;
};

function StatCard({ label, value, sub, ok }: { label: string; value: string; sub: string; ok: boolean }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4">
      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide mb-1">{label}</p>
      <p className="text-sm font-bold text-gray-900 truncate">{value}</p>
      <p className={`text-[11px] mt-0.5 ${ok ? "text-emerald-500" : "text-orange-400"}`}>{sub}</p>
    </div>
  );
}

const DashboardHome = () => {
  useDocumentTitle("Dashboard");
  const navigate = useNavigate();
  const { user, credits, handleBuyCredits, paymentLoading, subscription } = useOutletContext<OutletCtx>();
  const vinHistory = getVinHistory();

  const statCards = [
    {
      label: "Report Credits",
      value: credits.toString(),
      sub: subscription?.plan 
        ? `${subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan ${subscription.status === "PENDING" ? "(Pending)" : "active"}`
        : (credits > 0 ? `${credits} available` : "None — buy to unlock reports"),
      ok: credits > 0,
      icon: <CreditCard size={18} />,
      accent: credits > 0 ? "text-emerald-500 bg-emerald-50" : "text-red-400 bg-red-50",
    },
    {
      label: "Email",
      value: user.isEmailVerified ? "Verified" : "Not verified",
      sub: user.email,
      ok: user.isEmailVerified,
      icon: <BadgeCheck size={18} />,
      accent: user.isEmailVerified ? "text-emerald-500 bg-emerald-50" : "text-orange-400 bg-orange-50",
    },
    {
      label: "Member Since",
      value: new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      sub: "Account created",
      ok: true,
      icon: <CalendarDays size={18} />,
      accent: "text-sky-500 bg-sky-50",
    },
    {
      label: "Account Role",
      value: user.role.charAt(0).toUpperCase() + user.role.slice(1),
      sub: "Access level",
      ok: true,
      icon: <UserCircle2 size={18} />,
      accent: "text-violet-500 bg-violet-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.firstName} 👋</h1>
        <p className="text-sm text-gray-400 mt-1">
          {credits > 0
            ? `You have ${credits} credit${credits !== 1 ? "s" : ""} ready to use. Head to VIN Lookup to run a report.`
            : "Purchase credits to start running vehicle history reports."}
        </p>
      </div>

      {/* Quick action: go to VIN Lookup */}
      <div
        onClick={() => navigate("/dashboard/vin-lookup")}
        className="group relative bg-gray-900 rounded-2xl p-6 cursor-pointer hover:bg-[#FC612D] transition-colors overflow-hidden"
      >
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-opacity">
          <Car size={80} />
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FileSearch size={14} className="text-[#FC612D] group-hover:text-white transition-colors" />
              <span className="text-xs font-semibold text-[#FC612D] group-hover:text-white transition-colors uppercase tracking-widest">VIN Lookup</span>
            </div>
            <p className="text-lg font-bold text-white">Run a Vehicle History Check</p>
            <p className="text-xs text-gray-400 group-hover:text-white/70 mt-0.5 transition-colors">
              Full report: accidents, owners, recalls, title, mileage & more
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-white/10 text-white text-sm font-semibold rounded-xl group-hover:bg-white group-hover:text-gray-900 transition-all">
            Search <ArrowRight size={14} />
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statCards.map((c) => (
          <div key={c.label} className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-3 ${c.accent}`}>
              {c.icon}
            </div>
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">{c.label}</p>
            <p className="text-sm font-bold text-gray-900 truncate">{c.value}</p>
            <p className="text-[11px] text-gray-400 mt-0.5 truncate">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent VIN searches */}
      {vinHistory.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock size={13} className="text-gray-400" />
              <p className="text-sm font-bold text-gray-700">Recent Searches</p>
            </div>
            <button
              onClick={() => navigate("/dashboard/vin-lookup")}
              className="text-xs text-[#FC612D] font-semibold hover:underline flex items-center gap-1"
            >
              New Search <ArrowRight size={11} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {vinHistory.map((h) => (
              <button
                key={h.vin}
                onClick={() => navigate(`/dashboard/vin-lookup?vin=${h.vin}`)}
                className="flex items-center gap-3 p-3.5 bg-white rounded-xl border border-gray-100 hover:border-[#FC612D]/40 hover:bg-[#FC612D]/[0.02] transition-all text-left group"
              >
                <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-[#FC612D]/10 transition-colors">
                  <Car size={14} className="text-gray-400 group-hover:text-[#FC612D] transition-colors" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{h.vehicleName || h.vin}</p>
                  <p className="text-[11px] font-mono text-gray-400">{h.vin}</p>
                </div>
                <ArrowRight size={12} className="text-gray-300 group-hover:text-[#FC612D] shrink-0 ml-auto transition-colors" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* What's included section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck size={15} className="text-[#FC612D]" />
          <p className="text-sm font-bold text-gray-900">What's included in every report</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { icon: "🚗", label: "Accident History" },
            { icon: "👥", label: "Ownership Records" },
            { icon: "🏷️", label: "Title Brand Checks" },
            { icon: "⚠️", label: "Safety Recalls" },
            { icon: "📍", label: "Odometer Checks" },
            { icon: "💰", label: "Market Value" },
            { icon: "🔧", label: "Service History" },
            { icon: "📸", label: "Auction Photos" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
              <span className="text-lg leading-none">{item.icon}</span>
              <span className="text-xs font-medium text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Purchase plan if no credits */}
        {credits === 0 && (
          <div className="border-t border-gray-100 pt-5">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={13} className="text-[#FC612D]" />
              <p className="text-sm font-bold text-gray-900">Get started — choose a plan</p>
            </div>
            <PlanCards onBuy={handleBuyCredits} isLoading={paymentLoading} />
          </div>
        )}

        {/* CTA when has credits */}
        {credits > 0 && (
          <button
            onClick={() => navigate("/dashboard/vin-lookup")}
            className="w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-[#FC612D] transition-colors flex items-center justify-center gap-2"
          >
            Run a VIN Lookup Now <ArrowRight size={14} />
          </button>
        )}
      </div>

      {/* Invisible stat cards for backwards compat */}
      <div className="sr-only">
        <StatCard label="" value="" sub="" ok={true} />
      </div>
    </div>
  );
};

export default DashboardHome;
