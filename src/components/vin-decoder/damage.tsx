import React, { useState } from "react";

// Sample data based on the provided vehicle damage information
const crashRecords = [
  {
    id: 1,
    date: "December 14, 2014",
    country: "United States",
    type: "Crash record",
    details:
      "Front end collision reported with minor damages to bumper and headlights.",
  },
  {
    id: 2,
    date: "March 29, 2016",
    country: "United States",
    type: "Crash record",
    details:
      "Side impact collision with damage to driver side door and rear quarter panel.",
  },
  {
    id: 3,
    date: "April 5, 2016",
    country: "United States",
    type: "Crash record",
    details: "Rear end collision with damage to trunk lid and rear bumper.",
  },
  {
    id: 4,
    date: "May 3, 2016",
    country: "United States",
    type: "Crash record",
    details:
      "Front end collision with damage to grille, hood and radiator support.",
  },
  {
    id: 5,
    date: "July 16, 2016",
    country: "United States",
    type: "Crash record",
    details:
      "Multiple impact collision with damage to front bumper, fender and headlight assembly.",
  },
];

export function VehicleDamage() {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRecord(null);
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Vehicle damages</h2>
          <p className="text-sm text-gray-500 mt-1">
            This section lists reported damages to this vehicle. You can use
            this information as leverage when negotiating the price of the car.
            If the damages are excessive, consider a different vehicle
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Confirmed Data</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-700">Crash record</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Check now
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Crash Records List */}
        <div className="space-y-3">
          {crashRecords.map((record) => (
            <div
              key={record.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => handleViewDetails(record)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    {record.type}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{record.date}</p>
                  <p className="text-xs text-gray-500">{record.country}</p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Car Damage Scheme */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Car damages scheme
          </h3>

          {/* Car Image Placeholder */}
          <div className="relative mb-4">
            <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
              <svg
                className="w-24 h-24 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="bg-red-500 bg-opacity-30 rounded-full w-20 h-20 flex items-center justify-center">
                <span className="text-white font-bold text-xs">FRONT END</span>
              </div>
            </div>
          </div>

          {/* Damage Details */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Est. repair cost
              </span>
              <span className="text-sm text-gray-900">$2,500 - $3,500</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Area of impact
              </span>
              <span className="text-sm text-gray-900">
                Front End Damage Distributed Impact
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Damage type
              </span>
              <span className="text-sm text-gray-900">Crash Record</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Country</span>
              <span className="text-sm text-gray-900">United States</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for viewing crash record details */}
      {showModal && selectedRecord && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-xl bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Crash Record Details
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-gray-500 mr-2">
                    Type:
                  </span>
                  <span className="text-sm text-gray-900">
                    {selectedRecord.type}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-gray-500 mr-2">
                    Date:
                  </span>
                  <span className="text-sm text-gray-900">
                    {selectedRecord.date}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-gray-500 mr-2">
                    Country:
                  </span>
                  <span className="text-sm text-gray-900">
                    {selectedRecord.country}
                  </span>
                </div>
              </div>
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Details:
                </h4>
                <p className="text-sm text-gray-600">
                  {selectedRecord.details}
                </p>
              </div>

              {/* Car Image in Modal */}
              <div className="mt-4 border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Damage Visualization
                </h4>
                <div className="relative bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                  <svg
                    className="w-24 h-24 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="bg-red-500 bg-opacity-30 rounded-full w-20 h-20 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">
                        DAMAGE
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
