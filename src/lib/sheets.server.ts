/**
 * Google Apps Script bridge — server-only.
 *
 * The FinWise app POSTs a normalized envelope to a single Apps Script Web App
 * URL, which fans out to the right worksheet (Loan / Credit / EMI). Keeping the
 * transport in one place makes it easy to swap for the direct Sheets API later
 * without touching the callers.
 */

export type SheetEntryType = "loan" | "credit" | "emi";

export interface UserInfo {
  name?: string;
  email?: string;
}

export interface SheetEnvelope<T> {
  type: SheetEntryType;
  payload: T;
  user?: UserInfo;
  status?: string;
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

export class SheetsServiceError extends Error {
  constructor(message: string, public readonly status: number = 500) {
    super(message);
    this.name = "SheetsServiceError";
  }
}

/**
 * Reusable client for the Apps Script Web App. One instance per request is
 * fine — construction is cheap and there is no persistent connection.
 */
export class GoogleSheetsService {
  private readonly endpoint: string;

  constructor(endpoint = process.env.GOOGLE_APPS_SCRIPT_URL) {
    if (!endpoint) {
      throw new SheetsServiceError(
        "GOOGLE_APPS_SCRIPT_URL is not configured on the server.",
        500,
      );
    }
    this.endpoint = endpoint;
  }

  private async post<T>(envelope: SheetEnvelope<T>): Promise<{ ok: true; rows: number }> {
    let res: Response;
    try {
      res = await fetch(this.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(envelope),
        redirect: "follow",
      });
    } catch (err) {
      throw new SheetsServiceError(
        `Network error contacting Google Apps Script: ${(err as Error).message}`,
        502,
      );
    }

    const text = await res.text();
    let data: { ok?: boolean; error?: string; rows?: number } = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      throw new SheetsServiceError(
        `Invalid response from Apps Script (status ${res.status}): ${text.slice(0, 200)}`,
        502,
      );
    }

    if (!res.ok || data.ok === false) {
      throw new SheetsServiceError(
        data.error || `Apps Script request failed with status ${res.status}`,
        res.status || 500,
      );
    }

    return { ok: true, rows: data.rows ?? 0 };
  }

  saveLoanApplication(payload: LoanApplicationPayload, user?: UserInfo, status = "submitted") {
    return this.post({ type: "loan", payload, user, status });
  }

  saveCreditAnalysis(payload: CreditAnalysisPayload, user?: UserInfo, status = "analyzed") {
    return this.post({ type: "credit", payload, user, status });
  }

  saveEmiCalculation(payload: EmiCalculationPayload, user?: UserInfo, status = "calculated") {
    return this.post({ type: "emi", payload, user, status });
  }
}
