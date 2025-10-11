import { LineChart } from "@mui/x-charts/LineChart";
import React from "react";

export default function MarketPriceYear() {
      const priceYearData = [
        250000, 180000, 140000, 95000, 75000, 45000, 95000, 85000,
      ];
      const years = [2018, 2016, 2014, 2012, 2010, 2008, 2006, 2004];

  return (
    <div className="bg-white rounded-3xl p-4 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 p-2">
        Price/Year Dependence
      </h2>
      <LineChart
        height={300}
        series={[
          {
            data: priceYearData,
            label: "Price",
            color: "#3b82f6",
            curve: "linear",
          },
        ]}
        xAxis={[
          {
            data: years,
            label: "Year",
          },
        ]}
        yAxis={[
          {
            label: "Price ($)",
          },
        ]}
        grid={{ vertical: true, horizontal: true }}
      />
    </div>
  );
}
