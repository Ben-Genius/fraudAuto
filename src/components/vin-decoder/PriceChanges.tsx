import { TrendingDown, TrendingUp } from "lucide-react";

interface PriceChange {
  date: string;
  price: string;
  mileage: string;
  difference: string;
  isIncrease: boolean;
  isNew?: boolean;
}

const priceChanges: PriceChange[] = [
  {
    date: "Jul 3, 2025",
    price: "$11,300",
    mileage: "18,796 mi",
    difference: "-$22,200",
    isIncrease: false,
    isNew: true,
  },
  {
    date: "Sep 27, 2019",
    price: "$33,500",
    mileage: "18,796 mi",
    difference: "-$72,499",
    isIncrease: false,
  },
  {
    date: "Aug 27, 2015",
    price: "$105,999",
    mileage: "7,096 mi",
    difference: "-$86,496",
    isIncrease: false,
  },
  {
    date: "May 7, 2013",
    price: "$192,495",
    mileage: "3,084 mi",
    difference: "+$143,050",
    isIncrease: true,
  },
  {
    date: "Jan 31, 2013",
    price: "$49,445",
    mileage: "0 mi",
    difference: "—",
    isIncrease: false,
  },
];

export function PriceChanges() {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
          Price changes
        </h2>
      </div>

      {/* Mobile Card Layout */}
      <div className="block sm:hidden space-y-4">
        {priceChanges.map((change, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">{change.date}</span>
                {change.isNew && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                    New
                  </span>
                )}
              </div>
              <span className="font-semibold text-gray-900 text-lg">
                {change.price}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">{change.mileage}</span>
              {change.difference === "—" ? (
                <span className="text-gray-400">—</span>
              ) : (
                <div className="flex items-center gap-1">
                  {change.isIncrease ? (
                    <div className="flex items-center gap-1 text-red-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-semibold">{change.difference}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingDown className="w-4 h-4" />
                      <span className="font-semibold">{change.difference}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden sm:block overflow-x-auto">
        <div className="overflow-hidden rounded-2xl border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Date
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Price
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Mileage
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Difference
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {priceChanges.map((change, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">
                        {change.date}
                      </span>
                      {change.isNew && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-gray-900 text-lg">
                      {change.price}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{change.mileage}</span>
                  </td>
                  <td className="py-4 px-6">
                    {change.difference === "—" ? (
                      <span className="text-gray-400">—</span>
                    ) : (
                      <div className="flex items-center gap-2">
                        {change.isIncrease ? (
                          <div className="flex items-center gap-1 text-red-600">
                            <TrendingUp className="w-4 h-4" />
                            <span className="font-semibold">
                              {change.difference}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-green-600">
                            <TrendingDown className="w-4 h-4" />
                            <span className="font-semibold">
                              {change.difference}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
