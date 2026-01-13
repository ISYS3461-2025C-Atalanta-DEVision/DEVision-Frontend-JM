import { getJAUrl } from "../service_url/AppUrlConfig";

const API_BASE_URL = getJAUrl();
const APPLICANT_API_URL = `${API_BASE_URL}/applicants`;
const EDUCATION_API_URL = `${API_BASE_URL}/education`;
const WORK_HISTORY_API_URL = `${API_BASE_URL}/work-history`;
const SKILLS_API_URL = `${API_BASE_URL}/skills`;
const API_KEY = import.meta.env.VITE_JA_X_HEADER || "wrgY4eM0rE/66kMz0ubiVMfev36SxUlENNU2k9dytXc=";

// Cache for applicant data to avoid repeated API calls
const applicantCache = {};
const educationCache = {};
const educationByLevelCache = {};
const failedApplicantCache = new Set();
const workHistoryCache = {};
const skillCache = {};

export const applicantService = {
  /**
   * Get all applicants with pagination (no filter)
   */
  getAllApplicants: async (page = 1, limit = 12) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(`${APPLICANT_API_URL}?${params}`, {
      method: "GET",
      headers: {
        accept: "*/*",
        "X-API-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch applicants: ${response.status}`);
    }

    return response.json();
  },

  /**
   * Search applicants by name with pagination
   */
  searchApplicants: async (name, page = 1, limit = 10) => {
    const filters = JSON.stringify([
      { id: "name", value: name, operator: "contains" },
    ]);

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      filters,
    });

    const response = await fetch(`${APPLICANT_API_URL}?${params}`, {
      method: "GET",
      headers: {
        accept: "*/*",
        "X-API-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to search applicants: ${response.status}`);
    }

    return response.json();
  },

  /**
   * Get all education records filtered by level (Bachelor, Master, PhD)
   * Returns applicant IDs that have education matching the level
   */
  getEducationByLevel: async (levelStudy) => {
    if (!levelStudy) return [];

    // Check cache
    if (educationByLevelCache[levelStudy]) {
      return educationByLevelCache[levelStudy];
    }

    const filters = JSON.stringify([
      { id: "levelStudy", value: levelStudy, operator: "contains" },
    ]);

    const params = new URLSearchParams({
      page: "1",
      limit: "1000", // Get all matching records
      filters,
    });

    const response = await fetch(`${EDUCATION_API_URL}?${params}`, {
      method: "GET",
      headers: {
        accept: "*/*",
        "X-API-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch education: ${response.status}`);
    }

    const result = await response.json();
    const data = result.data || result || [];

    // Extract unique applicant IDs
    const applicantIds = [...new Set(data.map((edu) => edu.applicantId))];

    // Cache the result
    educationByLevelCache[levelStudy] = applicantIds;

    return applicantIds;
  },

  /**
   * Search applicants with multiple filters
   * Uses the external API's filter capability directly
   *
   * Available filter fields on /applicants endpoint:
   * - name: applicant name (contains search)
   * - country: country code (exact match)
   * - educationLevels: education level like "Bachelor", "Master", "PhD"
   * - workHistoryTitles: job titles from work history
   * - skillCategories: skill category IDs
   *
   * @param {Object} filterOptions - Filter options
   * @param {string} filterOptions.name - Name to search (contains)
   * @param {string} filterOptions.country - Country code to filter
   * @param {string} filterOptions.educationLevel - Education level (Bachelor, Master, PhD)
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   */
  searchApplicantsWithFilters: async (filterOptions = {}, page = 1, limit = 12) => {
    const { name, country, educationLevel } = filterOptions;

    const filters = [];

    // Name search - use "contains" operator for partial match
    if (name && name.trim()) {
      filters.push({ id: "name", value: name.trim(), operator: "contains" });
    }

    // Country filter - use "eq" operator for exact match on country code
    if (country && country.trim()) {
      filters.push({ id: "country", value: country.trim(), operator: "eq" });
    }

    // Education level filter - use "contains" for partial match on education levels
    if (educationLevel && educationLevel.trim()) {
      filters.push({ id: "educationLevels", value: educationLevel.trim(), operator: "contains" });
    }

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (filters.length > 0) {
      params.append("filters", JSON.stringify(filters));
    }

    const response = await fetch(`${APPLICANT_API_URL}?${params}`, {
      method: "GET",
      headers: {
        accept: "*/*",
        "X-API-Key": API_KEY,
      },
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please wait a moment and try again.");
      }
      throw new Error(`Failed to search applicants: ${response.status}`);
    }

    return response.json();
  },

  /**
   * Get applicant details by ID
   */
  getApplicantById: async (applicantId) => {
    // Check cache first
    if (applicantCache[applicantId]) {
      return applicantCache[applicantId];
    }

    if (failedApplicantCache.has(applicantId)) {
      return null;
    }

    const response = await fetch(`${APPLICANT_API_URL}/${applicantId}`, {
      method: "GET",
      headers: {
        accept: "*/*",
        "X-API-Key": API_KEY,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        failedApplicantCache.add(applicantId);
        return null;
      }
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
