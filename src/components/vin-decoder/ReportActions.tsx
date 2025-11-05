import { Download, Share2 } from "lucide-react";
import { Button } from "../ui/button";

export function ReportActions() {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6">
      <Button className="bg-primary-red hover:bg-red-700 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-md text-sm sm:text-base md:text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
        <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
        Download Report
      </Button>
      <Button className="bg-white text-gray-700 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-md text-sm sm:text-base md:text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
        <Share2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
        Share Report
      </Button>
    </div>
  );
}
