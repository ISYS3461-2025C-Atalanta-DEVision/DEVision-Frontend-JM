import { GET_POST_URL, CREATE_POST_URL } from "../service_url/PostUrlConfig";
import api from "../http_call/HttpRequest";

export const postService = {
  getPostList: async () => {
    const posts = await api.get(`${GET_POST_URL}`);
    console.log("Fetched posts:", posts.data);
    return posts.data;
  },

  createPost: async (postData) => {
    const response = await api.post(`${CREATE_POST_URL}`, postData);
    console.log("Created post response:", response.data);
    return response.data;
  },
};

export default postService;
