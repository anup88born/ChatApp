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
import Sockette from "sockette";
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import CrmInfo from '../crmInfo';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import Chip from '@material-ui/core/Chip';
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
  
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 595,
    borderRadius:"5px",
  
  },
  
}));




const ChatWindowArchives = props => {
  const classes = useStyles();
  const [age, setAge] = useState('');
  const theme = useTheme();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
 
  const [open, setOpen] = useState(false);
  const [openPdf, setOpenPdf] = useState(false);

const [agentData,setAgentDetails] = useState({})
const [chatDetails,setChatDetails] = useState({})
const [tags,setTags]=useState(["Billing"])
const [tagValue,SetTagValue] = useState(false)
const [emojiPickerState, SetEmojiPicker] = useState(false);
const [messageTxt, setMessageTxt] = useState("");

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
  console.log(e.target.value,cannedData[0].Hint)
  setMessageTxt(e.target.value)
  // SetMessageTxt([cannedData.map(data=> data.Hint == e.target.value ? data.Response:e.target.value)])
// {cannedData.map((data)=> (
//    data.Hint == e.target.value ? 
//    SetMessageTxt(data.Response)
//   :
//   SetMessageTxt(e.target.value)
// ))
// }
for(let i=0;i<cannedData.length;i++)
{
  if(cannedData[i].Hint === e.target.value )
  {
    console.log("yes",cannedData[i].Response)
    setMessageTxt(cannedData[i].Response)
  }
 
 
}

}




const addTags =(event)=>{
  if(event.key === 'Enter'){
    console.log('enter press here! ')
      setTags([...tags,event.target.value])
      SetTagValue(false)

      const newMessage = { tags:tags,
        customerConnectionId: props.customerData.connectionId};
      props.ws.json({
        action: "addTag",
        data: JSON.stringify(newMessage)
        
      });
  }
  // console.log(value)
  

}


const triggerPicker= (event)=> {
  console.log(event)
  event.preventDefault();
  SetEmojiPicker(!emojiPickerState);
}







  const handleChange = event => {
    setAge(event.target.value);
  };
  const handleOpenPdf = () => {
    setOpenPdf(true);
  };

  const handleClosePdf = () => {
    setOpenPdf(false);
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
const [comment,setComment] = useState(0)
const [commentTxt,setCommentTxt] = useState('')
  const [status,setStatus] = useState('0')
  const [convoData,setConvoData] = useState({})

  const [cannedData,setCannedData] = useState([])
  const token = JSON.parse(sessionStorage.userData).idToken.jwtToken

  console.log(props)
  useEffect(  () => {
      getCannedResponses()
    },
    [messageList,setMessageTxt]
  );


  const getCannedResponses = ()=>
  {

    axios
    .get(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/chat-agent/canned-response/get-canned-response`,{
      headers: { "Authorization":token   }})
    .then(response => {
        // dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
        setCannedData(response.data.data.MainData)
       
     console.log(cannedData,"list");
    })
    .catch(error => {
        dispatch({ type: 'FETCH_ERROR',payload: error })
        console.log(globalState.state.post,"validateUser");
        // history.push("createUser")
        alert("Please try again")
    })

  }

  const handleClick = () => {
   

      props.ws.json({
        action: "agentDisconnect",
        customerConnectionId: props.customerData.connectionId, 
        agentEmailId: props.customerData.agentEmailId,
        role:props.role  
      }); 
      props.handleOpenPdf()
   
  };

  const onConnection = (e)=>{
    console.log("connected:", e)
  
      props.ws.json({
        action: "agentDetails",
       connectionId:props.customerData.connectionId,
       agentEmailId:props.customerData.agentEmailId,
        role:props.role  
      }); 
   
   
  }
  const onMessageWasSent = message => {

    
    console.log(message,props)

    const { author, type, data: messageData,customerEmailId } = message;
    let isMe;
    console.log(props)
    if(props.role === "agent")
    {
      console.log(props.role)
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

const addComment = (value)=>
{

setCommentTxt(value)

}
const commentStatus = (value)=>
{
  setValue(value);
  setComment(value)

}

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

  const onFilesSelected = ()=>{
const file = {
  imageUrl: 'https://somewhere.on/the_web.png',
  teamName: 'Da best'
}

  }
  const getConversationDetails = (value)=>
  {
const json ={
  "ConnectionId":value
}
    axios
    .post(`https://l90fdmvs25.execute-api.us-west-1.amazonaprops.ws.com/dev/transfer-chat/get-conversation-details`,json,{
      headers: { "Authorization":token   }})
    .then(response => {
        // dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
        setConvoData(response.data.data.MainData)
       
     console.log(convoData,"list");
    })
    .catch(error => {
        dispatch({ type: 'FETCH_ERROR',payload: error })
        console.log(globalState.state.post,"validateUser");
        // history.push("createUser")
        alert("Please try again")
    })

  }

  const onMessageReceied = ({ data }) => {
   
// console.log(JSON.parse(data).action)
    if(JSON.parse(data).message == "Internal server error")
    {
      console.log(data)
    }
    else if(JSON.parse(data).action == "message")
    {
      console.log(globalState.state.chat)
      console.log(JSON.parse(data).message)
      const { author, type, data: messageData } = JSON.parse(data).message;
      const isMe = "Kalra" === author ? "me" : "them";
      if (!isOpen) {
        setBadge(+badge + 1);
      }
      console.log(messageList,messageData)
    
      dispatch({ type: 'FETCH_CHATHISTORY', payload: {
        author: isMe,
        type,
        data: messageData
      } })
  
    }
    else if(JSON.parse(JSON.parse(data).body).action === "assignAgent")
    {
     
      setConnectionId(JSON.parse(JSON.parse(data).body).connectionId)
    
     
    }
    else if(JSON.parse(JSON.parse(data).body).action === "agentDetails")
    {
      console.log(JSON.parse(JSON.parse(data).body))
setAgentDetails(JSON.parse(JSON.parse(data).body).details)
// getConversationDetails(JSON.parse(JSON.parse(data).body).details.connectionId)
    }
    else if(JSON.parse(JSON.parse(data).body))
    {
    console.log(JSON.parse(JSON.parse(data).body))
setChatDetails(JSON.parse(JSON.parse(data).body))
// getConversationDetails(JSON.parse(JSON.parse(data).body).details.connectionId)
    }
    else
    {
      console.log(data)
    }
   
     };
  
console.log(globalState.state.chat)
console.log(value, "tab value")
console.log(messageTxt)
  return (<>
    <div className="classes.table col-md-5 col-sm-12 noPaddingLR chatWidth">
    <div className="row">

<div className="col-md-12 chatBox noPaddingR">

  <div className="row chat agent-chat archivePage">
 

  <div className="row chat-header clearfix">
  <div className="col-md-6">
    <p className="arc-head">Incorrect Billing Amount</p>
    <p className="arc-subhead">Ticket Raised with ID # 125639 on 12/03, 10:15 AM</p>
  </div>
  <div className="col-md-6 ">
  <img src="/assets/img/Chat Rated Good Archives.svg"  className="arc-img" />
  <p className="arc-subhead Mright">Afroj rated this chat good </p>
  </div>
</div>
  
 <div className="agent-emoji">{emojiPicker}
   </div>    


    <div className="chat-history"  >
    <ul>
 { globalState.state.chat && globalState.state.chat.length > 0 && globalState.state.chat.map(function(item) {
         return item.customerEmailId === props.customerData.customerEmailId ?
         item.author === "them" ?<li key={item} >
        
         <div className="message other-message float-right">
           <p className="who">You, 10:32 pm</p>
           <ReactTextFormat>{item.data}</ReactTextFormat>
         </div>
         <div className="message-data align-right">
  
           <span className="message-data-name"><img src="/assets/img/Mask Group 22.png" className="face-rightIcon" /></span> 
         </div>
       </li>
       :
       <li>
         
           <div className="message my-message float-left">
             <p className="who">{props.customerData.customerName}, 12:03 pm</p>
             <ReactTextFormat>{item.data}</ReactTextFormat>
           </div>
           <div className="message-data">
             <span className="message-data-name"><img src="/assets/img/Mask Group 22.png" className="face-leftIcon" /></span>
           
           </div>
         </li>
         :null
       }
       )
       }
        
        
       </ul>
     
    </div> 
  
  
  


  </div> {/* end chat */}


</div>


 {/* <CreateTicket open={open} handleOpen={handleOpen} handleClose={handleClose}  agent={agentData} />  */}
 

    </div>
 </div>
  <div className="col-md-3 noRightPadding" style={{paddingLeft: 0 }}>
  <CrmInfo />
 </div> 
 </>
 );
};

export default ChatWindowArchives;
