/**
 * Local persistence for FinWise AI records (browser localStorage).
 * Replaces the previous Google Sheets bridge — same call shape, no network.
 */

export type RecordType = "loan" | "credit" | "emi";

export interface UserInfo {
  name?: string;
  email?: string;
}

export interface StoredRecord<T = unknown> {
  id: string;
  type: RecordType;
  payload: T;
  user?: UserInfo;
  status?: string;
  timestamp: string;
}

export interface LoanApplicationPayload {
  loanType: string;
  loanAmount: number;
  monthlyIncome: number;
  existingEmi: number;
  employment: string;
  yearsEmployed: number;
}

export interface CreditAnalysisPayload {
  score: number;
  paymentHistory: string;
  utilization: string;
  accountAge: string;
  recentInquiries: number;
  risk: string;
}

export interface EmiCalculationPayload {
  loanAmount: number;
  rate: number;
  months: number;
  emi: number;
  totalInterest: number;
  totalPayable: number;
}

const STORAGE_KEY = "finwise.records";
const MAX_RECORDS = 200;

function readAll(): StoredRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as StoredRecord[]) : [];
  } catch {
    return [];
  }
}

function writeAll(records: StoredRecord[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records.slice(0, MAX_RECORDS)));
}

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function save<T>(type: RecordType, payload: T, user?: UserInfo, status?: string): StoredRecord<T> {
  if (typeof window === "undefined") {
    throw new Error("Local storage is only available in the browser.");
  }
  const record: StoredRecord<T> = {
    id: makeId(),
    type,
    payload,
    user,
    status,
    timestamp: new Date().toISOString(),
  };
  writeAll([record as StoredRecord, ...readAll()]);
  return record;
}

export const saveLoanApplication = (
  payload: LoanApplicationPayload,
  user?: UserInfo,
  status = "submitted",
) => save("loan", payload, user, status);

export const saveCreditAnalysis = (
  payload: CreditAnalysisPayload,
  user?: UserInfo,
  status = "analyzed",
) => save("credit", payload, user, status);

export const saveEmiCalculation = (
  payload: EmiCalculationPayload,
  user?: UserInfo,
  status = "calculated",
) => save("emi", payload, user, status);

export function listRecords(type?: RecordType): StoredRecord[] {
  const all = readAll();
  return type ? all.filter((r) => r.type === type) : all;
}

export function clearRecords() {
  if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
}
