import { create } from "zustand";
import skillService from "../services/skillService";

// Keep promise outside store to prevent race conditions
let fetchPromise = null;

const skillStore = create((set, get) => ({
  skills: [],
  skillsMap: {}, // Map of id -> skill for quick lookup
  loading: false,
  error: null,
  initialized: false,

  fetchSkills: async () => {
    // Skip if already loaded
    if (get().initialized && get().skills.length > 0) {
      return get().skills;
    }

    // If already fetching, return the existing promise (prevents duplicate requests)
    if (fetchPromise) {
      return fetchPromise;
    }

    set({ loading: true, error: null });

    fetchPromise = (async () => {
      try {
        const skills = await skillService.getSkills();

        // Create a map for quick lookup by id
        const skillsMap = {};
        skills.forEach((skill) => {
          skillsMap[skill.id] = skill;
        });

        set({
          skills,
          skillsMap,
          loading: false,
          initialized: true
        });
        return skills;
      } catch (error) {
        set({ error: error.message, loading: false });
        return [];
      } finally {
        fetchPromise = null;
      }
    })();

    return fetchPromise;
  },

  // Get skill by ID
  getSkillById: (id) => {
    return get().skillsMap[id] || null;
  },

  // Get skill name by ID
  getSkillName: (id) => {
    const skill = get().skillsMap[id];
    return skill ? skill.name : id; // Fallback to id if not found
  },

  // Get skill icon by ID
  getSkillIcon: (id) => {
    const skill = get().skillsMap[id];
    return skill ? skill.icon : null;
  },

  // Get all skill names (for dropdown options)
  getSkillOptions: () => {
    return get().skills.map((skill) => ({
      id: skill.id,
      name: skill.name,
      icon: skill.icon,
    }));
  },
}));

export default skillStore;
