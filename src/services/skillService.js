const SKILLS_API_URL = "https://api-gateway-production-2c3a.up.railway.app/skills";

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
