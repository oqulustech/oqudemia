
import React from 'react';
import { NavLink } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


interface SideMenuItem {
  id: string;
  name: string;
  link: string;
  component: string;
}

interface MenuItem {
  id: string;
  name: string;
  link: string;
  component: string;
  sidemenu?: SideMenuItem[];
}


interface NavLeftProps {
  menuItems: SideMenuItem[];
}

const NavLeft: React.FC<NavLeftProps> = ({ menuItems }) => {
  console.log('NavLeft menuItems:', menuItems);
  return (
    <List component="nav" sx={{ width: '100%', maxWidth: 240 }}>
      {menuItems.map((item: SideMenuItem, index: number) => (
        <ListItem key={item.id} disablePadding>
          <ListItemButton component={NavLink} to={item.link}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export { NavLeft };


