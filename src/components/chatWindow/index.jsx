import React, { useEffect, useState,useContext } from "react";
import { Launcher } from "react-chat-window";
import { store } from '../../store';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
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
import Emoji from "react-emoji-render";
// let props.ws = null;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  
  
  
}));




const ChatWindow = props => {
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
const [openPopup,setOpenPopup] = useState(false)
const[txt,setTxt] = useState('')
const [severity,setSeverity] = useState("success")



let emojiPicker;
if (emojiPickerState) {
  emojiPicker = (
    <Picker
      title="Pick your emoji…"
      emoji="point_up"
      color='#39BFD4' 
      onSelect={emoji => emojiFunc(messageTxt + emoji.native)}
    />
  );
}

const emojiFunc = (value)=>
{
  setMessageTxt(value)
  SetEmojiPicker(false)
}
const handleNoteTxt =(e)=>
{
  e.preventDefault();
  setCommentTxt(e.target.value)
}


const handleChatTxt= (e)=>{
  e.preventDefault();
  console.log('Handle chat',e.target.value)
  setMessageTxt(e.target.value)

const check = (e.target.value).split(' ')
console.log(check)

  console.log(e.target.value,cannedData[0].Hint)
  for(let i=0;i<cannedData.length;i++)
  {
    for(let j=0;j<check.length;j++)
    {
    if(cannedData[i].Search_Hint === (check[j]).toLowerCase() )
    {
      check[j]=cannedData[i].Response
    }
  }
      
  }
  const array = check.join(' ')
  console.log("yes",array)
 setMessageTxt(array)



}




// const addTags =(event)=>{
//   if(event.key === 'Enter'){
//     console.log('enter press here! ')
//       setTags([...tags,event.target.value])
//       SetTagValue(false)

//       const newMessage = { tags:tags,
//         customerConnectionId: props.customerData.connectionId};
//       props.ws.json({
//         action: "addTag",
//         data: JSON.stringify(newMessage)
        
//       });
//   }
//   // console.log(value)
  

// }


const triggerPicker= (event)=> {

  // // event.preventDefault();
  SetEmojiPicker(!emojiPickerState);
}







  const handleChange = event => {
    // event.preventDefault();
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
    // event.preventDefault();
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
const [openNote,setOpenNote] = useState(false)
  const [cannedData,setCannedData] = useState([])
  const token = JSON.parse(sessionStorage.userData).idToken.jwtToken

  console.log(props)
  useEffect(  () => {
  //  console.log(globalState.state.commentBox,"testnow")
   getNoteReply()
    getCannedResponses()
    },
    []
  );


  const getCannedResponses = ()=>
  {
if(sessionStorage.section === "agent")
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
        // alert("Please try again")
    })

}
if(sessionStorage.section === "supervisor")
{
  axios
    .get(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/chat-supervisor/canned-response/get-canned-response`,{
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
  
  }

  const handleClick = () => {
   

      // props.ws.json({
      //   action: "agentDisconnect",
      //   customerConnectionId: props.customerData.connectionId, 
      //   agentEmailId: props.customerData.agentEmailId,
      //   role:props.role  
      // }); 
  
      props.handleOpenPdf()
   
  };
  const getNote = ()=>
  {
    setOpenNote(true)
   
  }

  const getNoteReply = ()=>
  {
    // console.log(sessionStorage.note,"tctct")
    if(openNote === false)
    {
      setValue(1)
      setValue(0)
    }
  
  }

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
    if(messageTxt.replace(/\s/g,"") !== "")
    {
      if(props.ws)
      {

        setMessageTxt('')
        console.log(message,props)
    
        const { author, type, data: messageData,customerEmailId } = message;
        let isMe;
        console.log(props)
        if(sessionStorage.section === "agent")
        {
          const newMessage = { ...message, author: "Kalra",role:"agent",
          agentID: props.customerData.agentID,
          customerConnectionId: props.customerData.connectionId, customerEmailId: props.customerData.customerEmailId, agentEmailId: props.customerData.agentEmailId,type:"text",departmentId:props.customerData.departmentId,time: (new Date()).toISOString() };
         isMe = "Kalra" === author ? "me" : "them";
       
              dispatch({ type: 'FETCH_CHATHISTORY', payload: {
              //   [customerEmailId]:
              //  {
                  author: isMe,
                  type,
                  data: messageData,
                  customerEmailId,
                  time: (new Date()).toISOString()
                // }
               
              }
             })
            // }
                    // dispatch({ type: 'FETCH_CHATHISTORY', payload: {
                    //   author: isMe,
                    //   type,
                    //   data: messageData,
                    //   customerEmailId
                    // } })
                    
                
             
                 
                
          //     });
          //   });

          // }
         
          // dispatch({ type: 'FETCH_CHATHISTORY', payload: {
          //   author: isMe,
          //   type,
          //   data: messageData,
          //   customerEmailId
          // } })
          props.ws.json({
            action: "sendmessage",
            data: JSON.stringify(newMessage)
            
          });
        }
        if(sessionStorage.section === "supervisor")
        {
          // console.log(props.role)
            const newMessage = { ...message, author: "Kalra",role:"supervisor",
          agentID: props.customerData.agentID,
          customerConnectionId: props.customerData.connectionId, customerEmailId: props.customerData.customerEmailId, agentEmailId: props.customerData.agentEmailId,type:"text",departmentId:props.customerData.departmentId,time: (new Date()).toISOString()  };
         isMe = "Kalra" === author ? "me" : "them";
         dispatch({ type: 'FETCH_CHATHISTORY', payload: {
          author: isMe,
          type,
          data: messageData,
          customerEmailId,
          time: (new Date()).toISOString()
        } })
          props.ws.json({
            action: "sendmessage",
            data: JSON.stringify(newMessage)
            
          });
        }
      }
  else
  {
    
setOpenPopup(true)
setSeverity("error")
setTxt("Please select the customer")


  }
  
 
    }
 
  };

const addComment = (value)=>
{

setCommentTxt(value)
setOpenPopup(true)
setSeverity("success")
setTxt("Private note added successfully")

}
const commentStatus = (value)=>
{
  setValue(value);
  setComment(value)

}

  const addPrivateNote = message => {
    if(props.ws)
    {
     
     setCommentTxt('')
      console.log(message,props)
      const {privateNote } = message;
      let isMe;
      console.log(props)
      if(props.role === "agent")
      {
        console.log(props.role)
        const newMessage = { ...message,
        customerConnectionId: props.customerData.connectionId,  senderEmailId: props.customerData.agentEmailId,
        senderName: props.customerData.connectedUserName};
      
        dispatch({ type: 'FETCH_COMMENTBOX', payload: {
          author: "me",
          data: privateNote,
          time: (new Date()).toISOString() ,
          customerEmailId:props.customerData.customerEmailId
        } })
        props.ws.json({
          action: "addPrivateNote",
          data: JSON.stringify(newMessage)
          
        });
      }
    
      setOpenPopup(true)
      setSeverity("success")
      setTxt("Private note added successfully")
    
    }
    else
    {
setOpenPopup(true)
setSeverity("error")
setTxt("Please select the customer")

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


  
console.log(globalState.state.chat,props.customerData.customerEmailId,"chats")

const sendMessageFunc  = (event)=>
{
 
  SetEmojiPicker(false)
  if(event.key === 'Enter' && (!event.shiftKey)){
    event.preventDefault();
    event.stopPropagation();
    if(messageTxt.replace(/\s/g,"") !== "")
    { 
    event.preventDefault();
    event.stopPropagation();
    // const Time= 

    // console.log("Time",typeof(Time));
    onMessageWasSent({
      author:props.role,
      type:"text",
      data:messageTxt, 
      customerEmailId:props.customerData.customerEmailId
    })
  }
  else
  {
    if(event.key === 'Enter')
    {
      event.preventDefault();
      event.stopPropagation();
    }
   
    }
}
// else
// {
//   if(event.key === 'Enter' && (event.shiftKey)){
//     // event.preventDefault();
//     let newLine= messageTxt+'<br/>'
//     setMessageTxt(newLine)
//   }

// }
 
 
}
const handleClosePopup = (event, reason) => {
 
  if (reason === 'clickaway') {
    return;
  }
  setOpenPopup(false);
 
};

  return (<>
    <div className="classes.table col-md-5 col-sm-12 noPaddingLR chatWidth">
    <div className="row">

<div className="col-md-12 chatBox noPaddingR">

  <div className="row chat agent-chat">
   

<ChatHeader customerData={props.customerData} end={handleClick}  commentStatus={commentStatus}  comment={commentTxt} chatData={props.chatData} ws={props.ws} agentDetails={props.agentDetails} connectionDetails={props.connectionDetails}  getTicketList={props.getTicketList} getQueueList={props.getQueueList} getCustomerList={props.getCustomerList} />


  
 <div className="agent-emoji">{emojiPicker}
   </div>    

    <div className="chat-history" style={{height:(window.innerHeight)-380}}>
<TabPanel value={value} index={0} dir={theme.direction}>
    <ul>
 { globalState.state.chat && globalState.state.chat.length > 0 && globalState.state.chat.filter(chatData => chatData.customerEmailId === props.customerData.customerEmailId).map((item,index)=> (
           item.author === "them" ?
          <li key={item.customerEmailId+index} >
        
         <div className="message other-message float-right chatapp-sender">
           <p className="who">You, {new Intl.DateTimeFormat("en-US", {
                            hour12: true,
                            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone ,
                            hour: 'numeric',
                            minute: 'numeric'                         
                          }).format(new Date(item.time))
                        }</p>
          
           <ReactTextFormat>{ item.data}</ReactTextFormat>
         </div>
         {/* <div className="message-data align-right">
  
           <span className="message-data-name"><img src="/assets/img/Arpit-Kalra.png" className="face-rightIcon" /></span> 
         </div> */}
       </li>
       :
       <li key={item.customerEmailId+index}>
         
           <div className="message my-message float-left chatapp-receiver" style={{backgroundColor: ' #D9F0F4'}}>
             <p className="who">{props.customerData.customerName}, {new Intl.DateTimeFormat("en-US", {
                            hour12: true,
                            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone ,
                            hour: 'numeric',
                            minute: 'numeric'                         
                          }).format(new Date(item.time))
                        }</p>
             <ReactTextFormat >{item.data} </ReactTextFormat>
           </div>
           <div className="message-data">
		   {/*<span className="message-data-name"><img src="/assets/img/kareena.png" className="face-leftIcon" /></span>*/}
           
           </div>
         </li>
          
  )) }
       
      
        
        
       </ul>
      
</TabPanel>

<TabPanel value={value} index={1} dir={theme.direction}>
          <ul>
 { globalState.state.commentBox && globalState.state.commentBox.length > 0 && globalState.state.commentBox.filter(commentData => commentData.customerEmailId === props.customerData.customerEmailId).map(function(item) {
         return   <li key={item} >
        
         <div className="message other-message float-right chatapp-sender">
           <p className="who">You, {new Intl.DateTimeFormat("en-US", {
                            hour12: true,
                            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone ,
                            hour: 'numeric',
                            minute: 'numeric'                         
                          }).format(new Date(item.time))
                        }</p>
          
           <ReactTextFormat>{item.data}</ReactTextFormat>
         </div>
         {/* <div className="message-data align-right">
  
           <span className="message-data-name"><img src="/assets/img/Arpit-Kalra.png" className="face-rightIcon" /></span> 
         </div> */}
       </li>
  
          
        })
       }
      
        
        
       </ul>
       
     </TabPanel>
  
    </div> 
  
  
  
    <div className="col-md-12 chat-message clearfix">
      <div> 
         <div className="chat-message-root">
      <AppBar position="static" color="default">
        <Tabs
        className="aa-tab"
          value={value}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
          
        >
          <Tab label="Reply" {...a11yProps(0)} onClick={getNoteReply}  />
          <Tab label="private Note" {...a11yProps(1)}  onClick={getNote}/>
       
        </Tabs>
      </AppBar>
     
        <TabPanel value={value} index={0} dir={theme.direction}>
          <textarea name="message-to-send"  id="test" placeholder="Type your message"  value={messageTxt} onChange={handleChatTxt} onKeyPress={sendMessageFunc} rows={2} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction} >
        <textarea name="add-private" id="add-private" value={commentTxt} onChange={handleNoteTxt}  placeholder="Add Private note here" rows={2}  />
        </TabPanel>
     
    
        <div className="row addTag">
         <div className="col-md-6 tags">
      
      {/* {tagValue == true ?
     <span><input type="text"  id="tag-value" onKeyPress={addTags}  /></span> 
      :  
      <span className="plus" onClick={()=>SetTagValue(true)}>+ Add Tags</span>
      }  */}
{/* {tags.length > 0 && tags.map((tag)=>
{ return   <Chip size="small" label={tag} component="a"  clickable className="chip" />

})} */}
{props.customerData.departmentName ?
  <Chip size="small" label={props.customerData.departmentName} component="a"  clickable className="chip" />
:

null}
 
      {/* <Chip size="small" label="Billing" component="a" href="#chip" clickable className="chip" />
      <Chip size="small" label="Insurance" component="a" href="#chip" clickable /> */}
   
           
           </div> 
       <div className="col-md-6 aa-cht-img">
     <img src="/assets/img/download.svg" className="chatUser-chatting-img" onClick={triggerPicker} />
   <img src="/assets/img/paperclip (1).svg"  className="chatUser-chatting-img1" />
   
 {/* {value === 0 ?
   
  <button onClick={()=>{onMessageWasSent({
    author:props.role,
    type:"text",
    data:messageTxt,
    customerEmailId:props.customerData.customerEmailId
  })} }  className="chatUser-chatting-btn">Send</button>
:
<button onClick={()=>{addPrivateNote({
  privateNote:commentTxt
})}}  className="chatUser-chatting-btn">Save</button>
    } */}
 {value === 0 ?
   
   <img src= {messageTxt ==="" ? "assets/img/send-inactive.svg" : "assets/img/send-active.svg"}  onClick={()=>{onMessageWasSent({
     author:props.role,
     type:"text",
     data:messageTxt,
     customerEmailId:props.customerData.customerEmailId
   })} } className="chatUser-chatting-img2"/>
 :
 <img src= {commentTxt ==="" ? "assets/img/send-inactive.svg" : "assets/img/send-active.svg"}   onClick={()=>{addPrivateNote({
   privateNote:commentTxt
 })}}  className="chatUser-chatting-img2"/>
     }
      
      </div>
      </div>

    </div>
    


    </div>
    
  
     
    
    </div> {/* end chat-message */}
  </div> {/* end chat */}


</div>


 {/* <CreateTicket open={open} handleOpen={handleOpen} handleClose={handleClose}  agent={agentData} />  */}
 

    </div>
 </div>
  <div className="col-md-3 noRightPadding rightbar" style={{paddingLeft: 0 }}>
  <CrmInfo />
  <NotificationContainer/>
 </div> 
 <Snackbar open={openPopup} autoHideDuration={3000} onClose={handleClosePopup}>
       <Alert onClose={handleClosePopup} severity={severity}>
        {txt}
       </Alert>
     </Snackbar> 
 </>
 );
};

export default ChatWindow;
