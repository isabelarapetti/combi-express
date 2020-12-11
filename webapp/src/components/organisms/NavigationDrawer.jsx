import React from 'react';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import {
  makeStyles,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Link,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
} from '@material-ui/core';
import {
  Timeline as TimelineIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  AccountCircle as AccountCircleIcon,
  AddBox as AddBoxIcon,
} from '@material-ui/icons';
import { PermissionsMediator } from '../../lib/storageMediators/PermissionsMediator';
import { GlobalState } from '../../GlobalState';
import { DailyIcon, Logo } from '../atoms';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  accountMenu: {
    marginTop: 32,
  },
  menuButton: {
    marginRight: 36,
  },
  rightButtons: {
    marginLeft: 'auto',
  },
  headerIcons: {
    fill: '#fff',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerOpen: {
    border: 'none',
    backgroundColor: theme.palette.primary.light,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    border: 'none',
    backgroundColor: theme.palette.primary.light,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  drawerList: { color: theme.palette.primary.contrastText },
  drawerIcon: { color: theme.palette.primary.contrastIcon },
  toolbar: {
    display: 'flex',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.white,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  header: {
    backgroundColor: theme.palette.primary.dark,
    flex: 1,
  },
  logo: {
    width: '120px',
  },
  tooltip: {
    width: '100%',
  },
  itemContainer: {
    display: 'flex',
    whiteSpace: 'nowrap',
    padding: 1,
  },
}));

function NavigationDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleAccountMenuClick = (evt) => {
    setAnchorEl(evt.currentTarget);
    setAccountMenuOpen(true);
  };

  const handleAccountMenuClose = () => {
    setAnchorEl(null);
    setAccountMenuOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const showByPermission = (permissions) => PermissionsMediator.has(permissions);

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.header}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon className={classes.headerIcons} />
          </IconButton>
          <Link color="inherit" href="/#/ranking">
            <Logo className={classes.logo} />
          </Link>
          <div className={classes.rightButtons}>
            <IconButton
              color="inherit"
              aria-label="open account menu"
              aria-controls="account-menu"
              onClick={handleAccountMenuClick}
              edge="end"
            >
              <AccountCircleIcon className={classes.headerIcons} />
            </IconButton>
          </div>
          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            keepMounted
            className={classes.accountMenu}
            open={accountMenuOpen}
            onClose={handleAccountMenuClose}
          >
            <MenuItem onClick={GlobalState.AppComponent.performSignOut}> Sign Out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        PaperProps={{ elevation: 10 }}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon style={{ fill: 'white' }} />{' '}
          </IconButton>
        </div>

        {showByPermission('ADMIN') && (
          <List>
            <ListItem component={Link} href="/#/routes" button key="routas">
              <Tooltip className={classes.tooltip} title="Rutas" arrow>
                <div className={classes.itemContainer}>
                  <ListItemIcon>
                    <TimelineIcon className={classes.drawerIcon} />
                  </ListItemIcon>
                  <ListItemText primary="Rutas" className={classes.drawerList} />
                </div>
              </Tooltip>
            </ListItem>
            <ListItem component={Link} href="/#/createnewroute" button key="createnewroute">
              <Tooltip className={classes.tooltip} title="Create new route" arrow>
                <div className={classes.itemContainer}>
                  <ListItemIcon>
                    <AddBoxIcon className={classes.drawerIcon} />
                  </ListItemIcon>
                  <ListItemText primary="Create new route" className={classes.drawerList} />
                </div>
              </Tooltip>
            </ListItem>
            <ListItem component={Link} href="/#/routes" button key="usuarios">
              <Tooltip className={classes.tooltip} title="Usuarios" arrow>
                <div className={classes.itemContainer}>
                  <ListItemIcon>
                    <AccountCircleIcon className={classes.drawerIcon} />
                  </ListItemIcon>
                  <ListItemText primary="Usuarios" className={classes.drawerList} />
                </div>
              </Tooltip>
            </ListItem>
          </List>
        )}

        <Divider />
        {showByPermission('PASSENGER') && (
          <List className={classes.drawerList}>
            <ListItem component={Link} href="/#/searchroutes" button key="misreservas">
              <Tooltip className={classes.tooltip} title="Mis Reservas" arrow>
                <div className={classes.itemContainer}>
                  <ListItemIcon>
                    <DailyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Mis Reservas" className={classes.drawerList} />
                </div>
              </Tooltip>
            </ListItem>
            <ListItem component={Link} href="/#/searchroutes" button key="search">
              <Tooltip className={classes.tooltip} title="Search routes" arrow>
                <div className={classes.itemContainer}>
                  <ListItemIcon>
                    <SearchIcon />
                  </ListItemIcon>
                  <ListItemText primary="Search routes" className={classes.drawerList} />
                </div>
              </Tooltip>
            </ListItem>
          </List>
        )}
      </Drawer>
    </div>
  );
}

const NavigationDrawerRouter = withRouter(NavigationDrawer);

export { NavigationDrawerRouter as NavigationDrawer };
