import {
  GET_POST_URL, 
  CREATE_POST_URL, 
  JOBPOST_SEARCH_URL,
  JOBPOST_COMPANY_URL,
  JOBPOST_DETAIL_URL,
  JOBPOST_PUBLISH_URL,
  JOBPOST_UNPUBLISH_URL,
} from "../service_url/PostUrlConfig";
import api from "../http_call/HttpRequest";

export const postService = {
  getPostList: async () => {
    const posts = await api.get(`${GET_POST_URL}`);
    return posts.data;
  },

  createPost: async (postData) => {
    const response = await api.post(`${CREATE_POST_URL}`, postData);
    return response.data;
  },
  
  // Get job posts by company
  getJobPostsByCompany: async ()=> {
    const response = await api.get(`${JOBPOST_COMPANY_URL}`);
    return response.data;
  },
};

export default postService;
