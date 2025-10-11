import { LineChart } from "@mui/x-charts/LineChart";
import { type HistoryEventsChartProps } from "../../types/vin-decoder";
import { ArrowBigDownDashIcon, LucideCloudLightning } from "lucide-react";

export function HistoryEventsChart({ events }: HistoryEventsChartProps) {
  const chartData = events
    .map((event) => ({
      date: new Date(event.date),
      mileage: event.mileage,
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="">
      <LineChart
        height={450}
        series={[
          {
            data: chartData.map((item) => item.mileage),
            label: "Mileage/Year Dependence",
            color: "#FC612D",
            curve: "bumpX",
          },
        ]}
        xAxis={[
          {
            data: chartData.map((item) => item.date),
            label: "Year",
            scaleType: "time",
          },
        ]}
        yAxis={[
          {
            label: "Mileage (miles)",
          },
        ]}
        margin={{ top: 4, bottom: 8, left: 10, right: 0 }}
        grid={{ vertical: true, horizontal: true }}
      />

      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>
          Shows vehicle mileage progression over exact dates based on recorded
          events
        </p>
      </div>
      <div className="flex w-full items-center justify-between px-6 my-9">
        <div className="">
          <div className="flex gap-2 items-center">
            {" "}
            <ArrowBigDownDashIcon color="green" />{" "}
            <h2 className="text-green-700 font-semibold text-lg"> 19,159 mi</h2>
          </div>
          <p className="text-gray-500 text-sm max-w-sm">
            As of today, the estimated mileage of identical 2012 BENTLEY
            Continental could be ⬆️{" "}
          </p>
        </div>

        <div className="">
          <div className="flex gap-2 items-center">
            <LucideCloudLightning color="orange" />{" "}
            <h2 className="text-orange-400 font-semibold text-lg">
              {" "}
              41,739 mi
            </h2>
          </div>
          <p className="text-gray-500 text-sm max-w-sm">
            As of today, the average mileage of identical 2012 BENTLEY Continental
            could be ⬆️{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
