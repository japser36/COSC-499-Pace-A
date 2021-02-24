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
    NavUser
  } from './NavbarElements';

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavLink to="/login">
                    <h1>Mentor.io</h1>
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLinkDash to="/dashboard" activeStyle>
                        Dashboard
                    </NavLinkDash>
                    <NavLink to="/authPage" activeStyle>
                        Auth Page
                    </NavLink>
                    <NavInput />
                </NavMenu>
                <NavMenu>
                    <NavBell />
                    <NavLink to="/profile" activeStyle><NavUser /></NavLink>
                </NavMenu>
            </Nav>
        </>
    )
}

export default Navbar;