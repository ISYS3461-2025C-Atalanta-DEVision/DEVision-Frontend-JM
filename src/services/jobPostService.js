import api from "../http_call/HttpRequest";
import {
  JOBPOST_SEARCH_URL,
  JOBPOST_COMPANY_URL,
  JOBPOST_DETAIL_URL,
  JOBPOST_PUBLISH_URL,
  JOBPOST_UNPUBLISH_URL,
} from "../service_url/JobPostURLConfig";

export const jobPostService = {
  // Search job posts
  search: async (params) => {
    const response = await api.get(JOBPOST_SEARCH_URL, { params });
    return response.data;
  },

  // Get job posts by company
  getJobPostsByCompany: async (companyId) => {
    const response = await api.get(JOBPOST_COMPANY_URL(companyId));
    return response.data;
  },

  // Get job post detail
  getJobPostDetail: async (jobId) => {
    const response = await api.get(JOBPOST_DETAIL_URL(jobId));
    return response.data;
  },

  // Publish a job post
  publishJobPost: async (jobId) => {
    const response = await api.put(JOBPOST_PUBLISH_URL(jobId));
    return response.data;
  },

  // Unpublish a job post
  unpublishJobPost: async (jobId) => {
    const response = await api.put(JOBPOST_UNPUBLISH_URL(jobId));
    return response.data;
  },
};

export default jobPostService;
