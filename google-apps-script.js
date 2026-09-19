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
// 8. Set it as VITE_SHEET_WEBHOOK_URL in your GitHub repo secrets
//
// First submission creates a Google Sheet in your Drive.
// All subsequent submissions append to the SAME sheet.
// ===========================================================

var SHEET_NAME = "Survey Responses";
var SPREADSHEET_TITLE = "Digitize Amplify Shopify — Surveys";

function getOrCreateSpreadsheet() {
  var props = PropertiesService.getScriptProperties();
  var ssId = props.getProperty("SPREADSHEET_ID");

  // Try opening saved spreadsheet
  if (ssId) {
    try {
      return SpreadsheetApp.openById(ssId);
    } catch (e) {
      // Spreadsheet was deleted — create a new one
    }
  }

  // Create new spreadsheet and save its ID
  var ss = SpreadsheetApp.create(SPREADSHEET_TITLE);
  props.setProperty("SPREADSHEET_ID", ss.getId());
  return ss;
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = getOrCreateSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    // Create header row on first run
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      var headers = [
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
