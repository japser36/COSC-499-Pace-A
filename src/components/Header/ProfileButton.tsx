import { useState, MouseEvent } from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons'
import Link from 'next/link'

const navlink = {
    profile: '/app/profile',
    login: '/app/login',
  }

const ProfileButton = ({ logout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton color='inherit' onClick={handleClick}>
        <AccountCircle />
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link href={navlink.profile}>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <MenuItem onClick={() => {
            handleClose()
            logout()}}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default ProfileButton