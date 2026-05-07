/**
 * Relive Quizzes — Google Sheets lead-capture endpoint.
 *
 * Each incoming lead is appended to a tab named after the quiz slug
 * (e.g. "iv-drip", "body-check"). Missing tabs are created on first
 * write and get a frozen header row automatically.
 *
 * Setup:
 *   1. Open the Google Sheet you want leads written to.
 *   2. Extensions → Apps Script.
 *   3. Replace any existing Code.gs content with this file.
 *   4. Set SHARED_SECRET below to a random string (also set the same value
 *      as the LEADS_WEBHOOK_SECRET env var on Vercel).
 *   5. Deploy → New deployment → "Web app".
 *        - Execute as: Me
 *        - Who has access: Anyone
 *      Copy the resulting "/exec" URL.
 *   6. On Vercel: Project → Settings → Environment Variables, add
 *        LEADS_WEBHOOK_URL    = the /exec URL from step 5
 *        LEADS_WEBHOOK_SECRET = the random string from step 4
 *      Redeploy (push any tiny change, or click Redeploy in the Vercel UI).
 *
 * Updating: paste in new code, then "Deploy → Manage deployments" →
 * pencil icon → Version: New version → Deploy. The /exec URL stays the
 * same. If you ever need to rotate the secret, update both sides at once.
 */

const SHARED_SECRET = "REPLACE-ME-WITH-A-RANDOM-STRING";

const HEADERS = [
  "Timestamp",
  "Quiz",
  "Phone",
  "Result",
  "Yes Count",
  "Recommendations",
  "Extras",
  "Answers (JSON)",
];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: "no_body" });
    }

    const body = JSON.parse(e.postData.contents);
    if (!SHARED_SECRET || body.secret !== SHARED_SECRET) {
      return jsonResponse({ ok: false, error: "unauthorized" });
    }

    const tabName = (body.quizSlug || "unknown").toString().slice(0, 100);
    const sheet = getOrCreateTab(tabName);

    sheet.appendRow([
      body.timestamp || new Date().toISOString(),
      body.quizSlug || "",
      body.phone || "",
      body.result || "",
      body.yesCount === "" || body.yesCount == null ? "" : body.yesCount,
      Array.isArray(body.recommendations) ? body.recommendations.join(", ") : "",
      Array.isArray(body.extras) ? body.extras.join(", ") : "",
      JSON.stringify(body.answers || {}),
    ]);

    return jsonResponse({ ok: true, tab: tabName });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function getOrCreateTab(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sheet;
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
