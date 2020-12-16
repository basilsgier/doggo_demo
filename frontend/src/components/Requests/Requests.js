import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Avatar, Chip} from '@material-ui/core/';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


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
    width: '40%',
    height: '40%',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '90%',
    maxHeight: '90%',
  },
}));


export default function NestedGrid() {
  const classes = useStyles();

  const [requests, setRequests] = React.useState([{
    "id": "0",
    'first_name': "Basil",
    'last_name': "Sgier",
    'user_name': "basilsgier",
    'age': 25,
    'gender': "M",
    'city': "Haifa",
    'status': 'not_responded',
    'img_url':"Capture.PNG",
    'dog':
    {
      "id": "0",
    'photo_url': "Capture.PNG",
    'dog_name': "shin",
    'description': "a lovely husky dog 4 months old",
    'owner_id': 2,
    }
},
{
    "id": "1",
    'first_name': "Aseel",
    'last_name': "Sakass",
    'user_name': "AseelSakas",
    'password': "123",
    'age': 25,
    'gender': "F",
    'city': "Yaseef",
    'status': 'not_responded',
    'img_url':"Capture2.jpeg",
    'dog':{
      "id": "0",
    'photo_url': "C:\\Users\\basil\\Desktop\\excellant_team\\python_projects\\doggo_demo\\backend\\pictures\\Capture.PNG",
    'dog_name': "shin",
    'description': "a lovely husky dog 4 months old",
    'owner_id': 2,
    }
    
},{
    "id": "2",
    'first_name': "Amjad",
    'last_name': "Bashiti",
    'user_name': "AmjadB",
    'password': "123",
    'age': 24,
    'gender': "M",
    'city': "Yaseef",
    'status': 'not_responded',
    'dog':{
      "id": "0",
    'photo_url': "C:\\Users\\basil\\Desktop\\excellant_team\\python_projects\\doggo_demo\\backend\\pictures\\Capture.PNG",
    'dog_name': "milano",
    'description': "a lovely bommernian dog 2 years old",
    'owner_id': 4,
    }},
  {
    "id": "3",
    'first_name': "Test",
    'last_name': "Bashiti",
    'user_name': "AmjadB",
    'password': "123",
    'age': 24,
    'gender': "M",
    'city': "Yaseef",
    'status': 'not_responded',
    'dog':{
      "id": "0",
    'photo_url': "C:\\Users\\basil\\Desktop\\excellant_team\\python_projects\\doggo_demo\\backend\\pictures\\Capture.PNG",
    'dog_name': "milano",
    'description': "a lovely bommernian dog 2 years old",
    'owner_id': 4,
    }
  },{
    "id": "4",
    'first_name': "Test2",
    'last_name': "Bla",
    'user_name': "AmjadB",
    'password': "123",
    'age': 24,
    'gender': "M",
    'city': "Yaseef",
    'status': 'not_responded',
    'dog':{
      "id": "0",
    'photo_url': "C:\\Users\\basil\\Desktop\\excellant_team\\python_projects\\doggo_demo\\backend\\pictures\\Capture.PNG",
    'dog_name': "milano",
    'description': "a lovely bommernian dog 2 years old",
    'owner_id': 4,
    }
  },
  {
    "id": "5",
    'first_name': "Test3",
    'last_name': "Bla",
    'user_name': "AmjadB",
    'password': "123",
    'age': 24,
    'gender': "M",
    'city': "Yaseef",
    'status': 'not_responded',
    'dog':{
      "id": "0",
    'photo_url': "C:\\Users\\basil\\Desktop\\excellant_team\\python_projects\\doggo_demo\\backend\\pictures\\Capture.PNG",
    'dog_name': "milano",
    'description': "a lovely bommernian dog 2 years old",
    'owner_id': 4,
    }
  }
]);

  const handleRequestAccept = (id) => {
    console.log("EVENT", id)
    console.log("BEFORE", requests)
    let temp_req = [...requests]
    temp_req.map((request) => {
      if (request.id === id){
        request['status'] = 'accept';
      }
    })
    setRequests(temp_req);
    console.log("AFTER", requests)
    /*send to route */
    // let status = event.target.checked ? 1 : 0;
    // let url = new URL("http://127.0.0.1:3001/user/" + user_id + "/" + status  + '/');
    // fetch(url, {
    //   method: "PUT",
    //   headers: {'Content-Type':'application/json'},
    // })
    //   .then((res) => res.json())
    //   .then((finalRes) => {
    //                 console.log("STATUS", finalRes);})
    //   .catch((error) => {console.log(error)});
  };

   const handleRequestDecline = (id) => {
    console.log("EVENT", id)
    console.log("BEFORE", requests)
    let temp_req = [...requests]
    temp_req.map((request) => {
      if (request.id === id){
        request['status'] = 'reject';
      }
    })
    setRequests(temp_req);
    console.log("AFTER", requests)
    /*send to route */
    // let status = event.target.checked ? 1 : 0;
    // let url = new URL("http://127.0.0.1:3001/user/" + user_id + "/" + status  + '/');
    // fetch(url, {
    //   method: "PUT",
    //   headers: {'Content-Type':'application/json'},
    // })
    //   .then((res) => res.json())
    //   .then((finalRes) => {
    //                 console.log("STATUS", finalRes);})
    //   .catch((error) => {console.log(error)});
  };

  function FormRow(props) {
    return (
      <React.Fragment>
      {props.items.map((request) => {
        return (
          <Grid item xs={4}> <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item className={classes.image}>
            <img className={classes.img} alt="complex" src={"http://localhost:3001/img/" + request.img_url + '/'} />
          </Grid>
          <Grid item xs={10} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {request.first_name + " " + request.last_name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  { "My dog name is " + request.dog.dog_name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {request.dog.description + " located in " + request.city}
                </Typography>
              </Grid>
              {request.status === 'not_responded' ?
              <Grid container spacing = {2}>
              <Grid>
                <Button onClick={() => handleRequestAccept(request.id)} style={{ cursor: 'pointer' }} variant="contained" color="primary">
                  Accept
                </Button>
              </Grid>
              <Grid >
                <Button onClick={() => handleRequestDecline(request.id)} style={{ cursor: 'pointer' }} variant="contained" color="secondary">
                  Decline
                </Button>
              </Grid>
              </Grid> : 
              <div>{request.status === 'accept' ?  
              <Typography style={{color:'green'}}>Accepted</Typography> 
              : <Typography style={{color:'red'}}>Declined</Typography>}</div>}
            </Grid>
          </Grid>
        </Grid>
      </Paper></Grid>)
      })}
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
      {requests.map((request, idx) => {
        if (idx % 3 == 0){
         return(<Grid container item xs={12} spacing={3}>
              <FormRow items={requests.slice(idx, idx + 3)} />
          </Grid>)
        }
      })}
      </Grid>
    </div>
  );
}