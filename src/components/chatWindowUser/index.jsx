import React, { useEffect, useState,useContext } from "react";
import { Launcher } from "react-chat-window";
import { store } from '../../store';
import { DropdownButton,Dropdown } from 'react-bootstrap';
import base64 from 'base-64';
import ReactTextFormat from 'react-text-format';
import { useBeforeunload } from 'react-beforeunload';
import utf8 from 'utf8';
import CloseIcon from '@material-ui/icons/Close';
import CreateTicket from '../createTicket';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import { makeStyles,useTheme,withStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { useHistory } from 'react-router-dom'
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import Sockette from "sockette";
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import ForumIcon from '@material-ui/icons/Forum';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import Chip from '@material-ui/core/Chip';
import ChatHeader from '../chatHeader'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import * as EmailValidator from 'email-validator';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

let ws = null;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




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
  refundRow: {
    backgroundColor: "#f5f5f5"
  },
  drawerItem: {
    minWidth: '46px !important',
    padding: '0px 0px !important',
    color: "#1d1d1d",
    backgroundColor: "#ffffff",
    
  },
  drawerItemSelected: {
    minWidth: '46px !important',
    padding: '0px 0px !important',
    backgroundColor: "#0095DE",
    color: "#ffffff",
    
    "&:hover": {
      backgroundColor: "#1e3574 !important",
      color: "#ffffff",
      
    }       
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
   
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    height: 10,
  },
  
  root: {
    backgroundColor: theme.palette.background.paper,
    // width: 500,
    borderRadius:"5px",
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    marginTop: "10px",
    display: 'flex',
    flexWrap: 'wrap',
  },
  selectResponse: {

  }
  
}));

const ChatWindowUser = props => {
  const classes = useStyles();
  const history = useHistory()
  const [queueChat,setQueueChat] = useState(false)
  const [message, setMessage] = useState('')
  const [subject, setSubject] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [txt,setTxt] = useState('')
  const [age, setAge] = useState('');
  const [errorPopup, setErrorPopup] = useState(false)
  const [openPopup,setOpenPopup] = useState(false)
  const theme = useTheme();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const [customerProfile,setCustomerProfile] = useState({})
  const [open, setOpen] = useState(false);
const [agentData,setAgentDetails] = useState({});
const [disabled,setDisabled] = useState(true)
const [queued,setQueued] = useState(false)
const [afterTransfer,setAfterTransfer] = useState(false)
const [disabledTxt,setDisabledTxt] = useState(true)
const [emojiPickerState, SetEmojiPicker] = useState(false);
const [messageTxt, SetMessageTxt] = useState("");
const [endChat,setEndChat] = useState(false);
const [checkboxPrivacy, setCheckboxPrivacy] = useState(true)
const GreenCheckbox = withStyles({
  root: {
    color: '#009ce8',
    '&$checked': {
      color: '#009ce8',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);


  const [statePrivacy, setStatePrivacy] = React.useState({
    checkedPrivacy: false,
  });

  const handleChangePrivacy = (event) => {
    setStatePrivacy({ ...statePrivacy, [event.target.name]: event.target.checked });
  };

let emojiPicker;
if (emojiPickerState) {
  emojiPicker = (
    <Picker
      title="Pick your emoji…"
      emoji="point_up"
      onSelect={emoji => emojiFunc(messageTxt + emoji.native)}
    />
  );
}
const emojiFunc = (value)=>
{

  SetMessageTxt(value)
  SetEmojiPicker(false)
}
const triggerPicker= (event)=> {
  console.log(event)
  event.preventDefault();
  SetEmojiPicker(!emojiPickerState);
}


  const handleChange = event => {
    setAge(event.target.value);
  };


  const handleMsgClick = () => {
    setOpenPopup(true);
  };

  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorPopup(false);
  };

  const handleMsgClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenPopup(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
 
  const [status,setStatus] = useState('0')
  const [departData,setDepartData] = useState({})
  const [commodityData,setCommodityData] = useState({})
const [rowSize,setrowSize] = useState(1)
  const [queryFor,setQueryFor] = useState(true)
  const [selectDepartment,setSelectDepartment] = useState(false)
  const [selectForm, setSelectForm] = useState(false)
  const [privacy, setPrivacy] = useState(false)
  const [departmentConfirm,setDepartmentConfirm] = useState(false)
  const [chatModule,setChatModule] = useState(false)
  const [postSurvey,setPostSurvey] = useState(false)
 const [department,setDepartmentId] = useState("")
const [preMessage,setPreMessage] = useState({})
const [firstUser,setFirstUser] = useState('')
const [issueResolved,setIssueResolved] = useState('')
const [rating,setRating] = useState(0)
const [ftValue, setftValue] = useState(null)
const [ratingValue, setRatingValue] = useState(null)
const [resolveValue, setResolveValue] = useState(null)
const [formError, setformError] = useState("");

// const [afterCTransfer,setAfterCTransfer] = useState(false)

  // const token = JSON.parse(sessionStorage.userData).idToken.jwtToken
  let userCred
  if(sessionStorage.customerData)
  {
     userCred = JSON.parse(sessionStorage.customerData)
  }
  
  const [data, setData] = useState({})
  const[encodedData,setEncodedData] = useState('')
  console.log(props)


  useBeforeunload((e) => { beforeTabClose(e) });

  const beforeTabClose = (e) =>
  {
    console.log(e,"closeTab")
// e.preventDefault()

  ws.json({
    action: "customerEndsChat"    
  }); 
  ws.json({
    action: "customerDisconnect",
    connectionId:connectionID,
    role:"customer" 
  });
  ws && ws.close();
  ws = null;
  // onClose(e)
// setTimeout(()=>
// {
   
  
// },1000)
  }

  useEffect(() => {
    sessionStorage.setItem('queueChat',false)
      getDepartment()
      getCommodity()
    
    },
    []
  );

const getDepartment = () =>
{
  axios
  .get(`https://50zqi5mghk.execute-api.us-west-1.amazonaws.com/dev/customer/get-department-list`,{
    headers: { "x-api-key":"trTGOhKSks3mHvsVvGlMl95tdmTSIDjT6fUxPlFK"   }})
  .then(response => {
      // dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
      setDepartData(response.data.data.MainData)
     
   console.log(departData,"list");
  })
  .catch(error => {
      dispatch({ type: 'FETCH_ERROR',payload: error })
      console.log(globalState.state.post,"validateUser");
      // history.push("createUser")
      alert("Please try again")
  })
}
const getCommodity = () =>
{
  axios
  .get(`https://50zqi5mghk.execute-api.us-west-1.amazonaws.com/dev/customer/get-commodity-list`,{
    headers: { "x-api-key":"trTGOhKSks3mHvsVvGlMl95tdmTSIDjT6fUxPlFK"   }})
  .then(response => {
      // dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
      setCommodityData(response.data.data.MainData)
     
   console.log(commodityData,"list");
  })
  .catch(error => {
      dispatch({ type: 'FETCH_ERROR',payload: error })
      console.log(globalState.state.post,"validateUser");
      // history.push("createUser")
      // alert("Please try again")
  })
}
 
const clearSurvey = () => {
  setFirstUser('')
  setIssueResolved('')
  setRating(0)
  setftValue(null)
  setResolveValue(null)
  setRatingValue(null)
}
const submitPostSurvey = () =>
  
{
  if (
    firstUser.length <1 ||
    issueResolved.length <1 
  ) {
    setError("Please rate us to proceed")
    setErrorPopup(true)
  } else {
    console.log(customerProfile,"customerProfile")
    setOpenPopup(true)
    setTxt("Thanks for giving your feedback")
    setPostSurvey(false)
    setQueryFor(true)
    clearSurvey()
    
    let json = 
    {
     "CustomerEmailId":JSON.parse(sessionStorage.customerData).EmailId,
     "AgentEmailId":customerProfile.agentEmailId,
     "AgentConnectionId":customerProfile.AgentConnectionId,
        "ConnectionId":connectionID,
        "FeedBacks": [{
            "question":"Is this the first time you have chatted with us  about this case/issue",
            "answer":firstUser },
        {
   "question": "Was the issue resolved during the chat?",
    "answer": issueResolved
  }],
  "Ratings":rating
  
    }
    
    axios
    .post(`https://50zqi5mghk.execute-api.us-west-1.amazonaws.com/dev/customer/post-chat-survey`,json,{
      headers: { "x-api-key":"trTGOhKSks3mHvsVvGlMl95tdmTSIDjT6fUxPlFK"   }})
    .then(response => {
        // dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
        // setDepartData(response.data.data.MainData)
    
       history.push('/#/')
      
     console.log(response);
    })
    .catch(error => {
        dispatch({ type: 'FETCH_ERROR',payload: error })
        console.log(globalState.state.post,"validateUser");
        // history.push("createUser")
        console.log("Please try again")
    })
  }
  
}

  const handleClick = (eData) => {
   console.log(isOpen,eData)
  
    
      ws =    new Sockette(
        "wss://6z4exg2xvi.execute-api.us-west-1.amazonaws.com/dev/?data="+eData,
        {
         
          maxAttempts: 1,
          onopen: e => onConnection(e),
          onmessage: e => onMessageReceied(e),
          onreconnect: e =>onClose(e),
          onmaximum: e => console.log("Stop Attempting!", e),
          onclose: e => onClose(e),
          onerror: e => onClose(e)
        }
      );
    
    // else 
    // {
    //   ws.json({
    //     action: "customerDisconnect",
    //     connectionId:connectionID,
    //     role:"customer" 
    //   }); 
    //   ws && ws.close();
    //   ws = null;
    // }
  
   
   
  
  };


  const callIdleOut = (value)=>
  {
    if(value >= 3)
    {
      ws.json({
        action: "chatIdle"
      });
    }
   

  }
  const onClose =(e) =>
  {
    console.log(e)
    let json = {connectionId:sessionStorage.connectionID}
    axios
    .post(`https://50zqi5mghk.execute-api.us-west-1.amazonaws.com/dev/customer/customer-disconnect-chat`,json,{
      headers: { "x-api-key":"trTGOhKSks3mHvsVvGlMl95tdmTSIDjT6fUxPlFK"  }})
    .then(response => {
       console.log(response)
    })
  }

  const onConnection = (e)=>{
    console.log("connected:", e)
    if(props.role === "customer")
    {
      ws.json({
        action: "assignAgent",
        DepartmentId:department.DepartmentId,
        role:props.role  
      }); 
    }
  }

const chatDisconnect = ()=>
{
  // setEndChat("true")



  ws.json({
    action: "connectionDetails",
   connectionId:connectionID,
  }); 
  setTimeout(()=>
{
  ws.json({
    action: "customerEndsChat"    
  }); 
},1000)
setTimeout(()=>
{
  ws.json({
    action: "customerDisconnect",
    connectionId:connectionID,
    role:"customer" 
  }); 
  
  ws && ws.close();
  ws = null;
},5000)
setChatModule(false)
setSelectDepartment(false)
setDepartmentConfirm(false)
handleMsgClick()
setTxt("Chat Discontinued Successfully")
handleClose()
setPostSurvey(true)
  // ws.json({
  //   action: "customerDisconnect",
  //   connectionId:connectionID,
  //   role:"customer" 
  // }); 
  // ws && ws.close();
  // ws = null;

}
const chatAgentDisconnect = ()=>
{
  // setEndChat("true")



  ws.json({
    action: "connectionDetails",
   connectionId:connectionID,
  }); 

setTimeout(()=>
{
  ws.json({
    action: "customerDisconnect",
    connectionId:connectionID,
    role:"customer" 
  }); 
  
  ws && ws.close();
  ws = null;
},2000)
setChatModule(false)
setSelectDepartment(false)
setDepartmentConfirm(false)
handleMsgClick()
setTxt("Chat Discontinued Successfully")
handleClose()
setPostSurvey(true)
  // ws.json({
  //   action: "customerDisconnect",
  //   connectionId:connectionID,
  //   role:"customer" 
  // }); 
  // ws && ws.close();
  // ws = null;

}
  const onMessageWasSent = message => {
if(messageTxt.replace(/\s/g,"") !== "")
{
  SetMessageTxt('')
  console.log(message)
  const { author, type, data: messageData } = message;
  let isMe;
  console.log(props)
if(props.role === "customer")
  {
    console.log(props.role)
    const newMessage = { ...message, author: "Kalra",role:props.role,customerEmailId:(userCred.EmailId).toLowerCase(),departmentId:department.DepartmentId,time: (new Date()).toISOString() };
    isMe = "Kalra" === author ? "me" : "them";
    sessionStorage.setItem('timeOut',(new Date()).toISOString())
    dispatch({ type: 'FETCH_CHATHISTORY', payload: {
          author: isMe,
          type,
          data: messageData,
          time: (new Date()).toISOString()
        } })
   console.log(newMessage,messageData)
    ws.json({
      action: "sendmessage",
      data: JSON.stringify(newMessage)
    });

    setInterval(()=>
    {
      let diff = Math.round(((new Date().getTime() % 86400000) % 3600000) / 60000)-Math.round((((new Date(sessionStorage.timeOut)).getTime() % 86400000) % 3600000) / 60000)
      console.log(diff,"difference")
      callIdleOut(diff)
    },10000)


  }


}
else{
  SetMessageTxt(messageTxt.replace( /\s\s+/g, ' ' ))
}
   
 
  };

  const onFilesSelected = (e)=>{
    console.log(e)
const file = {
  imageUrl: 'https://somewhere.on/the_web.png',
  teamName: 'Da best'
}

  }

//   const callToAction = setInterval(()=>{
//     ws.json({
//     action: "connectionDetails",
//    connectionId:connectionID,
//   }); 
// },20000)

  const onMessageReceied = ({ data }) => {
   
if(JSON.parse(data))
{
  if(JSON.parse(data).message == "Internal server error")
    {
      console.log(data)
    }
    else if(JSON.parse(data).action == "message")
    { 
     
   
        console.log(JSON.parse(data).message)
       if(sessionStorage.afterTransfer === "true")
       {
        setDisabled(false)
        setDisabledTxt(false)
       }
       
        const { author, type, data: messageData,time } = JSON.parse(data).message;
        const isMe = "Kalra" === author ? "me" : "them";
        if (!isOpen) {
          setBadge(+badge + 1);
        }
        console.log(messageList,messageData)
       console.log(time)
        sessionStorage.setItem('timeOut',time)
            dispatch({ type: 'FETCH_CHATHISTORY', payload: {
            author: isMe,
            type,
            data:messageData,
            time
          } })

  setInterval(()=>
  {
    let diff = Math.round(((new Date().getTime() % 86400000) % 3600000) / 60000)-Math.round((((new Date(sessionStorage.timeOut)).getTime() % 86400000) % 3600000) / 60000)
    console.log(diff,"difference")
    callIdleOut(diff)
  },10000)

       
    }
    else if(JSON.parse(data).action === "chatAssigned")
    {
 
     if(JSON.parse(data).chatAssigned === true)
     {
      ws.json({
        action: "connectionDetails",
       connectionId:JSON.parse(data).connectionId,
      }); 
     }
// getConversationDetails(JSON.parse(JSON.parse(data).body).details.connectionId)
    }
    else if(JSON.parse(data).action === "chatTransfered")
    {
      sessionStorage.setItem("afterTransfer",true)
      // setAfterTransfer(true)
     if(JSON.parse(data).chatTransfered === true)
     {
      
      dispatch({ type: 'FETCH_CHATHISTORY', payload: {
        author: "agent",
        type:"text",
        data:"Thank you for your patience, your chat is being transferred"
        ,time: (new Date()).toISOString()
      } })
    
       setDisabled(true)
       setDisabledTxt(true)
      
      ws.json({
        action: "connectionDetails",
       connectionId:JSON.parse(data).connectionId,
      }); 
     }
// getConversationDetails(JSON.parse(JSON.parse(data).body).details.connectionId)
    }
    else if(JSON.parse(data).action === "enablePostChatSurvey")
    {
 
     if(JSON.parse(data).enableFeedBackForm === true)
     {
      chatAgentDisconnect()
     }
// getConversationDetails(JSON.parse(JSON.parse(data).body).details.connectionId)
    }
    else if(JSON.parse(JSON.parse(data).body).action === "assignAgent")
    {
     
      setConnectionId(JSON.parse(JSON.parse(data).body).connectionId)
      sessionStorage.setItem('connectionID',JSON.parse(JSON.parse(data).body).connectionId)
      if(JSON.parse(JSON.parse(data).body).assignedstatus === true)
      {

        ws.json({
          action: "connectionDetails",
         connectionId:JSON.parse(JSON.parse(data).body).connectionId,
        }); 
        
      }
      else
      {
      //  console.log(queued,"queued")
        if(!sessionStorage.queued)
        {
          sessionStorage.setItem("queued",true)
          NotificationManager.success(JSON.parse(JSON.parse(data).body).status);

        }
      
       setTimeout(()=>{
         if(ws)
         {
          ws.json({
            action: "assignAgent",
            DepartmentId:department.DepartmentId,
            role:props.role  
          }); 

         }
      
       },5000)
     
      }
     
     
    }
    else if(JSON.parse(JSON.parse(data).body).action === "connectionDetails")
    {
     
        
        console.log(JSON.parse(JSON.parse(data).body))
        // setPreMessage(JSON.parse(JSON.parse(data).body))
        setCustomerProfile(JSON.parse(JSON.parse(data).body).connectionDetails)
       


        if(sessionStorage.afterTransfer !== "true")
        {
          setDisabled(false)
          setDisabledTxt(false)
        }
       
       
       
        if(globalState.state.chat &&  globalState.state.chat.length >0)
        {
          console.log(JSON.parse(JSON.parse(data).body))
         
         
        }
        else if(sessionStorage.afterTransfer !== "true")
        {
          let defaultTxt ;
          if(JSON.parse(JSON.parse(data).body).customer_profile_details)
          {
             defaultTxt = "Your current balance is "+ JSON.parse(JSON.parse(data).body).customer_profile_details.Balance.CurrentBalance
         
          }
          else
          {
             defaultTxt = "Your current balance is not available"
         
            }
          console.log(defaultTxt,"default")
          
              dispatch({ type: 'FETCH_CHATHISTORY', payload: {
                author: "agent",
                type:"text",
                data:defaultTxt,
                time: (new Date()).toISOString()
              } })

        

     
        }
      
      // else
      // {



      // }
       
      
    
    }
  
    else
    {
      console.log(data)
    }
   

}
  
     };
const clearPayment = () => {
  setMessage("")
  setSubject("")
  setEmail("")
  setName("")
}
const submitRefund = () => {
  setQueryFor(true)
  setSelectForm(false)
  clearPayment()
  if (
    name.length <= 1 ||
    email.length <= 1 ||
    subject.length <= 1 ||
    message.length <= 1
  ) {
    setErrorPopup(true)
    setError("Error! Kindly fill-up form to proceed!")
  } 
  
  if (
    name.length >= 1 &&
    email.length >= 1 &&
    subject.length >= 1 &&
    message.length >= 1 
  ) {
    if(EmailValidator.validate(email) === false)
    {
      console.log("This is it", EmailValidator.validate(email))
      setformError("error")
      setOpenPopup(true)
      setTxt("Your email address seems to be incorrect")
    }
    else if(new RegExp("[0-9]").test(name) === true)
    {
      setformError("error")
      setOpenPopup(true)
      setTxt("Name entered seems to be incorrect")
    }
    else{
    setName('')
    setSubject('')
    setEmail('')
    setMessage('')
    setformError("success")
    setOpenPopup(true)
    setTxt("Your inquery is being processed.")
    }
  }   
}

const closeChosenDept = () => {
  setDepartmentConfirm(false)
  setSelectDepartment(true)
}
const closeDepartment = () => {
  setQueryFor(true)
  setDepartmentConfirm(false)
  setSelectDepartment(false)
}

const closePrivacy = () => {
  setQueryFor(true)
  setPrivacy(false)
}

const closeRefundForm = () => {
  setQueryFor(true)
  setSelectForm(false)
  setSelectDepartment(false)
}

const selectPrivacy = () => {
  setQueryFor(false)
  setPrivacy(true)
}

const selectRefundForm = () => {
  setQueryFor(false)
  setSelectForm(true)
}

const selectQueryFor = () =>
{
  setQueryFor(false)
  setSelectDepartment(true)
}
 
const chooseDepartment = () =>
{
setDepartmentConfirm(true)

}
const confirmDepartment = ()=>{
  let newData = {
    customerName: (userCred.UserName).toLowerCase(),
    customerEmailId:(userCred.EmailId).toLowerCase(),
    departmentName: department.DeptName,
    departmentId:department.DepartmentId,
    role:props.role
  }
console.log("aaa",newData)
let dataIntoken = base64.encode(utf8.encode(JSON.stringify(newData)));

console.log(dataIntoken)
// setEncodedData(dataIntoken)
  setData(newData)
 

  setSelectDepartment(false)
  setChatModule(true)
  handleClick(dataIntoken)
  sessionStorage.setItem('deptId', department);
}

const captureDepartment = (value)=>
{
  setDepartmentConfirm(true)
  setDepartmentId(value)
}

const openWindow = ()=>
{
  setIsOpen(!isOpen)
}
// console.log(globalState.state.chat)
const addEmoji = e => {
  let emoji = e.native;
  console.log(emoji)
  // this.setState({
  //   text: this.state.text + emoji
  // });
};
const imageDecorator = (decoratedURL, key) => {
  return (
    <div>
      <img
        src={decoratedURL}
        key={key}
        rel="noopener"
        width="100"
        className="customImage"
        alt={decoratedURL}
      />
    </div>
  );
};

const  previewFile = (e)=>{
    
  const file = e.target.files[0];
  console.log(file)
  if (file) {
    // setFileName(file.name)
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
      // setBaseFile(base64File)
      // uploadFIle(base64File)
      const newMessage = { role:"customer",
      fileType: "image/jpeg",
      "base64File": base64File, };

      dispatch({ type: 'FETCH_CHATHISTORY', payload: {
        author: "them",
        type:'text',
        data: file.name,
        time: (new Date()).toISOString()
      } })

  ws.json({
    action: "customerSendAttachment",
    data: JSON.stringify(newMessage)
  });

      console.log("base64",base64File)
    }
  } 
}

const rowSizeFunc = (event)=>
{
  if(event.key === 'Enter'){
    // setrowSize(rowSize+1)
  }

}
const sendMessageFunc  = (event)=>
{
  if(messageTxt.replace(/\s/g,"") !== "")
  {
  if(event.key === 'Enter'  && (!event.shiftKey)){
    event.preventDefault();
    onMessageWasSent({
      author:props.role,
      type:"text",
      data:messageTxt
    })
  }
}
else{
  if(event.key === 'Enter')
  {
    event.preventDefault();
    }
  }
 
}

const navbar = (
  <>
  <nav class="navbar navbar-expand-lg navbar-light ">
    <li class="nav-item ">
      <Link class="nav-link" to="/agent/login">Agent Login</Link>
    </li>
    <li class="nav-item">
      <Link class="nav-link" to="/supervisor/login">Supervisor Login</Link>
    </li>
    <li class="nav-item">
      <Link class="nav-link" to="">Customer Login</Link>
    </li>
</nav> 
</>
) 
  return (
  <>
    <div className="bgImage" style={{height:window.innerHeight}}>
     
      {isOpen === true ?
      <div className="chatUser-size openChat" >

    <div className="row chatUser-header">
    {department.DeptName && customerProfile && chatModule === true ?
   
     <div className="col-md-9 col-9">
       <p className="chatUser-head" style={{marginBottom:"5px"}}>{department.DeptName}</p>
    <p className="chatUser-headT" >{disabled === false ? "You are now chatting with "+customerProfile.connectedUserName: "You will be connected to agent soon"}</p>
     </div>
  :
  <>

  <div className="col-md-9 col-9">
   
    <p className="chatUser-head" > <span className="chatUser-logo"></span>e-Shift</p>
  </div></>
  }
     
  <div className="col-md-3 col-3 sidecheck">
    <span> <img src="assets/img/chevron-down.svg"  className="chatUser-down down"  onClick={openWindow} /></span>  
    <span  className="chatUser-down" ><CloseIcon style={{color:"white"}} onClick={chatModule === true ?handleOpen :openWindow} /></span>
  </div>
  <Dialog
       open={open}
       TransitionComponent={Transition}
       keepMounted
       onClose={handleClose}
       aria-labelledby="alert-dialog-slide-title"
       aria-describedby="alert-dialog-slide-description"
     >
       <DialogTitle>
       <div style={{textAlign:"center",marginTop: '0px'}}>
                        <img src="/assets/img/feedback-icon.svg" style ={{height:'100px', width: '80px'}}/> 
                    </div>
       </DialogTitle>
       <DialogContent>
         <p className="pp-headr" id="alert-dialog-slide-description">
        Are you sure, you want to discontinue chat ?
         </p>
       </DialogContent>
       <DialogActions>
       <p className="pp-main">
       <button  className="pp-btn pp-btn-select" onClick={handleClose} style={{color:' #009ce8'}}>Cancel</button> 
        <button className="pp-btn yesbtn" onClick={chatDisconnect} >Stop Chat</button>
        </p>
         {/* <Button onClick={handleClose} color="primary">
           Cancel
         </Button>
         <Button onClick={chatDisconnect} color="primary">
           Stop Chat
         </Button> */}
       </DialogActions>
     </Dialog>
     
  </div>
    {/* Query for */}
    {queryFor === true ?
     <div className="row chatUser-chat">
     <div className="col-md-11 col-11 chatUser-select commo">
       <p className="contact-head">Contact Us For</p>
       {commodityData.length > 0 && commodityData.map((commodity,c)=>{
        return  <p className="contact-box" onClick={selectQueryFor} key={c}>
        <span><img src="assets/img/service-request.svg" className="chatUser-chatIcon" /> </span>
        <span className={c === commodityData.length -1 ? "contact-txt-last" : "contact-txt"}>{commodity.CommodityName}</span>
        <span className="chatUser-click" ><img src="assets/img/down-arrow.svg"  /></span>
        
        </p>
      })}
      
       {/* <p className="contact-box" onClick={selectQueryFor}>
       <span><img src="assets/img/support-customer.svg" className="chatUser-chatIcon"  /> </span>
         <span className="contact-txt" >Support</span>
         <span className="chatUser-click" ><img src="assets/img/down-arrow.svg"  /></span>
         </p>
       <p className="contact-box" onClick={selectQueryFor}>
       <span><img src="assets/img/support-customer.svg" className="chatUser-chatIcon"  /> </span>
         <span className="contact-txt-last">Billing</span>
         <span className="chatUser-click" ><img src="assets/img/down-arrow.svg"  /></span>
         </p> */}
       </div>
     
       <div className="col-md-11 col-11 chatUser-select-faq">
       <p className="contact-head">FAQ</p>
       <p className="contact-box" onClick={selectRefundForm}>
         <span><img src="assets/img/refund-payment.svg" className="chatUser-chatIcon" /> </span>
         <span className="contact-txt">Payment Inquiry</span>
         <span className="chatUser-click" ><img src="assets/img/down-arrow.svg"  /></span>
       </p>
       <p className="contact-box" onClick={selectPrivacy}>
         <span><img src="assets/img/privacy-policy.svg" className="chatUser-chatIcon"  /> </span>
         <span className="contact-txt-last" >Privacy Policy</span>
         <span className="chatUser-click" ><img src="assets/img/down-arrow.svg"  /></span>
       </p>
      
       </div>
     
     </div>
      
  :
  null
  }

  {/* Privacy Form */}
  {
    privacy === true ?
  <div className="privacy-chat">
      <div className="row chatUser-row privacy-div">
        <div className="col-md-12 col-sm-12">
          <h3 className="privacy-head">Privacy Policy</h3>
          <p className="privacy-txt">I understand/acknowledge that the controller of my personal data is [ client company name] with its registered office in [business address]. I understand/acknowledge that my personal data shall be processed and transmitted in accordance with the California Consumer Privacy Act (CCPA).</p>
          <p className="privacy-txt">I agree for my personal data, provided via chat, to be processed by [ client company name] for the purposes of providing support via chat. I agree for my personal data to be processed for the time [e.g. needed to carry out the service]. I understand that the consent may be revoked by sending an email at: [your business email/your data protection officer’s email].</p>
          <p className="privacy-txt">I agree for my personal data, provided via chat, to be processed by [client company name], for the purpose of [specify the purpose of the processing], for the time of [specify the time of processing].</p>
          <p className="privacy-agreement">
          
            <span className="align-chk">  <FormControlLabel
        control={<GreenCheckbox checked={statePrivacy.checkedPrivacy} onChange={handleChangePrivacy} name="checkedPrivacy" style={{width:'20px', height:'20px'}}/>}
        
      /></span> I agree to the above terms and conditions.
          
          </p>
          <br/>
        </div>
      </div>
      {/* <div className="row chatUser-row">
        <div className="col-md-12 col-sm-12">
          <p>Kindly co-operate.</p>
        </div>
      </div> */}
      <div className="row chatUser-row btnline">
        <div className="col-md-6 col-sm-12">
          <Button onClick={closePrivacy}>
            <img src="assets/img/Back Arrow.svg" class="sd-back" />
          </Button>
        </div>
        <div className="col-md-6 col-sm-12">
          <Button style={{textAlign:"right"}}>
            <img src="assets/img/Group 636.svg" class="sd-next" />
          </Button>
        </div>
      </div>
    </div>
    :
    null
  }
  
  {/* Select Form */}
  {
    selectForm === true ?
    <>
      <div className="row chatUser-row chatUser-toprow">
        <div className="col-md-12 col-sm-12 ">
          <TextField className="rowalign"
            id="outlined-full-width"
            label="Name"
            style={{ margin: 8 }}
            placeholder="Please enter name"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </div>
      </div>
      <div className="row chatUser-row chatUser-toprow">
        <div className="col-md-12 col-sm-12">
          <TextField
          className="rowalign"
            type="email"
            id="outlined-full-width"
            label="Email"
            style={{ margin: 8 }}
            placeholder="Please enter email"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </div>
      </div>
      <div className="row chatUser-row chatUser-toprow">
        <div className="col-md-12 col-sm-12">
          <TextField
          className="rowalign"
            id="outlined-full-width"
            label="Subject"
            style={{ margin: 8 }}
            placeholder="Please enter subject"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={subject}
            onChange={event => setSubject(event.target.value)}
          />
        </div>
      </div>
      <div className="row chatUser-row chatUser-toprow">
        <div className="col-md-12 col-sm-12">
          <TextField
          className="rowalign"
            id="outlined-full-width"
            label="Message"
            style={{ margin: 8 }}
            placeholder="Please enter message"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={message}
            onChange={event => setMessage(event.target.value)}
          />
        </div>
      </div>
      <div className="row chatUser-row chatUser-toprow btnrow">
        <div className="col-md-6 col-sm-12">
          <Button onClick={closeRefundForm}>
            <img src="assets/img/Back Arrow.svg" class="sd-back" />
          </Button>
        </div>
        <div className="col-md-6 col-sm-12">
          <Button onClick={submitRefund}>
            <img src="assets/img/Group 636.svg" class="sd-next" />
          </Button>
          <Snackbar open={errorPopup} autoHideDuration={4000} onClose={handleErrorClose}>
            <Alert onClose={handleErrorClose} severity="error">
              {error}
            </Alert>  
          </Snackbar>
        </div>
      </div>
    </>  
    :
    null
  }

  {/* Select Department */}
{ selectDepartment === true ? 
  <div className="row chatUser-sd">
    <div className="col-md-11 col-11 chatUser-select sd">
      <p className="contact-head"><img src="assets/img/chevron-back1.svg" class="sid-back" onClick={closeDepartment}></img>Select Department</p>
    <ul className="sdul">
      {departData.length > 0 && departData.map((depart)=>{
        return <li className={department.DepartmentId === depart.DepartmentId ? "sd-li select-sd" : "sd-li"} onClick={()=>captureDepartment(depart)}>
            {/* <span><img src="assets/img/Group 532.svg" className="chatUser-sdIcon" /> </span> */}
            
       <span className={department.DepartmentId === depart.DepartmentId ?"sd-txt bold" :"sd-txt"}><img src={`assets/img/${depart.DeptName}.svg`} style={{width:'20%', marginTop:'-3%', marginLeft
       :'-13%'}}/>&nbsp;{depart.DeptName}</span></li>
      })}
    </ul>

{departmentConfirm === true ?
<>
  <p className="sd-confirm">Do you want to connect with agent 
      in <b>{department.DeptName} department?</b></p>

      <p className="sc-main">
        <button  className="sc-btn sc-btn-select" onClick={closeChosenDept} style={{color:' #009ce8'}}>No</button> 
        <button className="sc-btn yesbtn" onClick={confirmDepartment} >Yes</button>
      </p>
      </>
:
  <>
    {/* <div className="row chatUser-row sd-BP"> */}
      {/* <div className="col-md-6 col-sm-12">
        <img src="assets/img/Back Arrow.svg"
        class="sd-back"  onClick={closeDepartment}></img>
      </div> */}
      {/* <div className="col-md-6 col-sm-12">
        <img src="assets/img/Group 636.svg"
        class="sd-next"  onClick={chooseDepartment}></img>
      </div> */}
    {/* </div> */}
  </>
}
     
      </div>
    
    </div>
    
:
null
}

{ postSurvey === true ? 
  <div className="row chatUser-sd">
    <div className="col-md-11 col-11 chatUser-select sd">

                    <div style={{textAlign:"center",marginTop: '0px'}}>
                        <img src="/assets/img/feedback-icon.svg" style ={{height:'100px', width: '80px'}}/> 
                    </div>
                    <div style={{textAlign:"center",marginTop: '-10px'}}>
                        <span style={{fontSize:'12px', fontFamily:'ProximaNova'}}>Help us build eShift better</span>
                    </div>
                    <div style={{textAlign:"center"}}>
                        <p style={{marginTop: '-5px',fontSize:'12px', fontFamily:'ProximaNovaThin'}}>We would appreciate your feedback</p>
                    </div>
                    <div className="row Feedbackbox">
                      <div className="row feedbk">
                    <div className="col-md-12">
                        <p style={{fontSize:'13px', fontFamily:'ProximaNovaThin',paddingTop:'6%',marginBottom:'7px'}}>Is this the first time you have chatted with us  about this case/issue?</p>
                    </div>
                    </div>
                    <div className="row feedbk">
                    <div className="col-md-12">
                        <span style={{display:'inline-flex', marginTop:'-2%'}}><Button variant="outlined" className={ftValue===0? classes.drawerItemSelected : classes.drawerItem}style={{width:'30%'}} onClick={()=>{setFirstUser('no'); setftValue(0)}}>Yes</Button>&nbsp; &nbsp;<Button variant="outlined"  className={ftValue===1? classes.drawerItemSelected : classes.drawerItem} style={{width:'30%'}} onClick={()=>{setFirstUser('yes'); setftValue(1)}}>No</Button></span>
                    </div>
                    </div>
<div className="row feedbk">
                    <div className="col-md-12">
                        <p style={{fontSize:'13px', fontFamily:'ProximaNovaThin',paddingTop:'6%'}}>Was the issue resolved during the chat?</p>
                    </div>
                    </div>
                    <div className="row feedbk feedbkallign">
                    <div className="col-md-12">
                        <span className="feedbkbtn" style={{display:'inline-flex', marginTop:'-1%'}}><Button className={resolveValue===0? classes.drawerItemSelected : classes.drawerItem} variant="outlined" style={{width:'30%'}} onClick={()=>{setIssueResolved('no'); setResolveValue(0)}}>Yes</Button>&nbsp; &nbsp;<Button className={resolveValue===1? classes.drawerItemSelected : classes.drawerItem} variant="outlined" style={{width:'30%'}}onClick={()=>{setIssueResolved('yes'); setResolveValue(1)}}>No</Button></span>
                    </div>
</div>
<div className="row feedbk">
                    <div className="col-md-12">
                        <p style={{fontSize:'13px', fontFamily:'ProximaNovaThin',paddingTop:'9%'}}>How would you rate this chat?</p>
                    </div>
                    </div>
                    <div className="row feedbk feedbkallign1">
                    <div className="col-md-12" >
                        <span className="feedbkbtn" style={{display:'inline-flex'}}><Button className={ratingValue===0? classes.drawerItemSelected : classes.drawerItem} variant="outlined" style={{width:'30%'}} onClick={()=>{setRating(0); setRatingValue(0)}}><ThumbUpAltIcon/></Button>&nbsp; &nbsp;<Button className={ratingValue===1? classes.drawerItemSelected : classes.drawerItem} variant="outlined" style={{width:'30%'}} onClick={()=>{setRating(5); setRatingValue(1)}}><ThumbDownAltIcon/></Button></span>
                    </div>
                    </div>

                </div>
                <div style={{marginTop:'4%',textAlign:"center",marginBottom:'3%'}}>
                    <Button variant="contained" 
                      style={{backgroundColor:'#0095DE', color:'white', width:'99%'}} 
                      onClick={submitPostSurvey}
                    >
                      Submit
                    </Button>
                    <Snackbar open={errorPopup} autoHideDuration={4000} onClose={handleErrorClose}>
                      <Alert onClose={handleErrorClose} severity="error">
                        {error}
                      </Alert>  
                    </Snackbar>
                </div>

                </div>
                
                </div>
  

   
    
:
null
}


    {/* chat-module */}

  {chatModule === true ?
  <div className="row chat chatUser-chatting">
  <div className="chat-history">
  <span>{emojiPicker}</span>
       <ul>
 { globalState.state.chat && globalState.state.chat.length > 0 && globalState.state.chat.map(function(item) {
         return item.author === "them" ?<li key={item} >
        
         <div className="message other-message float-right">
           <p className="who">You, {new Intl.DateTimeFormat("en-US", {
                            hour12: true,
                            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone ,
                            hour: 'numeric',
                            minute: 'numeric'                         
                          }).format(new Date(item.time))
                        }</p>
           <ReactTextFormat
           allowedFormats={['URL', 'Email', 'Image', 'Phone', 'CreditCard']}
            imageDecorator={imageDecorator}

            
           >{item.data}</ReactTextFormat>
         </div>
         {/* <div className="message-data align-right">
  
           <span className="message-data-name"><img src="assets/img/Mask Group 22.png" className="face-rightIcon" /></span> 
         </div> */}
       </li>
       :
       <li>
         
           <div className="message my-message float-left">
             <p className="who">{customerProfile.connectedUserName}, {new Intl.DateTimeFormat("en-US", {
                            hour12: true,
                            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone ,
                            hour: 'numeric',
                            minute: 'numeric'                         
                          }).format(new Date(item.time))
                        }</p>
             <ReactTextFormat>{item.data}</ReactTextFormat>
           </div>
           {/* <div className="message-data">
             <span className="message-data-name"><img src="assets/img/Mask Group 22.png" className="face-leftIcon" /></span>
           
           </div> */}
         </li>
       }
       )
       }
        
        
       </ul>
       
     </div> 
     <div className={disabledTxt === false ? "chat-message clearfix":"chat-message clearfix blocked" } style={{display: 'flex'}}>
     
     <span className="chat-span">
<TextareaAutosize rowsMax={3} name="message-to-send"  placeholder={disabledTxt === false? "Enter a message here" :"Please wait..." }  rows={rowSize} value={messageTxt} onChange={event => SetMessageTxt(event.target.value)} disabled={disabledTxt} onKeyPress={rowSizeFunc} className={disabledTxt === false ? "":"blocked" } onKeyPress={sendMessageFunc}  style={{flexGrow: '1', WebkitBoxFlex: '1', overflowY: 'auto'}} /> 
         {/* <TextareaAutosize rowMax={2} name="message-to-send"  placeholder={disabledTxt === false? "Enter a message here" :"Please wait..." }  rows={rowSize} value={messageTxt} onChange={event => SetMessageTxt(event.target.value)} disabled={disabledTxt} onKeyPress={rowSizeFunc} className={disabledTxt === false ? "":"blocked" } onKeyPress={sendMessageFunc} style={{width: "95%",
    marginLeft: theme.spacing(1),
    flex: 1,
    fontFamily: "ProximaNovaThin",
    fontSize: "15px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.2,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#1d1d1d",
	border: "0",
  // height: "auto !important",
  flexDirection: 'column',
	overflowY: "scroll !important",
    padding: "11px 0 8px !important",
    wordWrap: 'break-word'}}  /> */}
      <span><img src="assets/img/download.svg" className="chatUser-chatting-img downld" onClick={triggerPicker} /></span>
         {/* <textarea name="message-to-send"  placeholder={disabledTxt === false? "Enter a message here" :"Please wait..." }  rows={rowSize} value={messageTxt} onChange={event => SetMessageTxt(event.target.value)} disabled={disabledTxt} onKeyPress={rowSizeFunc} className={disabledTxt === false ? "":"blocked" } onKeyPress={sendMessageFunc}  />
      
      <span  ><img src="assets/img/download.svg" className="chatUser-chatting-img downld" onClick={triggerPicker} /></span> */}
    
      <span><img src="assets/img/paperclip (1).svg"  className="chatUser-chatting-img" onClick={()=>document.getElementById("chat-file").click()} /></span>
     <span> {messageTxt === "" ? <img src="assets/img/send-inactive.svg" className="chatUser-chatting-img arrow"/> : <img src="assets/img/send-active.svg" className="chatUser-chatting-img arrow" onClick={()=>{onMessageWasSent({
         author:props.role,
         type:"text",
         data:messageTxt
       })}} /> } </span>
       
       {/* <button onClick={()=>{onMessageWasSent({
         author:props.role,
         type:"text",
         data:messageTxt
       })}} className="chatUser-chatting-btn">Send</button> */}
     </span>
      
     
     </div> 
 
 </div>
     
:
null
}

    </div>
      :
      <div className="chatUser-size" >

    <div className="row chatUser-header">
    
      <div className="col-md-1 col-1">
      <p className="chatUser-logo"></p>
      </div>
      <div className="col-md-9 col-9">
        <p className="chatUser-head">e-Shift</p>
      </div>
      <div className="col-md-1 col-1">
        <img src="assets/img/chevron-down.svg"  className="chatUser-down"  onClick={openWindow} />
      </div>
    </div>
    {/* query for */}

    <div className="row chatUser-chat">
    <div className="col-md-11 col-11 chatUser-select">
      <p className="contact-head">Contact Us For</p>
      <p className="contact-box">
        <span><img src="assets/img/Group 532.svg" className="chatUser-chatIcon" /> </span>
        <span className="contact-txt">Service Requests</span>
        <span className="chatUser-click" ><img src="assets/img/chevron-down (1).svg"  /></span>
        
        </p>
      <p className="contact-box">
      <span><img src="assets/img/Group 532.svg" className="chatUser-chatIcon"  /> </span>
        <span className="contact-txt" >Support</span>
        <span className="chatUser-click" ><img src="assets/img/chevron-down (1).svg"  /></span>
        </p>
      <p className="contact-box">
      <span><img src="assets/img/Group 532.svg" className="chatUser-chatIcon"  /> </span>
        <span className="contact-txt-last">Complaints</span>
        <span className="chatUser-click" ><img src="assets/img/chevron-down (1).svg"  /></span>
        </p>
      </div>
    
      <div className="col-md-11 col-11 chatUser-select-faq">
      <p className="contact-head">FAQ</p>
      <p className="contact-box">
        <span><img src="assets/img/Group 532.svg" className="chatUser-chatIcon" /> </span>
        <span className="contact-txt">Payment Inquiry</span>
        <span className="chatUser-click" ><img src="assets/img/chevron-down (1).svg"  /></span>
        </p>
      <p className="contact-box">
      <span><img src="assets/img/Group 532.svg" className="chatUser-chatIcon"  /> </span>
        <span className="contact-txt-last" >Privacy Policy</span>
        <span className="chatUser-click" ><img src="assets/img/chevron-down (1).svg"  /></span>
        </p>
     
      </div>
    
    </div>
    
    
       {/* Select Department  */}


       <div className="row chatUser-chat">
    <div className="col-md-11 col-11 chatUser-select">
      <p className="contact-head">Contact Us For</p>
      <p className="contact-box">
        <span><img src="assets/img/Group 532.svg" className="chatUser-chatIcon" /> </span>
        <span className="contact-txt">Service Requests</span>
        <span className="chatUser-click" ><img src="assets/img/chevron-down (1).svg"  /></span>
        
        </p>
      <p className="contact-box">
      <span><img src="assets/img/Group 532.svg" className="chatUser-chatIcon"  /> </span>
        <span className="contact-txt" >Support</span>
        <span className="chatUser-click" ><img src="assets/img/chevron-down (1).svg"  /></span>
        </p>
      <p className="contact-box">
      <span><img src="assets/img/Group 532.svg" className="chatUser-chatIcon"  /> </span>
        <span className="contact-txt-last">Complaints</span>
        <span className="chatUser-click" ><img src="assets/img/chevron-down (1).svg"  /></span>
        </p>
      </div>
    
      <div className="col-md-11 col-11 chatUser-select-faq">
      <p className="contact-head">FAQ</p>
      <p className="contact-box">
        <span><img src="assets/img/Group 532.svg" className="chatUser-chatIcon" /> </span>
        <span className="contact-txt">Refund & Payments</span>
        <span className="chatUser-click" ><img src="assets/img/chevron-down (1).svg"  /></span>
        </p>
      <p className="contact-box">
      <span><img src="assets/img/Group 532.svg" className="chatUser-chatIcon"  /> </span>
        <span className="contact-txt-last" >Privacy Policy</span>
        <span className="chatUser-click" ><img src="assets/img/chevron-down (1).svg"  /></span>
        </p>
     
      </div>
    
    </div>
    
    
    
    </div>
      }
      <div className="chatUser-icon" onClick={openWindow}>
    <ForumIcon style={{ color: "#fff",width:"40px",height:"40px"}}  />
    
    </div>
      <input type="file" onChange={previewFile} id="chat-file"  accept=".pdf,.doc,.docx"  style={{visibility:"hidden"}} />
      <NotificationContainer/>
      <Snackbar open={openPopup} autoHideDuration={4000} onClose={handleMsgClose}>
  <Alert onClose={handleMsgClose} severity={formError}>
    {txt}
  </Alert>  
</Snackbar>
    </div>
  </>
  );
};

export default ChatWindowUser;
