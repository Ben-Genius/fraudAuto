import { useState } from "react";
import type { VehicleDamage } from "../../types/vin-decoder";

interface VehicleDamagesProps {
  vehicleDamages: VehicleDamage[];
}

export function VehicleDamages({ vehicleDamages }: VehicleDamagesProps) {
  const [selectedDamage, setSelectedDamage] = useState<VehicleDamage | null>(
    vehicleDamages[0] || null
  );

  const getDamagePosition = (areaOfImpact: string) => {
    switch (areaOfImpact) {
      case "Front End":
        return { top: "25%", right: "15%" };
      case "Rear End":
        return { bottom: "25%", left: "15%" };
      case "Side":
        return { top: "50%", right: "5%" };
      default:
        return { top: "50%", right: "50%" };
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Vehicle damages
            </h2>
            <p className="text-sm text-gray-600 max-w-lg leading-relaxed">
              This section lists reported damages to this vehicle. You can use
              this information as leverage when negotiating the price of the
              car. If the damages are excessive, consider a different vehicle
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded mb-1">
              CONFIRMED DATA
            </div>
            <button className="text-blue-600 text-xs font-medium hover:underline">
              CHECK NOW
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Damage Records */}
          <div>
            {vehicleDamages.map((damage, index) => (
              <div
                key={damage.id}
                className={`flex items-center py-3 cursor-pointer transition-colors ${
                  index !== vehicleDamages.length - 1
                    ? "border-b border-gray-100"
                    : ""
                } ${
                  selectedDamage?.id === damage.id
                    ? "bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedDamage(damage)}
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 text-sm mb-1">
                    {damage.damageType}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 space-x-3">
                    <span>{damage.date}</span>
                    <div className="flex items-center space-x-1">
                      <span className="w-4 h-3 bg-red-600 relative">
                        <span
                          className="absolute inset-0 bg-white"
                          style={{
                            background:
                              "linear-gradient(to bottom, #dc2626 0%, #dc2626 35%, white 35%, white 65%, #dc2626 65%)",
                          }}
                        ></span>
                        <span className="absolute left-0 top-0 w-1.5 h-full bg-blue-600"></span>
                      </span>
                      <span>{damage.country}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Car Visualization */}
          <div className="space-y-6">
            {/* Car Diagram */}
            <div
              className="relative bg-gray-50 rounded-lg p-8 flex items-center justify-center"
              style={{ minHeight: "200px" }}
            >
              <div className="relative">
                {/* Car Shape - More realistic sedan silhouette */}
                <svg
                  width="280"
                  height="160"
                  viewBox="0 0 280 160"
                  className="text-gray-300"
                >
                  {/* Main body */}
                  <path
                    d="M50 80 Q50 60 70 60 L90 60 Q100 50 110 50 L170 50 Q180 50 190 60 L210 60 Q230 60 230 80 L230 100 Q230 120 210 120 L70 120 Q50 120 50 100 Z"
                    fill="currentColor"
                    stroke="#9ca3af"
                    strokeWidth="1"
                  />
                  {/* Windshield */}
                  <path
                    d="M95 65 L185 65 Q190 65 190 70 L190 85 Q190 90 185 90 L95 90 Q90 90 90 85 L90 70 Q90 65 95 65 Z"
                    fill="white"
                    stroke="#d1d5db"
                    strokeWidth="1"
                  />
                  {/* Side windows */}
                  <rect
                    x="75"
                    y="70"
                    width="15"
                    height="15"
                    rx="2"
                    fill="white"
                    stroke="#d1d5db"
                    strokeWidth="1"
                  />
                  <rect
                    x="190"
                    y="70"
                    width="15"
                    height="15"
                    rx="2"
                    fill="white"
                    stroke="#d1d5db"
                    strokeWidth="1"
                  />
                  {/* Wheels */}
                  <circle cx="80" cy="120" r="8" fill="#4b5563" />
                  <circle cx="200" cy="120" r="8" fill="#4b5563" />
                </svg>

                {/* Damage Dot */}
                {selectedDamage && (
                  <div
                    className="absolute w-3 h-3 bg-red-500 rounded-full border border-white shadow-sm"
                    style={getDamagePosition(selectedDamage.areaOfImpact)}
                  />
                )}
              </div>
            </div>

            {/* Damage Details */}
            {selectedDamage && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium">
                      Area of impact
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {selectedDamage.areaOfImpact}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-orange-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium">
                      Damage type
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {selectedDamage.damageType}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-3 bg-red-600 relative rounded-sm">
                      <div
                        className="absolute inset-0 bg-white rounded-sm"
                        style={{
                          background:
                            "linear-gradient(to bottom, #dc2626 0%, #dc2626 35%, white 35%, white 65%, #dc2626 65%)",
                        }}
                      ></div>
                      <div className="absolute left-0 top-0 w-1 h-full bg-blue-600 rounded-l-sm"></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium">
                      Country
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {selectedDamage.country}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
