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

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

import IconButton from '@material-ui/core/IconButton';





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

      width:500,
 
      backgroundColor: "#ffffff",
    },
  }));

export default function MyProfile(props) {

    const classes = useStyles();
    const { register, handleSubmit, watch, errors } = useForm()
    const token = JSON.parse(sessionStorage.userData).idToken.jwtToken
    const accesstoken = JSON.parse(sessionStorage.userData).accessToken.jwtToken
    const [priority, setPriority] = React.useState('0');

    const [ticketSubject, setTS] = React.useState('');
    const [ticketDescription, setTD] = React.useState('');

    const [commodity, setCommodity] = React.useState('0');
    const [department, setDepartment] = React.useState('0');
    const [type, setType] = React.useState('0');

    const handleTS = event => {
      setTS(event.target.value);
    };

    const handleTD = event => {
      setTD(event.target.value);
    };

    const handleP = event => {
      setPriority(event.target.value);
    };

    const handleC = event => {
      setCommodity(event.target.value);
    };
    const handleT = event => {
      setType(event.target.value);
    };
    const handleD = event => {
      setDepartment(event.target.value);
    };
  const onSubmit = data => { 
  console.log(data)
   console.log(props.agent)

   
    let json ={
      "CustomerEmailId":props.agent.customerEmailId,
      "AgentEmailId": props.agent.agentEmailId,
      "CustomerConnectionId":props.agent.connectionId,
      "AgentConnectionId":props.agent.AgentConnectionId,
      "ConversationId": props.agent.connectionId+props.agent.AgentConnectionId,
      "TicketSubject":ticketSubject,
      "Priority":priority,
      "Description":ticketDescription,
      "Type":type,
      "DepartmentName":props.agent.departmentName,
      "DepartmentId":props.agent.departmentId

    
  } 
if(sessionStorage.section === "agent")
{
  axios
  .post(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/ticket/create-ticket`,json,{
      headers: { "Authorization": token  }})
  .then(response => {
     
      
    alert("Success")
      
  })
  .catch(error => {
     
     
  })


}
 
   
}


console.log(props.chatData)

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

<div className="row head-main">
  <div className="col-md-2 ">
<img src="/assets/img/Group 288.svg" className="profile-logo" onClick={props.handleClose}/>
  </div>
  <div className="col-md-10">
    <p className="profile-head">Agent Profile</p>
    </div>

</div>


<div className="row profile-sec1">
<div className="col-md-8 ">
<p><span className="profile-sec1-head">Arpit Kalra</span><span className="profile-tag">Billing</span><span className="profile-tag">Insurance</span></p>
<p><span><img src="/assets/img/Ellipse 420.svg" /></span><span className="away">Away</span><span className="away">|</span><span className="away">arpit.jjbytes@gmail.com</span></p>
  </div>

  <div className="col-md-4 ">
    <img src="/assets/img/Mask Group 22.png" className="profile-sec1-img" />
  </div>
  


  </div>



<div className="row profile-sec2">

<div className="col-md-4">
<p className="profile-gTxt">3%</p>
<p className="profile-subTxt">ABANDON RATE</p>
</div>

<div className="col-md-4">
<p className="profile-gTxt">4</p>
<p className="profile-subTxt">CONNECTED CHAT</p>
</div>

<div className="col-md-4">
<p className="profile-gTxt">2 Mins</p>
<p className="profile-subTxt">AVG TIME TO ANSWER</p>
</div>

<div className="col-md-4">
<p className="profile-gTxt">84%</p>
<p className="profile-subTxt">CSAT SCORE</p>
</div>

<div className="col-md-4">
<p className="profile-gTxt">3</p>
<p className="profile-subTxt">ABANDONED</p>
</div>

<div className="col-md-4">
<p className="profile-gTxt">7 Mins</p>
<p className="profile-subTxt">AVG TIME TO ABANDON</p>
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
  <div className="col-md-12">

    <button className="profile-btn" onClick={props.handleClose}>Close</button>
  </div>
</div>


 
      </div>
    </Fade>
  </Modal>
   
  )
}


