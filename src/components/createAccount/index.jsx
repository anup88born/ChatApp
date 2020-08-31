import React,{useState,useEffect,useContext} from 'react'
import axios from "axios";

import { useForm } from 'react-hook-form'
// import './style.css';

import { store } from '../../store';
import { useHistory } from 'react-router-dom'




export default function CreateAccount() {

    const globalState = useContext(store);
    const { dispatch } = globalState;
    
  
   
    const [user, setUser] = useState({})  
  const { register, handleSubmit, watch, errors } = useForm()
  const history = useHistory()
// if(globalState.state.page && globalState.state.data)
// {
//   console.log(globalState.state.page,globalState.state.data.signInUserSession.idToken.payload.email)
// }
const token = JSON.parse(sessionStorage.userData).idToken.jwtToken
const emailId = JSON.parse(sessionStorage.userData).idToken.payload.email
  const onSubmit = data => { 
  
   
      setUser(data)
      let json ={
        "FirstName": user.firstname,
        "LastName": user.lastname,
        "EmailId": user.email,
        "PhoneNumber": user.phone,
        "CreatedBy": emailId,
        "Designation": "Dev"
      
    } 
  if(json.FirstName && json.EmailId && json.LastName && json.PhoneNumber)
  {
if(window.location.pathname == '/supervisor/create-account')
{
  axios
  .post(`https://9boms4jdg5.execute-api.us-west-1.amazonaws.com/dev/chat-admin/create-supervisor`,json,{
      headers: { "Authorization":token   }})
  .then(response => {
      dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
      console.log(globalState.state.post,"supervisor");
      // history.push("home")
      alert("Success, Kindly check your mailbox.")
  })
  .catch(error => {
      dispatch({ type: 'FETCH_ERROR',payload: error })
      console.log(globalState.state.post,"supervisor");
      // history.push("/")
      alert("Please try again")
  })
}
if(window.location.pathname == '/agent/create-account')
{
  if(sessionStorage.section == "admin")
  {
    axios
    .post(`https://9boms4jdg5.execute-api.us-west-1.amazonaws.com/dev/chat-admin/create-agent`,json,{
        headers: { "Authorization":token   }})
    .then(response => {
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
        console.log(globalState.state.post,"supervisor");
        // history.push("home")
        alert("Success, Kindly check your mailbox.")
    })
    .catch(error => {
        dispatch({ type: 'FETCH_ERROR',payload: error })
        console.log(globalState.state.post,"supervisor");
        // history.push("/")
        alert("Please try again")
    })
  }

  if(sessionStorage.section == "supervisor")
  {

    json ={
      "FirstName": user.firstname,
      "LastName": user.lastname,
      "EmailId": user.email,
      "PhoneNumber": user.phone,
      "CreatedBy": emailId,
      "Designation": "Dev"
    
  } 

    axios
    .post(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/chat-supervisor/create-agent`,json,{
        headers: { "Authorization":token   }})
    .then(response => {
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
        console.log(globalState.state.post,"supervisor");
        // history.push("home")
        alert("Success, Kindly check your mailbox.")
    })
    .catch(error => {
        dispatch({ type: 'FETCH_ERROR',payload: error })
        console.log(globalState.state.post,"supervisor");
        // history.push("/")
        alert("Please try again")
    })
  }



}

   
  
  
  }
   
     
   
   
}




  // console.log(watch('name')) // watch input value by passing the name of it

  return (
      <div className="container validateuser">
          <div className="row">

    <div className="col-md-12">
<h1 className="subject">Create Account</h1>
<form onSubmit={handleSubmit(onSubmit)}>
   
      <input name="firstname" placeholder="First Name"  ref={register} />
      <input name="lastname" placeholder="Last Name"  ref={register} />
      <input name="email" placeholder="Email Address" ref={register} />
      <input name="phone" placeholder="Phone Number" ref={register} />
      <input type="submit" />
    </form>

</div>



          </div>



      </div>
   
  )
}


