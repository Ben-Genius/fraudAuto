import type { SummaryCardsProps } from "../../types/vin-decoder";

export function SummaryCards({ summary }: SummaryCardsProps) {
  const summaryItems = [
    {
      label: "All history events",
      value: summary.totalEvents,
      color: "text-blue-600",
    },
    {
      label: "Safety Recalls",
      value: summary.safetyRecalls,
      color: "text-green-600",
    },
    {
      label: "Accidents",
      value: summary.accidents,
      color: "text-red-600",
    },
    {
      label: "Last Mileage",
      value: summary.lastMileage.toLocaleString(),
      color: "text-purple-600",
    },
    {
      label: "Sales History",
      value: summary.salesHistory,
      color: "text-orange-600",
    },
    {
      label: "Owners",
      value: summary.owners,
      color: "text-indigo-600",
    },
 
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {summaryItems.map((item) => (
        <div
          key={item.label}
          className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300"
        >
          <div className={`text-3xl font-light ${item.color} mb-2`}>
            {item.value}
          </div>
          <div className="text-sm text-gray-600 font-medium">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
