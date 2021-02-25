import SkillSelect from '../../components/SkillSelect'
import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import fetch from 'node-fetch'
import Button from '@material-ui/core/Button'

export default function Skills() {
  const handleButton = async () => {
    await fetch('../api/user/set-skills', {
      method: 'POST',
      body: JSON.stringify({
        id: id,
        skills: JSON.stringify(skills),
      }),
    })
  }

  const [skills, setSkills] = useState(null)
  const [id, setId] = useState('')
  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          handleButton()
        }}
      >
        Submit Skills
      </Button>
      <TextField
        label="user id"
        variant="outlined"
        onChange={(event) => {
          setId(event.target.value)
        }}
      />
      <SkillSelect setSkills={setSkills}></SkillSelect>
    </>
  )
}
