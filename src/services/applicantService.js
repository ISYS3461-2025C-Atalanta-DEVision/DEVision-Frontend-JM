import externalApi from "../http_call/ExternalApiRequest";
import {
  APPLICANT_DETAIL_URL,
  EDUCATION_BY_APPLICANT_URL,
  WORK_HISTORY_BY_APPLICANT_URL,
  SKILL_DETAIL_URL,
} from "../service_url/ApplicantUrlConfig";

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
    if (applicantCache[applicantId]) {
      return applicantCache[applicantId];
    }

    const response = await externalApi.get(APPLICANT_DETAIL_URL(applicantId));
    const data = response.data;
    applicantCache[applicantId] = data;
    return data;
  },

  /**
   * Get multiple applicants by IDs (batch fetch with caching)
   */
  getApplicantsByIds: async (applicantIds) => {
    const uniqueIds = [...new Set(applicantIds)];
    const results = {};

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

  /**
   * Get education history for an applicant
   */
  getEducationByApplicantId: async (applicantId) => {
    if (educationCache[applicantId]) {
      return educationCache[applicantId];
    }

    const response = await externalApi.get(EDUCATION_BY_APPLICANT_URL(applicantId));
    const data = response.data;
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

    const response = await externalApi.get(WORK_HISTORY_BY_APPLICANT_URL(applicantId));
    const data = response.data;
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

    const response = await externalApi.get(SKILL_DETAIL_URL(skillId));
    const data = response.data;
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
