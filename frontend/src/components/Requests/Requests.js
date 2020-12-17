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

let user_id = 2;
export default function NestedGrid() {
  const classes = useStyles();

  const [requests, setRequests] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);

  if (fetching){
    let url = new URL("http://127.0.0.1:3001/requests/" + user_id + "/");
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((finalRes) => { 
        if("Error" in finalRes){
                          setRequests({});
                          
        }
      else{
         setRequests(finalRes); 
         setFetching(false);
      }
       console.log("REQS", finalRes)})
      .catch((error) => {console.log(error)});
  }
  const handleRequestAccept = (id) => {
    console.log("EVENT", id)
    console.log("BEFORE", requests)
    let temp_req = [...requests]
    temp_req.map((request) => {
      if (request.id === id){
        request['status'] = 'accept';
        let url = new URL("http://127.0.0.1:3001/requests/" + user_id + "/");
    fetch(url, {
      method: "PUT",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'sender_id': id,
            'response': 'accept'})
    })
      .then((res) => res.json())
      .then((finalRes) => {
                    console.log("STATUS", finalRes);})
      .catch((error) => {console.log(error)});
      }
    })
    setRequests(temp_req);
  };

   const handleRequestDecline = (id) => {
    let temp_req = [...requests]
    temp_req.map((request) => {
      if (request.id === id){
        request['status'] = 'reject';
        let url = new URL("http://127.0.0.1:3001/requests/" + user_id + "/");
    fetch(url, {
      method: "PUT",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'sender_id': id,
            'response': 'decline'})
    })
      .then((res) => res.json())
      .then((finalRes) => {
                    console.log("STATUS", finalRes);})
      .catch((error) => {console.log(error)});
      }
    })
    setRequests(temp_req);
  };

  function FormRow(props) {
    return (
      <React.Fragment>
      {props.items.map((request) => {
        return (
          <Grid item xs={4}> <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item className={classes.image}>
            <img className={classes.img} alt="complex" src={"http://localhost:3001/img/" + request.image_url + '/'} />
          </Grid>
          <Grid item xs={10} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {request.first_name + " " + request.last_name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {request.dog.length >= 1 ? "My dog name is " + request.dog[0].dog_name : ""}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                {request.dog.length >= 1 ?  request.dog[0].description + " located in " + request.city : ""}
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
    {requests.length == 0 ? <div>No Requests</div> : 
      <Grid container spacing={1}>
      {requests.map((request, idx) => {
        if (idx % 3 == 0){
         return(<Grid container item xs={12} spacing={3}>
              <FormRow items={requests.slice(idx, idx + 3)} />
          </Grid>)
        }
      })}
      </Grid>}
    </div>
  );
}