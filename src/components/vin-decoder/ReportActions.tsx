import { Download, Share2 } from "lucide-react";
import { Button } from "../ui/button";

export function ReportActions() {
  return (
    <div className="flex justify-center gap-6">
      <Button className="bg-primary-red hover:bg-red-700 text-white px-8 py-4 rounded-md text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
        <Download className="h-5 w-5 mr-3" />
        Download Report
      </Button>
      <Button className="bg-white text-gray-700 px-8 py-4 rounded-md text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
        <Share2 className="h-5 w-5 mr-3" />
        Share Report
      </Button>
    
    </div>
  );
}
