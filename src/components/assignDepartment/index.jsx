import React,{useState,useEffect,useContext} from 'react'
import axios from "axios";
import FileBase64 from 'react-file-base64';
import { useForm } from 'react-hook-form'
// import './style.css';
import base64 from 'base-64';
import { store } from '../../store';
import { useHistory } from 'react-router-dom'




export default function AssignDepartment(props) {
  console.log(sessionStorage.section)

    const globalState = useContext(store);
    const { dispatch } = globalState;
   
    const [user, setUser] = useState({})  
  

     const [departList,setDepartList] = useState({}) 
    const [files, setFiles] = useState({}) 
    const [svData,setSvData] = useState({}) 
    const [DepartId,setID] = useState('')
  const { register, handleSubmit, watch, errors } = useForm()
  const history = useHistory()

  const token = JSON.parse(sessionStorage.userData).idToken.jwtToken
  const emailId = JSON.parse(sessionStorage.userData).idToken.payload.email
  // console.log(globalState.state.departlist,"test")

  // const departList = globalState.state.departlist.MainData;


  const decodedData = base64.decode((window.location.search).split("=")[1]);

  console.log(decodedData);

useEffect(()=>{
  sessionStorage.setItem("DeptId", DepartId)

  let json ={
   
  "EmailId":decodedData, 

}  

if(sessionStorage.section == "supervisor")

{

  axios
  .post(`https://9boms4jdg5.execute-api.us-west-1.amazonaws.com/dev/chat-admin/supervisor/get-supervisor-profile-details`,json,{
      headers: { "Authorization":token  }})
  .then(response => {
    console.log(response.data.data.Profile_details.Items[0],"testtt")
     setSvData(response.data.data.Profile_details.Items[0])
     setDepartList(response.data.data.Department_details)

      // dispatch({ type: 'FETCH_SUPERVISOR', payload: response.data.Profile_details.Items[0] })
      //  console.log(globalState.state.svData,"Department");
      // history.push("home")
      // alert("Success, Kindly check your mailbox.")
       console.log(svData)
  })
  .catch(error => {
      // dispatch({ type: 'FETCH_ERROR',payload: error })
      console.log(error,"supervisor");
      // history.push("/")
      // alert("Please try again")
  })

}



if(sessionStorage.section == "admin/agent")

{


  axios
  .post(`https://9boms4jdg5.execute-api.us-west-1.amazonaws.com/dev/chat-admin/agent/get-agent-profile-details`,json,{
      headers: { "Authorization":token  }})
  .then(response => {
    console.log(response.data.data.Profile_details.Items[0],"testtt")
     setSvData(response.data.data.Profile_details.Items[0])
     setDepartList(response.data.data.Department_details)

      // dispatch({ type: 'FETCH_SUPERVISOR', payload: response.data.Profile_details.Items[0] })
      //  console.log(globalState.state.svData,"Department");
      // history.push("home")
      // alert("Success, Kindly check your mailbox.")
       console.log(svData)
  })
  .catch(error => {
      // dispatch({ type: 'FETCH_ERROR',payload: error })
      console.log(error,"supervisor");
      // history.push("/")
      // alert("Please try again")
  })
}


if(sessionStorage.section == "supervisor/agent")

{


  axios
  .post(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/chat-supervisor/agent/get-agent-profile-details`,json,{
      headers: { "Authorization":token  }})
  .then(response => {
    console.log(response.data.data.Profile_details.Items[0],"testtt")
     setSvData(response.data.data.Profile_details.Items[0])
     setDepartList(response.data.data.Department_details)

      // dispatch({ type: 'FETCH_SUPERVISOR', payload: response.data.Profile_details.Items[0] })
      //  console.log(globalState.state.svData,"Department");
      // history.push("home")
      // alert("Success, Kindly check your mailbox.")
       console.log(svData)
  })
  .catch(error => {
      // dispatch({ type: 'FETCH_ERROR',payload: error })
      console.log(error,"supervisor");
      // history.push("/")
      // alert("Please try again")
  })
}





},[])



  const onSubmit = data => { 
  
    
    console.log(data.test,DepartId)
    
  for(let i=0;i<=data.test.length;i++)
  {
    if(data.test[i] && data.test[i].id == DepartId)
    {
  setUser(data.test[i])

 
    }
  }

  console.log(user,"noww")
    if(sessionStorage.section == "supervisor")

    {


      let json ={
        "DepartmentId":user.id,
      "EmailId":decodedData,
      "CreatedBy":emailId,
      "Read":user.read,
      "Write":user.write
      
    } 

      axios
      .post(`https://9boms4jdg5.execute-api.us-west-1.amazonaws.com/dev/chat-admin/supervisor/assign-departments`,json,{
          headers: { "Authorization":token  }})
      .then(response => {
          dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
          console.log(globalState.state.post,"Department");
          // history.push("home")
          alert("Success")
      })
      .catch(error => {
          dispatch({ type: 'FETCH_ERROR',payload: error })
          console.log(globalState.state.post,"supervisor");
          // history.push("/")
          alert("Please try again")
      })
    
    
    }

    if(sessionStorage.section == "admin/agent")

    {

      let json ={
      "DepartmentId":user.id,
      "EmailId":decodedData,
      "AssignedBy":emailId,
      } 


      axios
      .post(`https://9boms4jdg5.execute-api.us-west-1.amazonaws.com/dev/chat-admin/agent/assign-departments`,json,{
          headers: { "Authorization":token  }})
      .then(response => {
          dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
          console.log(globalState.state.post,"Department");
          // history.push("home")
          alert("Success")
      })
      .catch(error => {
          dispatch({ type: 'FETCH_ERROR',payload: error })
          console.log(globalState.state.post,"supervisor");
          // history.push("/")
          alert("Please try again")
      })
    
    
    }
   
    if(sessionStorage.section == "supervisor/agent")
    {
     
      let json ={
      "DepartmentId":user.id,
      "EmailId":decodedData,
      "AssignedBy":emailId,
      } 


      axios
      .post(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/chat-supervisor/agent/assign-departments`,json,{
          headers: { "Authorization":token  }})
      .then(response => {
          dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
          console.log(globalState.state.post,"Department");
          // history.push("home")
          alert("Success")
      })
      .catch(error => {
          dispatch({ type: 'FETCH_ERROR',payload: error })
          console.log(globalState.state.post,"supervisor");
          // history.push("/")
          alert("Please try again")
      })
    
    
    }
  
  
   
     
   
   
}

const  getFiles = (data)=>{
  setFiles(data)
  console.log(files)
}

const getId =(id)=>
{
  setID(id)
  console.log(DepartId)
}


 console.log(svData) // watch input value by passing the name of it

  return (
      <div className="container validateuser">
          <div className="row">

    <div className="col-md-12">
<h1 className="subject">Assign Department</h1>

{/* <form onSubmit={handleSubmit(onSubmit)}>
   
      <input name="dname" defaultValue="Department Name"  ref={register} disabled />
    
     Read: <input type="radio" name="read"  ref={register} />
    Write:  <input type="radio" name="write"  ref={register} />
     <button>Assign</button>
      <input type="submit" />
    </form> */}
  
    <h2> Name : {svData && svData.FirstName} {svData && svData.LastName}</h2>
    <span> EmailId : {decodedData}</span>


    <h2>Department List</h2>

{
sessionStorage.section == "supervisor" ?

<ul>
{
departList.length > 0 && departList.map(function(item2,index) {
  return <li key={item2}>{item2.DeptName}

    <form onSubmit={handleSubmit(onSubmit)}>
    <input name={`test[${index}].id`}  defaultValue={item2.DepartmentId} disabled ref={register({})}  />
 
  Read: <input type="checkbox" name={`test[${index}].read`} ref={register({})} onClick={()=>getId(item2.DepartmentId)} />
 Write:  <input type="checkbox" name={`test[${index}].write`}  ref={register({})} onClick={()=>getId(item2.DepartmentId)}/>
 
   <input type="submit" value="Assign"  onClick={()=>getId(item2.DepartmentId)} />
 </form> 
  
  </li>;
})}
</ul>
 
 :
 null
}


{
sessionStorage.section == "admin/agent" ||  sessionStorage.section == "supervisor/agent" ?

<ul>
{
departList.length > 0 && departList.map(function(item2,index) {
  return <li key={item2}>{item2.DeptName}

    <form onSubmit={handleSubmit(onSubmit)}>
    <input name={`test[${index}].id`}  defaultValue={item2.DepartmentId} disabled ref={register({})} />
 
 
   <input type="submit" value="Assign"  onClick={()=>getId(item2.DepartmentId)}  />
 </form> 
  
  </li>;
})}
</ul>
 
 :
 null



}



</div>



          </div>



      </div>
   
  )
}


