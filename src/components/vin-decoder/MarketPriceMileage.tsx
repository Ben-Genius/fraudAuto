import { LineChart } from "@mui/x-charts/LineChart";

const MarketPriceMileage = () => {
      const priceMileageData = {
        auction: [82000, 81000, 82000, 80000, 88000],
        dealer: [95000, 85000, 83000, 81000, 90000],
      };
      const mileagePoints = [15000, 35000, 55000, 75000, 110000];
  return (
    <div>
      <div className="bg-white shadow-lg rounded-2xl p-3">
            <h2 className="text-2xl font-bold text-gray-800 p-2">
          Price/Mileage Dependence
        </h2>
        <LineChart
          height={300}
          series={[
            {
              data: priceMileageData.auction,
              label: "Auction Price",
              color: "#f59e0b",
            },
            {
              data: priceMileageData.dealer,
              label: "Dealer Price",
              color: "#3b82f6",
            },
          ]}
          xAxis={[
            {
              data: mileagePoints,
              label: "Mileage (mi)",
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
    </div>
  );
};

export default MarketPriceMileage;
