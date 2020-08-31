import React,{useState,useEffect,useContext} from 'react'
import axios from "axios";
import base64 from 'base-64';
import { useForm } from 'react-hook-form'
// import './style.css';

import { store } from '../../store';
import { useHistory } from 'react-router-dom'




export default function ResetPassword() {
 
    const globalState = useContext(store);
    const { dispatch } = globalState;
    
    const [user, setUser] = useState({})  
  const { register, handleSubmit, watch, errors } = useForm()
  const history = useHistory()

  const decodedData = base64.decode((window.location.hash).split("=")[1]);

  console.log(decodedData);


  const onSubmit = data => { 
  
   

    setUser(data)
    console.log(user) 

    let json = {
      
        "UserName":decodedData,
        "VerificationCode":user.code,
        "Password":user.password
    
    }
  if(json.UserName && json.VerificationCode && json.Password)
  {
    if(window.location.pathname == '/supervisor/reset-password')
    {
      axios
      .post(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/supervisor/reset-password`,json,{
          headers: { "x-api-key":"jg2tfzV0LA6Hjp3NJkL6n4hGsM37Q5JS3XgWc0ko" }})
      .then(response => {
          dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
          console.log(globalState.state.post,"validateUser");
          // history.push("home")
          alert("Success")
          history.push("supervisor")
          
      })
      .catch(error => {
          dispatch({ type: 'FETCH_ERROR',payload: error })
          console.log(globalState.state.post,"validateUser");
          // history.push("createUser")
          alert("Please try again")
      })
    }

    if(window.location.pathname == '/agent/reset-password')
    {
      axios
      .post(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/agent/reset-password`,json,{
          headers: { "x-api-key":"nbNX88qsrS7NI6mWDZBgW6sAMDSqiTfu9sBZ3GXJ" }})
      .then(response => {
          dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
          console.log(globalState.state.post,"validateUser");
       
          alert("Success")
          history.push("agent")
          
      })
      .catch(error => {
          dispatch({ type: 'FETCH_ERROR',payload: error })
          console.log(globalState.state.post,"validateUser");
          // history.push("createUser")
          alert("Please try again")
      })
    }


    if(window.location.pathname == '/admin/reset-password')
    {
      axios
      .post(`https://9boms4jdg5.execute-api.us-west-1.amazonaws.com/dev/admin/reset-password`,json,{
          headers: { "x-api-key":"M8ERLIMOxWauGlNt55cwi3IIwqaK2t5N1p8hIzcV" }})
      .then(response => {
          dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
          console.log(globalState.state.post,"validateUser");
       
          alert("Success")
          history.push("admin")
          
      })
      .catch(error => {
          dispatch({ type: 'FETCH_ERROR',payload: error })
          console.log(globalState.state.post,"validateUser");
          // history.push("createUser")
          alert("Please try again")
      })
    }

  }
   
}



  // console.log(watch('name')) // watch input value by passing the name of it

  return (
      <div className="container validateuser">
          <div className="row">

<div className="col-md-12">
<h1 className="subject">Reset Password</h1>
<form onSubmit={handleSubmit(onSubmit)}>
    {/* register your input into the hook by invoking the "register" function */}
      <input name="username" defaultValue={decodedData}  ref={register} disabled />
      <input name="code" placeholder="Verification code"  ref={register} />
      <input type="password" name="password" placeholder="New Password"  ref={register} />
      
      {/* include validation with required or other standard HTML validation rules */}
      <input type="password" name="cpassword" placeholder="Confirm Password" ref={register} />
      {/* errors will return when field validation fails  */}
      {errors.cpassword && <span>This field is required</span>}
      
      <input type="submit"/>
    </form>

</div>



          </div>



      </div>
   
  )
}


