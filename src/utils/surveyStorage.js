const STORAGE_KEY = "demoSurveyResponses";

export function saveSurveyResponse(response) {
  const existing = getSurveyResponses();
  existing.push({ ...response, timestamp: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function getSurveyResponses() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function exportCSV() {
  const responses = getSurveyResponses();
  if (responses.length === 0) return;

  const headers = Object.keys(responses[0]);
  const csvRows = [
    headers.join(","),
    ...responses.map((row) =>
      headers
        .map((h) => {
          const val = row[h] ?? "";
          const str = Array.isArray(val) ? val.join("; ") : String(val);
          return `"${str.replace(/"/g, '""')}"`;
        })
        .join(",")
    ),
  ];

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `survey-responses-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
