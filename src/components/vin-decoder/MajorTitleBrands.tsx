import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import type { TitleBrandCheck } from "../../types/vin-decoder";

interface MajorTitleBrandsProps {
  majorTitleBrands: TitleBrandCheck[];
}

export function MajorTitleBrands({ majorTitleBrands }: MajorTitleBrandsProps) {
  const problemCount = majorTitleBrands.filter(brand => brand.hasProblem).length;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <AlertTriangle className="h-6 w-6 text-primary-red" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Major Title Brand Check
          </h2>
          <p className="text-sm text-gray-500">NMVTIS Confirmed Data</p>
        </div>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-2xl font-light text-gray-900">
              {majorTitleBrands.length}
            </div>
            <div className="text-sm text-gray-600">Points Checked</div>
          </div>
          <div>
            <div
              className={`text-2xl font-light ${
                problemCount > 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {problemCount}
            </div>
            <div className="text-sm text-gray-600">Problems Reported</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {majorTitleBrands.map((brand) => (
          <div
            key={brand.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl"
          >
            <div className="flex items-center gap-4">
              {brand.hasProblem ? (
                <XCircle className="h-5 w-5 text-red-600" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
              <div>
                <div className="font-medium text-gray-900">
                  {brand.brandType}
                </div>
                {brand.date && (
                  <div className="text-sm text-gray-500">
                    Date: {brand.date}
                  </div>
                )}
              </div>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                brand.hasProblem
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {brand.hasProblem ? "PROBLEM" : "CLEAR"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
