import { sampleVinData } from "./sample-vin-data";
import type { VinReportData } from "../types/vin-decoder";

export const mockService = {
    getVinReport: (vin: string): VinReportData => {
        // Clone the sample data to avoid mutating the original
        const report: VinReportData = JSON.parse(JSON.stringify(sampleVinData));

        // Override with the requested VIN
        report.vin = vin;

        // Specific logic for test cases
        if (vin === "JHSDBJHBJHAMDB128") {
            // Detailed report test case
            // We can customize more fields here if needed to make it look unique
            report.vehicle.make = "TEST-MAKE-DETAILED";
        } else if (vin === "1GHSDJSIUYHSIKSDS") {
            // Premium report test case
            report.vehicle.make = "TEST-MAKE-PREMIUM";
        }

        return report;
    },

    getMaintenanceData: (vin: string) => {
        // Default base data
        const baseData = {
            vin: vin,
            year: "2018",
            make: "Honda",
            model: "Civic",
            trim: "LX Sedan",
            engine: "2.0L 4-Cylinder",
            fraudScore: 85,
            lastMileage: 85420,
            lastService: "March 15, 2024",
            totalRecords: 28,
            avgInterval: 5200,
            majorServices: 3,
        };

        if (vin === "JHSDBJHBJHAMDB128") {
            // Customized for the requested maintenance test VIN
            return {
                ...baseData,
                year: "2020",
                make: "Toyota",
                model: "Camry",
                fraudScore: 92,
            };
        }

        return baseData;
    }
};
