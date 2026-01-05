const POST_BASE_URL = "/jobpost-service/api"

export const GET_POST_URL = `${POST_BASE_URL}/job-posts`;
export const CREATE_POST_URL = `${POST_BASE_URL}/job-posts`;

// concrete endpoints
export const JOBPOST_SEARCH_URL = `${POST_BASE_URL}/search`;
export const JOBPOST_COMPANY_URL = `${POST_BASE_URL}/job-posts/company/me`;
export const JOBPOST_DETAIL_URL = (jobId) => `${POST_BASE_URL}/${jobId}`;
export const JOBPOST_PUBLISH_URL = (jobId) => `${POST_BASE_URL}/${jobId}/publish`;
export const JOBPOST_UNPUBLISH_URL = (jobId) => `${POST_BASE_URL}/${jobId}/unpublish`;