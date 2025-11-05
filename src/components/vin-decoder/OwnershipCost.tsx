import { TrendingDown } from "lucide-react";
import type { CostBreakdown } from "../../types/vin-decoder";

export function OwnershipCost() {
  const costBreakdown: CostBreakdown[] = [
    {
      title: "Depreciation",
      year1: 4331,
      year2: 3998,
      year3: 3665,
      year4: 3332,
      year5: 2999,
      total: 18325,
      color: "bg-red-50 text-red-700",
    },
    {
      title: "Insurance",
      year1: 1906,
      year2: 1973,
      year3: 2042,
      year4: 2113,
      year5: 2187,
      total: 10221,
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "Fuel",
      year1: 2516,
      year2: 2592,
      year3: 2682,
      year4: 2790,
      year5: 2915,
      total: 13495,
      color: "bg-green-50 text-green-700",
    },
    {
      title: "Maintenance",
      year1: 2763,
      year2: 2912,
      year3: 1789,
      year4: 2517,
      year5: 2291,
      total: 12272,
      color: "bg-yellow-50 text-yellow-700",
    },
    {
      title: "Repair",
      year1: 1651,
      year2: 1290,
      year3: 1473,
      year4: 1590,
      year5: 1816,
      total: 7820,
      color: "bg-purple-50 text-purple-700",
    },
    {
      title: "Taxes & Fees",
      year1: 3213,
      year2: 366,
      year3: 466,
      year4: 299,
      year5: 415,
      total: 4759,
      color: "bg-gray-50 text-gray-700",
    },
  ];

  const grandTotal = 66894;

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100">
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <div className="p-2">
          <TrendingDown className="h-5 w-5 sm:h-6 sm:w-6 text-primary-red" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Ownership cost
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            5-year total cost breakdown
          </p>
        </div>
      </div>

      {/* Mobile Card Layout */}
      <div className="block lg:hidden space-y-4">
        {costBreakdown.map((cost, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-3">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${cost.color}`}
              >
                {cost.title}
              </div>
              <div className="font-bold text-lg text-gray-900">
                ${cost.total.toLocaleString()}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-sm">
              <div className="text-center">
                <div className="text-gray-500 text-xs">Year 1</div>
                <div className="font-semibold">
                  ${cost.year1.toLocaleString()}
                </div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 text-xs">Year 2</div>
                <div className="font-semibold">
                  ${cost.year2.toLocaleString()}
                </div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 text-xs">Year 3</div>
                <div className="font-semibold">
                  ${cost.year3.toLocaleString()}
                </div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 text-xs">Year 4</div>
                <div className="font-semibold">
                  ${cost.year4.toLocaleString()}
                </div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 text-xs">Year 5</div>
                <div className="font-semibold">
                  ${cost.year5.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="bg-gray-100 rounded-lg p-4 border-2 border-gray-300">
          <div className="text-center">
            <div className="text-gray-700 font-semibold mb-1">
              Total 5-Year Cost
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">
              ${grandTotal.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden lg:block overflow-x-auto">
        <div className="overflow-hidden rounded-2xl border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Title
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Year 1
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Year 2
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Year 3
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Year 4
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Year 5
                </th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Total for 5 years
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {costBreakdown.map((cost, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${cost.color}`}
                    >
                      {cost.title}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="font-semibold text-gray-900">
                      ${cost.year1.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="font-semibold text-gray-900">
                      ${cost.year2.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="font-semibold text-gray-900">
                      ${cost.year3.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="font-semibold text-gray-900">
                      ${cost.year4.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="font-semibold text-gray-900">
                      ${cost.year5.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="font-bold text-lg text-gray-900">
                      ${cost.total.toLocaleString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-black/5">
                <td colSpan={6} className="py-6 px-6 text-right"></td>
                <td className="py-6 px-6 text-right">
                  <div className="text-3xl font-bold">
                    ${grandTotal.toLocaleString()}
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
