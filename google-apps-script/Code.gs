/**
 * FinWise AI — Google Apps Script Web App
 * ----------------------------------------
 * Deployment (one-time):
 *   1. Create a new Google Sheet. Copy its ID (from the URL).
 *   2. Open Extensions → Apps Script. Paste this file into Code.gs.
 *   3. Replace SPREADSHEET_ID below with your sheet ID.
 *   4. Deploy → New deployment → Type: Web app
 *        - Execute as:   Me
 *        - Who has access: Anyone
 *   5. Copy the Web App URL and save it in FinWise as GOOGLE_APPS_SCRIPT_URL.
 *
 * The script exposes a single POST endpoint. The FinWise server sends:
 *   { type: "loan" | "credit" | "emi", payload: {...}, user: {...}, status: "..." }
 * Each type writes to its own worksheet. Headers are created on first write.
 */

const SPREADSHEET_ID = "REPLACE_WITH_YOUR_SHEET_ID";

const SHEETS = {
  loan:   { name: "Loan Applications",   headers: ["Timestamp", "User Name", "User Email", "Loan Type", "Loan Amount", "Monthly Income", "Existing EMI", "Employment", "Years Employed", "Status"] },
  credit: { name: "Credit Score Analysis", headers: ["Timestamp", "User Name", "User Email", "Score", "Payment History", "Utilization", "Account Age", "Recent Inquiries", "Risk", "Status"] },
  emi:    { name: "EMI Calculations",    headers: ["Timestamp", "User Name", "User Email", "Loan Amount", "Interest Rate", "Tenure (months)", "EMI", "Total Interest", "Total Payable", "Status"] },
};

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const { type, payload = {}, user = {}, status = "submitted" } = body;

    const conf = SHEETS[type];
    if (!conf) return json({ ok: false, error: "Unknown type: " + type }, 400);

    const sheet = getOrCreateSheet(conf.name, conf.headers);
    const row = buildRow(type, payload, user, status);
    sheet.appendRow(row);

    return json({ ok: true, type, rows: sheet.getLastRow() });
  } catch (err) {
    return json({ ok: false, error: String(err) }, 500);
  }
}

function doGet() {
  return json({ ok: true, service: "FinWise AI Sheets Bridge" });
}

function getOrCreateSheet(name, headers) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function buildRow(type, p, user, status) {
  const ts = new Date().toISOString();
  const uName = user.name || "Guest";
  const uEmail = user.email || "";
  switch (type) {
    case "loan":
      return [ts, uName, uEmail, p.loanType, p.loanAmount, p.monthlyIncome, p.existingEmi, p.employment, p.yearsEmployed, status];
    case "credit":
      return [ts, uName, uEmail, p.score, p.paymentHistory, p.utilization, p.accountAge, p.recentInquiries, p.risk, status];
    case "emi":
      return [ts, uName, uEmail, p.loanAmount, p.rate, p.months, p.emi, p.totalInterest, p.totalPayable, status];
  }
}

function json(obj, code) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
