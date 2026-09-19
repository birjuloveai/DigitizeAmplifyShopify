const REPO_OWNER = "birjuloveai";
const REPO_NAME = "DigitizeAmplifyShopify";
const FILE_PATH = "survey-responses.json";
const BRANCH = "tamil-survey-persist";

export async function persistToGitHub(response) {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  if (!token) {
    console.warn("VITE_GITHUB_TOKEN not set — survey saved locally only.");
    return;
  }

  const apiBase = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };

  try {
    // 1. Try to fetch existing file
    let existing = [];
    let sha = null;

    const getRes = await fetch(`${apiBase}?ref=${BRANCH}`, { headers });
    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
      existing = JSON.parse(atob(data.content));
    }

    // 2. Append new response
    existing.push({ ...response, timestamp: new Date().toISOString() });

    // 3. Commit updated file
    const body = {
      message: `Survey response ${existing.length} — ${new Date().toLocaleString("en-IN")}`,
      content: btoa(unescape(encodeURIComponent(JSON.stringify(existing, null, 2)))),
      branch: BRANCH,
    };
    if (sha) body.sha = sha;

    const putRes = await fetch(apiBase, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });

    if (!putRes.ok) {
      const err = await putRes.json();
      console.error("GitHub persist failed:", err.message);
    }
  } catch (e) {
    console.error("GitHub persist error:", e);
  }
}
