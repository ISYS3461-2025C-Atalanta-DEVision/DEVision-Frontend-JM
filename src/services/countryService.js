import { getJAUrl } from "../service_url/AppUrlConfig";

const API_BASE_URL = getJAUrl();
const COUNTRIES_API_URL = `${API_BASE_URL}/countries`;

// Cache for countries data
let countriesCache = null;
let countriesMapCache = null;
let fetchPromise = null;

export const countryService = {
  /**
   * Get all countries from API
   * Fetches once and caches the result
   */
  getCountries: async () => {
    // Return cached data if available
    if (countriesCache) {
      return countriesCache;
    }

    // Prevent duplicate requests
    if (fetchPromise) {
      return fetchPromise;
    }

    fetchPromise = fetch(COUNTRIES_API_URL, {
      method: "GET",
      headers: {
        accept: "*/*",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch countries: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        countriesCache = data;
        // Build code -> name map for quick lookup
        countriesMapCache = new Map(
          data.map((country) => [country.code, country.name])
        );
        fetchPromise = null;
        return data;
      })
      .catch((error) => {
        fetchPromise = null;
        throw error;
      });

    return fetchPromise;
  },

  /**
   * Get country name by code
   * Returns the code itself if not found
   */
  getCountryName: async (code) => {
    if (!code) return "Unknown";

    // Ensure countries are loaded
    if (!countriesMapCache) {
      await countryService.getCountries();
    }

    return countriesMapCache?.get(code.toUpperCase()) || code;
  },

  /**
   * Get country name synchronously (returns code if cache not ready)
   * Use this for immediate rendering, will show code until cache is loaded
   */
  getCountryNameSync: (code) => {
    if (!code) return "Unknown";
    return countriesMapCache?.get(code.toUpperCase()) || code;
  },

  /**
   * Preload countries cache
   * Call this early in app initialization
   */
  preloadCountries: () => {
    return countryService.getCountries().catch((error) => {
      console.error("Failed to preload countries:", error);
    });
  },

  /**
   * Check if countries are cached
   */
  isCached: () => {
    return countriesCache !== null;
  },
};

export default countryService;
