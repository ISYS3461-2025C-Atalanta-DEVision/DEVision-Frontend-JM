import React from 'react'

export default function SkillTag( {skillName}) {
  const skillIcon = skillName.toLowerCase()

  return (
    <div className="flex items-center justify-center w-content h-content px-3 py-2 gap-2 bg-neutral1 rounded-lg">
        <p className="text-blacktxt font-medium">{skillName}</p>
        <i className={`devicon-${skillIcon}-plain colored text-[25px]`}></i>
    </div>
  )
}
