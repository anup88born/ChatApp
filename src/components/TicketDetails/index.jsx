import React, { useEffect, useState,useContext } from "react";
import { Launcher } from "react-chat-window";
import { store } from '../../store';
import { DropdownButton,Dropdown } from 'react-bootstrap';
import base64 from 'base-64';
import utf8 from 'utf8';
import PdfPreview from '../pdfPreview';
import { makeStyles,useTheme,withStyles} from '@material-ui/core/styles';
import ReactTextFormat from 'react-text-format';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Sockette from "sockette";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import axios from "axios";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import Chip from '@material-ui/core/Chip';
import CreateIcon from '@material-ui/icons/Create';
import ChatHeader from '../chatHeader'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart';
import Pdf from "react-to-pdf";
// let props.ws = null;

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
      borderRadius: 4,
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
  selectEmpty: {
    marginTop: theme.spacing(2),
    height: 10,
  },
  marginSelect1:
  {
      width:110
  },
  
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    borderRadius:"5px",
  
  },
  
}));




const ChatWindow = props => {
  console.log("TicketDetails props: ",props)
  const classes = useStyles();
  const [age, setAge] = useState('');
  const theme = useTheme();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
 
  const [open, setOpen] = useState(false);
  const [openPdf, setOpenPdf] = useState(false);
  const [baseFile,setBaseFile] = useState()
  const [fileName,setFileName] = useState('')
const [agentData,setAgentDetails] = useState({})
const [chatDetails,setChatDetails] = useState({})
const [tags,setTags]=useState(["Billing"])
const [tagValue,SetTagValue] = useState(false)
const [emojiPickerState, SetEmojiPicker] = useState(false);
const [messageTxt, setMessageTxt] = useState("");
const [disabled,setDisabled]  = useState(true)

let emojiPicker;
if (emojiPickerState) {
  emojiPicker = (
    <Picker
      title="Pick your emoji…"
      emoji="point_up"
      onSelect={emoji => setMessageTxt(messageTxt + emoji.native)}
    />
  );
}

const handleChatTxt= (e)=>{
  e.preventDefault();

  setComment(e.target.value)



}
const uploadFile =(base64File)=>
{
  let json= 
  {
    "TicketId":ticketData.TicketId,
    "fileType":"pdf",
    "base64File": base64File

  }
  axios
  .post(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/ticket/upload-file`,json,{
      headers: { "Authorization": token  }})
  .then(response => {
    
console.log(response)
      
  })
  .catch(error => {
    
    
  })
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
      "ConnectionId": ticketData.customerConnectionId,
      "DepartmentId": id,
      "AgentEmailId": ticketData.agentEmailId,
      "DepartmentName":name,
      "AgentId": ticketData.agentID
  
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




  const [value, setValue] = React.useState(0);
  const [connectionID,setConnectionId] = useState("")
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
    
  };
  // const handleChangeIndex = index => {
  //   setValue(index);
  // };



  const globalState = useContext(store);
  const { dispatch } = globalState;
  console.log(props,"Full Data")
  const [messageList, setMessageList] = useState([]);
  const [badge, setBadge] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
const [comment,setComment] = useState('')
const [commentTxt,setCommentTxt] = useState('')
  const [status,setStatus] = useState("00")
  const [ticketData,setTicketData] = useState({})
  const [departList,setDepartList] = useState([])
  const [department,setDepartment] = useState("0")
const [priority,setPriority] = useState("00")
const [priorityBox, setpriorityBox] = useState("demo-customized-resolve1")

  const [agent,setAgent] = useState("0")
  const [agentList,setAgentList] = useState([])
  const [supervisorList,setSupervisorList] = useState([])
  const [cannedData,setCannedData] = useState([])
  const token = JSON.parse(sessionStorage.userData).idToken.jwtToken
  const [editMode,setEditMode] = useState(false)
  const [deptId,setDeptId] = useState("")
  
  console.log(props)
  useEffect(  () => {
    getDepartment()
      getTicketDetails()
    },
    [messageList,setMessageTxt]
  );



  const handleChange = event => {
    getAgent(event.target.value,event.currentTarget.id)
   console.log(event.target.value)
   setDepartment(event.target.value)
   setDeptId(event.currentTarget.id);
  
   // setAge(event.target.value);
 };


 const handleChangeAgent = event => {
   console.log(event)
   setAgent(event.target.value)
  //  props.commentStatus(1)
   // getAgent(event)
   // setAge(event.target.value);
 };



  const onMessageWasSent = message => {
    // console.log(message,props)
    const { author, type, data: messageData,customerEmailId } = message;
    let isMe;
    // console.log(props)
    if(props.role === "agent")
    {
      // console.log(props.role)
     const newMessage = { ...message, author: "Kalra",role:props.role,
      agentID: props.customerData.agentID,
      customerConnectionId: props.customerData.connectionId, customerEmailId: props.customerData.customerEmailId, agentEmailId: props.customerData.agentEmailId,type:"text" };
     isMe = "Kalra" === author ? "me" : "them";
     dispatch({ type: 'FETCH_CHATHISTORY', payload: {
      author: isMe,
      type,
      data: messageData,
      customerEmailId
    } })
      props.ws.json({
        action: "sendmessage",
        data: JSON.stringify(newMessage)
      });
    }
  };

const addComment = ()=>
{
if(comment)
{
  let json =  {
    "CreatedBy": ticketData.CreatedBy,
   "TicketId": ticketData.TicketId,
   "Owner": ticketData.Owner,
   "Comments":comment,
'base64File': baseFile,
'fileType': "pdf"

 }


  if(sessionStorage.section === "agent")
  {
    axios
    .post(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/ticket/add-comments-for-tickets`,json,{
      headers: { "Authorization":token   }})
    .then(response => {
      setDisabled(true)
      setEditMode(false)
      setComment('')
      getTicketDetails()
        // dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
      
    })
  
  
  
  }
  if(sessionStorage.section === "supervisor")
  {
    axios
    .post(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/ticket/add-comments-for-ticket`,json,{
      headers: { "Authorization":token   }})
    .then(response => {
      setDisabled(true)
      setEditMode(false)
      setComment('')
      getTicketDetails()
        // dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
      
    })
  
  
  
  
}
 
}
  

}
// const commentStatus = (value)=>
// {
//   setValue(value);
//   setComment(value)

// }

  const addPrivateNote = message => {

    
    console.log(message,props)
    const {privateNote } = message;
    let isMe;
    console.log(props)
    if(props.role === "agent")
    {
      console.log(props.role)
      const newMessage = { ...message,
      customerConnectionId: props.customerData.connectionId};
    

      props.ws.json({
        action: "addPrivateNote",
        data: JSON.stringify(newMessage)
        
      });
    }
  
 
  
 
  };



 
  
// console.log(globalState.state.chat)
// console.log(value, "tab value")
console.log(messageTxt)

const takeAction = (e)=> {
  console.log("bbbb",e)
  setStatus(e.target.value)
  console.log("aaaa",e.target.value)
  updateTicketStatus(e.target.value)
}

const getTicketDetails = ()=>
{
const json ={
  "TicketId": props.ticketId
}
if(sessionStorage.section === "agent")
{
  axios
  .post(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/ticket/get-single-ticket-details`,json,{
    headers: { "Authorization":token   }})
  .then(response => {
      // dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
      console.log(response.data.data.MainData.Priority,"priqwerty")
      setTicketData(response.data.data.MainData)
      setPriority(response.data.data.MainData.Priority)
     setStatus(response.data.data.MainData.TicketStatus)
   
   console.log(ticketData,"list");
  })
  // .catch(error => {
  //     dispatch({ type: 'FETCH_ERROR',payload: error })
  //     console.log(globalState.state.post,"validateUser");
  //     // history.push("createUser")
  //     alert("Please try again")
  // })


}
if(sessionStorage.section === "supervisor")
{
  axios
  .post(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/ticket/get-ticket-details`,json,{
    headers: { "Authorization":token   }})
  .then(response => {
      // dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
      console.log(response.data.data.MainData.Priority,"priqwerty")
    
      setPriority(response.data.data.MainData.Priority)
      setTicketData(response.data.data.MainData)
      setStatus(response.data.data.MainData.TicketStatus)
   console.log(ticketData,"list");
  })
  // .catch(error => {
  //     dispatch({ type: 'FETCH_ERROR',payload: error })
  //     console.log(globalState.state.post,"validateUser");
  //     // history.push("createUser")
  //     alert("Please try again")
  // })


}


}



const editTicketDetails = ()=>
{
  if(sessionStorage.section === "agent")
  {
    const json ={
      "TicketId": props.ticketId,
      "TicketSubject": ticketData.TicketSubject,
       "Priority": priority,
      
      "TicketDescription": ticketData.Description[0].data,
      "DepartmentId": department,
      "DepartmentName": deptId,
      "AgentName": agent
    
    }
      axios
      .post(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/ticket/edit-ticket-details`,json,{
        headers: { "Authorization":token   }})
      .then(response => {
          // dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
        // setDisabled(true)

       console.log(ticketData,"list");
      })

  }
  if(sessionStorage.section === "supervisor")
  {
    const json ={
      "TicketId": props.ticketId,
      "TicketSubject": ticketData.TicketSubject,
      "Priority": priority,
      // "Priority": "High",
      "TicketDescription": ticketData.Description[0].data,
      "DepartmentId": department,
      "DepartmentName": deptId,
      "SupervisorName": agent
    
    }
      axios
      .post(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/ticket/edit-ticket-details`,json,{
        headers: { "Authorization":token   }})
      .then(response => {
          // dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
          // setDisabled(true)
         
       console.log(ticketData,"list");
      })

  }


  // .catch(error => {
  //     dispatch({ type: 'FETCH_ERROR',payload: error })
  //     console.log(globalState.state.post,"validateUser");
  //     // history.push("createUser")
  //     alert("Please try again")
  // })

}

const editModeFunc = ()=>
{
 
  if(editMode === true)
  {
    
    editTicketDetails()
   
  }

  setDisabled(!disabled)
  setEditMode(!editMode)
 

}


const addTags =(event)=>{
    // {console.log('Event is ', event.target.value)}
    // setPriority(event.target.value)
    if (event.target.value === 'Low')
    {
      setPriority(event.target.value)
      setpriorityBox("demo-customized-resolve1-low");
    }
    else if (event.target.value === 'Medium')
    {
      setPriority(event.target.value)
      setpriorityBox('demo-customized-resolve1-medium');
    }
    else if  (event.target.value === 'High')
    {
      setPriority(event.target.value)
      setpriorityBox("demo-customized-resolve1-high");
    }
    else 
    {
      setPriority(event.target.value)
      setpriorityBox("demo-customized-resolve1");
    }

}



const updateTicketStatus = (value)=>
{
const json ={
  "TicketId":props.ticketId,
      "TicketStatus":value


}
if(sessionStorage.section === "agent")
{
  axios
  .post(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/ticket/update-ticket-status`,json,{
    headers: { "Authorization":token   }})
  .then(response => {
    setTimeout(()=>
{
  props.getTicketList(sessionStorage.agentDetails)
},5000)
 
  alert("Status Updated")
  })
}
if(sessionStorage.section === "supervisor")
{
  axios
  .post(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/ticket/update-ticket-status`,json,{
    headers: { "Authorization":token   }})
  .then(response => {
    setTimeout(()=>
{
  props.getTicketList(sessionStorage.agentDetails)
},5000)
 
  alert("Status Updated")
  })
}
 
  // .catch(error => {
  //     dispatch({ type: 'FETCH_ERROR',payload: error })
  //     console.log(globalState.state.post,"validateUser");
  //     // history.push("createUser")
  //     alert("Please try again")
  // })



}
const previewFile = (e)=>{
      
  const file = e.target.files[0];
  console.log(file)
  if (file) {
    setFileName(file.name)
    console.log("filename",file.name)
    let fileName = file.name;
    let fileType = file.type;
  
    const reader = new FileReader();
    console.log("qqq",reader);
    
    reader.readAsDataURL(e.target.files[0]);
  
    reader.onload = () => {
      let fileDataUri = reader.result;
      console.log("eeee",fileDataUri)
    
      
      let base64File = fileDataUri.toString().split(',')[1];
      setBaseFile(base64File)
      // uploadFIle(base64File)
      console.log("base64",base64File)
    }
  } 
}


  return (
    <>
    <div className="classes.table col-md-8 col-sm-12 tt-main">
    


<div className="row chat-header clearfix" >
   
   <div className="col-md-1 tt-arrow" style={{paddingTop:'3%'}}>
      <img src="/assets/img/Group 288 (1).svg" onClick={props.handleClose} />
   </div>
      <div className="col-md-3 tt-arrow" style={{paddingTop:'4%'}}>
      {/* <p className="refund">Refund Request for the caution deposit amount</p>
        <p className="bywhom">Ticket Raised by Strauss Whitman 10:52 AM, 22 Oct 2019 Requested by Afroj Divan </p>
      */}
      <div style={{fontFamily:'ProximaNova', fontSize:'20px', color:'#1d1d1d'}}>Ticket Details</div>
    </div>
      <div className="col-md-8" style={{paddingTop:'4%'}}>
      <div className="row tt-assignalgn">
      <div className="col-md-2 tt-assign">
          <span style={{fontFamily:'ProximaNova', fontSize:'16px', color:'#1d1d1d', whiteSpace:'nowrap'}}>Assign to</span>
        </div>
        <div className="col-md-3">
          <FormControl className={classes.marginSelect1}  >
            <Select
            className="tt-drop"
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value={department}
              disabled={disabled}
              onChange={handleChange}
              input={<BootstrapInput />}

            >
            <MenuItem value="0">
              <b>Department</b>
            </MenuItem>
            {departList.length>0 && departList.map((depart)=>{
              return  <MenuItem value={depart.DepartmentId} id={depart.DeptName}>{depart.DeptName}</MenuItem>
            })}
            </Select>
          </FormControl>
        </div>
        <div className="col-md-3" style={{left:'-4%'}}>
          <FormControl className={classes.marginSelect1}>
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value={agent}
              disabled={disabled}
              onChange={handleChangeAgent}
              input={<BootstrapInput />}
            >
              <MenuItem value="0">
              <b>Agent</b>
              </MenuItem>
              {agentList && agentList.length>0 ? agentList.map((agent)=>{
                return  <MenuItem value={agent.FirstName} id={agent.EmailId} >{agent.EmailId}</MenuItem>
                }):
                <MenuItem value="00">
                  <em>No Agent available</em>
                </MenuItem>
              }
              <MenuItem value="00">
                <b>Supervisor</b>
              </MenuItem>
              {supervisorList &&  supervisorList.length>0 ? supervisorList.map((supervisor)=>{
                return  <MenuItem value={supervisor.FirstName} id={supervisor.EmailId} >{supervisor.EmailId}</MenuItem>
              }):
              <MenuItem value="00">
                <em>No Supervisor available</em>
              </MenuItem>
              }
            </Select>
          </FormControl>
        </div> 
          <div className="col-md-1 tt-status">
          <span style={{fontFamily:'ProximaNova', fontSize:'16px', color:'#1d1d1d'}}>Status</span>
        </div> 
          <div className="col-md-3 tt-rslv">       
          <FormControl className={classes.marginSelect1}>
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-resolve"
              className="resolve-header1"
              //  onClick={transferToAgent}
              value={status}
              onChange={takeAction}
              input={<BootstrapInput />}
            >
               <MenuItem value={"00"} >Status</MenuItem>
              <MenuItem value={"Open"} >Open</MenuItem>
              <MenuItem value={"In-Progress"}>In-Progress</MenuItem>
              <MenuItem value={"Pending"}>Pending</MenuItem>
              <MenuItem value={"Closed"}>Closed</MenuItem>
              <MenuItem value={"Spam"}>Spam</MenuItem>
              <MenuItem value={"Resolve"}>Resolve</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div> 
  </div>
 <div className="ticketDetails-top">
 <div className="row" style={{padding:'2%'}}>
   
<div className="col-md-2" style={{marginTop: '1%'}}>
  <div class="text" style={{marginTop:'-3%',boxRadius: '2px'}}>
<h4 class="fbold">Ticket ID</h4>
<h5 className="fbold" style={{fontSize:'16px'}}>{ticketData.TicketId}</h5>
</div>
</div>
<div className="col-md-7">
{/* <h6 className="refund">Billing department for Agent 8</h6> */}
  {/* Below is for data coming from the server */}
  <h6 className="refund">{ticketData.TicketSubject}</h6>
  {/* <p className="bywhom">This is a dummy description of the data that would be present if agent 8 had resolved the issue.</p> */}
  {/* Below is for the data coming from the server */}
  <p className="bywhom">{ticketData.Description && ticketData.Description[0].data}</p>
   
</div>
<div className="col-md-3 editMode">
{editMode === false ?
	<button onClick={editModeFunc}  className="tt-btn-cstm">Edit Ticket</button>
  // <h6 onClick={editModeFunc} style={{color:'#009ce8',padding:'8%', fontSize:'11px',marginLeft: '20%'}}><span><img src="/assets/img/Edit.svg"/></span>&nbsp;Edit Ticket Info</h6>
:
<button onClick={editModeFunc}  className="tt-btn-cstm1">Save</button>
//  <p onClick={editModeFunc} style={{color:'#009ce8',padding:'8%', fontSize:'11px',marginLeft: '30%'}}>Save</p> 

} 

</div>
</div>

<div className="row ticketinfo-middle" style={{height:'107px'}}>
<div className="col-md-2" style={{borderRight:'1px solid #dee2e6', padding:'2%', height:'97%'}}>
<h6 class="fbold">Customer name</h6>
<p style={{fontSize: '17px',fontFamily:'ProximaNovaThin', textTransform:'capitalize'}}>{ticketData.CustomerName}</p>
  </div>

  <div className="col-md-3" style={{borderRight:'1px solid #dee2e6' , padding:'2%',paddingLeft:'5%', height:'97%'}}>
<h6 class="fbold">Ticket Raised by </h6>
<p style={{fontSize: '17px',fontFamily:'ProximaNovaThin', textTransform:'capitalize', marginBottom:'0rem'}}>{ticketData.Owner}</p>
<p style={{fontSize:'13px', fontFamily:'ProximaNovaThin', color:'#606060'}}>10:52 AM, 22 Oct 2019</p>
</div>
<div className="col-md-3" style={{borderRight:'1px solid #dee2e6' , padding:'2%',paddingLeft:'5%', height:'97%'}}>
<h6 class="fbold">Assigned to</h6>
<p style={{fontSize: '17px',fontFamily:'ProximaNovaThin', textTransform:'capitalize', marginBottom:'0rem'}}>{ticketData.Owner}</p>
<p style={{fontSize:'13px', fontFamily:'ProximaNovaThin', color:'#606060'}}>10:52 AM, 23 Oct 2019</p>
  </div>
  <div className="col-md-2" style={{borderRight:'1px solid #dee2e6', padding:'2%',paddingLeft:'3%', height:'97%'}}>
<h6 class="fbold">Departments</h6>
{/* <p> <Chip size="small" label={ticketData.DepartmentName} component="a" href="#chip" clickable className="chip" /></p> */}
<button className="editTicketDetails-dept">{ticketData.DepartmentName}</button>
  </div>
  <div className="col-md-2" style={{paddingTop:'2%',paddingLeft:'5.5%'}}>
<h6 class="fbold">Priority</h6>
 {/* <FormControl className={classes.marginSelect}> */}
 <FormControl className="priority-box" style={{left:'0px', right:'8px'}}>
            <Select
              labelId="demo-customized-select-label"
              id={priorityBox}
              className="resolve-header1"
              // className = "demo-customized-resolve1"
              //  onClick={transferToAgent}
              value={priority}
              onChange={addTags}
              disabled={disabled}
              input={<BootstrapInput />}
              
            >
               <MenuItem value={"00"}>Priority</MenuItem>
              <MenuItem value={"High"}>High</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"Low"}>Low</MenuItem>
            
            </Select>
          </FormControl> 
{/* {editMode === false ?
<p> <Chip size="small" label={ticketData.Priority} component="a" href="#chip" backgroundColor="orange" clickable className="chip" /></p>
:
<span><input type="text"  id="tag-value" onKeyPress={addTags}  /></span> 

} */}
  </div>

  </div>



<div className="row" style={{padding:'20px'}}>
  <div className="col-md-12">
  
   <div className="chat-message clearfix" style={{border: '1px solid rgba(112, 112, 112, 0.15)'}}>
      <div style={{padding:'10px'}}> 
        <div className={classes.root1}>
      {/* <AppBar position="static" color="default"> */}
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChangeTab}
          indicatorColor="#009ce8"          
          variant="fullWidth"
          aria-label="full width tabs example"
          className="ticketDetails-tabs"
          TabIndicatorProps={{style:{background:'#009ce8',fontFamily:'ProximaNova', fontSize:'17px', marginLeft:'0%'}}}
          
        >
          <Tab label="Comments" {...a11yProps(0)} style={{fontFamily:'ProximaNova'}}/>
          <Tab label="Attachments" {...a11yProps(1)} />
       
        </Tabs>
      </AppBar>
     
        <TabPanel value={value} index={0} dir={theme.direction}>
        <List className={classes.rootInput}>
  {ticketData.Comments && ticketData.Comments.length > 0 &&  ticketData.Comments.map(value => {
    const labelId = `checkbox-list-label-${value}`;

    return (
      <ListItem className="side-li" key={value} role={undefined} dense button  style={{marginBottom:'0rem',borderBottom: '1px solid #D3D3D3',padding:'1%'}} >
          <span ><img src="/assets/img/deepika.png" className="face-rightIcon" style={{height:'40px', width:'40px'}} /></span> 
        {/* <ListItemText className={blink === true ? "side-liTxt white":"side-liTxt"} id={labelId} primary={value.customerName} onClick={()=>startConnection(value)}    /> */}
    {console.log('This is the comments data',value)}
    <span className="side-liTxt">
    <div style={{fontFamily:'ProximaNovaThin', fontSize:'11px', marginBottom:'4%', color:'#606060'}}><span style={{fontFamily:'ProximaNova'}}> {value.Owner}, </span>  {new Intl.DateTimeFormat("en-GB", {
                            hour12: false,
                            timeZone: 'UTC',
                            hour: 'numeric',
                            minute: 'numeric',
                            year: "numeric",
                            month: "long",
                            day: "2-digit"                            
                          }).format(new Date(value.TS_Updated))
                        }</div>
      {value.data}
      </span>
 
      <hr/>
      </ListItem>
      
    );
  })}
  {/* {props.customerList.length <= 0 ?
    <ListItem className="side-li"  dense button  >
   
 
<span className="side-liTxt" >No Chats Available</span>

  
</ListItem>
:
null
} */}
</List>

        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction} >
        <List className={classes.rootInput}>
 

  {ticketData.ConversationUrl ?
 
<ListItem className="side-li"   dense button >
    <span ><img src="/assets/img/deepika.png" className="face-rightIcon" /></span> 

<a target="_blank" className="side-liTxt" href={ticketData.ConversationUrl} >Attachment</a>

  
</ListItem>
:null
}
{ticketData.CommentsAttachmentUrl && ticketData.CommentsAttachmentUrl.length > 0 &&  ticketData.CommentsAttachmentUrl.map(value => {
    const labelId = `checkbox-list-label-${value}`;

    return (

<ListItem className="side-li" key={value} role={undefined} dense button  >
<span ><img src="/assets/img/deepika.png" className="face-rightIcon" /></span> 
{/* <ListItemText className={blink === true ? "side-liTxt white":"side-liTxt"} id={labelId} primary={value.customerName} onClick={()=>startConnection(value)}    /> */}
<a target="_blank" className="side-liTxt" href={value.url} >Attachment</a>


</ListItem>
);
})}
</List>
        </TabPanel>
     
    
         <div className="row addTag">
         <div className="col-md-9">
         {/* disabled={disabled} */}
         <textarea name="message-to-send"  placeholder="Type your comment" rows={1} value={comment} onChange={handleChatTxt} cols='85' disabled={disabled} />
    
           </div> 
       <div className="col-md-3 tt-btnalign">
		
       <img src="/assets/img/paperclip (1).svg" onClick={()=>document.getElementById("file-pdf").click()}/>
       
		<button onClick={addComment}  className="chatUser-chatting-btn">Save</button>
		<input type="file" onChange={previewFile} id="file-pdf"  accept=".pdf" style={{visibility:"hidden"}} />

      
      </div>
      </div>

    </div>
    


    </div>
    
  
     
    
    </div> {/* end chat-message */}


  </div>
</div>

</div>



 </div>   
  





   
    
   </> );
};

export default ChatWindow;
