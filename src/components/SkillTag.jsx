import React from 'react'
import { SKILL_ICON } from '../ui_config/IconSkill'

export default function SkillTag( {skillName}) {
  const skillIcon = SKILL_ICON.find(
    (item) => item.skillname === skillName.toLowerCase()
  );
  
  return (
    <div className="ml-4">
        {skillIcon.icon}
    </div>
  )
}
