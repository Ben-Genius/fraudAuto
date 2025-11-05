import { Shield, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface SafetyChecksProps {
  checks: {
    [key: string]: {
      status: "clean" | "warning" | "error";
      message: string;
      count: number;
    };
  };
}

export function SafetyChecks({ checks }: SafetyChecksProps) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
        <Shield className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary-red" />
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
          Safety & Security Checks
        </h2>
      </div>
      <div className="space-y-3 sm:space-y-4">
        {Object.entries(checks).map(([key, check]) => (
          <div
            key={key}
            className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl sm:rounded-2xl"
          >
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
              {check.status === "clean" && (
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
              )}
              {check.status === "warning" && (
                <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 flex-shrink-0" />
              )}
              {check.status === "error" && (
                <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0" />
              )}
              <div className="min-w-0 flex-1">
                <div className="font-medium text-xs sm:text-sm capitalize truncate">
                  {key.replace(/([A-Z])/g, " $1")}
                </div>
                <div className="text-xs text-gray-600 truncate">
                  {check.message}
                </div>
              </div>
            </div>
            <div className="text-right flex-shrink-0 ml-2">
              <div className="text-xs sm:text-sm font-medium">
                {check.count}
              </div>
              <div
                className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                  check.status === "clean"
                    ? "bg-green-100 text-green-800"
                    : check.status === "warning"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {check.status === "clean"
                  ? "CLEAR"
                  : check.status === "warning"
                  ? "WARNING"
                  : "ALERT"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
