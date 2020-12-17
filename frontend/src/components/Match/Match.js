import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Avatar, Chip} from '@material-ui/core/';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import { makeStyles, withStyles } from '@material-ui/core/styles';

//
//let matches = [{
//    "id": "0",
//    'first_name': "Basil",
//    'last_name': "Sgier",
//    'user_name': "basilsgier",
//    'age': 25,
//    'gender': "M",
//    'city': "Haifa",
//    'status': 'not_responded',
//    'img_url':"Capture.PNG",
//    'dog':
//    {
//      "id": "0",
//    'photo_url': "Capture.PNG",
//    'dog_name': "shin",
//    'description': "a lovely husky dog 4 months old",
//    'owner_id': 2,
//    }
//},
//{
//    "id": "0",
//    'first_name': "Aseel",
//    'last_name': "Sakass",
//    'user_name': "AseelSakas",
//    'password': "123",
//    'age': 25,
//    'gender': "F",
//    'city': "Yaseef",
//    'status': 'not_responded',
//    'img_url':"Capture2.jpeg",
//    'dog':{
//      "id": "0",
//    'photo_url': "C:\\Users\\basil\\Desktop\\excellant_team\\python_projects\\doggo_demo\\backend\\pictures\\Capture.PNG",
//    'dog_name': "shin",
//    'description': "a lovely husky dog 4 months old",
//    'owner_id': 2,
//    }
//
//},{
//    "id": "0",
//    'first_name': "Amjad",
//    'last_name': "Bashiti",
//    'user_name': "AmjadB",
//    'password': "123",
//    'age': 24,
//    'gender': "M",
//    'city': "Yaseef",
//    'status': 'not_responded',
//    'dog':{
//      "id": "0",
//    'photo_url': "C:\\Users\\basil\\Desktop\\excellant_team\\python_projects\\doggo_demo\\backend\\pictures\\Capture.PNG",
//    'dog_name': "milano",
//    'description': "a lovely bommernian dog 2 years old",
//    'owner_id': 4,
//    }},
//  {
//    "id": "0",
//    'first_name': "Test",
//    'last_name': "Bashiti",
//    'user_name': "AmjadB",
//    'password': "123",
//    'age': 24,
//    'gender': "M",
//    'city': "Yaseef",
//    'status': 'not_responded',
//    'dog':{
//      "id": "0",
//    'photo_url': "C:\\Users\\basil\\Desktop\\excellant_team\\python_projects\\doggo_demo\\backend\\pictures\\Capture.PNG",
//    'dog_name': "milano",
//    'description': "a lovely bommernian dog 2 years old",
//    'owner_id': 4,
//    }
//  },{
//    "id": "0",
//    'first_name': "Test2",
//    'last_name': "Bla",
//    'user_name': "AmjadB",
//    'password': "123",
//    'age': 24,
//    'gender': "M",
//    'city': "Yaseef",
//    'status': 'not_responded',
//    'dog':{
//      "id": "0",
//    'photo_url': "C:\\Users\\basil\\Desktop\\excellant_team\\python_projects\\doggo_demo\\backend\\pictures\\Capture.PNG",
//    'dog_name': "milano",
//    'description': "a lovely bommernian dog 2 years old",
//    'owner_id': 4,
//    }
//  },
//  {
//    "id": "0",
//    'first_name': "Test3",
//    'last_name': "Bla",
//    'user_name': "AmjadB",
//    'password': "123",
//    'age': 24,
//    'gender': "M",
//    'city': "Yaseef",
//    'status': 'not_responded',
//    'dog':{
//      "id": "0",
//    'photo_url': "C:\\Users\\basil\\Desktop\\excellant_team\\python_projects\\doggo_demo\\backend\\pictures\\Capture.PNG",
//    'dog_name': "milano",
//    'description': "a lovely bommernian dog 2 years old",
//    'owner_id': 4,
//    }
//  }
//]


// const StyledBadge = withStyles((theme) => ({
//   badge: {
//     backgroundColor: '#44b700',
//     color: '#44b700',
//     boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//     '&::after': {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       borderRadius: '50%',
//       animation: '$ripple 1.2s infinite ease-in-out',
//       border: '1px solid currentColor',
//       content: '""',
//     },
//   },
//   '@keyframes ripple': {
//     '0%': {
//       transform: 'scale(.8)',
//       opacity: 1,
//     },
//     '100%': {
//       transform: 'scale(2.4)',
//       opacity: 0,
//     },
//   },
// }))(Badge);

const StyledBadgeOff = withStyles((theme) => ({
  badge: {
    backgroundColor: 'grey',
    color: 'grey',
     marginTop: '40px',
    marginLeft: '180px',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const StyledBadgeOn = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    marginTop: '40px',
    marginLeft: '150px',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
 paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: '120px',
    height: '120px',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '90%',
    maxHeight: '90%',
  },
}));

let user_id = 2;

export default function Match() {

  const classes = useStyles();
  const [matches, setMatches] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);

  if (fetching){
    let url = new URL("http://127.0.0.1:3001/user/" + user_id + "/match/");
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((finalRes) => {setMatches(finalRes); setFetching(false); console.log("REQS", finalRes)})
      .catch((error) => {console.log(error)});
  }





//  const handleRequestAccept = (event) => {
//    console.log("EVENT", event.target.id)
//    requests.map((request) => {
//      if (request.id == event.target.name){
//        request['status'] = 'accept';
//      }
//    })
//    /*send to route */
////     let status = event.target.checked ? 1 : 0;
////     let url = new URL("http://127.0.0.1:3001/user/" + user_id + "/match/");
////     fetch(url, {
////       method: "GET",
////       headers: {'Content-Type':'application/json'},
////     })
////       .then((res) => res.json())
////       .then((finalRes) => {
////                     console.log("STATUS", finalRes);})
////       .catch((error) => {console.log(error)});
//  };

  function FormRow(props) {
    return (
      <React.Fragment>
      {props.items.map((match) => {
        return (

          <Grid item xs={4}>
          {match.status == 1 ? <StyledBadgeOn
        overlap="circle"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        variant="dot"
      /> : <StyledBadgeOff
        overlap="circle"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        variant="dot"
      />}
           <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item className={classes.image}>
            <img className={classes.img} alt="complex" src={"http://localhost:3001/img/" + match.image_url + '/'} />
          </Grid>
          <Grid item xs={10} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="body2" gutterBottom>
                  {match && match.dog && match.dog.length >= 1 ? match.dog.dog_name : ""}
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  {match.first_name + " " + match.last_name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {match && match.dog && match.dog.length >= 1 ? match.dog.description + " located in " + match.city : ""}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
     

      </Grid>)
      })}
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
    {matches.length == 0 ? null : 
    <div>
    {matches.friends.length == 0 ? null : 
      <div>
        <h1>Friends</h1>
        <Grid container spacing={1}>
          {matches.friends.map((match, idx) => {
            if (idx % 3 == 0){
            return(<Grid container item xs={12} spacing={3}>
                  <FormRow items={matches.friends.slice(idx, idx + 3)} />
              </Grid>)
            }
          })}
          </Grid>
        </div>}
        {matches.not_friends.length == 0 ? null :
        <div>
      <h1>Not Friends</h1>
      <Grid container spacing={1}>
      {matches.not_friends.map((match, idx) => {
        if (idx % 3 == 0){
         return(<Grid container item xs={12} spacing={3}>
              <FormRow items={matches.not_friends.slice(idx, idx + 3)} />
          </Grid>)
        }
      })}
      </Grid></div>}
      </div>}
    </div>
  );
}