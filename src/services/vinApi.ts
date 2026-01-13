import type { VinReportData, RecallData, Vehicle } from "../types/vin-decoder";

// Use relative path to leverage Vite proxy in development
// const API_URL = "";
const API_URL = import.meta.env.VITE_API_URL ?? "https://frauwall-auto-dev.azurewebsites.net";

interface ApiResponse {
    vin: string;
    vehicle: {
        make: string;
        model: string;
        modelYear: string;
        Trim: string | null;
        FuelType: string | null;
        PlantCountry: string | null;
        BodyClass: string | null;
        TransmissionStyle: string | null;
        DriveType: string | null;
        EngineModel: string | null;
    };
    recalls: {
        ReportReceivedDate: string;
        NHTSACampaignNumber: string;
        Component: string;
        Summary: string;
        [key: string]: any;
    }[];
}

export const fetchVinReport = async (vin: string): Promise<VinReportData> => {
    try {
        const response = await fetch(`${API_URL}/vin/decode/${vin}`);

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data: ApiResponse = await response.json();

        // Map API Response to App Type
        const mappedVehicle: Vehicle = {
            year: parseInt(data.vehicle.modelYear) || 0,
            make: data.vehicle.make || "Unknown",
            model: data.vehicle.model || "Unknown",
            // Map other fields or provide defaults if they are null
            trim: data.vehicle.Trim || "N/A",
            engine: data.vehicle.EngineModel || "N/A",
            madeIn: data.vehicle.PlantCountry || "N/A",
            fuelType: data.vehicle.FuelType || "N/A",
            transmission: data.vehicle.TransmissionStyle || "N/A",
            bodyStyle: data.vehicle.BodyClass || "N/A",
            driveLine: data.vehicle.DriveType || "N/A",
        };

        const mappedRecalls: RecallData[] = (data.recalls || []).map((recall) => ({
            date: recall.ReportReceivedDate,
            recallNumber: recall.NHTSACampaignNumber,
            country: "Unknown", // Not in API
            component: recall.Component,
            description: recall.Summary,
        }));

        return {
            vin: data.vin,
            vehicle: mappedVehicle,
            recallData: mappedRecalls,
            // Provide empty/default values for the rest to satisfy the type
            summary: {
                totalEvents: 0,
                safetyRecalls: mappedRecalls.length,
                accidents: 0,
                lastMileage: 0,
                salesHistory: 0,
                owners: 0,
                junkSalvage: 0,
            },
            ownership: [],
            checks: {},
            historyEvents: [],
            salesHistory: [],
            ownershipCost: {
                depreciation: [],
                insurance: [],
                fuel: [],
                maintenance: [],
                repair: [],
                taxesFees: [],
                total: 0,
            },
            odometerChecks: [],
            salvageRecords: [],
            titleHistory: { current: [], historical: [] },
            majorTitleBrands: [],
            otherTitleBrands: [],
            vehicleDamages: [],
        };
    } catch (error) {
        console.error("Failed to fetch VIN report:", error);
        if (error instanceof TypeError && error.message === "Failed to fetch") {
            throw new Error("Network error or CORS block. Please check if the backend is running and allows requests from this origin.");
        }
        throw error;
    }
};
