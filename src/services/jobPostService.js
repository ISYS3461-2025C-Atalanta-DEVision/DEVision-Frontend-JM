import {
  JOBPOST_BASE_URL,
  JOBPOST_SEARCH_URL,
  JOBPOST_COMPANY_URL,
  JOBPOST_DETAIL_URL,
  JOBPOST_PUBLISH_URL,
  JOBPOST_UNPUBLISH_URL,
} from "../service_url/JobPostUrlConfig";
import api from "../http_call/HttpRequest";

export const jobPostService = {
  getPostList: async () => {
    const posts = await api.get(`${JOBPOST_BASE_URL}`);
    return posts.data;
  },

  createPost: async (postData) => {
    const response = await api.post(`${JOBPOST_BASE_URL}`, postData);
    return response.data;
  },

  // Get job posts by company
  getJobPostsByCompany: async () => {
    const response = await api.get(`${JOBPOST_COMPANY_URL}`);
    return response.data;
  },

  deleteJobPost: async (jobId) => {
    const response = await api.delete(JOBPOST_DETAIL_URL(jobId));
    return response.data;
  },

  unpublishJobPost: async (jobId) => {
    const response = await api.post(JOBPOST_DETAIL_URL(jobId));
    return response.data;
  },
};

export default jobPostService;
