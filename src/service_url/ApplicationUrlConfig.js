import { getJAUrl } from "./AppUrlConfig";

// External Job Application API (Railway) - for fetching applications
const JA_API_BASE = getJAUrl();
const JA_API_KEY = import.meta.env.VITE_JA_X_HEADER || "wrgY4eM0rE/66kMz0ubiVMfev36SxUlENNU2k9dytXc=";

export const APPLICATION_API_KEY = JA_API_KEY;

// Get all job applications
export const APPLICATION_BASE_URL = `${JA_API_BASE}/jobApplication`;

// Get applications filtered by jobId
export const APPLICATION_BY_JOB_URL = (jobId) =>
  `${APPLICATION_BASE_URL}?filters=${encodeURIComponent(JSON.stringify([{ id: "jobId", value: jobId, operator: "equals" }]))}`;
