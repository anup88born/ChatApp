import React,{useState,useEffect,useContext} from 'react'
import axios from "axios";
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ReactTextFormat from 'react-text-format';
import { useForm } from 'react-hook-form'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Pdf from "react-to-pdf";
import IconButton from '@material-ui/core/IconButton';
const ref = React.createRef();




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
     
      boxShadow: theme.shadows[3],
      padding: theme.spacing(2, 4, 3),
      width:650,
      borderRadius: "17px",
      backgroundColor: "#ffffff",
    },
  }));

export default function PdfPreview(props) {

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
      <div className={classes.paper}  >
<div ref={ref}>
<div className="row">

  <div className="col-md-12 pdf-logo-header">
<img src="/assets/img/download.png" className="pdf-logo" />
  </div>

</div>

<div className="row center">

  <div className="col-md-12">

  <p>Ticket No. - {props.ticketDetails && props.ticketDetails.TicketId}</p>
  </div>
  </div>
<div className="row center">

  <div className="col-md-6">
<p>Customer Email : {props.chatData.Customer_EmailId}</p>
  </div>
  <div className="col-md-6">
  <p>Agent Email : {props.chatData.Agent_EmailId}</p>
  </div>
</div>

<div className="row">
<div className="col-md-12 chat agent-chat">
<div className="chat-history"  >
    <ul>
    { props.chatData.Msg_Details &&  props.chatData.Msg_Details.length > 0 && props.chatData.Msg_Details.map(function(item) {
        return item.senderId === props.chatData.Agent_ConnectionId ?
        <li key={item} >
        
         <div className="message other-message float-right">
           <p className="who">You, 10:32 pm</p>
           <ReactTextFormat>{item.text}</ReactTextFormat>
         </div>
         <div className="message-data align-right">
  
           <span className="message-data-name"><img src="/assets/img/Mask Group 22.png" className="face-rightIcon" /></span> 
         </div>
       </li>
       :
       <li>
         
           <div className="message my-message float-left">
             <p className="who">{props.chatData.Customer_EmailId}, 12:03 pm</p>
             <ReactTextFormat>{item.text}</ReactTextFormat>
           </div>
           <div className="message-data">
             <span className="message-data-name"><img src="/assets/img/Mask Group 22.png" className="face-leftIcon" /></span>
           
           </div>
         </li>
        
       }
       )
       }
        
        
       </ul>
     
    </div> 
  

</div>


</div>
   
   
</div>
<Pdf targetRef={ref} filename={props.ticketDetails && props.ticketDetails.TicketId+".pdf"}>
        {({ toPdf }) => <button onClick={toPdf} className="pdf-btn">Download Pdf</button>}
</Pdf> 
      </div>

    </Fade>
  </Modal>
   
  )
}


