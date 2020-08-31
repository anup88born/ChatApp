import React, { useEffect, useState,useContext } from "react";
import { Launcher } from "react-chat-window";
import { store } from '../../store';
import { DropdownButton,Dropdown } from 'react-bootstrap';
import base64 from 'base-64';
import utf8 from 'utf8';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Chat_Create_Ticket from '../Chat_Create_Ticket';
import CreateTicket from '../createTicket';
import { makeStyles,useTheme,withStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import Sockette from "sockette";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import Chip from '@material-ui/core/Chip';
import {Link} from 'react-router-dom';

// let ws = null;
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    padding: '5px 30px 5px 5px',
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
      borderRadius: "5px",
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    
    },
  },
}))(InputBase);


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}




const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  
   
  },
  Textroot: {
    '& .MuiTextField-root': {
      margin: "15px 0 0 8px",
      width: '25ch',
    },
  },
  marginSelect:
  {
width:110
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    height: 10,
  },
  
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    borderRadius:"5px",
  
  },
  
}));




const ChatWindow = props => {
  const classes = useStyles();

  const theme = useTheme();

  const globalState = useContext(store);
  const { dispatch } = globalState;
  console.log(props,"Full Data")

  const [id, setId] = React.useState("");
  const [status,setStatus] = useState(0)
  const [departList,setDepartList] = useState([])
  const [department,setDepartment] = useState("0")

  const [agent,setAgent] = useState("")
  const [supervisor,setSupervisor] = useState("0")
  const [agentList,setAgentList] = useState([])
  const [supervisorList,setSupervisorList] = useState([])
  const [open, setOpen] = useState(false);
const [agentData,setAgentDetails] = useState({})
const [openPopup,setOpenPopup] = useState(false)
const[txt,setTxt] = useState('')
const [severity,setSeverity] = useState("")
const [deptId,setDeptId] = useState("")
const [role,setRole] = useState('')
const [roleId,setRoleId] = useState('0')
const [ticketUser,setTicketUser] = useState('')

const token = JSON.parse(sessionStorage.userData).idToken.jwtToken
console.log(props.agentDetails, "agentDataa")


  const handleChange = event => {
    if(event.target.value == "0" )   
    {

    setOpenPopup(true)
    setSeverity("error")
    setTxt("Select department to transfer the chat")
    }
    else
    {
      getAgent(event.target.value,event.currentTarget.id)
      console.log(event.target.value)
      setDepartment(event.target.value)
      setDeptId(event.currentTarget.id);
      // setAge(event.target.value);
    }
  };


  const handleChangeAgent = event => {
    console.log(event.target.value,"handleAgent")
    if(event.target.value == "0" || event.target.value == "00" || event.target.value == props.customerData.agentEmailId )   
    {
    
      console.log("fgdfsdf")
     setOpenPopup(true)
     setSeverity("error")
     setTxt("Select different agent or supervisor to transfer the chat")
      
    }
    else{
      console.log(event.currentTarget.textContent,"naME")
      setAgent(event.currentTarget.textContent)
      
      setRoleId(event.target.value)
      setRole(event.currentTarget.id)
      props.commentStatus(1)
     

      // getAgent(event)
      // setAge(event.target.value);
    }
  
  };
  // const handleChangeSupervisor = event => {
  //   console.log(event)
  //   setSupervisor(event.target.value)
  //   props.commentStatus(1)
  //   // getAgent(event)
  //   // setAge(event.target.value);
  // };

  const getTicketId = () =>
{
  if(sessionStorage.section === "supervisor")
  {
    axios
    .get(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/ticket/get-ticket-id`,{
      headers: { "Authorization":token  }})
    .then(response => {
        setId(response.data.data.TicketId)
        console.log("ticket id: ",id)
    })
  }
  if(sessionStorage.section === "agent")
  {
    axios
    .get(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/ticket/get-ticket-id`,{
      headers: { "Authorization":token  }})
    .then(response => {
        setId(response.data.data.TicketId)
        console.log("ticket id: ",id)
    })
  }
 
}
  const handleOpen = () => {
    if(props.ws)
    {
      props.ws.json({
        action: "connectionDetails",
       connectionId:props.customerData.connectionId,
      }); 
      if(ticketUser !== props.customerData.connectionId)
      {
        setTicketUser(props.customerData.connectionId)
        getTicketId()
      }
     
      setOpen(true);
    }
    else
    {
      setOpenPopup(true)
      setSeverity("error")
    setTxt("Please select the customer")
    }
  
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeTab = (event, newValue) => {
    // setValue(newValue);
  };
  // const handleChangeIndex = index => {
  //   setValue(index);
  // };





  console.log(props.connectionDetails,"connectionDetailsD")

// if(props.role == "agent")
// {
//    data = { 
  
//     customerEmailId: props.customerData.customerEmailId,
//      agentID: props.customerData.agentID,
//    customerConnectionId: props.customerData.connectionId, 
//     role:props.role,
//     type:props.customerData.type
//   }
// }

  useEffect(
    
    () => {
    getDepartment()
    },
    []
  );

const onDepartChange = (value)=>
{
  console.log(value)
}

 const getDepartment = () =>
  {
    if( sessionStorage.section == "agent")
    {
    axios
    .get(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/transfer-chat/get-department-list`,{
      headers: { "Authorization":token   }})
    .then(response => {
        //  dispatch({ type: 'FETCH_DEPARTMENTLIST', payload: response.data.data })
        setDepartList(response.data.data.MainData)
       
    //  console.log(supervisorList,"list");
    })
    .catch(error => {
        // dispatch({ type: 'FETCH_ERROR',payload: error })
        // console.log(globalState.state.post,"validateUser");
        // history.push("createUser")
        // alert("Please try again")
    })

  }

  if( sessionStorage.section == "supervisor")
  {
  axios
  .get(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/chat-supervisor/department/get-department-list`,{
    headers: { "Authorization":token   }})
  .then(response => {
      //  dispatch({ type: 'FETCH_DEPARTMENTLIST', payload: response.data.data })
      setDepartList(response.data.data.MainData)
   
  //  console.log(supervisorList,"list");
  })
  .catch(error => {
      // dispatch({ type: 'FETCH_ERROR',payload: error })
      // console.log(globalState.state.post,"validateUser");
      // history.push("createUser")
      // alert("Please try again")
  })

}
}


const getAgent = (id,name) =>
{

  console.log(props.customerData)
  if( sessionStorage.section == "agent")
  {
    const json={
      "ConnectionId": props.customerData.connectionId,
      "DepartmentId": id,
      "AgentEmailId": props.customerData.agentEmailId,
      "DepartmentName":name,
      "AgentId": props.customerData.agentID
  
    }

    console.log(json)
  axios
  .post(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/transfer-chat/get-supervisor-agent-list`,json,{
    headers: { "Authorization":token   }})
  .then(response => {
    
     setAgentList(response.data.data.agent_list)
     setSupervisorList(response.data.data.supervisor_List)
 
  })
  .catch(error => {
    
      console.log(error,"error");
     
  })

}
if( sessionStorage.section == "supervisor")
{
  const json={
   
    "DepartmentId": id,
 

  }

  console.log(json)
axios
.post(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/transfer-chat/get-supervisor-agent-list`,json,{
  headers: { "Authorization":token   }})
.then(response => {
  
   setAgentList(response.data.data.agent_list)
   setSupervisorList(response.data.data.supervisor_List)

})
.catch(error => {
  
    console.log(error,"error");
   
})

}


}
const takeAction = (e)=>
{
console.log(e)
setStatus(e.target.value)
  if(e.target.value === 1)
  {
    transferToAgent()
  }

  if(e.target.value === 2)
  {
handleOpen()
  }

  if(e.target.value === 3)
  {
endChat()
  }
  setStatus(0)

}
const endChat = ()=>
{
  handleOpen()
  props.end()

}

const transferToAgent = () =>
{
  if(roleId != '0' && department != "0")   
  {
if(globalState.state.chat && globalState.state.chat.length >0 )
{
  if(globalState.state.commentBox && globalState.state.commentBox.length >0)
  {
    if( sessionStorage.section == "agent")
    {
      if(role === 'supervisor')
      {
        const json={
          "ConnectionId": props.customerData.connectionId,
          "DepartmentId": department,
          "SupervisorEmailId": agent,
          "DepartmentName": deptId,
          "SupervisorId": roleId,
          // "Comments":props.comment
         
       
      
        }
    
        console.log(json)
      axios
      .post(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/transfer-chat/transfer-chat-to-supervisor`,json,{
        headers: { "Authorization":token   }})
      .then(response => {
        props.ws.json({
          action: "chatTransfered",
          data: {
            "customerConnectionId": props.customerData.connectionId
          }
        
        }); 
        setOpenPopup(true)
        setSeverity("success")
      setTxt("Thank you for your patience, your chat is being transferred")
       
     
      })
      .catch(error => {
        
          console.log(error,"error");
         
      })
    
      }

      else
      {

        const json={
          "ConnectionId": props.customerData.connectionId,
          "DepartmentId": department,
          "AgentEmailId": agent,
          "DepartmentName": deptId,
          "AgentId": roleId,
          // "Comments":props.comment
      
        }
    
        console.log(json)
      axios
      .post(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/transfer-chat/transfer-chat`,json,{
        headers: { "Authorization":token   }})
      .then(response => {
        props.ws.json({
          action: "chatTransfered",
          data: {
            "customerConnectionId": props.customerData.connectionId
          }
        
        }); 
        setOpenPopup(true)
        setSeverity("success")
      setTxt("Thank you for your patience, your chat is being transferred")
       
     
      })
      .catch(error => {
        
          console.log(error,"error");
         
      })
    
      }
   
  }
  if( sessionStorage.section == "supervisor")
  {
    if(role === 'supervisor')
    {
      const json={
        "ConnectionId": props.customerData.connectionId,
        "DepartmentId": department,
        "SupervisorEmailId": supervisor,
        "DepartmentName":deptId,
        "SupervisorId": roleId,
        // "Comments":props.comment

      
    
      }
  
      console.log(json)
    axios
    .post(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/transfer-chat/transfer-chat-to-supervisor`,json,{
      headers: { "Authorization":token   }})
    .then(response => {
      props.ws.json({
        action: "chatTransfered",
        data: {
          "customerConnectionId": props.customerData.connectionId
        }
      
      }); 
      setOpenPopup(true)
      setSeverity("success")
    setTxt("Thank you for your patience, your chat is being transferred")
     
   
    })
    .catch(error => {
      
        console.log(error,"error");
       
    })
  
    }
    else
    {

      const json={
        "ConnectionId": props.customerData.connectionId,
        "DepartmentId": department,
        "AgentEmailId": agent,
        "DepartmentName": deptId,
        "AgentId": roleId,
        // "Comments":props.comment
    
      }
  
      console.log(json)
    axios
    .post(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/transfer-chat/transfer-chat-to-agent`,json,{
      headers: { "Authorization":token   }})
    .then(response => {
      props.ws.json({
        action: "chatTransfered",
        data: {
          "customerConnectionId": props.customerData.connectionId
        }
      
      }); 
      setOpenPopup(true)
      setSeverity("success")
    setTxt("Thank you for your patience, your chat is being transferred")
     
   
    })
    .catch(error => {
      
        console.log(error,"error");
       
    })
  
    }
   
}





  }
  else
  {
    setOpenPopup(true)
    setSeverity("error")
    setTxt("Please add private note")
  }



}
else 
{
  setOpenPopup(true)
  setSeverity("error")
  setTxt("Please start conversation before transffering the chat")
}
  }
  else
  {
    setOpenPopup(true)
    setSeverity("error")
    setTxt("Please select department and agent before transffering the chat")
  }

}
// const [comment, setComments] = React.useState('');

const handleComments = (event) => {
  // setComments(event.target.value);
};

const handleClosePopup = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpenPopup(false);
};

  return (
 <>
    <div className="row chat-header clearfix">
   <div className="col-md-1"></div>
<div className="col-md-2 dropBtnLRW">
<div className="chat-with">Assign {sessionStorage.section === "agent" ? "Agent" : "Chat"}</div>

</div>

<div className="col-md-3 dropBtnLRW1">
<FormControl className={classes.marginSelect}  >
       
       <Select
         labelId="demo-customized-select-label"
         id="demo-customized-select"
         value={department}
         onChange={handleChange}
     
         input={<BootstrapInput />}
       >
         <MenuItem value="0">
         Department
         </MenuItem>
         {departList.length>0 && departList.map((depart)=>{
           return  <MenuItem value={depart.DepartmentId} id={depart.DeptName} >{depart.DeptName}</MenuItem>
         })}
       
     
       </Select>
     </FormControl>
  
</div>
<div className="col-md-3 dropBtnAgent drop">

<FormControl className={classes.marginSelect}>
       
       <Select
         labelId="demo-customized-select-label"
         id="demo-customized-select"
         value={roleId}
         onChange={handleChangeAgent}
        

         input={<BootstrapInput />}
       >
         <MenuItem value="0">
          Agent
         </MenuItem>
         {agentList && agentList.length>0 ? agentList.map((agent)=>{
           return  <MenuItem value={agent.UserId} id="agent" >{agent.EmailId}</MenuItem>
         }):
         <MenuItem value="00">
         <em>No Agent available</em>
       </MenuItem>
       }
         <MenuItem value="00">
           Supervisor
         </MenuItem>
         {supervisorList &&  supervisorList.length>0 ? supervisorList.map((supervisor)=>{
           return  <MenuItem value={supervisor.UserId} id="supervisor"  >{supervisor.EmailId}</MenuItem>
         }):
        <MenuItem value="00">
         <em>No Supervisor available</em>
       </MenuItem>
         }
         
       </Select>
     </FormControl>
</div>

{/* <div className="col-md-2 dropBtnAgent">

<FormControl className={classes.marginSelect}>
       
       <Select
         labelId="demo-customized-select-label"
         id="demo-customized-select"
         value={supervisor}
         onChange={handleChangeSupervisor}
        

         input={<BootstrapInput />}
       >
           <MenuItem value="00">
           Supervisor
         </MenuItem>
         {supervisorList &&  supervisorList.length>0 ? supervisorList.map((supervisor)=>{
           return  <MenuItem value={supervisor.EmailId} id="supervisor" >{supervisor.EmailId}</MenuItem>
         }):
        <MenuItem value="00">
         <em>No Supervisor available</em>
       </MenuItem>
         }
       </Select>
     </FormControl>
</div> */}


        <div className="col-md-2 dropBtnResolve drop">
<FormControl className={classes.marginSelect}>
       
       <Select
         labelId="demo-customized-select-label"
         id="demo-customized-resolve"
      
        className="resolve-header"
         value={status}
         onChange={takeAction}
         input={<BootstrapInput />}
       >
        
          <MenuItem value={0}>
          <b style={{padding:"5px"}}>Resolve</b>
        </MenuItem>
      
        
         <MenuItem value={1} ><img src="/assets/img/transfer-chat-dropdown.svg" className="img-resolve" />Transfer Chat</MenuItem>
         <MenuItem value={2}><img src="/assets/img/create-ticket-dropdown.svg" className="img-resolve" />Create Ticket</MenuItem>
         <MenuItem value={3}><img src="/assets/img/close-chat-dropdown.svg" className="img-resolve" />End Chat</MenuItem>
         <MenuItem value={4}><img src="/assets/img/ban-visitor-dropdown.svg"  className="img-resolve" />Ban Visitor</MenuItem>
       </Select>
     </FormControl>
  
</div>
     

<Chat_Create_Ticket id={id} open={open} handleOpen={handleOpen} handleClose={handleClose} customerData={props.customerData}  chatData={props.chatData} end={props.end} agentDetails={props.agentDetails} connectionDetails={props.connectionDetails} ws={props.ws}   getTicketList={props.getTicketList} getQueueList={props.getQueueList} getCustomerList={props.getCustomerList}/>
 {/* <CreateTicket open={open} handleOpen={handleOpen} handleClose={handleClose}  customerData={props.customerData}  chatData={props.chatData} end={props.end}/> */}
 


    </div> 

    <Snackbar open={openPopup} autoHideDuration={6000} onClose={handleClosePopup}>
                    <Alert onClose={handleClosePopup} severity={severity}  >
                     {txt}
                       {/* {error} */}
                    </Alert>
                  </Snackbar> 

     </>

  );
};

export default ChatWindow;
