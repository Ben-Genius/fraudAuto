import { useState } from "react";
import { DollarSign, ChevronDown, ChevronUp } from "lucide-react";
import type { SalesHistoryProps } from "../../types/vin-decoder";

export function SalesHistory({ sales, totalSales }: SalesHistoryProps) {
  const [expandedSales, setExpandedSales] = useState<number[]>([]);

  const toggleExpanded = (saleIndex: number) => {
    setExpandedSales((prev) =>
      prev.includes(saleIndex)
        ? prev.filter((i) => i !== saleIndex)
        : [...prev, saleIndex]
    );
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg">
      <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
        <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-primary-red" />
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Sales history</h2>
          <p className="text-xs sm:text-sm text-gray-500">{totalSales} records found</p>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {sales.map((sale, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Sale Header */}
            <div className="p-4 sm:p-6 bg-gray-50 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-3 sm:mb-4 gap-3 sm:gap-0">
                <div className="w-full sm:w-auto">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    Was put on sale {sale.date}
                  </h3>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm">
                    <span className="px-2 py-1 bg-secondary-dark-red text-white rounded text-xs font-medium">
                      {sale.saleType}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-4 h-3 bg-red-600 relative">
                        <span
                          className="absolute inset-0 bg-white"
                          style={{
                            background:
                              "linear-gradient(to bottom, #dc2626 0%, #dc2626 35%, white 35%, white 65%, #dc2626 65%)",
                          }}
                        ></span>
                        <span className="absolute left-0 top-0 w-1.5 h-full bg-pritext-primary-orange"></span>
                      </span>
                      <span>{sale.country}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-primary-orange" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium">
                      Cost
                    </div>
                    <div className="text-base sm:text-lg font-semibold text-gray-900">
                      {sale.price}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-orange-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium">
                      Odometer
                    </div>
                    <div className="text-base sm:text-lg font-semibold text-gray-900">
                      {sale.mileage.toLocaleString()} mi
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-green-600"
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
                      Location
                    </div>
                    <div className="text-base sm:text-lg font-semibold text-gray-900">
                      {sale.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Gallery */}
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <img
                    src={sale.images[0]}
                    alt="Main vehicle photo"
                    className="w-full h-48 sm:h-64 object-cover rounded-lg bg-gray-100"
                  />
                  <button className="mt-2 text-primary-orange text-sm font-medium">
                    Show all {sale.photos} photos
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                  {sale.images.slice(1, 3).map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={`Vehicle photo ${imgIndex + 2}`}
                      className="w-full h-24 sm:h-30 object-cover rounded-lg bg-gray-100"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Basic Specifications */}
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 text-sm">
                <div>
                  <span className="text-gray-500">Fuel type:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {sale.specifications.fuelType}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Engine:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {sale.specifications.engine}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Exterior color:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {sale.specifications.exteriorColor}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Body style:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {sale.specifications.bodyStyle}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Drive train:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {sale.specifications.driveTrain}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Transmission:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {sale.specifications.transmission}
                  </span>
                </div>
              </div>
            </div>

            {/* Expandable Sections */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleExpanded(index)}
                className="w-full p-3 sm:p-4 flex items-center justify-between text-left hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900 text-sm sm:text-base">
                  {expandedSales.includes(index) ? "Hide" : "Show"} detailed
                  information
                </span>
                {expandedSales.includes(index) ? (
                  <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                )}
              </button>

              {expandedSales.includes(index) && (
                <div className="p-4 sm:p-6 bg-gray-50 space-y-4 sm:space-y-6">
                  {/* Equipment */}
                  {sale.equipment.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
                        Equipment
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                        {sale.equipment.map((item, equipIndex) => (
                          <div
                            key={equipIndex}
                            className="flex items-center gap-2"
                          >
                            <svg
                              className="w-3 h-3 text-green-600 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Info */}
                  {Object.keys(sale.additionalInfo).length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
                        Additional info
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                        {Object.entries(sale.additionalInfo).map(
                          ([key, value]) =>
                            value && (
                              <div key={key}>
                                <span className="text-gray-500 capitalize">
                                  {key.replace(/([A-Z])/g, " $1").trim()}:
                                </span>
                                <span className="ml-2 font-medium text-gray-900">
                                  {value}
                                </span>
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {sale.notes && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
                        Notes
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {sale.notes}
                      </p>
                    </div>
                  )}

                  {/* Dealer Info */}
                  {sale.dealerInfo && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
                        Dealer info
                      </h4>
                      <div className="text-sm space-y-1">
                        <div>
                          <span className="text-gray-500">Name:</span>
                          <span className="ml-2 font-medium text-gray-900">
                            {sale.dealerInfo.name}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Address:</span>
                          <span className="ml-2 font-medium text-gray-900">
                            {sale.dealerInfo.address}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
