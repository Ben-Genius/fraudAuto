import { Search } from "lucide-react";
import { Button } from "../ui/button";

interface VinSearchFormProps {
  vin: string;
  setVin: (vin: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function VinSearchForm({ vin, setVin, onSubmit }: VinSearchFormProps) {
  return (
    <div className="max-w-xs sm:max-w-lg md:max-w-2xl mx-auto px-4 sm:px-0">
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-300">
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter 17-character VIN..."
              value={vin}
              onChange={(e) => setVin(e.target.value.toUpperCase())}
              className="outline-0 w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-orange focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
            />
          </div>
          <Button
            variant={"secondary"}
            type="submit"
            size="lg"
            className="px-4 sm:px-6 w-full sm:w-auto"
            disabled={vin.length !== 17}
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </form>

        <p className="text-xs sm:text-sm text-gray-500 mt-3 text-center">
          Decode vehicle specifications and check theft status
        </p>
      </div>
    </div>
  );
}
