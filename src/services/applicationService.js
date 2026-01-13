import {
  APPLICATION_BY_JOB_URL,
  APPLICATION_BASE_URL,
  APPLICATION_API_KEY,
} from "../service_url/ApplicationUrlConfig";
import { JOBPOST_BASE_URL } from "../service_url/JobPostUrlConfig";
import api from "../http_call/HttpRequest";

// Cache for applications
const applicationCache = {};

export const applicationService = {
  /**
   * Get all applications for a job post
   * @param {string} jobId - The job post ID
   * @returns {Promise<Array>} List of applications
   */
  getApplicationsByJobId: async (jobId) => {
    const cacheKey = `job_${jobId}`;
    if (applicationCache[cacheKey]) {
      return applicationCache[cacheKey];
    }

    const response = await fetch(APPLICATION_BY_JOB_URL(jobId), {
      method: "GET",
      headers: {
        accept: "*/*",
        "X-API-Key": APPLICATION_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch applications: ${response.status}`);
    }

    const result = await response.json();
    const data = result.data || result || [];
    applicationCache[cacheKey] = data;
    return data;
  },

  /**
   * Get applications for a job post filtered by status (PENDING or ARCHIVED)
   * Fetches all applications for the job and filters client-side for reliability
   * @param {string} jobId - The job post ID
   * @param {string} status - Status filter (PENDING or ARCHIVED)
   * @returns {Promise<Array>} List of applications with matching status
   */
  getApplicationsByJobIdAndStatus: async (jobId, status) => {
    // Fetch all applications for this job
    const response = await fetch(APPLICATION_BY_JOB_URL(jobId), {
      method: "GET",
      headers: {
        accept: "*/*",
        "X-API-Key": APPLICATION_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch applications: ${response.status}`);
    }

    const result = await response.json();
    const data = result.data || result || [];

    // Filter client-side by status
    return data.filter((app) => app.status === status);
  },

  /**
   * Get application counts for a job post (pending and archived)
   * @param {string} jobId - The job post ID
   * @returns {Promise<{pending: number, archived: number}>} Application counts
   */
  getApplicationCounts: async (jobId) => {
    try {
      const [pending, archived] = await Promise.all([
        applicationService.getApplicationsByJobIdAndStatus(jobId, "PENDING"),
        applicationService.getApplicationsByJobIdAndStatus(jobId, "ARCHIVED"),
      ]);
      return {
        pending: pending.length,
        archived: archived.length,
      };
    } catch (error) {
      console.error("Failed to fetch application counts:", error);
      return { pending: 0, archived: 0 };
    }
  },

  /**
   * Update application status via external API
   * @param {string} applicationId - The application ID
   * @param {string} status - New status (PENDING or ARCHIVED)
   * @param {string} applicantId - The applicant ID (used for Kafka event)
   * @param {string} jobId - The job post ID (used for cache clearing and Kafka event)
   * @returns {Promise<Object>} Updated application
   */
  updateApplicationStatus: async (applicationId, status, applicantId, jobId) => {
    // Call external API to update status
    const response = await fetch(`${APPLICATION_BASE_URL}/${applicationId}`, {
      method: "PUT",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        "X-API-Key": APPLICATION_API_KEY,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update application status: ${response.status}`);
    }

    const updatedApplication = await response.json();

    // Also publish Kafka event via our backend for notifications
    try {
      await api.post(
        `${JOBPOST_BASE_URL}/applications/${applicationId}/status`,
        null,
        { params: { status, applicantId, jobId } }
      );
    } catch (err) {
      console.warn("Failed to publish Kafka event, but status was updated:", err);
    }

    // Clear cache for this job to ensure fresh data on next fetch
    applicationService.clearCache(jobId);

    return updatedApplication;
  },

  /**
   * Clear the application cache for a specific job or all jobs
   * @param {string} [jobId] - Optional job ID to clear specific cache
   */
  clearCache: (jobId) => {
    if (jobId) {
      delete applicationCache[`job_${jobId}`];
      delete applicationCache[`job_${jobId}_PENDING`];
      delete applicationCache[`job_${jobId}_ARCHIVED`];
    } else {
      Object.keys(applicationCache).forEach((key) => delete applicationCache[key]);
    }
  },
};

export default applicationService;
