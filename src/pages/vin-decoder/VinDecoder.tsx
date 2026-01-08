"use client";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { fetchVinReport } from "../../services/vinApi";
import { Loader2 } from "lucide-react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

// Import components
import { VinDecoderHero } from "../../components/vin-decoder/VinDecoderHero";
import { VinSearchForm } from "../../components/vin-decoder/VinSearchForm";
import { ReportHeader } from "../../components/vin-decoder/ReportHeader";
import { SummaryCards } from "../../components/vin-decoder/SummaryCards";
import { VehicleSpecs } from "../../components/vin-decoder/VehicleSpecs";
import { OwnershipHistory } from "../../components/vin-decoder/OwnershipHistory";
import { HistoryEvents } from "../../components/vin-decoder/HistoryEvents";
import { SalesHistory } from "../../components/vin-decoder/SalesHistory";
import { SafetyChecks } from "../../components/vin-decoder/SafetyChecks";
import { OdometerCheck } from "../../components/vin-decoder/OdometerCheck";
import { JunkSalvage } from "../../components/vin-decoder/JunkSalvage";
import { TitleHistory } from "../../components/vin-decoder/TitleHistory";
import { MajorTitleBrands } from "../../components/vin-decoder/MajorTitleBrands";
import { OtherTitleBrands } from "../../components/vin-decoder/OtherTitleBrands";
import { MarketPriceAnalysis } from "../../components/vin-decoder/MarketPriceAnalysis";
import { OwnershipCost } from "../../components/vin-decoder/OwnershipCost";
import { OwnershipCostChart } from "../../components/vin-decoder/OwnershipCostChart";
import { SalesHistoryChart } from "../../components/vin-decoder/SalesHistoryChart";
import { ReportActions } from "../../components/vin-decoder/ReportActions";
import { ReportDisclaimer } from "../../components/vin-decoder/ReportDisclaimer";
import { ReportOutline } from "../../components/vin-decoder/ReportOutline";
import type { VinReportData } from "../../types/vin-decoder";
import { SafetyRecallCheck } from "../../components/vin-decoder/SafetyRecallCheck";
import { VehicleDamages } from "../../components/vin-decoder/VehicleDamages";
import { PriceChanges } from "../../components/vin-decoder/PriceChanges";
import { MarketPriceYear } from "../../components/vin-decoder/MarketPriceYear";
import { MarketPriceMileage } from "../../components/vin-decoder/MarketPriceMileage";

const VinDecoder = () => {
  useDocumentTitle("VIN Decoder");
  const [vin, setVin] = useState("");
  const [showSample, setShowSample] = useState(false);
  const [reportData, setReportData] = useState<VinReportData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const titles = useMemo(
    () => ["comprehensive", "reliable", "instant", "secure", "trusted"],
    []
  );

  useEffect(() => {
    const vinParam = searchParams.get("vin");

    if (vinParam && vinParam.length >= 17) {
      setVin(vinParam);
      handleVinLookup(vinParam);
    } else if (vinParam) {
      setVin(vinParam);
    }
  }, [searchParams]);

  const handleVinLookup = async (vinNumber: string) => {
    setIsLoading(true);
    setError(null);
    setShowSample(false);

    try {
      const data = await fetchVinReport(vinNumber);
      setReportData(data);
      setShowSample(true);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch VIN report. Please try again or check the VIN.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vin.length === 17) {
      navigate(`/vin-decoder?vin=${vin}`);
    }
  };

  return (
    <div className="min-h-screen bg-white/50 overflow-x-hidden">
      <ReportOutline />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-gray-500 font-medium">Fetching vehicle report...</p>
        </div>
      ) : error ? (
        <div className="w-full max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <VinSearchForm vin={vin} setVin={setVin} onSubmit={handleSubmit} />
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
            {error}
          </div>
        </div>
      ) : showSample && reportData ? (
        <div className="w-full max-w-[100rem] mx-auto py-8 sm:py-12 md:py-16 lg:py-20 mt-4 sm:mt-6 md:mt-8 lg:mt-10 px-4 sm:px-6 lg:px-8">
          <ReportHeader vin={reportData.vin} vehicle={reportData.vehicle} />
          <div className="my-4 sm:my-6 md:my-8" />
          <SummaryCards summary={reportData.summary} />
          <div className="my-4 sm:my-6 md:my-8" />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-12">
            <div className="xl:col-span-2 space-y-6 xl:space-y-12 min-w-0">
              <div id="ownership-history">
                <OwnershipHistory ownership={reportData.ownership} />
              </div>

              <div id="vehicle-specs">
                <VehicleSpecs vehicle={reportData.vehicle} />
              </div>

              <div id="history-events">
                <HistoryEvents
                  events={reportData.historyEvents}
                  totalEvents={reportData.summary.totalEvents}
                  reportData={reportData.historyEvents}
                />
              </div>

              <div id="safety-recall-check">
                <SafetyRecallCheck recallData={reportData.recallData} />
              </div>

              <div id="junk-salvage">
                <JunkSalvage salvageRecords={reportData.salvageRecords} />
              </div>

              <div id="title-history">
                <TitleHistory titleHistory={reportData.titleHistory} />
              </div>

              <div id="vehicle-damages">
                <VehicleDamages vehicleDamages={reportData.vehicleDamages} />
              </div>

              <div id="sales-history">
                <SalesHistory
                  sales={reportData.salesHistory}
                  totalSales={reportData.summary.salesHistory}
                />
              </div>

              <div id="market-price">
                <MarketPriceAnalysis />
                <PriceChanges />
              </div>

              <OwnershipCost />
            </div>

            <div className="space-y-6 xl:space-y-12 xl:sticky xl:top-24 xl:self-start min-w-0">
              <div id="safety-checks">
                <SafetyChecks checks={reportData.checks} />
              </div>

              <OwnershipCostChart />

              <div id="odometer-check">
                <OdometerCheck odometerChecks={reportData.odometerChecks} />
              </div>

              <div id="major-title-brands">
                <MajorTitleBrands
                  majorTitleBrands={reportData.majorTitleBrands}
                />
              </div>

              <div id="other-title-brands">
                <OtherTitleBrands
                  otherTitleBrands={reportData.otherTitleBrands}
                />
              </div>

              <SalesHistoryChart sales={reportData.salesHistory} />
              <MarketPriceYear />
              <MarketPriceMileage />
              <ReportActions />
              <ReportDisclaimer />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <VinDecoderHero titles={titles} />
          <VinSearchForm vin={vin} setVin={setVin} onSubmit={handleSubmit} />
        </div>
      )}
    </div>
  );
};

export default VinDecoder;
