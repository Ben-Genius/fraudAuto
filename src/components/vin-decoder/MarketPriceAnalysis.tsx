import { useState } from "react";
import { BarChart3 } from "lucide-react";

export function MarketPriceAnalysis() {
  const [activeTab, setActiveTab] = useState<"classified" | "auctions">(
    "classified"
  );

  const classifiedData = {
    below: "$43,632",
    average: "$54,050",
    above: "$64,467",
  };

  const auctionData = {
    below: "$119,769",
    average: "$120,371",
    above: "$120,973",
  };

  const currentData = activeTab === "classified" ? classifiedData : auctionData;

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg mb-10">
      <div className="flex items-center gap-3 mb-4">
        <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-primary-red" />
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
            Market price analysis
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Average prices for similar vehicles
          </p>
        </div>
      </div>
      <p className="text-gray-500 text-sm sm:text-normal p-2 text-center mb-4">
        This section presents average prices for cars similar to yours. You can
        use this information as leverage when negotiating the price of a car.
      </p>

      <div className="flex bg-gray-100 rounded-lg p-1 w-full sm:w-fit mb-6">
        <button
          onClick={() => setActiveTab("classified")}
          className={`flex-1 sm:flex-none px-2 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium transition-colors ${
            activeTab === "classified"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600"
          }`}
        >
          Classified sites price
        </button>
        <button
          onClick={() => setActiveTab("auctions")}
          className={`flex-1 sm:flex-none px-2 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium transition-colors ${
            activeTab === "auctions"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600"
          }`}
        >
          Auctions sites price
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg">
          <div className="text-xl sm:text-2xl font-semibold text-orange-600 mb-1">
            {currentData.below}
          </div>
          <div className="text-xs sm:text-sm text-orange-700">Below market</div>
        </div>

        <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg">
          <div className="text-xl sm:text-2xl font-semibold text-green-600 mb-1">
            {currentData.average}
          </div>
          <div className="text-xs sm:text-sm text-green-700">Average price</div>
        </div>

        <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg">
          <div className="text-xl sm:text-2xl font-semibold text-orange-600 mb-1">
            {currentData.above}
          </div>
          <div className="text-xs sm:text-sm text-orange-700">Above market</div>
        </div>
      </div>

      <p className="text-center text-gray-500 text-xs sm:text-sm">
        Market price analysis is based on a vehicle's history such as vehicle
        class and age, number of owners, accident and damage history, title
        brands, odometer readings, etc. This information is used to compare the
        vehicle's favorability against the entire market of vehicles
      </p>
    </div>
  );
}
