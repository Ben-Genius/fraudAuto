import React from 'react';
import { Check, Zap, Shield, Crown, ArrowRight, Loader2 } from 'lucide-react';

interface PlanSelectionProps {
  onSelect: (plan: 'standard' | 'deluxe') => void;
  isLoading?: boolean;
}

const FEATURES = [
  'Full Accident History',
  'Ownership History',
  'Title Brand Checks',
  'Safety Recall Alerts',
  'Odometer Fraud Detection',
  'Market Value Analysis',
  'Full Service History',
  'Auction Records & Photos',
];

export const PlanSelection: React.FC<PlanSelectionProps> = ({ onSelect, isLoading }) => {
  return (
    <div className="bg-white">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-1 mt-8">Pay As You Go</h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          No subscription. Buy credits and get full access — both plans include every feature.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Standard */}
        <div
          className="group relative border border-gray-100 rounded-xl p-5 hover:border-[#FC612D]/40 hover:shadow-md transition-all duration-200 cursor-pointer"
          onClick={() => !isLoading && onSelect('standard')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#FC612D]/8 flex items-center justify-center group-hover:bg-[#FC612D] transition-colors">
              <Zap size={16} className="text-[#FC612D] group-hover:text-white transition-colors" />
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Standard</p>
              <p className="text-xl font-black text-gray-900">₦5,000</p>
            </div>
          </div>

          <p className="text-sm font-semibold text-gray-800 mb-0.5">1 Report Credit</p>
          <p className="text-[11px] text-gray-400 mb-4">Run one full VIN report</p>

          <ul className="space-y-2 mb-5">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
                <Check size={11} className="text-[#FC612D] shrink-0" /> {f}
              </li>
            ))}
          </ul>

          <button
            disabled={isLoading}
            className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 group-hover:bg-[#FC612D] transition-colors disabled:opacity-50"
          >
            {isLoading ? <Loader2 size={14} className="animate-spin" /> : <>Get Standard <ArrowRight size={14} /></>}
          </button>
        </div>

        {/* Deluxe */}
        <div
          className="group relative border-2 border-[#FC612D]/30 rounded-xl p-5 bg-[#FC612D]/[0.03] hover:border-[#FC612D] hover:shadow-md transition-all duration-200 cursor-pointer"
          onClick={() => !isLoading && onSelect('deluxe')}
        >
          <div className="absolute top-0 right-0 bg-gradient-to-r from-[#FC612D] to-[#FF9340] text-white text-[9px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-widest">
            Best Value
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#FC612D] flex items-center justify-center">
              <Crown size={16} className="text-white" />
            </div>
            <div className="text-right">
              <p className="text-[10px] text-[#FC612D] uppercase tracking-widest font-semibold">Deluxe</p>
              <p className="text-xl font-black text-gray-900">₦10,000</p>
            </div>
          </div>

          <p className="text-sm font-semibold text-gray-800 mb-0.5">2 Report Credits</p>
          <p className="text-[11px] text-gray-400 mb-4">Run two full VIN reports</p>

          <ul className="space-y-2 mb-5">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
                <Check size={11} className="text-[#FC612D] shrink-0" /> {f}
              </li>
            ))}
          </ul>

          <button
            disabled={isLoading}
            className="w-full py-2.5 bg-gradient-to-r from-[#FC612D] to-[#FF9340] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 shadow-sm shadow-[#FC612D]/20"
          >
            {isLoading ? <Loader2 size={14} className="animate-spin" /> : <>Get Deluxe <ArrowRight size={14} /></>}
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-4">
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
          <Shield size={11} className="text-emerald-500" /> Secure Payment
        </div>
        <div className="w-px h-3 bg-gray-200" />
        <p className="text-[11px] text-gray-400">
          Processed by <span className="font-semibold text-gray-600">Paystack</span>
        </p>
      </div>
    </div>
  );
};
