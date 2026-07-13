/**
 * TanStack server functions that expose the Google Sheets bridge to the client.
 * Validation lives here; transport lives in ./sheets.server.
 */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const userSchema = z
  .object({
    name: z.string().trim().max(120).optional(),
    email: z.string().trim().email().max(200).optional().or(z.literal("")),
  })
  .partial()
  .optional();

const loanSchema = z.object({
  payload: z.object({
    loanType: z.string().min(1).max(40),
    loanAmount: z.number().nonnegative(),
    monthlyIncome: z.number().nonnegative(),
    existingEmi: z.number().nonnegative(),
    employment: z.string().min(1).max(40),
    yearsEmployed: z.number().nonnegative(),
  }),
  user: userSchema,
  status: z.string().max(40).optional(),
});

const creditSchema = z.object({
  payload: z.object({
    score: z.number().min(300).max(900),
    paymentHistory: z.string().max(20),
    utilization: z.string().max(20),
    accountAge: z.string().max(20),
    recentInquiries: z.number().int().nonnegative(),
    risk: z.string().max(20),
  }),
  user: userSchema,
  status: z.string().max(40).optional(),
});

const emiSchema = z.object({
  payload: z.object({
    loanAmount: z.number().nonnegative(),
    rate: z.number().nonnegative(),
    months: z.number().int().positive(),
    emi: z.number().nonnegative(),
    totalInterest: z.number().nonnegative(),
    totalPayable: z.number().nonnegative(),
  }),
  user: userSchema,
  status: z.string().max(40).optional(),
});

async function withService<R>(fn: (svc: import("./sheets.server").GoogleSheetsService) => Promise<R>) {
  const { GoogleSheetsService, SheetsServiceError } = await import("./sheets.server");
  try {
    const svc = new GoogleSheetsService();
    return await fn(svc);
  } catch (err) {
    if (err instanceof SheetsServiceError) {
      throw new Error(err.message);
    }
    throw err;
  }
}

export const saveLoanApplication = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => loanSchema.parse(data))
  .handler(async ({ data }) => withService((s) => s.saveLoanApplication(data.payload, data.user, data.status)));

export const saveCreditAnalysis = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => creditSchema.parse(data))
  .handler(async ({ data }) => withService((s) => s.saveCreditAnalysis(data.payload, data.user, data.status)));

export const saveEmiCalculation = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => emiSchema.parse(data))
  .handler(async ({ data }) => withService((s) => s.saveEmiCalculation(data.payload, data.user, data.status)));
