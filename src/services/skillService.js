import { getJAUrl } from "../service_url/AppUrlConfig";

const BASE_JA_URL = getJAUrl();
const SKILLS_API_URL = `${BASE_JA_URL}/skills`;

export const skillService = {
  getSkills: async (limit = 100) => {
    const response = await fetch(`${SKILLS_API_URL}?limit=${limit}`);
    if (!response.ok) {
      throw new Error("Failed to fetch skills");
    }
    const result = await response.json();
    return result.data;
  },
};

export default skillService;
