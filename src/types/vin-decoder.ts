export interface Vehicle {
  year: number;
  make: string;
  model: string;
  engine: string;
  madeIn: string;
  fuelType: string;
  transmission: string;
  bodyStyle: string;
  driveLine: string;
  trim: string;
}

export interface ReportHeaderProps {
  vin: string;
  vehicle: Vehicle;
}
export interface SummaryCardsProps {
  summary: Summary;
}
export interface HistoryEventsProps {
  events: HistoryEvent[];
  totalEvents: number;
  reportData: HistoryEvent[];
}

export interface SalesHistoryProps {
  sales: Sale[];
  totalSales: number;
}
export interface OwnershipCostChartProps {
  ownershipCost: OwnershipCostData;
}
export interface SalesHistoryChartProps {
  sales: Sale[];
}

export interface HistoryEventsChartProps {
  events: HistoryEvent[];
}

export interface Summary {
  totalEvents: number;
  safetyRecalls: number;
  accidents: number;
  lastMileage: number;
  salesHistory: number;
  owners: number;
  junkSalvage: number;
}
export interface OwnershipCostProps {
  ownershipCost: OwnershipCostData;
}
export interface OwnershipHistoryProps {
  ownership: Owner[];
}

export interface VehicleSpecsProps {
  vehicle: Vehicle;
}
export interface OwnershipCostProps {
  ownershipCost: OwnershipCostData;
}

export interface Owner {
  owner: number;
  type: string;
  country: string;
  estMiYear: number;
  lastOdometer: number;
  purchased: number;
  usage: string;
}

export interface Check {
  status: "clean" | "warning" | "error";
  message: string;
  count: number;
}

export interface HistoryEvent {
  date: string;
  mileage: number;
  provider: string;
  event: string;
  location: string;
}

export interface Sale {
  date: string;
  location: string;
  price: string;
  mileage: number;
  condition: string;
  damage: string;
  photos: number;
  saleType: string;
  country: string;
  images: string[];
  specifications: {
    fuelType: string;
    engine: string;
    transmission: string;
    bodyStyle: string;
    exteriorColor: string;
    interiorColor: string;
    driveTrain: string;
    trimLevel?: string;
  };
  equipment: string[];
  additionalInfo: {
    damageType?: string;
    lossType?: string;
    vehicleClass?: string;
    cylinders?: string;
    odometerStatus?: string;
    engineSize?: string;
    radioType?: string;
    leftSideAirbag?: string;
    rightSideAirbag?: string;
    driverAirbag?: string;
    passengerAirbag?: string;
    cdPlayer?: string;
    vinStatus?: string;
    warranty?: string;
    vehicleTitle?: string;
    numberOfCylinders?: number;
    subModel?: string;
  };
  notes?: string;
  dealerInfo?: {
    name: string;
    address: string;
  };
}

export interface OwnershipCostData {
  depreciation: number[];
  insurance: number[];
  fuel: number[];
  maintenance: number[];
  repair: number[];
  taxesFees: number[];
  total: number;
}

export interface OdometerCheckData {
  id: number;
  checkType: string;
  status: string;
  hasProblem: boolean;
  date?: string;
  description?: string;
}

export interface SalvageRecord {
  id: number;
  obtainedDate: string;
  reportingEntity: string;
  location: string;
  phone?: string;
  email?: string;
  recordType: string;
  disposition?: string;
  intendedForExport?: string;
}

export interface TitleRecord {
  id: number;
  titleIssueDate: string;
  state: string;
  mileage: string;
  event: string;
}

export interface TitleBrandCheck {
  id: number;
  brandType: string;
  status: string;
  hasProblem: boolean;
  date?: string;
}

export interface VehicleDamage {
  id: number;
  date: string;
  country: string;
  damageType: string;
  areaOfImpact: string;
  description?: string;
}

export interface VinReportData {
  vin: string;
  vehicle: Vehicle;
  summary: Summary;
  ownership: Owner[];
  checks: Record<string, Check>;
  historyEvents: HistoryEvent[];
  salesHistory: Sale[];
  ownershipCost: OwnershipCostData;
  odometerChecks: OdometerCheckData[];
  salvageRecords: SalvageRecord[];
  titleHistory: {
    current: TitleRecord[];
    historical: TitleRecord[];
  };
  majorTitleBrands: TitleBrandCheck[];
  otherTitleBrands: TitleBrandCheck[];
  vehicleDamages: VehicleDamage[];
}

export interface VinReportData {
  vin: string;
  vehicle: Vehicle;
  summary: Summary;
  ownership: Owner[];
  checks: Record<string, Check>;
  historyEvents: HistoryEvent[];
  salesHistory: Sale[];
  ownershipCost: OwnershipCostData;
  recallData: RecallData[];
}
export interface RecallData {
  date: string;
  recallNumber: string;
  country: string;
  component: string;
  description: string;
}
export interface SafetyRecallCheckProps {
  recallData: RecallData[];
}

export interface SalesHistoryProps {
  sales: Sale[];
  totalSales: number;
}

export interface OwnershipCostProps {
  ownershipCost: OwnershipCostData;
}

export interface CostBreakdown {
  title: string;
  year1: number;
  year2: number;
  year3: number;
  year4: number;
  year5: number;
  total: number;
  color: string;
}
