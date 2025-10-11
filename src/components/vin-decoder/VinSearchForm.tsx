import { Search } from "lucide-react";
import { Button } from "../ui/button";

interface VinSearchFormProps {
  vin: string;
  setVin: (vin: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function VinSearchForm({ vin, setVin, onSubmit }: VinSearchFormProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-300">
        <form onSubmit={onSubmit} className="flex gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter 17-character VIN..."
              value={vin}
              onChange={(e) => setVin(e.target.value.toUpperCase())}
              className="outline-0 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-orange focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <Button
            variant={"secondary"}
            type="submit"
            size="lg"
            className="px-6"
            disabled={vin.length !== 17}
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </form>

        <p className="text-sm text-gray-500 mt-3 text-center">
          Decode vehicle specifications and check theft status
        </p>
      </div>
    </div>
  );
}
