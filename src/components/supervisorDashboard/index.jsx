import React,{useState,useEffect,useContext} from 'react';
// import {Link} from 'react-router';
import base64 from 'base-64';
import axios from "axios";
import { useForm } from 'react-hook-form'
import { useHistory,Link } from 'react-router-dom'
import { store } from '../../store';


  

function SupervisorDashboard(props) {

console.log(props)
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const [user, setUser] = useState({})  
  const [supervisorList,setSupervisorList] = useState({})
  const [agentList,setAgentList] = useState({})
  const [departList,setDepartList] = useState({})
  const { register, handleSubmit, watch, errors } = useForm()

  const history = useHistory()

  const token = JSON.parse(sessionStorage.userData).idToken.jwtToken

  useEffect(()=>{
    if(token)
    {
      console.log(globalState.state.data,"data");
      getSupervisor()
      getAgentList()
      getDepartment()
    }
    else
    {
history.push('admin')
    }
    
  }, [])


  const getAgentList = () =>
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
        alert("Please try again")
    })

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
        alert("Please try again")
    })

  }



  const getDepartment = () =>
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
        alert("Please try again")
    })

  }

const assignDepartment = (data) =>
{
  const email = base64.encode(data.EmailId);
history.push("/supervisor/assign-department?="+email)
// console.log(data)
}



  console.log(agentList,supervisorList,"list");

  return (
      <div className="container validateuser">
          <div className="row">

          <div className="col-md-12">
            
<span><Link to="/admin/change-password"> Change Password ||</Link></span>
<span> Sign Out</span>
            </div>
<div className="col-md-12">
<h1 className="subject">Admin Dashboard</h1>

<Link to="/agent/create-account"> <button  >Create Agent</button></Link>

<Link to="/supervisor/create-account">  <button >Create Supervisor</button></Link>



<Link to="/admin/create-department">  <button >Create Department</button></Link>






</div>

<div className="col-md-12">

<div className="col-md-4">
<h2>Supervisor List</h2>
<ul>
{
supervisorList.length > 0 && supervisorList.map(function(item) {
  return <li key={item}  onClick={()=>assignDepartment(item)}>{item.EmailId}</li>;
})
}
</ul>

</div>
<div className="col-md-4">

<h2>Agent List</h2>
<ul>
{
agentList.length > 0 && agentList.map(function(item1) {
  return <li key={item1} onClick={()=>assignDepartment(item1)} >{item1.EmailId}</li>;
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
   
  )
}

export default SupervisorDashboard;
