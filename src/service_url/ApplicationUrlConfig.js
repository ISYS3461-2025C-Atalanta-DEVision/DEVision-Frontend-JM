export const APPLICATION_BASE_URL = "/jobpost-service/api/applications";

// Get all applications for a job post
export const APPLICATION_BY_JOB_URL = (jobId) => `${APPLICATION_BASE_URL}/job/${jobId}`;

// Get applications for a job post filtered by status
export const APPLICATION_BY_JOB_STATUS_URL = (jobId, status) =>
  `${APPLICATION_BASE_URL}/job/${jobId}?status=${status}`;

// Get application counts for a job post
export const APPLICATION_COUNTS_URL = (jobId) => `${APPLICATION_BASE_URL}/job/${jobId}/counts`;

// Archive an application (uses job-posts endpoint)
export const APPLICATION_ARCHIVE_URL = (jobId, applicantId) =>
  `/jobpost-service/api/job-posts/${jobId}/applications/${applicantId}/archive`;
