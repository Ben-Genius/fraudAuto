"use client";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { sampleVinData } from "../../data/sample-vin-data";

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
  const [vin, setVin] = useState("");
  const [showSample, setShowSample] = useState(false);
  const [reportData, setReportData] = useState<VinReportData | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const titles = useMemo(
    () => ["secure", "reliable", "instant", "comprehensive", "trusted"],
    []
  );

  useEffect(() => {
    const vinParam = searchParams.get("vin");
    const paid = searchParams.get("paid");
    
    if (vinParam && vinParam.length === 17) {
      setVin(vinParam);
      if (paid === 'true') {
        setShowSample(true);
        setReportData(sampleVinData);
      } else {
        handleVinLookup(vinParam);
      }
    } else if (vinParam) {
      setVin(vinParam);
    }
  }, [searchParams]);

  const handleVinLookup = (vinNumber: string) => {
    const hasLimitedData = vinNumber.startsWith('1') 
    
    if (hasLimitedData) {
      navigate(`/checkout?vin=${vinNumber}`);
    } else {
      setShowSample(true);
      setReportData(sampleVinData);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vin.length === 17) {
      handleVinLookup(vin);
      navigate(`/vin-decoder?vin=${vin}`);
    }
  };

  return (
    <div className="min-h-screen bg-white/50">
      <ReportOutline />
      {showSample && reportData ? (
        <div className="max-w-[100rem] mx-auto py-20 mt-10">
          <ReportHeader vin={reportData.vin} vehicle={reportData.vehicle} />
          <br />
          <SummaryCards summary={reportData.summary} />
          <br />
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
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

              <br />
            </div>

            <div className="space-y-12">
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
        <div className="max-w-[100rem] mx-auto px-6">
          <VinDecoderHero titles={titles} />
          <VinSearchForm vin={vin} setVin={setVin} onSubmit={handleSubmit} />
        </div>
      )}
    </div>
  );
};

export default VinDecoder;
