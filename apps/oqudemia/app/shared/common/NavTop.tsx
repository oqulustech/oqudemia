
import React, { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';

import { NavLink, useNavigate } from 'react-router-dom';

interface SideMenuItem {
  id: string;
  name: string;
  link: string;
  component: string;
}

interface NavMenuItem {
  id: string;
  name: string;
  link: string;
  component: string;
  sidemenu?: SideMenuItem[];
}


interface NavTopProps {
  navMenu: NavMenuItem[];
  onMenuSelect: (sidemenu: SideMenuItem[]) => void;
}


const NavTop: React.FC<NavTopProps> = ({ navMenu, onMenuSelect }) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expires_at')
    handleClose();
    window.location.href = '/login';
  };

  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Toolbar>
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              <Box sx={{ width: 250 }} role="presentation" onClick={() => setDrawerOpen(false)}>
                <Stack direction="column" spacing={2} sx={{ mt: 2 }}>
                  {navMenu.map((item) => (
                    <NavLink
                      key={item.id}
                      to={item.link}
                      style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500, fontSize: 18, padding: '8px 16px' }}
                      onClick={() => {
                        onMenuSelect(item.sidemenu || []);
                        setDrawerOpen(false);
                      }}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </Stack>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Box>
            </Drawer>
          </>
        ) : (
          <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
            {navMenu.map((item) => (
              <NavLink
                key={item.id}
                to={item.link}
                style={{ color: 'inherit', textDecoration: 'none', marginRight: 8 }}
                onClick={() => onMenuSelect(item.sidemenu || [])}
              >
                {item.name}
              </NavLink>
            ))}
          </Stack>
        )}
        <Box sx={{ flexGrow: 0 }}>
          <IconButton
            size="large"
            aria-label="settings"
            aria-controls={open ? 'settings-menu' : undefined}
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <SettingsIcon />
          </IconButton>
          <Menu
            id="settings-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

  // Example usage (replace axios.get with api.get):
  // api.get('http://localhost:3000/topmenu').then(...)
export { NavTop };


