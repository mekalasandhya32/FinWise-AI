/**
 * Rule-based loan eligibility engine — pure, deterministic, unit-testable.
 * Mirrors backend/app/services/eligibility_service.py so client and server agree.
 */

export type EmploymentType = "Salaried" | "Self-employed" | "Freelancer" | "Business" | "Student";
export type LoanPurpose = "Personal" | "Home" | "Auto" | "Education" | "Business" | "Medical";
export type RiskLevel = "Low" | "Moderate" | "High" | "Very High";

export interface LoanInput {
  name: string;
  age: number;
  income: number;           // monthly
  expenses: number;         // monthly
  existingEmi: number;      // monthly
  employmentType: EmploymentType;
  workExperience: number;   // years
  loanAmount: number;
  loanTenure: number;       // months
  loanPurpose: LoanPurpose;
}

export interface LoanResult {
  eligible: boolean;
  score: number;              // 0-100
  risk: RiskLevel;
  estimatedEmi: number;
  disposableIncome: number;
  dtiRatio: number;           // 0-1
  reasons: string[];          // why (not) eligible
  recommendations: string[];
  interestRate: number;       // annualized %, estimated
  maxEligibleAmount: number;
}

const INTEREST_RATE_BY_PURPOSE: Record<LoanPurpose, number> = {
  Home: 8.5,
  Auto: 9.5,
  Education: 10.0,
  Personal: 12.5,
  Business: 13.0,
  Medical: 11.0,
};

const EMPLOYMENT_WEIGHT: Record<EmploymentType, number> = {
  Salaried: 1.0,
  Business: 0.9,
  "Self-employed": 0.85,
  Freelancer: 0.75,
  Student: 0.4,
};

export function calculateEmi(principal: number, annualRate: number, months: number): number {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRate / 12 / 100;
  if (r === 0) return principal / months;
  const emi = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  return Math.round(emi);
}

export interface ValidationError {
  field: keyof LoanInput;
  message: string;
}

export function validateLoanInput(input: Partial<LoanInput>): ValidationError[] {
  const errs: ValidationError[] = [];
  if (!input.name || input.name.trim().length < 2) errs.push({ field: "name", message: "Enter your full name." });
  if (!input.age || input.age < 18 || input.age > 75) errs.push({ field: "age", message: "Age must be between 18 and 75." });
  if (input.income == null || input.income < 0) errs.push({ field: "income", message: "Monthly income is required." });
  if (input.expenses == null || input.expenses < 0) errs.push({ field: "expenses", message: "Monthly expenses required." });
  if (input.existingEmi == null || input.existingEmi < 0) errs.push({ field: "existingEmi", message: "Existing EMI required (0 if none)." });
  if (!input.employmentType) errs.push({ field: "employmentType", message: "Select employment type." });
  if (input.workExperience == null || input.workExperience < 0) errs.push({ field: "workExperience", message: "Work experience required." });
  if (!input.loanAmount || input.loanAmount <= 0) errs.push({ field: "loanAmount", message: "Loan amount must be greater than 0." });
  if (!input.loanTenure || input.loanTenure < 3 || input.loanTenure > 360) errs.push({ field: "loanTenure", message: "Tenure must be 3–360 months." });
  if (!input.loanPurpose) errs.push({ field: "loanPurpose", message: "Select a loan purpose." });
  return errs;
}

export function evaluateLoan(input: LoanInput): LoanResult {
  const rate = INTEREST_RATE_BY_PURPOSE[input.loanPurpose] ?? 12;
  const estimatedEmi = calculateEmi(input.loanAmount, rate, input.loanTenure);

  const disposableIncome = Math.max(0, input.income - input.expenses - input.existingEmi);
  const totalObligations = input.existingEmi + estimatedEmi;
  const dtiRatio = input.income > 0 ? totalObligations / input.income : 1;

  const reasons: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  // Age scoring
  if (input.age < 21) { score -= 15; reasons.push("Applicant is under 21."); }
  else if (input.age > 60) { score -= 15; reasons.push("Applicant is nearing retirement age."); }

  // Income
  if (input.income < 1500) { score -= 25; reasons.push("Monthly income is below the recommended threshold."); recommendations.push("Increase steady monthly income or add a co-applicant."); }

  // DTI
  if (dtiRatio > 0.5) { score -= 30; reasons.push(`Debt-to-income ratio is high (${(dtiRatio * 100).toFixed(0)}%).`); recommendations.push("Reduce existing EMIs or request a smaller loan amount."); }
  else if (dtiRatio > 0.4) { score -= 15; reasons.push(`Debt-to-income ratio is elevated (${(dtiRatio * 100).toFixed(0)}%).`); }

  // Disposable income vs EMI
  if (estimatedEmi > disposableIncome * 0.6) { score -= 20; reasons.push("Estimated EMI consumes too much of your disposable income."); recommendations.push("Extend loan tenure to lower the monthly EMI."); }

  // Employment
  const empWeight = EMPLOYMENT_WEIGHT[input.employmentType] ?? 0.7;
  score = Math.round(score * empWeight);
  if (empWeight < 0.8) recommendations.push("A longer employment or business history strengthens your profile.");

  // Work experience
  if (input.workExperience < 1) { score -= 10; reasons.push("Less than 1 year of work experience."); }
  else if (input.workExperience >= 5) { score += 5; }

  // Loan size sanity — cap: EMI shouldn't exceed 50% of income
  const maxAffordableEmi = input.income * 0.5 - input.existingEmi;
  const r = rate / 12 / 100;
  const maxEligibleAmount = maxAffordableEmi > 0
    ? Math.round((maxAffordableEmi * (Math.pow(1 + r, input.loanTenure) - 1)) / (r * Math.pow(1 + r, input.loanTenure)))
    : 0;

  if (input.loanAmount > maxEligibleAmount && maxEligibleAmount > 0) {
    score -= 10;
    reasons.push(`Requested amount exceeds your safe borrowing limit (~${maxEligibleAmount.toLocaleString()}).`);
    recommendations.push(`Consider borrowing up to ${maxEligibleAmount.toLocaleString()} for a healthier profile.`);
  }

  score = Math.max(0, Math.min(100, score));

  const eligible = score >= 55 && dtiRatio <= 0.55 && disposableIncome >= estimatedEmi * 1.1;

  let risk: RiskLevel;
  if (score >= 80) risk = "Low";
  else if (score >= 65) risk = "Moderate";
  else if (score >= 45) risk = "High";
  else risk = "Very High";

  if (eligible && reasons.length === 0) reasons.push("Strong income, healthy DTI, and stable employment profile.");
  if (!eligible && recommendations.length === 0) recommendations.push("Improve savings, clear existing debt, or apply with a co-borrower.");
  if (recommendations.length === 0) recommendations.push("Maintain your current profile and pay EMIs on time to boost credit health.");

  return {
    eligible,
    score,
    risk,
    estimatedEmi,
    disposableIncome,
    dtiRatio,
    reasons,
    recommendations,
    interestRate: rate,
    maxEligibleAmount: Math.max(0, maxEligibleAmount),
  };
}
