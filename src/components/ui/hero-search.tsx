import { useState } from "react";
import { Search, Car, FileText } from "lucide-react";
import { Button } from "./button";

export function HeroSearch() {
  const [searchType, setSearchType] = useState<"vin" | "plate">("vin");
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl border-0 shadow-sm p-6">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSearchType("vin")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              searchType === "vin"
                ? "bg-secondary-orange text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            <Car className="w-4 h-4" />
            VIN Decoder
          </button>
          <button
            onClick={() => setSearchType("plate")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              searchType === "plate"
                ? "bg-primary-red text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            <FileText className="w-4 h-4" />
            License Plate
          </button>
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder={
                searchType === "vin"
                  ? "Enter 17-character VIN..."
                  : "Enter Ghana license plate..."
              }
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <Button size="lg" className="px-6">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>

        <p className="text-sm text-gray-500 mt-3">
          {searchType === "vin"
            ? "Decode vehicle specifications and check theft status"
            : "Verify Ghana license plates and check for theft reports"}
        </p>
      </div>
    </div>
  );
}
