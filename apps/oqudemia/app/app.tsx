import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { menuService } from './core/services/menu';
import './app.css';

// Imported components
import { NavTop } from './shared/common/NavTop';
import { NavLeft } from './shared/common/NavLeft';
import { Content } from './shared/common/Content';

const drawerWidth = 320;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export function App() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [navMenu, setNavMenu] = React.useState([]);
  const [sidemenu, setSidemenu] = React.useState([]);

  React.useEffect(() => {
    // Auth check
    if (!localStorage.getItem('token')) {
      window.location.href = '/';
      return;
    }
    // Fetch topmenu using menuService
    (async () => {
      try {
        const res = await menuService.getTopMenu();
        setNavMenu(res);
        // Set initial sidemenu from first menu item
        if (res.length > 0 && Array.isArray(res[0].sidemenu)) {
          setSidemenu(res[0].sidemenu);
        }
      } catch (err) {
        console.error('Failed to fetch topmenu:', err);
      }
    })();
  }, []);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleMenuSelect = (sidemenuData) => setSidemenu(sidemenuData);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      {/* Top Header */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 2, ...(open && { display: 'none' }) }}
          >
            Oqudemia
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <NavTop navMenu={navMenu} onMenuSelect={handleMenuSelect} />
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Left Drawer Menu */}
      <Drawer variant="permanent" open={open}>
    <DrawerHeader className="drawerHeaderCustom">
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : 'Oqudemia'}
          </IconButton>
        </DrawerHeader>
        <Divider />        
        <NavLeft menuItems={sidemenu}/>
        <Divider />
      </Drawer>

      {/* Right Body Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, background: '#f5f6fa' }}>
        <DrawerHeader />
        <Content/>
      </Box>
    </Box>
  );
}

export default App;






