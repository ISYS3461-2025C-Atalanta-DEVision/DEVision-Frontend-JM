export const JOBPOST_BASE_URL = "/jobpost-service/api/job-posts"


// concrete endpoints
export const JOBPOST_SEARCH_URL = `${JOBPOST_BASE_URL}/search`;
export const JOBPOST_COMPANY_URL = `${JOBPOST_BASE_URL}/company/me`;
export const JOBPOST_DETAIL_URL = (jobId) => `${JOBPOST_BASE_URL}/${jobId}`;
export const JOBPOST_UPDATE_URL = (jobId) => `${JOBPOST_BASE_URL}/${jobId}`;
export const JOBPOST_PUBLISH_URL = (jobId) => `${JOBPOST_BASE_URL}/${jobId}/publish`;
export const JOBPOST_UNPUBLISH_URL = (jobId) => `${JOBPOST_BASE_URL}/${jobId}/unpublish`;
