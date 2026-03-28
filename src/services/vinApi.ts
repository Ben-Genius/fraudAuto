import type { VehicleHistoryData, VinReportData, Vehicle, RecallData } from "../types/vin-decoder";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "https://frauwall-auto-dev.azurewebsites.net";

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function apiFetch(path: string, options: RequestInit = {}): Promise<any> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(options.headers as Record<string, string> | undefined),
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const err = new Error(body.error || body.message || `API Error: ${response.statusText}`) as any;
    err.status = response.status;
    err.body = body;
    throw err;
  }

  return response.json();
}

// ─── Auth ──────────────────────────────────────────────────────────────────────

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  isEmailVerified: boolean;
  availableReportCredits: number;
  createdAt: string;
  accessToken: string;
  refreshToken: string;
}

export async function register(payload: RegisterPayload): Promise<void> {
  await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function login(payload: LoginPayload): Promise<UserData> {
  const result = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const user: UserData = result.data;
  localStorage.setItem("token", user.accessToken);
  localStorage.setItem("refreshToken", user.refreshToken);
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

export function getStoredUser(): UserData | null {
  try {
    const raw = localStorage.getItem("user");
    return raw ? (JSON.parse(raw) as UserData) : null;
  } catch {
    return null;
  }
}

export function logout(): void {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
}

export async function verifyEmail(token: string): Promise<void> {
  await apiFetch(`/auth/verify-email?token=${encodeURIComponent(token)}`);
}

export async function forgotPassword(email: string): Promise<void> {
  await apiFetch("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function resetPassword(payload: { token: string; newPassword: string }): Promise<void> {
  await apiFetch("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ─── Subscription ─────────────────────────────────────────────────────────────

export interface SubscriptionStatus {
  hasActivePlan: boolean;
  plan: "standard" | "deluxe" | null;
  expiresAt: string | null;
}

/**
 * Decodes a VIN and returns a structured report (used by VinDecoder page).
 */
export async function fetchVinReport(vin: string): Promise<VinReportData> {
  const data = await apiFetch(`/vin/decode/${vin}`);

  const mappedVehicle: Vehicle = {
    year: parseInt(data.vehicle?.modelYear) || 0,
    make: data.vehicle?.make || "Unknown",
    model: data.vehicle?.model || "Unknown",
    trim: data.vehicle?.Trim || "N/A",
    engine: data.vehicle?.EngineModel || "N/A",
    madeIn: data.vehicle?.PlantCountry || "N/A",
    fuelType: data.vehicle?.FuelType || "N/A",
    transmission: data.vehicle?.TransmissionStyle || "N/A",
    bodyStyle: data.vehicle?.BodyClass || "N/A",
    driveLine: data.vehicle?.DriveType || "N/A",
  };

  const mappedRecalls: RecallData[] = (data.recalls || []).map((r: any) => ({
    date: r.ReportReceivedDate,
    recallNumber: r.NHTSACampaignNumber,
    country: "Unknown",
    component: r.Component,
    description: r.Summary,
  }));

  return {
    vin: data.vin,
    vehicle: mappedVehicle,
    recallData: mappedRecalls,
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
}

/**
 * Initiates a VIN history lookup.
 * Returns full report if subscribed, limited data + subscriptionRequired:true if not.
 */
export async function fetchVehicleHistory(vin: string): Promise<VehicleHistoryData> {
  const result = await apiFetch(`/vehicle-history/${vin}`);
  return result.data;
}

/**
 * Initiates a subscription payment via Paystack.
 * Returns the authorization_url for redirect.
 */
export async function initiateSubscription(
  plan: "standard" | "deluxe"
): Promise<{ authorizationUrl: string; reference: string; plan: string }> {
  const result = await apiFetch("/subscriptions/initiate", {
    method: "POST",
    body: JSON.stringify({ plan }),
  });
  return result.data;
}

/**
 * Checks the current user's subscription status.
 * Silently returns inactive state for unauthenticated users (401).
 */
export async function getSubscriptionStatus(): Promise<SubscriptionStatus> {
  try {
    const result = await apiFetch("/subscriptions/status");
    return result.data;
  } catch (err: any) {
    if (err.status === 401) {
      return { hasActivePlan: false, plan: null, expiresAt: null };
    }
    throw err;
  }
}
