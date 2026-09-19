const WEBHOOK_URL = import.meta.env.VITE_SHEET_WEBHOOK_URL;

export async function persistToSheet(response) {
  if (!WEBHOOK_URL) {
    console.warn("VITE_SHEET_WEBHOOK_URL not set — survey saved locally only.");
    return;
  }

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      body: JSON.stringify(response),
    });
  } catch (e) {
    console.error("Sheet persist error:", e);
  }
}
