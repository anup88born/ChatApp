import React,{useState,useEffect,useContext} from 'react';
// import {Link} from 'react-router';
import base64 from 'base-64';
import axios from "axios";
import  ChatWindow  from '../chatWindow';
import { useForm } from 'react-hook-form'
import { useHistory,Link } from 'react-router-dom'
import { store } from '../../store';
import Header from '../header'
import GetContent from '../getContent'
import Sidebar from '../sideBar';
import CrmInfo from '../crmInfo';
import SideSubMenu from '../sideSubMenu'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


function Dashboard(props) {

// console.log("this is from dashboard component: ",props)



  const globalState = useContext(store);
  const { dispatch } = globalState;
  const [user, setUser] = useState({})  
  const [supervisorList,setSupervisorList] = useState({})

  const [customerList,setCustomerList] = useState({})
  const [queueList,setQueueList] = useState({})
  const [deptId, setDeptId] = useState("")
  const [agentList,setAgentList] = useState({})
  const [departList,setDepartList] = useState([])

  const { register, handleSubmit, watch, errors } = useForm()
const[agentDetails,setAgentDetails] = useState({})
  const history = useHistory()
  const token = JSON.parse(sessionStorage.userData).idToken.jwtToken
  const emailId = JSON.parse(sessionStorage.userData).idToken.payload.email

  console.log("agentDetails: ", agentDetails.DepartmentId)
  useEffect(async ()=>{
    if(token)
    {
      if( sessionStorage.section == "admin")
      {
      console.log(globalState.state.data,"data");
      getSupervisor()
      getAgentList()
      getDepartment()
      }
      if( sessionStorage.section == "supervisor")
      {
        sessionStorage.setItem("detailPage",false)
       
           agentProfileDetails()
     
      // getAgentList()
      // getDepartment()
      }

      if( sessionStorage.section == "agent")
      {
        sessionStorage.setItem("detailPage",false)
     
      agentProfileDetails()

      
    
     
      }


    }
    else
    {
     alert("Session got ended")
window.location.href="/#/"
    }
    
  }, [])

//   const getDepartment = () =>
//   {
//     if( sessionStorage.section == "agent")
//     {
//     axios
//     .get(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/transfer-chat/get-department-list`,{
//       headers: { "Authorization":token   }})
//     .then(response => {
//         //  dispatch({ type: 'FETCH_DEPARTMENTLIST', payload: response.data.data })
//         setDepartList(response.data.data.MainData)
     
//     //  console.log(supervisorList,"list");
//     })
//     .catch(error => {
//         // dispatch({ type: 'FETCH_ERROR',payload: error })
//         // console.log(globalState.state.post,"validateUser");
//         // history.push("createUser")
//         // alert("Please try again")
//     })

//   }
// }
const agentProfileDetails = ()=>
{
  if(sessionStorage.section === 'agent')
  {
    let json = {
      "EmailId": emailId
    }
    axios
    .post(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/chat-agent/profile/get-profile`,json,{
      headers: { "Authorization":token   }})
    .then(response => {
        // dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
        NotificationManager.success('Welcome Back, '+response.data.data.Profile_details.Items[0].FirstName);
        setAgentDetails(response.data.data)
        for(let d=0;d<response.data.data.Department_details.length;d++)
        {
          if(response.data.data.Department_details[d].DepartmentAssociated === true)
          {
            sessionStorage.setItem("agentDetails",response.data.data.Department_details[d].DepartmentId)
            const data = 
            {
              DepartmentId:response.data.data.Department_details[d].DepartmentId,
              DeptName:response.data.data.Department_details[d].DeptName
            }

           
            getQueueList(response.data.data.Department_details[d].DepartmentId)
            getCustomerList(response.data.data.Department_details[d].DepartmentId)
          
          }
        }
      
    console.log(agentDetails,"list");
    })
    .catch(error => {
        // dispatch({ type: 'FETCH_ERROR',payload: error })
        // console.log(globalState.state.post,"validateUser");
        // history.push("createUser")
        // alert("Please try again")
    })

  }
 if(sessionStorage.section === 'supervisor')
 {
  let json = {
    "EmailId": emailId
  }
  axios
  .post(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/chat-supervisor/profile/get-profile-details`,json,{
    headers: { "Authorization":token   }})
  .then(response => {
      // dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
      setAgentDetails(response.data.data)
      NotificationManager.success('Welcome Back, '+response.data.data.Profile_details.Items[0].FirstName);
      for(let d=0;d<response.data.data.Department_details.length;d++)
      {
        if(response.data.data.Department_details[d].DepartmentAssociated === true)
        {
          sessionStorage.setItem("agentDetails",response.data.data.Department_details[d].DepartmentId)
          const data = 
          {
            DepartmentId:response.data.data.Department_details[d].DepartmentId,
            DeptName:response.data.data.Department_details[d].DeptName
          }

      
          getQueueList(response.data.data.Department_details[d].DepartmentId)
          getCustomerList(response.data.data.Department_details[d].DepartmentId)
        
        }
      }
  })
  .catch(error => {
      // dispatch({ type: 'FETCH_ERROR',payload: error })
      // console.log(globalState.state.post,"validateUser");
      // history.push("createUser")
      // alert("Please try again")
  })
 }
}

  const getQueueList = (value)=> {
    // console.log("dashboard deptid: ", deptId)
    if( sessionStorage.section == "agent")
    {
    //   departList.length > 0 && departList.map(depart => {
    //     setDeptId(depart.DepartmentId)
    //   })
      const json ={
        "departmentId": value
      }
      // agentDetails.DepartmentId
      axios
          .post(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/chat-agent/chat-list/get-department-queued-chat-list`,json,{
            headers: { "Authorization":token   }})
          .then(response => {
              // dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
              setQueueList(response.data.data.MainData)
            
          console.log(queueList,"list");
          })
          .catch(error => {
              dispatch({ type: 'FETCH_ERROR',payload: error })
              console.log(globalState.state.post,"validateUser");
              // history.push("createUser")
              // alert("Please try again")
          })

        }

        if( sessionStorage.section == "supervisor")
        {
          const json ={
            "departmentId":value
          }
              axios
              .post(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/chat-supervisor/chat-list/get-department-queued-chat-list`,json,{
                headers: { "Authorization":token   }})
              .then(response => {
                  // dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
                  setQueueList(response.data.data.MainData)
                
              console.log(queueList,"list");
              })
              .catch(error => {
                  dispatch({ type: 'FETCH_ERROR',payload: error })
                  console.log(globalState.state.post,"validateUser");
                  // history.push("createUser")
                  // alert("Please try again")
              })

        }
  }



  const getCustomerList = (value)=>
  {
    if( sessionStorage.section == "supervisor")
    {

const json ={
  // "EmailId": emailId
  "EmailId": emailId,
  "departmentId": value
}
    axios
    .post(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/chat-supervisor/chat-list/get-customers-chat-list`,json,{
      headers: { "Authorization":token   }})
    .then(response => {
        // dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
        setCustomerList(response.data.data.MainData)
       
     console.log(customerList,"list");
    })
    .catch(error => {
        dispatch({ type: 'FETCH_ERROR',payload: error })
        console.log(globalState.state.post,"validateUser");
        // history.push("createUser")
        // alert("Please try again")
    })
  }
  if( sessionStorage.section == "agent")
  {

const json ={
"EmailId": emailId,
"departmentId": value
}
  axios
  .post(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/chat-agent/chat-list/get-customers-chat-list`,json,{
    headers: { "Authorization":token   }})
  .then(response => {
      // dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
      setCustomerList(response.data.data.MainData)
     
   console.log(customerList,"list");
  })
  .catch(error => {
      dispatch({ type: 'FETCH_ERROR',payload: error })
      console.log(globalState.state.post,"validateUser");
      // history.push("createUser")
      // alert("Please try again")
  })
}
  }






  const getAgentList = () =>
  {
   if( sessionStorage.section == "admin")
   {
    axios
    .get(`https://9boms4jdg5.execute-api.us-west-1.amazonaws.com/dev/chat-admin/agent/get-agent-list`,{
      headers: { "Authorization":token   }})
    .then(response => {
        // dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
        setAgentList(response.data.data.MainData)
       
     console.log(agentList,"list");
    })
    .catch(error => {
        dispatch({ type: 'FETCH_ERROR',payload: error })
        console.log(globalState.state.post,"validateUser");
        // history.push("createUser")
        // alert("Please try again")
    })
   }

   if( sessionStorage.section == "supervisor")
   {
    axios
    .get(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/chat-supervisor/agent/get-agent-list`,{
      headers: { "Authorization":token   }})
    .then(response => {
        // dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
        setAgentList(response.data.data.MainData)
       
     console.log(agentList,"list");
    })
    .catch(error => {
        dispatch({ type: 'FETCH_ERROR',payload: error })
        console.log(globalState.state.post,"validateUser");
        // history.push("createUser")
        // alert("Please try again")
    })
   }

   

  }



  const getSupervisor = () =>
  {

    axios
    .get(`https://9boms4jdg5.execute-api.us-west-1.amazonaws.com/dev/chat-admin/supervisor/get-supervisor-list`,{
      headers: { "Authorization":token   }})
    .then(response => {
        // dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
        setSupervisorList(response.data.data.MainData)
       
     console.log(supervisorList,"list");
    })
    .catch(error => {
        dispatch({ type: 'FETCH_ERROR',payload: error })
        console.log(globalState.state.post,"validateUser");
        // history.push("createUser")
        // alert("Please try again")
    })

  }



  const getDepartment = () =>
  {
    if( sessionStorage.section == "supervisor")
    {
    axios
    .get(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/chat-supervisor/department/get-department-list`,{
      headers: { "Authorization":token   }})
    .then(response => {
         dispatch({ type: 'FETCH_DEPARTMENTLIST', payload: response.data.data })
        setDepartList(response.data.data.MainData)
        
       
    //  console.log(supervisorList,"list");
    })
    .catch(error => {
        dispatch({ type: 'FETCH_ERROR',payload: error })
        console.log(globalState.state.post,"validateUser");
        // history.push("createUser")
        // alert("Please try again")
    })

  }

  if( sessionStorage.section == "admin")
    {
    axios
    .get(`https://9boms4jdg5.execute-api.us-west-1.amazonaws.com/dev/chat-admin/department/get-department-list`,{
      headers: { "Authorization":token   }})
    .then(response => {
         dispatch({ type: 'FETCH_DEPARTMENTLIST', payload: response.data.data })
        setDepartList(response.data.data.MainData)
       
    //  console.log(supervisorList,"list");
    })
    .catch(error => {
        dispatch({ type: 'FETCH_ERROR',payload: error })
        console.log(globalState.state.post,"validateUser");
        // history.push("createUser")
        // alert("Please try again")
    })

  }


  }

const assignDepartment = (data,txt) =>
{

  sessionStorage.setItem('section',txt)
  const email = base64.encode(data.EmailId);
history.push("/supervisor/assign-department?="+email)
// console.log(data)
}

  console.log(agentList,supervisorList,"list");

  return (
      <div className="dashboard">

<Header  agentDetails={agentDetails} />
{/* <div className="clearfix" /> */}
<div className="row chatRow">
<div className="col-md-1">
<Sidebar  />
</div>
<div className="col-md-11" style={{paddingRight: 0, paddingLeft: 0}}>
  {/* {customerList.length >0? */}
  <SideSubMenu  customerList={customerList} queueList={queueList} getCustomerList={getCustomerList} agentDetails={agentDetails} getQueueList={getQueueList}  />
  {/* :
  null
  } */}

</div>
{sessionStorage.section === "admin" ?


<div className="col-md-5 chat">

<div className="row">

<div className="col-md-12">
  
<span><Link to="/admin/change-password"> Change Password ||</Link></span>
<span> Sign Out</span>
  </div>
<div className="col-md-12">
<h1 className="subject">Admin Dashboard</h1>

<Link to="/agent/create-account"> <button  >Create Agent</button></Link>



<Link to="/admin/create-department">  <button >Create Department</button></Link>






</div>

<div className="col-md-12">
{sessionStorage.section == "admin" ?

<div className="col-md-4">

<Link to="/supervisor/create-account">  <button >Create Supervisor</button></Link>

<h2>Supervisor List</h2>
<ul>
{
supervisorList.length > 0 && supervisorList.map(function(item) {
return <li key={item}  onClick={()=>assignDepartment(item,"supervisor")}>{item.EmailId}</li>;
})
}
</ul>

</div>
:null

}

<div className="col-md-4">

<h2>Agent List</h2>
<ul>
{
agentList.length > 0 && agentList.map(function(item1) {
return <li key={item1} onClick={()=>assignDepartment(item1,sessionStorage.section+"/agent")} >{item1.EmailId}</li>;
})}
</ul>
</div>

<div className="col-md-4">

<h2>Department List</h2>
<ul>
{
departList.length > 0 && departList.map(function(item2) {
return <li key={item2}>{item2.DeptName}</li>;
})}
</ul>
</div>





</div>


</div>



</div>

: 
null
}
{/* {sessionStorage.section === "supervisor" ?


<div className="col-md-5 chat">

<div className="row">

<div className="col-md-12">
  
<span><Link to="/admin/change-password"> Change Password ||</Link></span>
<span> Sign Out</span>
  </div>
<div className="col-md-12">
<h1 className="subject">Supervisor Dashboard</h1>

<Link to="/agent/create-account"> <button  >Create Agent</button></Link>



<Link to="/admin/create-department">  <button >Create Department</button></Link>






</div>

<div className="col-md-12">


<div className="col-md-4">

<h2>Agent List</h2>
<ul>
{
agentList.length > 0 && agentList.map(function(item1) {
return <li key={item1} onClick={()=>assignDepartment(item1,sessionStorage.section+"/agent")} >{item1.EmailId}</li>;
})}
</ul>
</div>

<div className="col-md-4">

<h2>Department List</h2>
<ul>
{
departList.length > 0 && departList.map(function(item2) {
return <li key={item2}>{item2.DeptName}</li>;
})}
</ul>
</div>





</div>


</div>



</div>

:
null
} */}


</div>

<NotificationContainer />
      </div>
      
   
  )
}

export default Dashboard
