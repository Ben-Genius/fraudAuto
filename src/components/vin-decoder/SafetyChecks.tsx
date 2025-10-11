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
    <div className="bg-white rounded-3xl p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="h-6 w-6 text-primary-red" />
   <h2 className="text-2xl font-bold text-gray-800">
          Safety & Security Checks
        </h2>
      </div>
      <div className="space-y-4">
        {Object.entries(checks).map(([key, check]) => (
          <div
            key={key}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl"
          >
            <div className="flex items-center gap-4">
              {check.status === "clean" && (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
              {check.status === "warning" && (
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              )}
              {check.status === "error" && (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <div>
                <div className="font-medium text-sm capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </div>
                <div className="text-xs text-gray-600">
                  {check.message}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">
                {check.count}
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${
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
