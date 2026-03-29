// Shared layout + sidebar for all dashboard sub-pages
import { useEffect, useRef, useState } from "react";
import { Outlet, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import {
  LogOut, Plus, X, Menu, LayoutDashboard, Car, CheckCheck, Shield,
  Crown, ArrowRight, CheckCircle2, Loader2, Zap,
} from "lucide-react";
import { Logo } from "../../components/ui/logo";
import {
  getStoredUser, logout, initiateSubscription, refreshUserCredits,
  getSubscriptionStatus, type UserData, type SubscriptionStatus,
} from "../../services/vinApi";

// ─── Types exported for sub-pages ─────────────────────────────────────────────

export type { UserData, SubscriptionStatus };

// ─── Shared context helpers ────────────────────────────────────────────────────

export const VIN_HISTORY_KEY = "fw_vin_history";
export const MAX_VIN_HISTORY = 5;

export function getVinHistory(): { vin: string; vehicleName: string }[] {
  try { return JSON.parse(localStorage.getItem(VIN_HISTORY_KEY) || "[]"); }
  catch { return []; }
}

export function saveVinHistory(vin: string, vehicleName: string) {
  const prev = getVinHistory().filter((h) => h.vin !== vin);
  localStorage.setItem(VIN_HISTORY_KEY, JSON.stringify([{ vin, vehicleName }, ...prev].slice(0, MAX_VIN_HISTORY)));
}

// ─── Plan features ──────────────────────────────────────────────────────────────

export const PLAN_FEATURES = [
  "Full Accident History", "Ownership History", "Title Brand Checks",
  "Safety Recall Alerts", "Odometer Fraud Detection", "Market Value Analysis",
  "Full Service History", "Auction Records & Photos",
];

// ─── PlanCards — used in layout modal + vin-lookup paywall ────────────────────

export function PlanCards({ onBuy, isLoading }: { onBuy: (p: "standard" | "deluxe") => void; isLoading: boolean }) {
  const [selected, setSelected] = useState<"standard" | "deluxe" | null>(null);

  const handleSelect = (plan: "standard" | "deluxe") => {
    if (isLoading) return;
    setSelected(plan);
    onBuy(plan);
  };

  if (isLoading && selected) {
    return (
      <div className="flex flex-col items-center py-10 gap-3 text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#FC612D]/8 flex items-center justify-center">
          <Loader2 size={20} className="text-[#FC612D] animate-spin" />
        </div>
        <p className="text-sm font-semibold text-gray-900">Redirecting to Paystack…</p>
        <p className="text-xs text-gray-400">Opening secure checkout for <span className="font-semibold capitalize">{selected}</span> plan</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="bg-gray-50 rounded-xl p-4">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Everything included in both plans</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {PLAN_FEATURES.map((f) => (
            <div key={f} className="flex items-center gap-2 text-xs text-gray-600">
              <CheckCircle2 size={11} className="text-[#FC612D] shrink-0" /> {f}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
          <button disabled={isLoading}
            className="w-full py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 group-hover:bg-gray-900 group-hover:text-white group-hover:border-gray-900 transition-all disabled:opacity-50">
            Choose Standard <ArrowRight size={13} />
          </button>
        </div>

        {/* Deluxe */}
        <div
          onClick={() => handleSelect("deluxe")}
          className="group relative border-2 border-[#FC612D] rounded-2xl p-5 flex flex-col gap-4 cursor-pointer bg-white hover:bg-[#FC612D]/[0.02] transition-colors"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="bg-[#FC612D] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest">Best Value</span>
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
          <button disabled={isLoading}
            className="w-full py-2.5 bg-[#FC612D] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50">
            Choose Deluxe <ArrowRight size={13} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
        <Shield size={11} className="text-emerald-500" /> 100% secure · Powered by Paystack
      </div>
    </div>
  );
}

// ─── Buy Credits Modal ─────────────────────────────────────────────────────────

export function BuyCreditsModal({ onClose, onBuy, isLoading }: {
  onClose: () => void;
  onBuy: (p: "standard" | "deluxe") => void;
  isLoading: boolean;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full sm:max-w-xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900">Get Report Credits</h2>
            <p className="text-xs text-gray-400 mt-0.5">Pay as you go — no subscription required</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
            <X size={14} />
          </button>
        </div>
        <div className="px-6 pt-5 pb-6 max-h-[85vh] overflow-y-auto">
          <PlanCards onBuy={onBuy} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

// ─── Success Banner ────────────────────────────────────────────────────────────

export function SuccessBanner({ credits, onDismiss }: { credits: number; onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 6000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-4">
      <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
        <CheckCheck size={16} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-emerald-800">Payment confirmed!</p>
        <p className="text-xs text-emerald-600 mt-0.5">
          Credits added. You now have <span className="font-bold">{credits} credit{credits !== 1 ? "s" : ""}</span> available.
        </p>
      </div>
      <button onClick={onDismiss} className="shrink-0 p-1 rounded-lg text-emerald-500 hover:bg-emerald-100 transition-colors">
        <X size={14} />
      </button>
    </div>
  );
}

// ─── Sidebar ───────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { to: "/dashboard", label: "Overview", icon: <LayoutDashboard size={15} />, end: true },
  { to: "/dashboard/vin-lookup", label: "VIN Lookup", icon: <Car size={15} />, end: false },
];

function Sidebar({ user, credits, subscription, onLogout, onTopUp, open, onClose }: {
  user: UserData; credits: number; subscription: SubscriptionStatus | null; onLogout: () => void; onTopUp: () => void; open: boolean; onClose: () => void;
}) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={onClose} />}

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
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              {item.icon} {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Plan status */}
        <div className="px-3 mb-2">
          <div className="px-4 py-2.5 rounded-xl border border-gray-100 bg-white shadow-sm flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              subscription?.plan === "deluxe" ? "bg-amber-100 text-amber-600" :
              subscription?.plan === "standard" ? "bg-emerald-100 text-emerald-600" :
              "bg-gray-100 text-gray-400"
            }`}>
              {subscription?.plan === "deluxe" ? <Crown size={14} /> :
               subscription?.plan === "standard" ? <Zap size={14} /> :
               <Shield size={14} />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Current Plan</p>
                {subscription?.status === "PENDING" && (
                  <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md uppercase tracking-tighter">Pending</span>
                )}
              </div>
              <p className="text-xs font-bold text-gray-900 truncate">
                {subscription?.plan ? (subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1) + " Plan") : "Free/Inactive"}
              </p>
            </div>
          </div>
        </div>

        {/* Credits widget */}
        <div className="px-3 mb-3">
          <div className="px-4 py-3 rounded-xl border border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">Report Credits</p>
              <span className={`text-xs font-bold ${credits > 0 ? "text-emerald-600" : "text-red-400"}`}>{credits}</span>
            </div>
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-[#FC612D] rounded-full transition-all" style={{ width: credits > 0 ? "100%" : "0%" }} />
            </div>
            <p className="text-[10px] text-gray-400 mb-2.5">
              {credits > 0 ? `${credits} report${credits !== 1 ? "s" : ""} available` : "No credits — purchase to run reports"}
            </p>
            <button
              onClick={() => { onClose(); onTopUp(); }}
              className="w-full flex items-center justify-center gap-1.5 py-2 bg-[#FC612D] text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              <Plus size={11} /> Top Up Credits
            </button>
          </div>
        </div>

        {/* User + logout */}
        <div className="border-t border-gray-100 px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#FC612D]/10 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-[#FC612D]">{user.firstName.charAt(0)}{user.lastName.charAt(0)}</span>
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

// ─── DashboardLayout ───────────────────────────────────────────────────────────

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const didRefreshRef = useRef(false);

  const [user, setUser] = useState<UserData | null>(null);
  const [credits, setCredits] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [successBanner, setSuccessBanner] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);

  useEffect(() => {
    const stored = getStoredUser();
    if (!stored) { navigate("/login"); return; }
    setUser(stored);
    setCredits(stored.availableReportCredits ?? 0);

    // Handle Paystack return
    const paymentStatus = searchParams.get("payment");
    const reference = searchParams.get("reference");
    if (paymentStatus === "success" && reference && !didRefreshRef.current) {
      didRefreshRef.current = true;
      refreshUserCredits().then((newCredits) => {
        setCredits(newCredits);
        // refreshUserCredits handles the UserData credit field (availableReportCredits)
        setUser((prev) => prev ? { ...prev, availableReportCredits: newCredits } : prev);
        setSuccessBanner(true);
        setSearchParams({}, { replace: true });
        // Also refresh the overall subscription status to get availableCredits
        getSubscriptionStatus().then(setSubscription);
      });
    }

    // Always fetch subscription status on mount
    getSubscriptionStatus().then((s) => {
      setSubscription(s);
      // Use availableCredits from the formal status endpoint
      if (s.availableCredits !== undefined) {
        setCredits(s.availableCredits);
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogout = () => { logout(); navigate("/login"); };
  const handleTopUp = () => setShowModal(true);

  const handleBuyCredits = async (plan: "standard" | "deluxe") => {
    setPaymentLoading(true);
    setPaymentError(null);
    try {
      const { authorizationUrl } = await initiateSubscription(plan);
      window.location.href = authorizationUrl;
    } catch (err: any) {
      setPaymentError(err?.message || "Failed to initiate payment. Please try again.");
      setPaymentLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        user={user}
        credits={credits}
        subscription={subscription}
        onLogout={handleLogout}
        onTopUp={handleTopUp}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {showModal && (
        <BuyCreditsModal
          onClose={() => { setShowModal(false); setPaymentError(null); }}
          onBuy={handleBuyCredits}
          isLoading={paymentLoading}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 shrink-0 px-5 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-900 p-1.5 rounded-lg hover:bg-gray-100 transition-colors shrink-0">
            <Menu size={18} />
          </button>
          <div className="flex-1" />
          {/* Credit chip in header on mobile */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${credits > 0 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
              <Zap size={11} /> {credits} credit{credits !== 1 ? "s" : ""}
            </div>
            <button onClick={handleTopUp}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#FC612D] text-white text-xs font-semibold rounded-xl">
              <Plus size={11} /> Top Up
            </button>
          </div>
        </header>

        {/* Page content via Outlet */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-5 py-6 space-y-5">
            {successBanner && (
              <SuccessBanner credits={credits} onDismiss={() => setSuccessBanner(false)} />
            )}
            {paymentError && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl px-5 py-4">
                <p className="text-sm text-red-700 flex-1">{paymentError}</p>
                <button onClick={() => setPaymentError(null)} className="text-red-400 hover:text-red-600">
                  <X size={14} />
                </button>
              </div>
            )}
            {/* Sub-page rendered here */}
            <Outlet context={{ user, credits, setCredits, handleTopUp, handleBuyCredits, paymentLoading, subscription }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
