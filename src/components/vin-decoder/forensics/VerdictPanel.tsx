import { ShieldAlert, ShieldCheck } from "lucide-react";
import type { RecallData } from "../../../types/vin-decoder";

interface VerdictPanelProps {
    recalls: RecallData[];
}

export const VerdictPanel = ({ recalls }: VerdictPanelProps) => {
    const hasRecalls = recalls.length > 0;
    const statusColor = hasRecalls ? "text-orange-500" : "text-emerald-400";
    const borderColor = hasRecalls ? "border-orange-500/50" : "border-emerald-500/50";
    const bgGradient = hasRecalls
        ? "from-orange-500/10 via-orange-500/5 to-transparent"
        : "from-emerald-500/10 via-emerald-500/5 to-transparent";

    return (
        <div className={`h-full relative overflow-hidden bg-white border rounded-3xl p-6 shadow-sm transition-all group hover:shadow-md ${hasRecalls ? 'border-red-100 bg-red-50/30' : 'border-emerald-100 bg-emerald-50/30'}`}>
            <div className="flex flex-col h-full justify-between gap-4">
                <div className="flex justify-between items-start">
                    <div className={`p-3 rounded-2xl ${hasRecalls ? 'bg-red-100 text-primary-red' : 'bg-emerald-100 text-emerald-600'}`}>
                        {hasRecalls ? (
                            <ShieldAlert className="w-8 h-8" />
                        ) : (
                            <ShieldCheck className="w-8 h-8" />
                        )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${hasRecalls ? 'bg-red-500 text-white shadow-red-200 shadow-lg' : 'bg-emerald-500 text-white shadow-emerald-200 shadow-lg'}`}>
                        {hasRecalls ? "Action Required" : "Pass"}
                    </span>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                        {hasRecalls ? "Safety Issues Found" : "Safety Check Passed"}
                    </h2>

                    <p className="text-gray-500 text-sm leading-relaxed">
                        {hasRecalls
                            ? `${recalls.length} active recalls detected.`
                            : "No active recalls found."}
                    </p>
                </div>
            </div>
        </div>
    );
};
