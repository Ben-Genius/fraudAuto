import { IMAGES } from "../../assets/images";
export function OwnershipCostChart() {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm text-gray-600">
      <div className="pt-2 pb-8">
        <h2 className="text-2xl font-bold text-gray-800">Stolen Vehicle Check</h2>
        <p className="text-sm py-2"> <span className="font-bold text-primary-orange">70+ databases checked </span> / No records found</p>
        <h1 className="text-sm p-3 font-bold"> ✅  No Thefts Records Found</h1>
      </div>
      <div className="w-full flex items-center justify-center gap-3">
        <div>
          <div className="w-full flex items-center">
            <img
              src={IMAGES.flag}
              alt="Ghana flag"
              className="h-18 w-15 object-cover"
            />
            <h2 className="font-medium ">
              Following vehicle information marked as "Source:{" "}
              <span className="font-extrabold ">DVLA</span>" is based on the
              time the vehicle was used in Ghana
            </h2>
          </div>
          <p className="text-sm py-4">
            Fraudwall-Auto is an approved DVLA data provider. DVLA is a national
            database designed to protect consumers from fraud and unsafe
            vehicles, to prevent stolen vehicles from being resold, and to
            provide users with accurate and complete vehicle information.
          </p>
        </div>
        <img
          src={IMAGES.dvla}
          alt="dvla logo"
          className="h-15 w-15 object-cover"
        />
      </div>
    </div>
  );
}
