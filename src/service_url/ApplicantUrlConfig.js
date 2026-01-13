// External API Gateway for Applicant Service
const EXTERNAL_API_BASE_URL = "https://api-gateway-production-2c3a.up.railway.app";

// Applicant endpoints
export const APPLICANT_BASE_URL = `${EXTERNAL_API_BASE_URL}/applicants`;
export const APPLICANT_DETAIL_URL = (applicantId) => `${APPLICANT_BASE_URL}/${applicantId}`;

// Education endpoints
export const EDUCATION_BASE_URL = `${EXTERNAL_API_BASE_URL}/education`;
export const EDUCATION_BY_APPLICANT_URL = (applicantId) => `${EDUCATION_BASE_URL}/applicant/${applicantId}`;

// Work History endpoints
export const WORK_HISTORY_BASE_URL = `${EXTERNAL_API_BASE_URL}/work-history`;
export const WORK_HISTORY_BY_APPLICANT_URL = (applicantId) => `${WORK_HISTORY_BASE_URL}/applicant/${applicantId}`;

// Skills endpoints
export const SKILLS_BASE_URL = `${EXTERNAL_API_BASE_URL}/skills`;
export const SKILL_DETAIL_URL = (skillId) => `${SKILLS_BASE_URL}/${skillId}`;
