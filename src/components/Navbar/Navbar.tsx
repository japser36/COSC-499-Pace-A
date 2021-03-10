import React from 'react'
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  NavInput,
  NavLinkDash,
  NavBell,
  NavUser,
} from './NavbarElements'

const Navbar = () => {
  const [active, setActive] = React.useState(false)
  return (
    <>
      <Nav>
        <NavLink href="/app/login">
          <h1>Mentor.io</h1>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLinkDash href="/dashboard" activeStyle>
            Dashboard
          </NavLinkDash>
          <NavLink href="/authPage" activeStyle>
            Auth Page
          </NavLink>
          <NavInput />
        </NavMenu>
        <NavMenu>
          <NavBell />
          <NavLink href="/profile" activeStyle>
            <NavUser />
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  )
}

export default Navbar
