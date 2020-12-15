import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core/";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Msgtoshow } from "./Msgtoshow.js";
import Home from "./Home"
import Match from "./Match"
import Requests from "./Requests"

function MainScene(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

MainScene.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
  },
  tabsText: {
    fontSize: "24px",
    fontWeight: "300",
  },
  indicator: { backgroundColor: "#ececec" },
}));

export default function NavTabs() {
  const classes = useStyles();
  const [tab, setTab] = React.useState(0);
  const [state, setState] = React.useState({
    firstLoading: true,
    home:{

    },
    match:{

    }
  });
  const [msgState, setMsgState] = React.useState({
    title: "",
    body: "",
    visible: false,
  });

//   if (updatesState.firstLoading) {
//     let url = new URL(BACKEND_URL + "updates/get_settings/");
//     fetch(url, {
//       method: "GET",
//     })
//       .then((res) => res.json())
//       .then((resp) => {
//         if ("error" in resp) {
//           setMsgState({
//             title: "Failed",
//             body: "Error while getting updates settings",
//             visible: true,
//           });
//           setUpdatesState({
//             EU: "",
//             B2MATCH: "",
//             firstLoading: false,
//           });
//         } else {
//           setUpdatesState({
//             EU: moment.unix(resp.EU).format("MMMM Do YYYY, h:mm:ss a"),
//             B2MATCH: moment
//               .unix(resp.B2MATCH)
//               .format("MMMM Do YYYY, h:mm:ss a"),
//             firstLoading: false,
//           });
//         }
//       })
//       .catch((error) => {
//         setMsgState({
//           title: "Failed",
//           body: "Error while getting updates settings",
//           visible: true,
//         });
//         setUpdatesState({
//           EU: "",
//           B2MATCH: "",
//           firstLoading: false,
//         });
//       });
//   }

  
//   if (alertsState.firstLoading) {
//     let newState = { ...alertsState, firstLoading: false };
//     let newMail = "";
//     let turned_on = false;
//     let url = new URL(BACKEND_URL + "alerts/get_settings/");
//     fetch(url, {
//       method: "GET",
//     })
//       .then((res) => res.json())
//       .then((resp) => {
//         if ("error" in resp) {
//           setMsgState({
//             title: "Failed",
//             body: "Error while uploading alerts settings",
//             visible: true,
//           });
//           setAlertsState(newState);
//         } else {
//           turned_on = resp.turned_on;
//           newMail = resp.email;
//           url = new URL(BACKEND_URL + "scores/getscores/");
//           fetch(url, {
//             method: "GET",
//           })
//             .then((res) => res.json())
//             .then((resp) => {
//               if ("error" in resp) {
//                 setMsgState({
//                   title: "Failed",
//                   body: "Error while uploading alerts settings",
//                   visible: true,
//                 });
//                 setAlertsState(newState);
//               } else {
//                 newState["resScore"] = resp.RES;
//                 newState["italy"] = resp.Italy;
//                 newState["france"] = resp.France;
//                 newState["austria"] = resp.Austria;
//                 newState["germany"] = resp.Germany;
//                 newState["denmark"] = resp.Denmark;
//                 newState["czech"] = resp.Czech_Republic;
//                 newState["finland"] = resp.Finland;
//                 newState["ireland"] = resp.Ireland;
//                 newState["israel"] = resp.Israel;
//                 newState["portugal"] = resp.Portugal;
//                 newState["ukranie"] = resp.Ukranie;
//                 newState["uk"] = resp.United_Kingdom;
//                 newState["turkey"] = resp.Turkey;
//                 newState["switzerland"] = resp.Switzerland;
//                 newState["spain"] = resp.Spain;
//                 newState["norway"] = resp.Norway;
//                 newState["agency"] = resp.Association_Agency;
//                 newState["university"] = resp.University;
//                 newState["company"] = resp.Company;
//                 newState["RD"] = resp.R_D_Institution;
//                 newState["start_up"] = resp.Start_Up;
//                 newState["other"] = resp.Others;
//                 newState["email"] = newMail;
//                 newState["turned_on"] = turned_on;
//                 setAlertsState(newState);
//               }
//             })
//             .catch((error) => {
//               setMsgState({
//                 title: "Failed",
//                 body: "Error while uploading alerts settings",
//                 visible: true,
//               });
//               setAlertsState(newState);
//             });
//         }
//       })
//       .catch((error) => {
//         setMsgState({
//           title: "Failed",
//           body: "Error while uploading alerts settings",
//           visible: true,
//         });
//         setAlertsState(newState);
//       });
//   }

//   /**
//    * 
//    * @param {*} event 
//    * @param {*} newValue 
//    */
  const handleChangeTab = (event, newTab) => {
    setTab(newTab);
  };


//   if (state.firstLoading)
//   {
//     if(!alertsState.firstLoading && !updatesState.firstLoading)
//     {
//       setState({...state, firstLoading: false});
//     }
//   }

  return (
    <div>
<div className={classes.root}>
    <Msgtoshow
        {...msgState}
        handleClose={() => setMsgState({ ...msgState, visible: false })}
      />
      <AppBar id="BackgroundColor" position="static">
        <Tabs
          classes={{
            indicator: classes.indicator,
          }}
          variant="fullWidth"
          value={tab}
          onChange={handleChangeTab}
        >
          <LinkTab
            label={
              <span>
               Home
              </span>
            }
            href="/search"
            {...a11yProps(0)}
          />
          <LinkTab
            label={
              <span>
                Matches
              </span>
            }
            href="/settings"
            {...a11yProps(1)}
          />
          <LinkTab
            label={
              <span >
                Friends Requests
              </span>
            }
            href="/updates"
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>
      <MainScene value={tab} index={0}>
        <Home />
      </MainScene>
      <MainScene value={tab} index={1}>
        <Match state={"Aseel"} />
      </MainScene>
      <MainScene value={tab} index={2}>
        <Requests />
      </MainScene>
    </div>
    </div>
  );
}