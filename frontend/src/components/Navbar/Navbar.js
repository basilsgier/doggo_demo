import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ApartmentIcon from "@material-ui/icons/Apartment";
import HomeIcon from "@material-ui/icons/Home";
import Badge from "@material-ui/core/Badge";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import PetsIcon from '@material-ui/icons/Pets';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import FaceOutlinedIcon from '@material-ui/icons/FaceOutlined';const menuId = "primary-search-account-menu";
const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,

    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  button: {
    height: 100,
    width: 400,
    marginTop: 5,
    background: "linear-gradient(45deg, #ffccbc 30%, #ff5722 90%)",
    boxShadow: "0 3px 5px 2px rgba(0, 38, 255, .3)",
    flexGrow: 1,
    padding: theme.spacing(3),
    fontSize: 18,
    color: "#091b7d",

    //  marginLeft: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    flex: 30,
    paddingTop: 4,
    fontSize: 31,
    letterSpacing: 1.4,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  ListItem: {
    borderRadius: 5,
    border: 0,
    color: "white",
    height: 80,
    width: 180,
    marginTop: 10,
    marginLeft: "20px",
    marginBottom: "20px",
  },
  Home: {
    background: "linear-gradient(45deg, #d33115 30%, #d33115 90%)",
    boxShadow: "0 3px 5px 2px rgba(253, 255, 120, .3)",
    marginLeft: 5,
  },
  Class: {
    background: "linear-gradient(45deg, #009ce0 30%, #009ce0 90%)",
    boxShadow: "0 3px 5px 2px rgba(253, 255, 120, .3)",
    marginLeft: 5,
  },
  Courses: {
    background: "linear-gradient(45deg, #e91e63 30%, #e91e63 90%)",
    boxShadow: "0 3px 5px 2px rgba(3, 169, 244, .3)",
    marginLeft: 5,
  },
  Teachers: {
    background: "linear-gradient(45deg, #fe9200 30%, #fe9200 90%)",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    marginLeft: 5,
  },
  Faculties: {
    background: "linear-gradient(45deg, #68bc00 30%, #68bc00 60%)",
    boxShadow: "0 3px 5px 2px rgba(77, 182, 172, .3)",
    marginLeft: 5,
  },
  LogOut: {
    background: "linear-gradient(45deg,#90a4ae 30%, #90a4ae 90%)",
    marginLeft: 5,
  },
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <a href="/Profile" style={{ textDecoration: "none" }}>
        <MenuItem onClick={handleMenuClose}>Profile Settings</MenuItem>
      </a>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <span></span>
          <Typography variant="h6" className={classes.title} align="center">
            Doggo
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <FaceOutlinedIcon
              edge="start"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle style={{ fontSize: 25 }} />
            </FaceOutlinedIcon>
            <span> &nbsp; &nbsp;</span>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <List>

           <Link to={"/Match"} style={{ textDecoration: "none" }}>
            <ListItem
              button
              key={"Match"}
              onClick={handleDrawerClose}
              className={clsx(classes.Class, {
                [classes.ListItem]: open,
              })}
            >
              <ListItemIcon>
                {" "}
                <PetsIcon />{" "}
              </ListItemIcon>
              <ListItemText primary={"Match"} />
            </ListItem>
          </Link>
          <Link to={"/Requests"} style={{ textDecoration: "none" }}>
            <ListItem
              button
              key={"Requests"}
              onClick={handleDrawerClose}
              className={clsx(classes.Courses, {
                [classes.ListItem]: open,
              })}
            >
              <ListItemIcon>
                {" "}
                <EmojiPeopleIcon />{" "}
              </ListItemIcon>
              <ListItemText primary={"Requests"} />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <br></br>
        <br></br>
      </main>
    </div>
  );
}
