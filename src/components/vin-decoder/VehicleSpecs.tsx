import { Car } from "lucide-react";
import type { VehicleSpecsProps } from "../../types/vin-decoder";

export function VehicleSpecs({ vehicle }: VehicleSpecsProps) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Car className="h-5 w-5 text-primary-red" />
           <h2 className="text-2xl font-bold text-gray-800">
          Vehicle Specifications
        </h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {Object.entries(vehicle).map(([key, value]) => (
          <div
            key={key}
            className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm"
          >
            <span className="text-gray-600 capitalize mr-2">
              {key.replace(/([A-Z])/g, " $1")}:
            </span>
            <span className="font-medium text-gray-900">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
