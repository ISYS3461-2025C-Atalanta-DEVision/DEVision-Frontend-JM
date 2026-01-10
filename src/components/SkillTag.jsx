import React from 'react'
import skillStore from '../store/skill.store'

export default function SkillTag({ skillName, skillId, icon }) {
  const { getSkillById } = skillStore();

  // If skillId is provided, look up the skill from store
  let displayName = skillName;
  let displayIcon = icon;

  if (skillId && !skillName) {
    const skill = getSkillById(skillId);
    if (skill) {
      displayName = skill.name;
      displayIcon = skill.icon;
    } else {
      displayName = skillId; // Fallback to ID if not found
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
