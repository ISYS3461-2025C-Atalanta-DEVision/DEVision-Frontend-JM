const APPLICANT_API_URL = "https://api-gateway-production-2c3a.up.railway.app/applicants";
const API_KEY = "wrgY4eM0rE/66kMz0ubiVMfev36SxUlENNU2k9dytXc=";

// Cache for applicant data to avoid repeated API calls
const applicantCache = {};

export const applicantService = {
  /**
   * Get applicant details by ID
   */
  getApplicantById: async (applicantId) => {
    // Check cache first
    if (applicantCache[applicantId]) {
      return applicantCache[applicantId];
    }

    const response = await fetch(`${APPLICANT_API_URL}/${applicantId}`, {
      method: "GET",
      headers: {
        accept: "*/*",
        "X-API-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch applicant: ${response.status}`);
    }

    const data = await response.json();
    // Cache the result
    applicantCache[applicantId] = data;
    return data;
  },

  /**
   * Get multiple applicants by IDs (batch fetch with caching)
   */
  getApplicantsByIds: async (applicantIds) => {
    const uniqueIds = [...new Set(applicantIds)];
    const results = {};

    // Fetch all applicants in parallel
    await Promise.all(
      uniqueIds.map(async (id) => {
        try {
          results[id] = await applicantService.getApplicantById(id);
        } catch (error) {
          console.error(`Failed to fetch applicant ${id}:`, error);
          results[id] = null;
        }
      })
    );

    return results;
  },
};

export default applicantService;
