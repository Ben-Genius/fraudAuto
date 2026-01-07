import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  Copy,
  Calendar,
  Gauge,
  Wrench,
  TrendingUp,
  Shield,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { MaintenanceTimeline } from "../../components/ui/maintenance-timeline";
import { OdometerAnalysis } from "../../components/ui/odometer-analysis";
import { AccidentHistory } from "../../components/ui/accident-history";
import { RecallsTSBs } from "../../components/ui/recalls-tsbs";
import { ReportActions } from "../../components/ui/report-actions";
import { IMAGES } from "../../assets/images";
import { mockService } from "../../data/mock-service";

export const MaintenanceHistory = () => {
  const [searchParams] = useSearchParams();
  const vin = searchParams.get("vin") || "1HGBH41JXMN109186"; // Fallback to default if no VIN

  const [expandedSections, setExpandedSections] = useState({
    timeline: true,
    odometer: true,
    accidents: true,
    recalls: true,
    actions: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const CollapsibleSection = ({
    title,
    sectionKey,
    children,
  }: {
    title: string;
    sectionKey: keyof typeof expandedSections;
    children: React.ReactNode;
  }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {expandedSections[sectionKey] ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <div className="border-t border-gray-200">{children}</div>
      )}
    </div>
  );

  const vehicleData = useMemo(() => mockService.getMaintenanceData(vin), [vin]);

  const alerts = [
    {
      type: "warning",
      icon: AlertTriangle,
      text: "Odometer Discrepancy Detected",
      critical: true,
    },
    { type: "info", icon: Info, text: "4 Previous Owners", critical: false },
    {
      type: "success",
      icon: CheckCircle,
      text: "No Major Accidents Reported",
      critical: false,
    },
    {
      type: "warning",
      icon: AlertTriangle,
      text: "Open Recall Notice",
      critical: false,
    },
    {
      type: "error",
      icon: X,
      text: "Last Service Was 15,000 Miles Ago",
      critical: true,
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getAlertStyle = (type: string) => {
    switch (type) {
      case "error":
        return "border-red-200 bg-red-50 text-red-800";
      case "warning":
        return "border-yellow-200 bg-yellow-50 text-yellow-800";
      case "success":
        return "border-green-200 bg-green-50 text-green-800";
      default:
        return "border-blue-200 bg-blue-50 text-blue-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-[100rem]  mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Vehicle Maintenance Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Comprehensive vehicle verification and maintenance history
          </p>
        </div>

        {/* Vehicle Summary Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-4">
          <div className="bg-white rounded-xl  border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-6 flex-wrap">
              <div className="flex items-center space-x-4 flex-col md:flex-row">
                <div className="w-50 h-30 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                  <img
                    src={IMAGES.civic}
                    alt=" Image of honda civic"
                    className=" h-30 object-cover"
                  />{" "}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {vehicleData.year} {vehicleData.make} {vehicleData.model}
                  </h2>
                  <p className="text-gray-600">
                    {vehicleData.trim} • {vehicleData.engine}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-sm text-gray-500">VIN:</span>
                    <span className="font-mono text-sm">{vehicleData.vin}</span>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Copy className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* FraudWall Score */}
              <div className="text-center pt-3">
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-full ${getScoreColor(
                    vehicleData.fraudScore
                  )}`}
                >
                  <Shield className="h-5 w-5 mr-2" />
                  <span className="font-bold text-lg">
                    {vehicleData.fraudScore}/100
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">FraudWall Score</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4 px-1">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${getAlertStyle(
                  alert.type
                )} ${alert.critical ? " ring-red-200" : ""}`}
              >
                <div className="flex items-center space-x-3">
                  <alert.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{alert.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Alert Cards */}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-1">
          <div className="bg-white rounded-xl  border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Wrench className="h-6 w-6 text-blue-600" />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Total Service Records
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {vehicleData.totalRecords}
            </p>
            <p className="text-sm text-green-600 mt-1">
              Complete history available
            </p>
          </div>

          <div className="bg-white rounded-xl  border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-50 rounded-lg">
                <Gauge className="h-6 w-6 text-green-600" />
              </div>
              <Clock className="h-4 w-4 text-blue-500" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Average Mileage Interval
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {vehicleData.avgInterval.toLocaleString()}
            </p>
            <p className="text-sm text-blue-600 mt-1">miles between services</p>
          </div>

          <div className="bg-white rounded-xl  border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Major Services Completed
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {vehicleData.majorServices}
            </p>
            <p className="text-sm text-green-600 mt-1">
              Timing belt, transmission, etc.
            </p>
          </div>
        </div>

        {/* Vehicle Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-1">
          {/* Last Service Info */}
          <div className="bg-white rounded-xl  border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Service Activity
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Last Service Date</span>
                <span className="text-sm font-medium text-gray-900">
                  {vehicleData.lastService}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">
                  Last Reported Mileage
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {vehicleData.lastMileage.toLocaleString()} miles
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Service Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Overdue
                </span>
              </div>
            </div>
          </div>

          {/* Service Type Breakdown */}
          <div className="bg-white rounded-xl  border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Service Type Distribution
            </h3>
            <div className="space-y-3">
              {[
                { type: "Oil Changes", percentage: 40, color: "bg-blue-500" },
                {
                  type: "Tire Services",
                  percentage: 20,
                  color: "bg-green-500",
                },
                {
                  type: "Brake Services",
                  percentage: 15,
                  color: "bg-yellow-500",
                },
                { type: "Engine Repairs", percentage: 15, color: "bg-red-500" },
                { type: "Other", percentage: 10, color: "bg-gray-500" },
              ].map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${service.color}`}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {service.type}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {service.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Collapsible Sections */}
        <CollapsibleSection title="Maintenance Timeline" sectionKey="timeline">
          <MaintenanceTimeline />
        </CollapsibleSection>

        <CollapsibleSection title="Odometer Analysis" sectionKey="odometer">
          <OdometerAnalysis />
        </CollapsibleSection>

        <CollapsibleSection
          title="Accident & Damage History"
          sectionKey="accidents"
        >
          <AccidentHistory />
        </CollapsibleSection>

        <CollapsibleSection
          title="Recalls & Technical Service Bulletins"
          sectionKey="recalls"
        >
          <RecallsTSBs />
        </CollapsibleSection>

        <ReportActions />
      </div>
    </div>
  );
};
