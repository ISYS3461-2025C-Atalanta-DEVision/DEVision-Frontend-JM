import {getJAUrl} from "../service_url/AppUrlConfig";

const API_BASE_URL = getJAUrl();
const APPLICANT_API_URL = `${API_BASE_URL}/applicants`;
const EDUCATION_API_URL = `${API_BASE_URL}/education`;
const WORK_HISTORY_API_URL = `${API_BASE_URL}/work-history`;
const SKILLS_API_URL = `${API_BASE_URL}/skills`;
const API_KEY = import.meta.env.VITE_JA_X_HEADER;

// Cache for applicant data to avoid repeated API calls
const applicantCache = {};
const educationCache = {};
const workHistoryCache = {};
const skillCache = {};

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
  getApplicantsByIds: async (applicantIds, batchSize = 10) => {
    const uniqueIds = [...new Set(applicantIds)];
    const results = [];

    for (let i = 0; i < uniqueIds.length; i += batchSize) {
      const batch = uniqueIds.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(async (id) => {
          try {
            return await applicantService.getApplicantById(id);
          } catch (error) {
            console.error(`Failed to fetch applicant ${id}:`, error);
            return null;
          }
        })
      );
      results.push(...batchResults);
    }

    return results;
  },

  /**
   * Get education history for an applicant
   */
  getEducationByApplicantId: async (applicantId) => {
    if (educationCache[applicantId]) {
      return educationCache[applicantId];
    }

    const response = await fetch(
      `${EDUCATION_API_URL}/applicant/${applicantId}`,
      {
        method: "GET",
        headers: {
          accept: "*/*",
          "X-API-Key": API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch education: ${response.status}`);
    }

    const data = await response.json();
    educationCache[applicantId] = data;
    return data;
  },

  /**
   * Get work history for an applicant
   */
  getWorkHistoryByApplicantId: async (applicantId) => {
    if (workHistoryCache[applicantId]) {
      return workHistoryCache[applicantId];
    }

    const response = await fetch(
      `${WORK_HISTORY_API_URL}/applicant/${applicantId}`,
      {
        method: "GET",
        headers: {
          accept: "*/*",
          "X-API-Key": API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch work history: ${response.status}`);
    }

    const data = await response.json();
    workHistoryCache[applicantId] = data;
    return data;
  },

  /**
   * Get skill by ID
   */
  getSkillById: async (skillId) => {
    if (skillCache[skillId]) {
      return skillCache[skillId];
    }

    const response = await fetch(`${SKILLS_API_URL}/${skillId}`, {
      method: "GET",
      headers: {
        accept: "*/*",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch skill: ${response.status}`);
    }

    const data = await response.json();
    skillCache[skillId] = data;
    return data;
  },

  /**
   * Get multiple skills by IDs
   */
  getSkillsByIds: async (skillIds) => {
    const uniqueIds = [...new Set(skillIds)];
    const results = [];

    await Promise.all(
      uniqueIds.map(async (id) => {
        try {
          const skill = await applicantService.getSkillById(id);
          results.push(skill);
        } catch (error) {
          console.error(`Failed to fetch skill ${id}:`, error);
        }
      })
    );

    return results;
  },

  /**
   * Get full applicant profile including education and work history
   */
  getFullProfile: async (applicantId) => {
    const [applicant, education, workHistory] = await Promise.all([
      applicantService.getApplicantById(applicantId),
      applicantService.getEducationByApplicantId(applicantId).catch(() => []),
      applicantService.getWorkHistoryByApplicantId(applicantId).catch(() => []),
    ]);

    return {
      ...applicant,
      education,
      workHistory,
    };
  },
};

export default applicantService;
