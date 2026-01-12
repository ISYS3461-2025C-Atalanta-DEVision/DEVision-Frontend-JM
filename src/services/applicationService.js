import {
  APPLICATION_BY_JOB_URL,
  APPLICATION_BY_JOB_STATUS_URL,
  APPLICATION_COUNTS_URL,
  APPLICATION_ARCHIVE_URL,
} from "../service_url/ApplicationUrlConfig";
import api from "../http_call/HttpRequest";

export const applicationService = {
  /**
   * Get all applications for a job post
   */
  getApplicationsByJobId: async (jobId) => {
    const response = await api.get(APPLICATION_BY_JOB_URL(jobId));
    return response.data;
  },

  /**
   * Get applications for a job post filtered by status (PENDING or ARCHIVED)
   */
  getApplicationsByJobIdAndStatus: async (jobId, status) => {
    const response = await api.get(APPLICATION_BY_JOB_STATUS_URL(jobId, status));
    return response.data;
  },

  /**
   * Get application counts for a job post
   */
  getApplicationCounts: async (jobId) => {
    const response = await api.get(APPLICATION_COUNTS_URL(jobId));
    return response.data;
  },

  /**
   * Archive an application (move from PENDING to ARCHIVED)
   */
  archiveApplication: async (jobId, applicantId) => {
    const response = await api.post(APPLICATION_ARCHIVE_URL(jobId, applicantId));
    return response.data;
  },
};

export default applicationService;
