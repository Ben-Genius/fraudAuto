import { LineChart } from "@mui/x-charts/LineChart";
import { DollarSign } from "lucide-react";
import type { SalesHistoryChartProps } from "../../types/vin-decoder";

export function SalesHistoryChart({ sales }: SalesHistoryChartProps) {
  const chartData = sales
    .map((sale) => ({
      date: sale.date,
      price: parseInt(sale.price.replace(/[^0-9]/g, "")),
      mileage: sale.mileage,
    }))
    .reverse();

  return (
    <div className="bg-white rounded-3xl p-3 shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <DollarSign className="h-6 w-6 text-primary-red" />
        <h3 className="text-2xl font-bold text-gray-800">Sales Price Trend</h3>
      </div>

      <LineChart
        height={300}
        series={[
          {
            data: chartData.map((item) => item.price),
            label: "Sale Price (USD)",
            color: "#FC612D",
          },
        ]}
        xAxis={[
          {
            data: chartData.map((_, index) => index + 1),
            label: "Sale Number",
          },
        ]}
      />
    </div>
  );
}
