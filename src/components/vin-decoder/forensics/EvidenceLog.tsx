import { Calendar, FileWarning, Hash } from "lucide-react";
import type { RecallData } from "../../../types/vin-decoder";

interface EvidenceLogProps {
    recalls: RecallData[];
}

export const EvidenceLog = ({ recalls }: EvidenceLogProps) => {
    if (recalls.length === 0) return null;

    return (
    
        <div className="h-full bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-50 rounded-lg text-primary-red">
                        <FileWarning className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 leading-none">
                        Safety Recalls
                    </h3>
                </div>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                    {recalls.length}
                </span>
            </div>

            <div className="divide-y divide-gray-100 overflow-y-auto max-h-[500px]">
                {recalls.map((recall, idx) => (
                    <div key={idx} className="p-6 hover:bg-gray-50 transition-colors group">
                        <div className="flex flex-col gap-3">
                            {/* Meta & Status */}
                            <div className="flex items-center justify-between">
                                <span className="inline-block px-2 py-1 text-[10px] uppercase font-bold tracking-wider text-white bg-primary-red rounded shadow-sm shadow-red-200">
                                    Active
                                </span>
                                <div className="flex items-center gap-2 text-gray-500 text-xs">
                                    <Calendar className="w-3 h-3" />
                                    {recall.date}
                                </div>
                            </div>

                            {/* Content */}
                            <div>
                                <h4 className="text-gray-900 font-bold text-sm mb-1 leading-tight">
                                    {recall.component}
                                </h4>
                                <div className="flex items-center gap-2 text-gray-400 font-mono text-xs mb-2">
                                    <Hash className="w-3 h-3" />
                                    {recall.recallNumber}
                                </div>
                                <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                                    {recall.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
