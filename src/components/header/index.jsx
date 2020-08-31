import React,{useState,useEffect,useContext} from 'react'
import axios from "axios";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import MyProfile from '../myProfile';
import { useHistory,Link } from 'react-router-dom';
import { store } from '../../store';

function Header(props) {

  const globalState = useContext(store);
  const { dispatch } = globalState;
const [profile,setProfile]  = useState(false)
const [status, setStatus] = React.useState('Online');
const token = JSON.parse(sessionStorage.userData).idToken.jwtToken
const name = JSON.parse(sessionStorage.userData).idToken.payload.name
const supervisorName =  props.agentDetails.Profile_details && props.agentDetails.Profile_details.Items[0].FirstNames;
const email = JSON.parse(sessionStorage.userData).idToken.payload.email
const history = useHistory()

console.log(props.agentDetails)

    const clearDatabase = ()=>
    {
      axios
      .get(`https://9boms4jdg5.execute-api.us-west-1.amazonaws.com/dev/chat-admin/logout-users-and-clear-connections`)
      .then(response => {
         
       console.log(response.data.data.MainData,"clearDatabase")
      alert(response.data.data.MainData)
      window.location.href="/"
      })
    }

    const handleOpenProfile = () => {
        setProfile(true);
      };
    
      const handleCloseProfile = () => {
        setProfile(false);
      };

      const handleStatus = (value) => {
        setStatus(value);
        updateStatus(value)
      };
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
             
            sessionStorage.setItem('agentStatus',value)

              
          })
          .catch(error => {
             
             
          })
        }
        else if(value == 'logout')
        {
          let jsonAway = {
            "EmailId": emailId,
            "AgentStatus":"Away"
            
          }
          axios
          .post(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/chat-agent/available-status/update-not-available-status`,jsonAway,{
              headers: { "Authorization": token  }})
          .then(response => {
    
            sessionStorage.clear()
            window.location.href="/#/"
                     window.location.reload()
              
          })
         
        }
        else {
          axios
        .post(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/chat-agent/available-status/update-not-available-status`,json,{
            headers: { "Authorization": token  }})
        .then(response => {
          sessionStorage.setItem('agentStatus',value)
        
         
            
        })
        
        }
   
      }

      if(sessionStorage.section === "supervisor")
      {
        const emailId = JSON.parse(sessionStorage.userData).idToken.payload.email
        let json = {
          "EmailId": emailId,
          "SupervisorStatus":value
          
        }
      
        if(value == "Online")
        {
          axios
          .post(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/chat-supervisor/availability-status/update-available-status`,json,{
              headers: { "Authorization": token  }})
          .then(response => {
             
          
            sessionStorage.setItem('agentStatus',value)
           
              
          })
          .catch(error => {
             
             
          })
        }
        else if(value == 'logout')
        {
          let jsonAway = {
            "EmailId": emailId,
            "SupervisorStatus":"Away"
            
          }
          axios
          .post(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/chat-supervisor/availability-status/update-not-available-status`,jsonAway,{
              headers: { "Authorization": token  }})
          .then(response => {
            sessionStorage.clear()
            window.location.href="/#/"
            window.location.reload()
          })

        } 
        else
        {
          axios
        .post(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/chat-supervisor/availability-status/update-not-available-status`,json,{
            headers: { "Authorization": token  }})
        .then(response => {
       
          sessionStorage.setItem('agentStatus',value)
            
        })
       
        }




        
      }
      
      }  


return (
<div className="row" id="header">
<div className="col-md-1"  >

<p className="logo"></p>

</div>
<div className="col-md-3 title"  >{sessionStorage.section === "agent" ?  "Agent":null} {sessionStorage.section === "supervisor" ?  "Supervisor":null} {sessionStorage.section === "admin" ?  "Admin":null} <p className="work">Workspace</p></div>
<div className="col-md-5 rate"  >
  {sessionStorage.section === "agent" ?

<div className="row">
<div className="col-md-3 rateTxt">
{props.agentDetails.Metrics && props.agentDetails.Metrics.AvgHandleTime+" MINS"}
<br/>
<span class="rateDes">AVERAGE HANDLE TIME</span>
</div>
<div className="col-md-3 rateTxt">
{props.agentDetails.Metrics && props.agentDetails.Metrics.TotalSolvedTickets}
<br/>
<span class="rateDes">SOLVED TICKETS</span> 
</div>
<div className="col-md-3 rateTxt">
{props.agentDetails.Metrics && props.agentDetails.Metrics.FirstChatResolution+"%"}
<br/>
<span class="rateDes">FIRST CHAT RESOLUTION</span> 
</div>
<div className="col-md-3 rateTxt">
{props.agentDetails.Metrics && props.agentDetails.Metrics.CustomerSatisfication+"%"}
<br/>
<span class="rateDes">CUSTOMER SATISFACTION</span> 
</div>
{/* <div className="col-md-3 rateTxt">
{props.agentDetails.Metrics && props.agentDetails.Metrics.AvgTimeToAnswer +" MINS"}
<br/>
<span class="rateDes">AVG TIME TO ANSWER</span>
</div> */}
    </div>

:
null}  
  {sessionStorage.section === "supervisor" ?

<div className="row">
<div className="col-md-3 rateTxt">
{props.agentDetails.Metrics && props.agentDetails.Metrics.AgentsLoggedIn}
<br/>
<span class="rateDes">AGENTS LOGGED IN</span>
</div>
<div className="col-md-3 rateTxt">
{props.agentDetails.Metrics && props.agentDetails.Metrics.OnGoingChats}
<br/>
<span class="rateDes">ONGOING CHATS</span> 
</div>
<div className="col-md-3 rateTxt">
{props.agentDetails.Metrics && props.agentDetails.Metrics.UnassignedTickets}
<br/>
<span class="rateDes">UNASSIGNED TICKETS</span> 
</div>
<div className="col-md-3 rateTxt">
{props.agentDetails.Metrics && props.agentDetails.Metrics.AvgResponseTime}
<br/>
<span class="rateDes">AVG RESPONSE TIME</span> 
</div>
{/* <div className="col-md-3 rateTxt">
{props.agentDetails.Metrics && props.agentDetails.Metrics.AvgTimeToAnswer +" MINS"}
<br/>
<span class="rateDes">AVG TIME TO ANSWER</span>
</div> */}
    </div>

:
null}  
</div>
<div className="col-md-3 notify"  >

<div className="row">
<div className="col-md-2">
<img src="/assets/img/bell.svg"
     class="bell" />
</div>
<div className="col-md-2">
<img src="/assets/img/help-circle.svg"
     class="help-circle"  onClick={clearDatabase}/>
</div>
<div className="col-md-8" onClick={handleOpenProfile}>
<img src="/assets/img/Arpit-Kalra.svg"
    
     class="Mask-Group-1"  style={{width:"51px",height:"52px"}} />
    {status === "Online" ?
    <span className="statusIcon"><FiberManualRecordIcon style={{color:"#4dd966"}} /></span>:
    null
} 
{status === "Away" ?
    <span className="statusIcon"><FiberManualRecordIcon style={{color:"red"}} /></span>:
    null
}
{status === "Break" ?
    <span className="statusIcon"><FiberManualRecordIcon style={{color:"orange"}} /></span>:
    null
}
<span className="name">{sessionStorage.section === "agent" ?  name :null} {sessionStorage.section === "supervisor" ? "Supervisor":null}</span>
</div>

    </div>


</div>
<MyProfile open={profile} handleOpen={handleOpenProfile} handleClose={handleCloseProfile} handleStatus={handleStatus} />
</div>
)

}
export default Header