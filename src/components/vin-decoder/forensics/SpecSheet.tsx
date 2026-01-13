import { Car, Cpu, Database, Droplet, Globe, Layers, Settings } from "lucide-react";
import type { Vehicle } from "../../../types/vin-decoder";

interface SpecSheetProps {
    vehicle: Vehicle;
}

export const SpecSheet = ({ vehicle }: SpecSheetProps) => {
    const specs = [
        { label: "Year", value: vehicle.year?.toString(), icon: CalendarIcon },
        { label: "Make", value: vehicle.make, icon: Car },
        { label: "Model", value: vehicle.model, icon: Layers },
        { label: "Trim", value: vehicle.trim, icon: Settings },
        { label: "Engine", value: vehicle.engine, icon: Cpu },
        { label: "Transmission", value: vehicle.transmission, icon: Database },
        { label: "Drive Type", value: vehicle.driveLine, icon: Settings },
        { label: "Fuel Type", value: vehicle.fuelType, icon: Droplet },
        { label: "Assembly", value: vehicle.madeIn, icon: Globe },
        { label: "Body Style", value: vehicle.bodyStyle, icon: Car },
    ];

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
                <div className="p-2 bg-primary-orange/10 rounded-lg text-primary-orange">
                    <Database className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Vehicle Specifications</h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 divide-x divide-y divide-gray-100">
                {specs.map((spec, idx) => (
                    <div key={idx} className="p-6 hover:bg-gray-50 transition-colors group">
                        <div className="flex items-center gap-2 text-gray-400 mb-2 group-hover:text-primary-orange transition-colors">
                            {spec.icon && <spec.icon className="w-4 h-4" />}
                            <span className="text-xs font-semibold uppercase tracking-wider">{spec.label}</span>
                        </div>
                        <div className="text-gray-900 font-semibold text-base truncate" title={spec.value || "N/A"}>
                            {spec.value && spec.value !== "N/A" ? spec.value : <span className="text-gray-300">--</span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Helper Icon for Calendar since it's used in map
const CalendarIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
);
