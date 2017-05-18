import React from 'react'

import firebase from 'firebase'

import MenuItem from 'material-ui/MenuItem'
import Drawer from 'material-ui/Drawer'
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app'

const Menu = ({ open, setOpenMenu, handleLogout }) => {
  return(
    <Drawer
      docked={false}
      width={200}
      open={open}
      onRequestChange={setOpenMenu}
    >
      <MenuItem onTouchTap={ handleLogout }
        leftIcon={ <ExitToApp /> }
      >
        Cerrar sesión
      </MenuItem>
    </Drawer>
  )
}



export default Menu;
