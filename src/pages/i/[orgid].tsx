import { useRouter } from 'next/router'
import { useState } from 'react'
import TimezoneSelect from '../../components/TimezoneSelect'
import SkillSelect from '../../components/SkillSelect'

export default function Login() {
  const router = useRouter()
  const { orgid } = router.query
  const [timezone, setTimezone] = useState('default')
  const [skills, setSkills] = useState('default')

  return (
  
    <form>

      <label htmlFor="FirstName"><b>First Name</b></label>
      <input id = "FirstName" type="text" placeholder="First Name" name="FirstName" required></input>

      <label htmlFor="LastName"><b>Last Name</b></label>
      <input id = "LastName" type="text" placeholder="Last Name" name="LastName" required></input>

      <label htmlFor="DisplayName"><b>Display Name</b></label>
      <input id = "DisplayName" type="text" placeholder="Display Name" name="DisplayName" ></input>

      <label htmlFor="email"><b>Email</b></label>
      <input id = "email" type="text" placeholder="Email" name="email" required></input>

      <label htmlFor="psw"><b>Password</b></label>
      <input type="password" placeholder="Password" name="psw" required></input>

      <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
      <input type="password" placeholder="Repeat Password" name="psw-repeat" required></input>

      <TimezoneSelect setTimezone={setTimezone} />

      <SkillSelect setSkills={setSkills}/>

      <label htmlFor="Skills"><b>Skills </b></label>
      <input id = "Skills" type="text" placeholder="Skills " name="Skills" required></input>

      <button type="submit">Signup</button>
    </form>
   
  )
}
