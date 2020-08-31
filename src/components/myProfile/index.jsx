import React,{useState,useEffect,useContext} from 'react'
import axios from "axios";
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { useForm } from 'react-hook-form'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputRange from 'react-input-range';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import 'react-input-range/lib/css/index.css';
import IconButton from '@material-ui/core/IconButton';
import { useHistory,Link } from 'react-router-dom'




const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);


const useStyles = makeStyles(theme => ({
  
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
    root: {
     
        display: 'flex',
        alignItems: 'center',
        width: 590,
    height: 45,     
   },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        fontFamily: "ProximaNova",
        fontSize: "15px",
        fontWeight: "normal",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: 1.2,
        letterSpacing: "normal",
        textAlign: "left",
        color: "#1d1d1d",
        padding: "11px 0 8px !important",
       
      },
      rootDescription:
      {
        height: "100px",
        padding: "50px 0 0 10px"
      },
      iconButton: {
        padding: 10,
      },
    
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      position: "fixed",
      right: 0,
      top: "100px",
      bottom: 0,
      borderRadius:0,
      padding:"0 !important",
    
      boxShadow: theme.shadows[3],

      width:400,
 
      backgroundColor: "#ffffff",
    },
  }));

export default function MyProfile(props) {

    const classes = useStyles();
    const { register, handleSubmit, watch, errors } = useForm()
    const token = JSON.parse(sessionStorage.userData).idToken.jwtToken
    const accesstoken = JSON.parse(sessionStorage.userData).accessToken.jwtToken
    const agentEmail = JSON.parse(sessionStorage.userData).idToken.payload.email
    const [status, setStatus] = React.useState('Online');
    const history = useHistory()
    const [ticketSubject, setTS] = React.useState('');
    const [ticketDescription, setTD] = React.useState('');

    const [commodity, setCommodity] = React.useState('0');
    const [department, setDepartment] = React.useState('0');
    const [type, setType] = React.useState('0');
    const [workHours,setWorkHours] = useState({
      min: 5,
      max: 10,
    })

    const handleStatus = (value) => {
      props.handleStatus(value)
      setStatus(value);
    
    };

    const logout = (value) => {
      props.handleStatus(value)
      setStatus(value);
  
    
    };
   



console.log(props.chatData)
const updateStatus = (value)=>
{
  if(sessionStorage.section === "agent")
{
  const emailId = JSON.parse(sessionStorage.userData).idToken.payload.email
  let json = {
    "EmailId": emailId,
    "AgentStatus":value
    
  }
  if(value == "Online")
  {
    axios
    .post(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/chat-agent/available-status/update-available-status`,json,{
        headers: { "Authorization": token  }})
    .then(response => {
       
        
      alert("Status Updated")
        
    })
    .catch(error => {
       
       
    })
  }
  else
  {
    axios
  .post(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/chat-agent/available-status/update-not-available-status`,json,{
      headers: { "Authorization": token  }})
  .then(response => {
     
      
    alert("Status Updated")
      
  })
  .catch(error => {
     
     
  })
  }

  
}

}
  return (
    <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    id="myprofile"
    className={classes.modal}
    open={props.open}
    onClose={props.handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={props.open}>
      <div className={classes.paper}>

<div className="row head-main header-main">
<div className="col-md-8">
<p><span className="profile-sec1-head">Arpit Kalra</span></p>
<p><span className="away">Chief Executive</span><span className="away">{agentEmail}</span></p>
  </div>
  <div className="col-md-4">
    <p className="edit-profile">Edit profile</p>
  </div>

 
  

</div>


{/* <div className="row profile-sec1">
<div className="col-md-12">

</div>
  </div> */}
    <p className="profile-status">Status</p>
  <div className="row head-main ">

<div className="col-md-4">
  <button className={status === "Online" ? "online-s Online":"online-s" } onClick={()=>handleStatus("Online")}><img src="/assets/img/Group 1085.svg" />Online</button>
</div>
<div className="col-md-4">
<button className={status === "Break" ?"online-s Break" :"online-s" } onClick={()=>handleStatus("Break")}><img src="/assets/img/Group 1079.svg" />Break</button>
</div>
<div className="col-md-4">
<button className={status === "Away" ? "online-s Away" :"online-s" } onClick={()=>handleStatus("Away")}><img src="/assets/img/Group 1083.svg" />Away</button>
</div>
  </div>

<p className="profile-status">Work Hours</p>
<div className="row head-main">

<div className="col-md-12">
<InputRange
  draggableTrack
          maxValue={24}
          minValue={0}
          formatLabel={value => value.toFixed(2)}
          value={workHours}
          onChange={value => setWorkHours(value)}
          onChangeComplete={value => console.log(value)} />
</div>
</div>

<div className="row profile-sec3">
<div className="col-md-12">
 <span className="profile-lTxt">General Information</span> 
</div>
</div>

<div className="row profile-sec4">
<div className="col-md-4">
<p className="profile-lSub">Display Name</p>
<p className="profile-lSub-txt">Arpit</p>
</div>


<div className="col-md-4">
<p className="profile-lSub">Agent Id</p>
<p className="profile-lSub-txt"># BL23121</p>
</div>

<div className="col-md-4">
<p className="profile-lSub">Chat Permission</p>
<p className="profile-lSub-txt">Enabled</p>
</div>

</div>

<div className="row profile-sec5">

<div className="col-md-4">
<p className="profile-lSub">Chat Limit</p>
<p className="profile-lSub-txt">3</p>
</div>


<div className="col-md-4">
<p className="profile-lSub">Work Hours</p>
<p className="profile-lSub-txt">10 AM - 4 PM</p>
</div>

<div className="col-md-4">
<p className="profile-lSub">Date Joined</p>
<p className="profile-lSub-txt">22 Oct, 2019</p>
</div>


</div>

<div className="row profile-sec6">
  <div className="col-md-6" onClick={()=>logout("logout")}>
<p>Logout</p>
    {/* <button className="profile-btn" onClick={props.handleClose}>Close</button> */}
  </div>

  <div className="col-md-6" onClick={()=>logout("logout")}>
<img src="/assets/img/Path 2254.svg" style={{float:'right'}} />
    {/* <button className="profile-btn" onClick={props.handleClose}>Close</button> */}
  </div>
</div>


 
      </div>
    </Fade>
  </Modal>
   
  )
}


