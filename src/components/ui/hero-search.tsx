import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Car, FileText } from "lucide-react";
import { Button } from "./button";

export function HeroSearch() {
  const [searchType, setSearchType] = useState<"vin" | "plate" | "maintenance">(
    "vin"
  );
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      if (searchType === "vin") {
        const cleanVin = searchValue.trim().toUpperCase();
        navigate(`/vin-decoder?vin=${cleanVin}`);
      } else if (searchType === "plate") {
        navigate(`/license-plate?plate=${searchValue.trim().toUpperCase()}`);
      } else {
        navigate(
          `/maintenance-history?vin=${searchValue
            .trim()
            .toUpperCase()}`
        );
      }
    }
  };

  return (
    <div className="w-full max-w-xs sm:max-w-lg md:max-w-2xl mx-auto px-4 sm:px-0">
      <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl border-0 shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-2 mb-4 overflow-x-auto">
          <button
            onClick={() => setSearchType("vin")}
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              searchType === "vin"
                ? "bg-secondary-orange text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            <Car className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">VIN Decoder & Lookup</span>
            <span className="sm:hidden">VIN</span>
          </button>
          <button
            onClick={() => setSearchType("plate")}
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              searchType === "plate"
                ? "bg-primary-red text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">License Plate</span>
            <span className="sm:hidden">Plate</span>
          </button>
          <button
            onClick={() => setSearchType("maintenance")}
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              searchType === "maintenance"
                ? "bg-primary-red text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden md:inline">Maintenance History in Ghana</span>
            <span className="md:hidden">Maintenance</span>
          </button>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder={
                searchType === "vin"
                  ? "Enter 17-character VIN..."
                  : searchType === "plate"
                  ? "Enter Ghana license plate..."
                  : "1HGBH41JXMN109186"
              }
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-orange focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none text-sm sm:text-base"
            />
          </div>
          <Button type="submit" size="lg" className="px-4 sm:px-6 w-full sm:w-auto">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </form>

        <p className="text-xs sm:text-sm text-gray-500 mt-3 text-start leading-relaxed">
          {searchType === "vin"
            ? "Decode vehicle specifications and check theft status"
            : searchType === "plate"
            ? "Verify Ghana license plates and check for theft reports"
            : "Enter a VIN to access a complete, verified history of service records, repairs, and more."}
        </p>
      </div>
    </div>
  );
}
