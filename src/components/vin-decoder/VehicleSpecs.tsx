import { Car } from "lucide-react";
import type { VehicleSpecsProps } from "../../types/vin-decoder";

export function VehicleSpecs({ vehicle }: VehicleSpecsProps) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <Car className="h-4 w-4 sm:h-5 sm:w-5 text-primary-red" />
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
          Vehicle Specifications
        </h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {Object.entries(vehicle).map(([key, value]) => (
          <div
            key={key}
            className="inline-flex items-center px-2 sm:px-3 py-1 bg-gray-100 rounded-full text-xs sm:text-sm"
          >
            <span className="text-gray-600 capitalize mr-1 sm:mr-2">
              {key.replace(/([A-Z])/g, " $1")}:
            </span>
            <span className="font-medium text-gray-900">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
