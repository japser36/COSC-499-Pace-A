import SkillSelect from '../../components/SkillSelect'
import { useState } from 'react'
import fetch from 'node-fetch'

export default function Skills() {
  const [skills, setSkills] = useState(null)
  return (
    <>
      <SkillSelect setSkills={setSkills}></SkillSelect>
      {console.log(skills)}
    </>
  )
}
