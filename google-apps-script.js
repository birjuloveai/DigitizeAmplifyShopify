// ===========================================================
// Google Apps Script — Deploy this as a Web App
// ===========================================================
//
// SETUP STEPS:
// 1. Go to https://script.google.com and create a new project
// 2. Paste this entire code, replacing the default code
// 3. Click Deploy → New Deployment
// 4. Type: Web app
// 5. Execute as: Me
// 6. Who has access: Anyone
// 7. Click Deploy and copy the Web App URL
// 8. Paste the URL into your .env file as VITE_SHEET_WEBHOOK_URL
//
// This creates a Google Sheet automatically on first submission.
// ===========================================================

const SHEET_NAME = "Survey Responses";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet()
      || SpreadsheetApp.create("Digitize Amplify Shopify — Surveys");

    let sheet = ss.getSheetByName(SHEET_NAME);

    // Create header row on first run
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      const headers = [
        "Timestamp",
        "Q1 — What do you sell?",
        "Q2 — Monthly sales",
        "Q3 — Stock records",
        "Q4 — Biggest problems",
        "Q5 — Sell online?",
        "Q6 — Most useful part",
        "Q7 — Feature to start tomorrow",
        "Q8 — Monthly cost comfort",
        "Q9 — Who will operate?",
        "Name",
        "WhatsApp",
        "Can Contact",
      ];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    }

    // Append response row
    sheet.appendRow([
      new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.q1_sells || "",
      data.q2_monthly_sales || "",
      data.q3_stock_records || "",
      Array.isArray(data.q4_problems) ? data.q4_problems.join("; ") : (data.q4_problems || ""),
      data.q5_online || "",
      data.q6_useful || "",
      data.q7_feature || "",
      data.q8_cost || "",
      data.q9_operator || "",
      data.name || "",
      data.whatsapp || "",
      data.canContact ? "Yes" : "No",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Allow GET for health check
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "Survey webhook is live" }))
    .setMimeType(ContentService.MimeType.JSON);
}
