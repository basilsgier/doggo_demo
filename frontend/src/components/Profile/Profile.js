import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';



const avatarStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
const cardStyles = makeStyles((theme) => ({
  root: {
    width: 600,
    height: 700,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


const IOSSwitch  = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    margin: theme.spacing(1),
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
          '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},

}))(Switch);

function Profile(props){ /*need to get props */
/*<Profile data= {}>
let user = props.data
*/
var props = {
    "logedin_id": "0",
    'first_name': "Amjad",
    'last_name': "Bashiti",
    'user_name': "amjad.love",
    'password': "555",
    'age': 24,
    'gender': "Male",
    'city': "Yassef",
    'phone_number': "0526488801",
    'img_url': '/static/pictures/Capture.PNG'
    };
   /*card */
  const cardClasses = cardStyles();
  const bull = <span className={cardClasses.bullet}>•</span>;
  const avatarClasses = avatarStyles();


  /*switch */
  const [state, setState] = React.useState({
    available: false
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    /*send to route */
  };

  return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
<Card className={cardClasses.root} variant="outlined">
      <CardHeader
         avatar={
             <div className={avatarClasses.root}>
      <Avatar alt="Remy Sharp" src="amjad.jpg" />
    </div>

        }
       title={props["user_name"]}
             />
      <FormControlLabel
        control={<IOSSwitch checked={state.available} onChange={handleChange} name="available" />}
        label="Available"
      />
      <CardMedia
        className={cardClasses.media}
        image= "amjad.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="h6" color="initial" component="p">
            <b>First Name :  </b>  {props["first_name"]}
        </Typography>

        <Typography variant="h6" color="initial" component="p">
            <b>Last Name :  </b>  {props["last_name"]}
        </Typography>

         <Typography variant="h6" color="initial" component="p">
            <b>Age :  </b>  {props["age"]}
        </Typography>

        <Typography variant="h6" color="initial" component="p">
            <b>Gender :  </b>  {props["gender"]}
        </Typography>

        <Typography variant="h6" color="initial" component="p">
            <b>City :  </b>  {props["city"]}
        </Typography>

        <Typography variant="h6" color="initial" component="p">
            <b>Phone :  </b>  {props["phone_number"]}
        </Typography>

      </CardContent>

      <CardActions disableSpacing>



      </CardActions>



</Card>
</div>

  );
}

export default Profile;
