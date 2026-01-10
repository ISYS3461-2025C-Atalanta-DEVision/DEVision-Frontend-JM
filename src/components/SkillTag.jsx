import React, { useEffect } from 'react'
import skillStore from '../store/skill.store'

export default function SkillTag({ skillName, skillId, icon }) {
  // Subscribe to skills and skillsMap so component re-renders when skills are loaded
  const { skills, skillsMap, fetchSkills } = skillStore();

  // Ensure skills are fetched
  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  // Determine display name and icon
  let displayName = skillName;
  let displayIcon = icon;

  if (skillId && !skillName) {
    // First try to find by ID in skillsMap
    let skill = skillsMap[skillId];

    // If not found by ID, skillId might actually be a skill name (from backend)
    // Try to find by name in the skills array
    if (!skill) {
      skill = skills.find(s => s.name === skillId || s.id === skillId);
    }

    if (skill) {
      displayName = skill.name;
      displayIcon = skill.icon;
    } else {
      // Fallback: just display the skillId as the name (it might be a skill name string)
      displayName = skillId;
    }
  }

  return (
    <div className="flex items-center justify-center w-content h-content px-3 py-2 gap-2 bg-neutral1 rounded-lg">
      <p className="text-blacktxt font-medium">{displayName}</p>
      {displayIcon && (
        <i className={`ri-${displayIcon}-line text-[20px] text-primary`}></i>
      )}
    </div>
  )
}
