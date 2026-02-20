import type { BackgroundMessage } from "./types/ruler";

const BASE_URL = "https://rust-api-ovh.mathieu-busse.dev";
const EXTENSION_ID = chrome.runtime.id;

const HEADERS = { "Content-Type": "application/json", "X-Extension-ID": EXTENSION_ID };

type ApiResponse = { ok: boolean; error?: string; elapsed_ms?: number; data: unknown };

function unwrap(json: ApiResponse) {
  if (!json.ok) throw new Error(json.error ?? "Erreur API");
  return json.data;
}

async function apiCall(res: Response) {
  const json: ApiResponse = await res.json().catch(() => {
    throw new Error(`HTTP ${res.status}`);
  });
  return unwrap(json);
}

chrome.runtime.onMessage.addListener((message: BackgroundMessage, _sender, sendResponse) => {
  switch (message.type) {
    case "RULER_REQUEST":
      fetch(`${BASE_URL}/api/v1/ruler`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(message.data),
      })
        .then(apiCall)
        .then((data) => sendResponse({ success: true, data }))
        .catch((err) => sendResponse({ success: false, error: err.message }));
      return true;

    case "FLUIDS_REQUEST":
      fetch(`${BASE_URL}/api/v1/fluids`, { headers: HEADERS })
        .then(apiCall)
        .then((data) => sendResponse({ success: true, data }))
        .catch((err) => sendResponse({ success: false, error: err.message }));
      return true;

    case "SIMPLE_REQUEST":
      fetch(`${BASE_URL}/api/v1/simple`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(message.data),
      })
        .then(apiCall)
        .then((data) => sendResponse({ success: true, data }))
        .catch((err) => sendResponse({ success: false, error: err.message }));
      return true;

    default:
      return false;
  }
});
