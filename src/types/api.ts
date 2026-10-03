// =============================================================================
// VEHIQ API Types
// =============================================================================

// --- Generic API response wrapper ---

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: PaginationMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

// --- Vehicle lookup ---

export interface VehicleLookupRequest {
  matricula?: string;
  vin?: string;
}

export interface VehicleSummary {
  id: string;
  matricula: string;
  vin: string | null;
  marca: string;
  modelo: string;
  version: string | null;
  year: number | null;
  combustible: string | null;
  potenciaCv: number | null;
  color: string | null;
  provinciaActual: string | null;
  dgtStatus: string | null;
}

export interface VehicleDetail extends VehicleSummary {
  carroceria: string | null;
  cilindrada: number | null;
  potenciaKw: number | null;
  co2Emissions: number | null;
  euroNorm: string | null;
  transmision: string | null;
  traccion: string | null;
  puertas: number | null;
  plazas: number | null;
  pesoMax: number | null;
  tara: number | null;
  uso: string | null;
  historyCount: number;
  inspectionCount: number;
  fraudAlertCount: number;
  lastInspection: InspectionSummary | null;
  latestMileage: MileagePoint | null;
}

// --- History ---

export interface HistoryEvent {
  id: string;
  eventType: string;
  eventDate: string;
  description: string | null;
  source: string;
  province: string | null;
}

export interface VehicleHistoryResponse {
  vehicle: VehicleSummary;
  ownerCount: number;
  events: HistoryEvent[];
  mileageHistory: MileagePoint[];
  inspections: InspectionSummary[];
  fraudAlerts: FraudAlertSummary[];
}

// --- Valuations ---

export interface ValuationRequest {
  matricula?: string;
  vin?: string;
  mileage: number;
  condition: 'COMO_NUEVO' | 'MUY_BUENO' | 'BUENO' | 'ACEPTABLE' | 'NECESITA_REPARACION';
  province?: string;
  extras?: string[];
}

export interface ValuationResponse {
  vehicle: VehicleSummary;
  valuation: {
    low: number;       // cents
    mid: number;
    high: number;
    confidence: number;
    modelVersion: string;
  };
  market: {
    trend: 'SUBIENDO' | 'ESTABLE' | 'BAJANDO';
    daysToSell: number;
    similarListings: number;
    avgListingPrice: number;
  };
  factors: ValuationFactor[];
}

export interface ValuationFactor {
  name: string;
  impact: number;      // Percentage impact
  direction: 'positive' | 'negative' | 'neutral';
  description: string;
}

// --- Fraud ---

export interface FraudAlertSummary {
  id: string;
  alertType: string;
  severity: 'CRITICA' | 'ALTA' | 'MEDIA' | 'BAJA';
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

export interface FraudCheckResponse {
  vehicle: VehicleSummary;
  riskScore: number;    // 0-100
  riskLevel: 'SAFE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  alerts: FraudAlertSummary[];
  checks: FraudCheck[];
}

export interface FraudCheck {
  name: string;
  status: 'PASS' | 'WARNING' | 'FAIL' | 'UNAVAILABLE';
  detail: string;
}

// --- Inspections ---

export interface InspectionSummary {
  id: string;
  date: string;
  result: 'FAVORABLE' | 'DESFAVORABLE' | 'NEGATIVA';
  mileage: number | null;
  stationName: string | null;
  nextInspection: string | null;
}

// --- Mileage ---

export interface MileagePoint {
  date: string;
  mileage: number;
  source: string;
}

// --- Analytics ---

export interface MarketAnalytics {
  marca: string;
  modelo: string;
  avgPrice: number;
  medianPrice: number;
  minPrice: number;
  maxPrice: number;
  totalListings: number;
  avgMileage: number;
  avgAge: number;
  priceByProvince: Record<string, number>;
  priceTrend: PriceTrendPoint[];
}

export interface PriceTrendPoint {
  month: string;
  avgPrice: number;
  volume: number;
}

// --- Dashboard ---

export interface DashboardStats {
  totalLookups: number;
  lookupsThisMonth: number;
  quotaUsed: number;
  quotaTotal: number;
  recentLookups: RecentLookup[];
  topBrands: { brand: string; count: number }[];
}

export interface RecentLookup {
  id: string;
  matricula: string;
  marca: string;
  modelo: string;
  type: string;
  createdAt: string;
}
