
import React, { useState, useEffect, useContext } from 'react'
// import { Icon, Menu } from 'semantic-ui-react';
// import './assets/css/style.css';
import {lighten, makeStyles, withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import { store } from '../../store'
import ChatWindow from '../chatWindow'
import ChatWindowArchives from '../chatWindowArchives'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import NotFound from '../notFound'
import Reports from '../Reports'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import axios from 'axios'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
// import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
// import ListAltIcon from '@material-ui/icons/ListAlt'
import SearchIcon from '@material-ui/icons/Search'
// import FaceIcon from '@material-ui/icons/Face'
import base64 from 'base-64'
import utf8 from 'utf8'
// import PropTypes from 'prop-types'
import Sockette from 'sockette'
import CreateTkt from '../CreateTkt'
// import CreateTicket from '../createTicket'
import EnhancedTable from '../Table/index'
import PdfPreview from '../pdfPreview'
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';
// import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
let ws = null


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles(theme => ({
  root: {      
    // padding: '0px 2px',
    display: 'flex',
    alignItems: 'center',
    width: '90%',  
    padding: '5px',
    margin: "0 0 0 15px",
    // height: "auto",
    // borderRadius: "0px",
    border: "solid 0.5px rgba(112, 112, 112, 0.41)",
    boxShadow:"none !important",

  },
    rootInput: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      paddingTop:0,
      paddingLeft:'15px',
      fontFamily: "ProximaNova",
      marginTop:"12px"
    },
    searchInput: {
      width: "100%",
      height: "auto",
      fontSize: "12px",
      fontWeight: "normal",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "1",
      letterSpacing: "normal",
      textAlign: "left",
      color: "#606060",
      padding: "5px 0 0 10px",
      fontFamily: "ProximaNova",
    },
    iconButton: {
      width: "28.1px",
      height: "28.9px",
      objectFit: "contain",
      padding: 0
    },
    // pathButton: {
    //   width: "20.1px",
    //   height: "5.9px",
    //   backgroundColor: "#172b4d"
    // },
    divider: {
      height: 28,
      margin: 4,
    },
    myTickets: {
      width: "117px",
      height: "29px",
      fontFamily: "ProximaNova",
      fontSize: "24px",
      fontWeight: "bold",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "1.38",
      letterSpacing: "normal",
      textAlign: "left",
      color: "#1d1d1d",
    },
    listItemText: {
      width: "192px",
      height: "27px",
      fontFamily: "ProximaNova",
      fontSize: "22px",
      fontWeight: "600",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "0.95",
      letterSpacing: "normal",
      textAlign: "left",
      color: "#1d1d1d",
    },
    currentBadge: {
      opacity: 0.9,
      width: "39px",
      height: "25px",
      backgroundColor: "#e6f3f4",
      borderRadius: "18px",
      fontSize: "15px",
      fontWeight: "600",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "0.95",
      letterSpacing: "normal",
      textAlign: "left",
      color: "#009ce8",
      padding: "7px 0px 0 10px",
      fontFamily: "ProximaNova",
    },
    selectCurrentBadge: {
      opacity: 1,
      backgroundColor: "rgba(255, 255, 255, 0.16)",
      borderRadius: "18px",
      fontSize: "15px",
      fontWeight: "600",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "1.9",
      letterSpacing: "normal",
      textAlign: "left",
      padding: "0px 0 0 10px",
      color: "#ffffff",
	  width: "39px",
	  height: "25px",
      fontFamily: "ProximaNova",
	  
    },
    drawerItem: {
      fontSize: "14px",
      fontWeight: "600",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "1.9",
      letterSpacing: "normal",
      textAlign: "left",
      color: "#1d1d1d",
      backgroundColor: "#ffffff",
      fontFamily: "ProximaNova",
      
    },
    drawerItemSelected: {
      fontSize: "14px",
      fontWeight: "600",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "1.9",
      letterSpacing: "normal",
      textAlign: "left",
      backgroundColor: "#009ce8",
      color: "#ffffff",
      fontFamily: "ProximaNova",
      "&:hover": {
        backgroundColor: "#009ce8",
        color: "#ffffff",
        fontFamily: "ProximaNova",
      }       
    },
    table: {
      padding: 0
    },
    sideBadge: {
      width: "17px",
      height: "19px",
      fontFamily: "ProximaNova",
      fontSize: "15px",
      fontWeight: "600",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "1.4",
      letterSpacing: "normal",
      textAlign: "left",
      color: "#ffffff",
      fontFamily: "ProximaNova",
    },
    createTicket: {
      // fontFamily: "'Open Sans', sans-serif",
      backgroundColor: "#ffffff",
      color: "#009ce8",
      borderStyle: "solid",
      borderColor: "#009ce8",
      borderRadius: "0px",
      width: "120px",
      height: "auto",
      marginTop: "69px",
      marginLeft: "12px",
      position: "relative",
      fontSize: "12px",
      fontWeight: "bold",
      fontStretch: "normal",
      fontStyle: "bold",
      lineHeight: "1.38",
      letterSpacing: "normal",
      textAlign: "left",
      alignContent: "left",
      fontFamily: "ProximaNova",
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
    }
  }));

export default function SideSubMenu (props){
const classes = useStyles();
const globalState = useContext(store);
const { dispatch } = globalState;

const [window,setWindow] = useState(false)
const [userDetails,setUser] = useState({});
const [messageList, setMessageList] = useState([]);
const token = JSON.parse(sessionStorage.userData).idToken.jwtToken
const username = JSON.parse(sessionStorage.userData).accessToken.payload.username
const agentEmail = JSON.parse(sessionStorage.userData).idToken.payload.email
// const agentID = JSON.parse(sessionStorage.userData).idToken.payload.cognito:username

const [openPdf, setOpenPdf] = useState(false);
const [blink,setBlink]=useState(false)
const [blinkEmailId,setBlinkEmailId] = useState('')
const [customerProfile,setCustomerProfile] = useState({})
const [chatDetails,setChatDetails] = useState({})
const [connectionID,setConnectionId] = useState("")
const [agentData,setAgentDetails] = useState({})
const [ticketList, setTicketList] = useState([])
const [statusClicked, setStatusClicked] = useState(false)
const [ticketStatus, setTicketStatus] = useState("")
const [ticketCount, setTicketCount] = useState([])
const [value, setValue] = useState(0);
const [open, setOpen] = useState(false);
const [id, setId] = React.useState("");
const [search, setSearch] = React.useState("");
const [searchStatus, setSearchStatus] = React.useState(false);
const [expanded, setExpanded] = React.useState(false);
const [openPopup,setOpenPopup] = useState(false)
const[txt,setTxt] = useState('')
const [severity,setSeverity] = useState("success")
const [selectedChat,setSelectedChat]  = useState('')
const [convoData,setConvoData] = useState({})
const [commentTxt,setCommentTxt] = useState('')

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [Queueexpanded, setQueueExpanded] = React.useState(false);

  const handleQueueExpandClick = () => {
    setQueueExpanded(!Queueexpanded);
  };


useEffect(()=>{

 console.log(sessionStorage.agentDetails,"departId")
 if(token)
    { 
      setInterval(()=>{
      
      props.getCustomerList(sessionStorage.agentDetails)
      props.getQueueList(sessionStorage.agentDetails)
    },100000)
    setTimeout(()=>
    {
      getTicketList(sessionStorage.agentDetails)
    },5000)
    
}

  
 

},[])


const getConversationDetails = (value)=>
{
  if(sessionStorage.section === "supervisor")
  {
    const json ={
      "ConnectionId":value
      }
        axios
        .post(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/transfer-chat/get-conversation-details`,json,{
          headers: { "Authorization":token   }})
        .then(response => {
            // dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
            if(response.data.data.Conversation_details[0].Msg_Details && response.data.data.Conversation_details[0].Msg_Details.length >0 )
            {
           
              response.data.data.Conversation_details[0].Msg_Details.forEach(item => 
               dispatch({ type: 'FETCH_CHATHISTORY', payload: {
                author: value === item.senderId  ? "me" : "them" ,
                type:item.type,
                data: item.text,
                customerEmailId:response.data.data.Conversation_details[0].Customer_EmailId,
                time:item.sendTime
               } })   );
            //  console.log(globalState.state.commentBox, "stringfy")
            
            }
           
         
        })
        .catch(error => {
            dispatch({ type: 'FETCH_ERROR',payload: error })
            console.log(globalState.state.post,"validateUser");
            // history.push("createUser")
            alert("Please try again")
        })
  }
  if(sessionStorage.section === "agent")
  {
    const json ={
      "ConnectionId":value
      }
        axios
        .post(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/transfer-chat/get-conversation-details`,json,{
          headers: { "Authorization":token   }})
        .then(response => {
            // dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
            if(response.data.data.Conversation_details[0].Msg_Details && response.data.data.Conversation_details[0].Msg_Details.length >0 )
            {
           
              response.data.data.Conversation_details[0].Msg_Details.forEach(item => 
               dispatch({ type: 'FETCH_CHATHISTORY', payload: {
                author: value === item.senderId  ? "me" : "them" ,
                type:item.type,
                data: item.text,
                customerEmailId:response.data.data.Conversation_details[0].Customer_EmailId,
                time:item.sendTime
               } })   );
            //  console.log(globalState.state.commentBox, "stringfy")
            
            }
           
         
        })
        .catch(error => {
            dispatch({ type: 'FETCH_ERROR',payload: error })
            console.log(globalState.state.post,"validateUser");
            // history.push("createUser")
            alert("Please try again")
        })
  }

}
// ticketList.filter(list => {
//   setSA( list.CustomerName.toLowerCase().includes(search.toLowerCase()) )
// })

const getTicketList = (value) =>
{
  const json ={
    "DepartmentId": value,
    "AssignedTo": agentEmail
  }
  if(sessionStorage.section === "agent" )
  {
    axios
    .post(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/ticket/get-ticket-list`,json,{
    headers: { "Authorization":token   }})
  .then(response => {
      
       setTicketList(response.data.data.MainData)
       setTicketCount(response.data.data)
     
  })
  .catch(error => {
      dispatch({ type: 'FETCH_ERROR',payload: error })
      console.log(globalState.state.post,"validateUser");
      // history.push("createUser")
      // alert("Please try again")
  })
}
  if(sessionStorage.section === "supervisor" )
  {
    axios
    .post(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/ticket/get-department-ticket-list`,json,{
    headers: { "Authorization":token   }})
  .then(response => {
      
       setTicketList(response.data.data.MainData)
       setTicketCount(response.data.data)
     
  })
  .catch(error => {
      dispatch({ type: 'FETCH_ERROR',payload: error })
      console.log(globalState.state.post,"validateUser");
      // history.push("createUser")
      // alert("Please try again")
  })
  
  

  }
 
}


const searchArray = ticketList.filter(list => {
  return list.CustomerName.toLowerCase().includes(search.toLowerCase())
})


const handleSearch = (event) =>{
  setSearchStatus(true)
  setSearch(event.target.value)
}
const handleOpen = () => {
  getTicketId()
  setOpen(true);
};
const handleClose = () => {
  setOpen(false);
}; 
const openWindow = (value)=>
{ 
   setUser(value)
   console.log(value)
  //  getConversationDetails(value)
}
const handleOpenPdf = () => {
  // ws.json({
  //   action: "enablePostChatSurvey",
  //   customerConnectionId: connectionID, 
  // })
  
  setOpenPdf(true);
};
const handleClosePdf = () => {
  setOpenPdf(false);
};
const getStatusBasedTicket = (event) => {
  event.preventDefault()
  // setDetailPage(false)
  sessionStorage.setItem("detailPage",false)
  setTicketStatus(event.currentTarget.id)
  console.log("inside API: ", ticketStatus)
  const json ={
    "DepartmentId":sessionStorage.agentDetails,
    "TicketStatus": event.currentTarget.id
  }
  if(sessionStorage.section === "agent")
  {
    axios
    .post(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/ticket/get-ticket-based-on-status`,json,{
      headers: { "Authorization":token  }})
    .then(response => {
        setTicketList(response.data.data.MainData)
        setStatusClicked(true)
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
    .post(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/ticket/get-ticket-based-on-status`,json,{
      headers: { "Authorization":token  }})
    .then(response => {
        setTicketList(response.data.data.MainData)
        setStatusClicked(true)
    })
    .catch(error => {
      dispatch({ type: 'FETCH_ERROR',payload: error })
      console.log(globalState.state.post,"validateUser");
      // history.push("createUser")
      // alert("Please try again")
  })

  }

}
const handleClosePopup = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpenPopup(false);
 
};
  const getTicketCount = (value) => {
    if (sessionStorage.section === "agent") {

      const json = {
        "DepartmentId": value,
        "AssignedTo": agentEmail
      }
      axios
        .post(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/ticket/get-ticket-list`, json, {
          headers: { "Authorization": token }
        })
        .then(response => {
          setTicketCount(response.data.data)
        })
    }

  }

const getTicketId = () =>
{
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
 
}

const filterList = (e)=>
{


  // const test = props.customerList.filter(team => {
  //   return team.includes(e.target.value.toLowerCase());
  // });
  // console.log("test: ", test);

}


const getSideMenu = (menu,status)=>
    {
       if(status === true)
       {
        switch (menu) {
          case 'Tickets': 
        // start
            return   <div className="col-md-4 sideSubMenuWidth"> 
            <nav className = 'subbar'  fixed="left">
            <div className="row" style={{padding: '13px 0 16px 0'}}>
    
            <div className="col-md-7">
            <p className="sideTxt"   onClick={event => setTicketStatus(event.currentTarget.id)} >My Tickets</p> 
            </div>
            <div className="col-md-5 ">
             
            <button  
                // variant="outlined" 
               onClick={handleOpen}
               
             
               // disableFocusRipple
               // disableRipple
             
          
              className="btn-cstm"
              >
              Create Ticket
            </button>
            <CreateTkt ticketStatus={ticketStatus} id={id} open={open} handleOpen={handleOpen} handleClose={handleClose} agentDetails={props.agentDetails} getTicketList={getTicketList} />
        </div>
  
        </div>
    
            <div className="row">
    
            <div className="col-md-12 sideInput">
            <Paper component="form" className={classes.root}>
    
      <InputBase
        className={classes.searchInput}
        placeholder="Search Tickets"
        inputProps={{ 'aria-label': 'Search Tickets' }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
      <SearchIcon />
      </IconButton>
    
    </Paper>
            </div>
            </div>
    
         
            <div className="row TopSpace">
              <div className="col-md-12">
                <List className={classes.rootInput}>
                  <ListItem
                    disableRipple 
                    onClick={()=>{setValue(0)}}
                     
                    className={value===0? classes.drawerItemSelected : classes.drawerItem}  
                    // selected={value === 0} 
                    role={undefined} 
                    divider button 
                  >
                    <ListItemText
                    disableTypography
                     
                    id="Open" 
                    onClick={getStatusBasedTicket}   
                    primary={`Open`} />
                    <ListItemSecondaryAction > 
                      <IconButton edge="end" aria-label="comments">
                        <div className={value===0? classes.selectCurrentBadge : classes.currentBadge} >
                          {ticketCount.OpenTickets}
                        </div>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem
                    disableRipple
                    
                    className={value===1? classes.drawerItemSelected : classes.drawerItem}  
                    onClick={()=>{ setValue(1)}} 
                    role={undefined} 
                    divider button 
                  >
                    <ListItemText
                      disableTypography
                       
                      id="In-Progress" 
                      onClick={getStatusBasedTicket} 
                      primary={`In-Progress`} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="comments">
                        <div className={value===1? classes.selectCurrentBadge : classes.currentBadge}>{ticketCount.InProgressTickets}</div>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem 
                    disableRipple
                    
                    className={value===2?  classes.drawerItemSelected : classes.drawerItem} 
                    // selected={value === 2} 
                    onClick={()=>{ setValue(2)}}
                    // className="side-li"  
                    role={undefined} 
                    divider button 
                  >
                    <ListItemText
                    disableTypography
                    
                    id="Pending" onClick={getStatusBasedTicket} 
                    primary={`Pending`} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="comments">
                      <div className={value===2? classes.selectCurrentBadge : classes.currentBadge}>{ticketCount.PendingTickets}</div>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem
                    disableRipple 
                    className={value===3?  classes.drawerItemSelected : classes.drawerItem} 
                    // selected={value === 3} 
                    onClick={()=>{ setValue(3)}}
                    // className="side-li"  
                    role={undefined}  
                    divider button 
                  >
                    <ListItemText
                    disableTypography
                     
                    id="Closed" onClick={getStatusBasedTicket} 
                    primary={`Closed`} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="comments">
                      <div className={value===3? classes.selectCurrentBadge : classes.currentBadge}>{ticketCount.ClosedTickets}</div>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem 
                    disableRipple
                    className={value===4? classes.drawerItemSelected : classes.drawerItem} 
                    // selected={value === 4} 
                    onClick={()=>{ setValue(4)}}
                    // className="side-li"  
                    role={undefined} 
                    divider button 
                  >
                    <ListItemText 
                    disableTypography
                    
                    id="Spam" onClick={getStatusBasedTicket} 
                    primary={`Spam`} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="comments">
                      <div className={value===4? classes.selectCurrentBadge : classes.currentBadge}>{ticketCount.SpamTickets}</div>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem
                    disableRipple
                    className={value===5?  classes.drawerItemSelected : classes.drawerItem} 
                    // selected={value === 5} 
                    onClick={()=>{ setValue(5)}}   
                    // className="side-li"  
                    role={undefined} 
                    divider button 
                  >
                    <ListItemText 
                    disableTypography
                    
                    id="Resolve" onClick={getStatusBasedTicket} 
                    primary={`Resolve`} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="comments">
                      <div className={value===5? classes.selectCurrentBadge : classes.currentBadge}>{ticketCount.Resolvetickets}</div>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </div>
            </div>
       
    
        </nav>
      </div>
       
        // end
      //     case 'Agents':
      //       return     <div className="col-md-4"> 
      //        <nav className = 'subbar'  fixed="left">
      //       <div className="row">
   
      //       <div className="col-md-7 ">
      //      <p className="sideTxt">Agents</p> 
      //       </div>
      //       <div className="col-md-5">
      //       <button className="btn-cstm">
      //   Add Agents
      // </button>
      //       </div>
      //       <div className="col-md-6 col-sm-12">
      //         {/* <Button
      //           onClick={handleOpen} 
      //           className="btn-cstm"
      //           disableFocusRipple
      //           disableRipple
      //           size="small"
      //           variant="outlined" 
      //           id="CreateTicket" 
      //         >
      //           Create Ticket
      //         </Button>  */}
            
      //       </div>
      //     </div><br/>
      //     <span/><span/>
      //     <div className="row">
      //       <div className="col-md-12 sideInput">
      //         <Paper component="form" className={classes.root}>
      //           <InputBase
      //             value={search}
      //             onChange={event => handleSearch(event)}
      //             className={classes.inputSearch}
      //             placeholder="Search by customer name"
      //             inputProps={{ 'aria-label': 'Search by customer name, activity' }}
      //           />
      //           <IconButton type="submit" className={classes.iconButton} aria-label="search">
      //             <SearchIcon />
      //           </IconButton>
      //           <Divider className={classes.divider} orientation="vertical" />
      //           <IconButton color="primary" className={classes.pathButton} aria-label="directions">
      //             <img src="/assets/img/Group 188.svg" />
      //           </IconButton>
      //         </Paper>
      //       </div>
      //     </div>
      //     <div className="row">
      //       <div className="col-md-12">
      //         <List className={classes.rootInput}>
      //           <ListItem
      //             disableRipple 
      //             onClick={()=>{setValue(0)}}
      //             className={value===0? classes.drawerItemSelected : classes.drawerItem}  
      //             // selected={value === 0} 
      //             role={undefined} 
      //             divider button 
      //           >
      //             <ListItemText 
      //             id="Open" onClick={getStatusBasedTicket }   
      //             primary={`Open`} />
      //             <ListItemSecondaryAction > 
      //               <IconButton edge="end" aria-label="comments">
      //                 <div className="currentBadge">{ticketCount.OpenTickets}</div>
      //               </IconButton>
      //             </ListItemSecondaryAction>
      //           </ListItem>
      //           <ListItem
      //             disableRipple
      //             className={value===1? classes.drawerItemSelected : classes.drawerItem} 
      //             // selected={value === 1} 
      //             onClick={()=>{ setValue(1)}} 
      //             // className="side-li"  
      //             role={undefined} 
      //             divider button 
      //           >
      //             {/* <ListItemText className="side-liTxt"  primary={`In-Progress Tickets`} /> */}
      //             <ListItemText id="In-Progress" onClick={getStatusBasedTicket} 
      //               primary={`Inprogress`} />
      //             <ListItemSecondaryAction>
      //               <IconButton edge="end" aria-label="comments">
      //                 <div className="currentBadge">{ticketCount.InProgressTickets}</div>
      //               </IconButton>
      //             </ListItemSecondaryAction>
      //           </ListItem>
      //           <ListItem 
      //             disableRipple
      //             className={value===2?  classes.drawerItemSelected : classes.drawerItem} 
      //             // selected={value === 2} 
      //             onClick={()=>{ setValue(2)}}
      //             // className="side-li"  
      //             role={undefined} 
      //             divider button 
      //           >
      //             <ListItemText 
      //             id="Pending" onClick={getStatusBasedTicket} 
                  
      //               primary={`Pending`} />
      //             <ListItemSecondaryAction>
      //               <IconButton edge="end" aria-label="comments">
      //               <div className="currentBadge">{ticketCount.PendingTickets}</div>
      //               </IconButton>
      //             </ListItemSecondaryAction>
      //           </ListItem>
      //           <ListItem
      //             disableRipple 
      //             className={value===3?  classes.drawerItemSelected : classes.drawerItem} 
      //             // selected={value === 3} 
      //             onClick={()=>{ setValue(3)}}
      //             // className="side-li"  
      //             role={undefined} 
      //             divider button 
      //           >
      //             <ListItemText 
      //             id="Closed" onClick={getStatusBasedTicket} 
                    
      //             primary={`Closed`} />
      //             <ListItemSecondaryAction>
      //               <IconButton edge="end" aria-label="comments">
      //               <div className="currentBadge">{ticketCount.ClosedTickets}</div>
      //               </IconButton>
      //             </ListItemSecondaryAction>
      //           </ListItem>
      //           <ListItem 
      //             disableRipple
      //             className={value===4? classes.drawerItemSelected : classes.drawerItem} 
      //             // selected={value === 4} 
      //             onClick={()=>{ setValue(4)}}
      //             // className="side-li"  
      //             role={undefined} 
      //             divider button 
      //           >
      //             <ListItemText 
      //             id="Spam" onClick={getStatusBasedTicket} 
                    
      //             primary={`Spam`} />
      //             <ListItemSecondaryAction>
      //               <IconButton edge="end" aria-label="comments">
      //               <div className="currentBadge">{ticketCount.SpamTickets}</div>
      //               </IconButton>
      //             </ListItemSecondaryAction>
      //           </ListItem>
      //           <ListItem
      //             disableRipple
      //             className={value===5?  classes.drawerItemSelected : classes.drawerItem} 
      //             // selected={value === 5} 
      //             onClick={()=>{ setValue(5)}}   
      //             // className="side-li"  
      //             role={undefined} 
      //             divider button 
      //           >
      //             <ListItemText 
      //             id="Resolve" onClick={getStatusBasedTicket} 
                    
      //             primary={`Resolve`} />
      //             <ListItemSecondaryAction>
      //               <IconButton edge="end" aria-label="comments">
      //               <div className="currentBadge">{ticketCount.Resolvetickets}</div>
      //               </IconButton>
      //             </ListItemSecondaryAction>
      //           </ListItem>
      //         </List>
      //       </div>
      //     </div>
      //  </nav>
      //  </div>
  
  case 'Chats':
        return  <div className="col-md-4 sideSubMenuWidth"> 
        <nav className = 'subbar'  fixed="left">
        <div className="row" style={{padding: '13px 0 16px 0'}}>

        <div className="col-md-8">
        <p className="sideTxt">Chats</p> 
        </div>
        <div className="col-md-2 sideBtn">
        
{/* <PersonOutlineIcon style={{ color: " #000",marginLeft: "20%" }} /> */}
<img src="/assets/img/Customer Chat Active.svg" style={{ color: " #000",marginLeft: "20%",width:'60%' }} className="imgsize" />
<p className="sidesubP selectedColor">Customer</p>
    </div>

    <div className="col-md-2 sideBtn">
{/* <FaceIcon  /> */}
<img src="/assets/img/Peer Chat Inactive.svg" style={{ color: " #000",marginLeft: "18%" }} className="imgsize"  />
<p className="sidesubP">Peers</p>
    </div>
    </div>

        <div className="row">

        <div className="col-md-12 sideInput">
        <Paper component="form" className={classes.root}>

  <InputBase
    className={classes.searchInput}
    placeholder="Search Chats"
    inputProps={{ 'aria-label': 'Search Chats' }}
    onChange={filterList}
  />
  <IconButton type="submit" className={classes.iconButton} aria-label="search">
  <SearchIcon />
  </IconButton>

</Paper>
        </div>
        </div>

        <div className="row TopSpace">

<div className="col-md-6">
<p className="currentTxt">Current Chats


</p>
  </div>
  <div className="col-md-6" >
  <ListItemSecondaryAction onClick={()=>props.getCustomerList(sessionStorage.agentDetails)}>
            <IconButton edge="end" aria-label="comments">
            <div style={{
                      width: '39px',
                      height: '25px',
                      borderRadius: '18px',
                     backgroundColor:  '#009ce8',
                  
                     fontFamily:'ProximaNova',
                     fontSize: '15px',
                     color: 'white', 
                     
                     padding : '1%'


                     

              }}><span style={{float:'left', marginLeft:'11%', marginTop:'1%', fontFamily:'ProximaNovaThin'}}> {props.customerList && props.customerList.length} </span> <span><ArrowDropDownIcon
              
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"  
              
              /></span>
              </div>
              
              
    
              
            </IconButton>
          </ListItemSecondaryAction>
</div>
  </div>
  <Collapse in={expanded} timeout="auto" unmountOnExit>
 
        <div className="row">

        <div className={props.customerList && props.customerList.length >0 ? "col-md-12 chats-div" : "col-md-12"}>
        <List className={classes.rootInput}>
  {props.customerList && props.customerList.length > 0 &&  props.customerList.map(value => {
    const labelId = `checkbox-list-label-${value}`;

    return (
           
      <ListItem className={selectedChat === value.ConversationId ? "side-li blink white" : blink === true && blinkEmailId === value.customerEmailId ? "side-li blink white":"side-li"} key={value} role={undefined} dense button  onClick={()=>startConnection(value,value.ConversationId)} id="customer-id">
          <span ><img src="/assets/img/deepika.png" className="face-rightIcon" /></span> 

    <span className={selectedChat === value.ConversationId ? "side-liTxt white" : blink === true && blinkEmailId === value.customerEmailId ? "side-liTxt white":"side-liTxt"} id={labelId}  >{value.customerName}</span>
      <span className={blink === true && blinkEmailId === value.customerEmailId ? "time-txt white":"time-txt"}>
      {
                        new Intl.DateTimeFormat("en-US", {
                          hour12: true ,
                          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone ,
                          hour: 'numeric',
                          minute: 'numeric'                            
                        }).format(new Date(value.TS_Updated))
                      }

      </span>
        
      </ListItem>
    );
  })}
  {props.customerList.length <= 0 ?
    <ListItem className="side-li"  dense button  >
   
 
<span className="side-liTxt" >No Chats Available</span>

  
</ListItem>
:
null
}
</List>
        </div>
        

        </div>
</Collapse>

        <div className="row TopSpace">

<div className="col-md-6">
<p className="currentTxt">Queued Chats

</p>
  </div>
  <div className="col-md-6">
  <ListItemSecondaryAction onClick={()=>props.getQueueList(sessionStorage.agentDetails)}>
            <IconButton edge="end" aria-label="comments">
              <div style={{
                     width: '39px',
                     height: '25px',
                     borderRadius: '18px',
                    backgroundColor:  '#009ce8',
                 
                    fontFamily:'ProximaNova',
                    fontSize: '15px',
                    color: 'white', 
                    
                    padding : '1%'

                     

              }}><span style={{float:'left', marginLeft:'11%', marginTop:'1%', fontFamily:'ProximaNovaThin'}}> {props.queueList &&  props.queueList.length}</span>
              
              <span ><ArrowDropDownIcon
              className={clsx(classes.expand, {
                [classes.expandOpen]: Queueexpanded,
              })}
              onClick={handleQueueExpandClick}
              aria-expanded={Queueexpanded}
              aria-label="show more"
              
              
              /></span>
              </div>
            </IconButton>
          </ListItemSecondaryAction>
</div>
  </div>

  <Collapse in={Queueexpanded} timeout="auto" unmountOnExit>
  <div className="row">

<div className={props.queueList && props.queueList.length >0 ? "col-md-12 chats-div" : "col-md-12"}>
<List className={classes.rootInput}>
{props.queueList && props.queueList.length >0 && props.queueList.map(value => {
const labelId = `checkbox-list-label-${value}`;

return (
  <ListItem className={blink === true && blinkEmailId === value.customerEmailId ? "side-li blink white":"side-li"} key={value} role={undefined} dense button  onClick={()=>startQueuedConnection(value)}>
          <span ><img src="/assets/img/Mask Group 22.png" className="face-rightIcon" /></span> 
        {/* <ListItemText className={blink === true ? "side-liTxt white":"side-liTxt"} id={labelId} primary={value.customerName} onClick={()=>startConnection(value)}    /> */}
    <span className={blink === true && blinkEmailId === value.customerEmailId ? "side-liTxt white":"side-liTxt"} id={labelId}  >{value.customerName}</span>
      <span className={blink === true && blinkEmailId === value.customerEmailId ? "time-txt white":"time-txt"}>  {
                        new Intl.DateTimeFormat("en-US", {
                          hour12: true ,
                          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone ,
                          hour: 'numeric',
                          minute: 'numeric'                            
                        }).format(new Date(value.TS_Updated))
                      }
</span>
        
      </ListItem>
);
})}
  {props.queueList.length <= 0 ?
    <ListItem className="side-li"  dense button  >
   
 
<span className="side-liTxt" >No Queued Chats Available</span>

  
</ListItem>
:
null
}
</List>
</div>


</div>
</Collapse>

    </nav>
  </div>
//      case 'Archives':
//       return  <div className="col-md-4 sideSubMenuWidth"> 
//       <nav className = 'subbar'  fixed="left">
//       <div className="row">

//       <div className="col-md-12">
//       <p className="sideTxt">Archives</p> 
//       </div>
    
//   </div>

//       <div className="row">

//       <div className="col-md-12 sideInput">
//       <Paper component="form" className={classes.root}>

// <InputBase
//   className={classes.searchInput}
//   placeholder="Search Chats"
//   inputProps={{ 'aria-label': 'Search Chats' }}
// />
// <IconButton type="submit" className={classes.iconButton} aria-label="search">
// <SearchIcon />
// </IconButton>

// </Paper>
//       </div>
//       </div>

   

//       <div className="row TopSpace">

//       <div className="col-md-12">
//       <List className={classes.rootInput}>
// {props.customerList && props.customerList.length > 0 &&  props.customerList.map(value => {
//   const labelId = `checkbox-list-label-${value}`;

//   return (
//     <ListItem className={blink === true && blinkEmailId === value.customerEmailId ? "side-li blink white":"side-li"} key={value} role={undefined} dense button  onClick={()=>startConnection(value)}>
//         <span ><img src="/assets/img/Mask Group 22.png" className="face-rightIcon" /></span> 
//       {/* <ListItemText className={blink === true ? "side-liTxt white":"side-liTxt"} id={labelId} primary={value.customerName} onClick={()=>startConnection(value)}    /> */}
//   <span className={blink === true && blinkEmailId === value.customerEmailId ? "side-liTxt white":"side-liTxt"} id={labelId}  >{value.customerName}</span>
//     <span className={blink === true && blinkEmailId === value.customerEmailId ? "time-txt white":"time-txt"}>10:02 AM</span>
      
//     </ListItem>
//   );
// })}
// {props.customerList.length <= 0 ?
//   <ListItem className="side-li"  dense button  >
 

// <span className="side-liTxt" >No Chats Available</span>


// </ListItem>
// :
// null
// }
// </List>
//       </div>
      

//       </div>



//   </nav>
// </div>
 
    default:
        return null;
        }
      }
    
}
const onMessageReceied = ({ data }) => {

if(JSON.parse(data))
{
  if(JSON.parse(data).message == "Internal server error")
    {
      console.log(data)
    }
    else if(JSON.parse(data).action == "message")
    {
      console.log(globalState.state.chat)
      console.log(JSON.parse(data).message)
      const { author, type, data: messageData,customerEmailId,time } = JSON.parse(data).message;
      const isMe = "Kalra" === author ? "me" : "them";
      
      console.log(messageList,messageData)
      // for(let c=0;c<globalState.state.chat.length;c++)
      // {
      //   if(globalState.state.chat[c][ ] === customerEmailId)
      //   {

      //   }
      // }
  
      dispatch({ type: 'FETCH_CHATHISTORY', payload: {
        author: isMe,
        type,
        data: messageData,
        customerEmailId,
        time
      } })
      setBlinkEmailId(customerEmailId)
      setBlink(true)
      setTimeout(()=>{
        setBlink(false)
      },1800)
  
    }
    else if(JSON.parse(data).action == "customerEndsChat")
    {
      props.getCustomerList(sessionStorage.agentDetails)
setOpenPopup(true)
setSeverity("error")
setTxt(JSON.parse(data).text)
    }
    else if(JSON.parse(data).action == "chatIdle")
    {

//     setOpenPopup(true)
// setSeverity("warning")
// setTxt(JSON.parse(data).text)
console.log(JSON.parse(data).text)
    }
    else if(JSON.parse(JSON.parse(data).body).action === "assignAgent")
    {
      
      setConnectionId(JSON.parse(JSON.parse(data).body).connectionId)
      
    }
    else if(JSON.parse(JSON.parse(data).body).action === "agentDetails")
    {
      console.log(JSON.parse(JSON.parse(data).body))
setAgentDetails(JSON.parse(JSON.parse(data).body).details)
console.log(userDetails)
ws.json({
  action: "connectionDetails",
  connectionId:JSON.parse(sessionStorage.customer).connectionId,
}); 
    }
    else if(JSON.parse(JSON.parse(data).body).action === "agentDisconnect")
    {
      console.log(JSON.parse(JSON.parse(data).body))
      setChatDetails(JSON.parse(JSON.parse(data).body).conversationDetails)
// getConversationDetails(JSON.parse(JSON.parse(data).body).details.connectionId)
    }
    else if(JSON.parse(JSON.parse(data).body).action === "supervisorDisconnect")
    {
      console.log(JSON.parse(JSON.parse(data).body))
      setChatDetails(JSON.parse(JSON.parse(data).body).conversationDetails)
// getConversationDetails(JSON.parse(JSON.parse(data).body).details.connectionId)
    }
    else if(JSON.parse(JSON.parse(data).body).action === "connectionDetails")
    {
      console.log(JSON.parse(JSON.parse(data).body).connectionDetails)
    //  if(JSON.parse(JSON.parse(data).body).connectionDetails.connectionStatus === false)
    //  {
    //   if(JSON.parse(JSON.parse(data).body).connectionDetails.privateNote && JSON.parse(JSON.parse(data).body).connectionDetails.privateNote.length >0 )
    //   {
     
    //    JSON.parse(JSON.parse(data).body).connectionDetails.privateNote.forEach(item => 
    //     dispatch({ type: 'FETCH_COMMENTBOX', payload: {
    //        author: "me",
    //        data: item.notes,
    //        time: (new Date()).toISOString() ,
    //        customerEmailId:JSON.parse(JSON.parse(data).body).connectionDetails.customerEmailId
    //      } })   );
    //    console.log(globalState.state.commentBox, "stringfy")
      
    //   }
    //  }
   
  
      
      setCustomerProfile(JSON.parse(JSON.parse(data).body).connectionDetails)
      console.log(JSON.parse(JSON.parse(data).body).connectionDetails.Msg_Details,"msgSaved")
      if(JSON.parse(JSON.parse(data).body).connectionDetails.msgSaved === true)
      {
        if(sessionStorage.section === "agent")
        {
          
            // console.log(user,"userD")
            for(let m=0;m<JSON.parse(JSON.parse(data).body).connectionDetails.Msg_Details.length;m++)
            {
            
              dispatch({ type: 'FETCH_CHATHISTORY', payload: {
                author: "me",
                type:JSON.parse(JSON.parse(data).body).connectionDetails.Msg_Details[m].type,
                data: JSON.parse(JSON.parse(data).body).connectionDetails.Msg_Details[m].text,
                time: JSON.parse(JSON.parse(data).body).connectionDetails.Msg_Details[m].sendTime,
                customerEmailId:JSON.parse(JSON.parse(data).body).connectionDetails.customerEmailId
              } })
  
            }
            ws.json({
              action: "saveMsgAndUpdateConnection",
            customerConnectionId: JSON.parse(JSON.parse(data).body).connectionDetails.connectionId, 
            connectedUserName:username,
        
            role:"agent",
            type:JSON.parse(JSON.parse(data).body).connectionDetails.type
            }); 
       
        
          
        }
        if(sessionStorage.section === "supervisor")
        {
          for(let m=0;m<JSON.parse(JSON.parse(data).body).connectionDetails.Msg_Details.length;m++)
          {
          
            dispatch({ type: 'FETCH_CHATHISTORY', payload: {
              author: "me",
              type:JSON.parse(JSON.parse(data).body).connectionDetails.Msg_Details[m].type,
              data: JSON.parse(JSON.parse(data).body).connectionDetails.Msg_Details[m].text,
              time: JSON.parse(JSON.parse(data).body).connectionDetails.Msg_Details[m].sendTime,
              customerEmailId:JSON.parse(JSON.parse(data).body).connectionDetails.customerEmailId
            } })
  
          }
          ws.json({
            action: "saveMsgAndUpdateConnection",
          customerConnectionId: JSON.parse(JSON.parse(data).body).connectionDetails.connectionId, 
          connectedUserName:props.agentDetails.Profile_details && props.agentDetails.Profile_details.Items[0].FirstName,
      
          role:"supervisor",
          type:JSON.parse(JSON.parse(data).body).connectionDetails.type
          }); 
     
      
          
        }
      }
      else
      {
      if(sessionStorage.section === "agent")
      {
        if(JSON.parse(JSON.parse(data).body).connectionDetails.connectionStatus === false)
        {
          // console.log(user,"userD")

          if(JSON.parse(JSON.parse(data).body).connectionDetails.type === "queued")
          {
            ws.json({
              action: "updateConnection",
             agentID:username,
              agentEmailId:agentEmail,
            customerConnectionId: JSON.parse(JSON.parse(data).body).connectionDetails.connectionId, 
            connectedUserName:username,
        
            role:"agent",
            type:JSON.parse(JSON.parse(data).body).connectionDetails.type
            }); 


            setTimeout(()=>
            {
              ws.json({
                action: "chatAssigned",
                data: {
                  customerConnectionId:JSON.parse(JSON.parse(data).body).connectionDetails.connectionId
                }
              
              })
            },10000)
          }
          else
          {
            ws.json({
              action: "updateConnection",
            
            customerConnectionId: JSON.parse(JSON.parse(data).body).connectionDetails.connectionId, 
            connectedUserName:username,
        
            role:"agent",
            type:JSON.parse(JSON.parse(data).body).connectionDetails.type
            }); 

          }
       
          // webSocketInitiate(JSON.parse(JSON.parse(data).body).connectionDetails)
        }
        else if(JSON.parse(JSON.parse(data).body).connectionDetails.connectionStatus === true && JSON.parse(JSON.parse(data).body).connectionDetails.type === "transfer")
        {
          getConversationDetails(JSON.parse(JSON.parse(data).body).connectionDetails.connectionId)

          if(JSON.parse(JSON.parse(data).body).connectionDetails.privateNote && JSON.parse(JSON.parse(data).body).connectionDetails.privateNote.length >0 )
          {
         
           JSON.parse(JSON.parse(data).body).connectionDetails.privateNote.forEach(item => 
            dispatch({ type: 'FETCH_COMMENTBOX', payload: {
               author: "me",
               data: item.notes,
               time: (new Date()).toISOString() ,
               customerEmailId:JSON.parse(JSON.parse(data).body).connectionDetails.customerEmailId
             } })   );
           console.log(globalState.state.commentBox, "stringfy")
          
          }
          ws.json({
            action: "updateConnection",
            agentEmailId:agentEmail,
          customerConnectionId: JSON.parse(JSON.parse(data).body).connectionDetails.connectionId, 
          connectedUserName:username,
      
          role:"agent",
          type:JSON.parse(JSON.parse(data).body).connectionDetails.type
          }); 
        }
        
      }
      if(sessionStorage.section === "supervisor")
      {
        if(JSON.parse(JSON.parse(data).body).connectionDetails.type === "transfer")
        {
          getConversationDetails(JSON.parse(JSON.parse(data).body).connectionDetails.connectionId)
          if(JSON.parse(JSON.parse(data).body).connectionDetails.privateNote && JSON.parse(JSON.parse(data).body).connectionDetails.privateNote.length >0 )
          {
         
           JSON.parse(JSON.parse(data).body).connectionDetails.privateNote.forEach(item => 
            dispatch({ type: 'FETCH_COMMENTBOX', payload: {
               author: "me",
               data: item.notes,
               time: (new Date()).toISOString() ,
               customerEmailId:JSON.parse(JSON.parse(data).body).connectionDetails.customerEmailId
             } })   );
           console.log(globalState.state.commentBox, "stringfy")
          
          }
          ws.json({
            action: "updateConnection",
            supervisorEmailId:agentEmail,
          customerConnectionId: JSON.parse(JSON.parse(data).body).connectionDetails.connectionId, 
          connectedUserName:props.agentDetails.Profile_details && props.agentDetails.Profile_details.Items[0].FirstName,
          
          role:"supervisor",
          type:JSON.parse(JSON.parse(data).body).connectionDetails.type
          }); 

        }
        
        
      }

    }
        console.log(customerProfile)
    }
    else
    {
      console.log(data)
    }
    
}
  
}
const onConnection = (e)=>{
  if(sessionStorage.section === "agent")
  {
    console.log("connected:", e)
    sessionStorage.setItem("customer",JSON.stringify(e))
  console.log(userDetails)
      ws.json({
        action: "agentDetails",
       connectionId:e.connectionId,
       agentEmailId:e.agentEmailId,
       connectedUserName:username,
        role:"agent" 
      }); 

  }
   
  if(sessionStorage.section === "supervisor")
  {
      ws.json({
        action: "connectionDetails",
        connectionId:e.connectionId,
      }); 
    }
}
const startConnection = (value,labelId)=>
{
  // setTimeout(()=>
  // {
  //   startConnection(value,labelId)
  // },60000)
  setSelectedChat(labelId)
 
console.log(value,"customerSelected")
setUser(value)
console.log(userDetails,"customerSelected1")
console.log(ws)
  if(ws)
  {
  ws.json({
    action: "connectionDetails",
    connectionId:value.connectionId,
  }); 
  
  }
  else{
  webSocketInitiate(value)
  }





}

const startQueuedConnection = (value)=>
{
  console.log(globalState.state.agentStatus,"agentStatus")
  if(sessionStorage.agentStatus === "Online")
  {

    if(props.customerList.length < 3)
    {
   // setBlink(true)
    // setBlinkEmailId(value.customerEmailId)
    console.log(value)
    setUser(value)
    console.log(userDetails)
    console.log(ws)
      if(ws)
      {
      ws.json({
        action: "connectionDetails",
        connectionId:value.connectionId,
      }); 
      
      }
      else{
      webSocketQueuedInitiate(value)
      }
    
    
    
    }
    else
    {
      setOpenPopup(true)
      setSeverity("error")
      setTxt("Max. Chat limit reached")
    }

  }
  else
  {
    setOpenPopup(true)
    setSeverity("error")
    setTxt("You are offline")
  }

 


}
const webSocketInitiate = (value)=>
{
  if(sessionStorage.section === "agent")
  {

    let  dataInToken = { 

      customerEmailId: value.customerEmailId,
        agentID: value.agentID,
      customerConnectionId: value.connectionId, 
      connectedUserName:username,
      EmailId:agentEmail,
      role:"agent",
      type:value.type
    }
    let encodedData = base64.encode(utf8.encode(JSON.stringify(dataInToken)));
    ws =    new Sockette(
      "wss://6z4exg2xvi.execute-api.us-west-1.amazonaws.com/dev/?data="+encodedData,
      {
        // timeout: 5e3,
        maxAttempts: 1,
        onopen: e => onConnection(value),
        onmessage: e => onMessageReceied(e),
        onreconnect: e => console.log("Reconnecting...", e),
        onmaximum: e => console.log("Stop Attempting!", e),
        onclose: e => console.log("Closed!", e),
        onerror: e => console.log("Error:", e)
      }
    );

  }

  if(sessionStorage.section === "supervisor")
  {
    let  dataInToken = { 

      customerEmailId: value.customerEmailId,
        agentID: value.agentID,
      customerConnectionId: value.connectionId, 
      connectedUserName:props.agentDetails.Profile_details && props.agentDetails.Profile_details.Items[0].FirstName,
      EmailId:agentEmail,
      role:"supervisor",
      type:value.type
    }
    let encodedData = base64.encode(utf8.encode(JSON.stringify(dataInToken)));
    ws =    new Sockette(
      "wss://6z4exg2xvi.execute-api.us-west-1.amazonaws.com/dev/?data="+encodedData,
      {
        timeout: 5e3,
        maxAttempts: 1,
        onopen: e => onConnection(value),
        onmessage: e => onMessageReceied(e),
        onreconnect: e => console.log("Reconnecting...", e),
        onmaximum: e => console.log("Stop Attempting!", e),
        onclose: e => console.log("Closed!", e),
        onerror: e => console.log("Error:", e)
      }
    );

   

  }


}
const webSocketQueuedInitiate = (value)=>
{
  if(sessionStorage.section === "agent")
  {

    let  dataInToken = { 

      customerEmailId: value.customerEmailId,
        agentID: value.agentID,
      customerConnectionId: value.connectionId, 
      connectedUserName:username,
      EmailId:agentEmail,
      role:"agent",
      type:value.type
    }
    let encodedData = base64.encode(utf8.encode(JSON.stringify(dataInToken)));
    ws =    new Sockette(
      "wss://6z4exg2xvi.execute-api.us-west-1.amazonaws.com/dev/?data="+encodedData,
      {
        // timeout: 5e3,
        maxAttempts: 1,
        onopen: e => { ws.json({
          action: "connectionDetails",
          connectionId:value.connectionId,
        })},
        onmessage: e => onMessageReceied(e),
        onreconnect: e => console.log("Reconnecting...", e),
        onmaximum: e => console.log("Stop Attempting!", e),
        onclose: e => console.log("Closed!", e),
        onerror: e => console.log("Error:", e)
      }
    );

  }

  if(sessionStorage.section === "supervisor")
  {
    let  dataInToken = { 

      customerEmailId: value.customerEmailId,
        agentID: value.agentID,
      customerConnectionId: value.connectionId, 
      connectedUserName:props.agentDetails.Profile_details && props.agentDetails.Profile_details.Items[0].FirstName,
      EmailId:agentEmail,
      role:"supervisor",
      type:value.type
    }
    let encodedData = base64.encode(utf8.encode(JSON.stringify(dataInToken)));
    ws =    new Sockette(
      "wss://6z4exg2xvi.execute-api.us-west-1.amazonaws.com/dev/?data="+encodedData,
      {
        timeout: 5e3,
        maxAttempts: 1,
        onopen: e => { ws.json({
          action: "connectionDetails",
          connectionId:value.connectionId,
        })},
        onmessage: e => onMessageReceied(e),
        onreconnect: e => console.log("Reconnecting...", e),
        onmaximum: e => console.log("Stop Attempting!", e),
        onclose: e => console.log("Closed!", e),
        onerror: e => console.log("Error:", e)
      }
    );

   

  }


}

return( 
  <div className="row">
  {
  globalState.state.menu && globalState.state.menu.length > 0 && globalState.state.menu.map(function(item) {
    return  <> 
      {getSideMenu(item.text,item.status)}
 
  
      {item.text === "Tickets" && item.status === true ?
     <> 
  
      <EnhancedTable searchArray={searchArray} searchStatus={searchStatus} ticketList={ticketList}   getTicketList={getTicketList} />
      </>
      :
      null
    }
     {item.text === "Chats" && item.status === true ?
     
     <ChatWindow role="agent" customerData={userDetails} onMessageReceied={onMessageReceied}  ws={ws}  handleOpenPdf={handleOpenPdf} chatData={chatDetails}  agentDetails={props.agentDetails}  connectionDetails={customerProfile}  openPdf={openPdf} getTicketList={getTicketList} convoData={convoData}  commentTxt={commentTxt} getQueueList={props.getQueueList} getCustomerList={props.getCustomerList}/>
 
      :
      null
    }
    {(item.text === "Archives" || item.text === "Agents" || item.text === "Settings" || item.text === "Customer" || item.text === "Departments") && item.status === true ?
  <NotFound />
  // <ChatWindowArchives role="agent" customerData={userDetails} onMessageReceied={onMessageReceied}  ws={ws}  handleOpenPdf={handleOpenPdf} chatData={chatDetails} />

   :
   null
 }
   {item.text === "Reports" && item.status === true ?
  
  <Reports role="agent" customerData={userDetails} onMessageReceied={onMessageReceied}  ws={ws}  handleOpenPdf={handleOpenPdf} chatData={chatDetails} />

   :
   null
 }
     
     {/* <CreateTicket open={open} handleOpen={handleOpen} handleClose={handleClose}  customerData={props.customerData}  chatData={props.chatData} end={props.end}/> */}
</>
})
}
{/* {
  openPdf === true ?
  <PdfPreview open={openPdf}  handleClosePdf={handleClosePdf} chatData={chatDetails} />
  :null
} */}
 <Snackbar open={openPopup} autoHideDuration={3000} onClose={handleClosePopup}>
       <Alert onClose={handleClosePopup} severity={severity}>
        {txt}
       </Alert>
     </Snackbar> 
</div>
      
  
  )
}
