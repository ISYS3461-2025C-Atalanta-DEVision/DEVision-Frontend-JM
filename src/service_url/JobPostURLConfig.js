const JOBPOST_BASE_URL = "/jobPost-service/api/job-posts";

// concrete endpoints
export const JOBPOST_SEARCH_URL = `${JOBPOST_BASE_URL}/search`;
export const JOBPOST_COMPANY_URL = (companyId) => `${JOBPOST_BASE_URL}/company/${companyId}`;
export const JOBPOST_DETAIL_URL = (jobId) => `${JOBPOST_BASE_URL}/${jobId}`;
export const JOBPOST_PUBLISH_URL = (jobId) => `${JOBPOST_BASE_URL}/${jobId}/publish`;
export const JOBPOST_UNPUBLISH_URL = (jobId) => `${JOBPOST_BASE_URL}/${jobId}/unpublish`;