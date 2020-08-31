import React,{useState,useEffect,useContext} from 'react';
// import {Link} from 'react-router';
import {Config, CognitoIdentityCredentials} from "aws-sdk";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js";

import axios from "axios";
import { useForm } from 'react-hook-form'
import { useHistory,Link } from 'react-router-dom'
import { store } from '../../store';
// import './style.css';

 

function ForgotPassword(props) {

console.log(props)
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const [user, setUser] = useState({})  
  const { register, handleSubmit, watch, errors } = useForm()

  const history = useHistory()



  const onSubmit = data => { 
  
    console.log(data) 

    let json = {
      
        "UserName":data.username
      
    
    }
  if(json.UserName)
  {
  
      axios
      .post(`https://9boms4jdg5.execute-api.us-west-1.amazonaws.com/dev/admin/forgot-password`,json,{
          headers: { "x-api-key":"M8ERLIMOxWauGlNt55cwi3IIwqaK2t5N1p8hIzcV" }})
      .then(response => {
          dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
          console.log(globalState.state.post,"validateUser");
          // history.push("home")
          alert("Success")
          // history.push("supervisor")
          
      })
      .catch(error => {
          dispatch({ type: 'FETCH_ERROR',payload: error })
          console.log(globalState.state.post,"validateUser");
          // history.push("createUser")
          alert("Please try again")
      })
   

  }
   
}




console.log(watch('username')) // watch input value by passing the name of it

  return (
      <div className="container validateuser">
          <div className="row">


<form onSubmit={handleSubmit(onSubmit)}>
    {/* register your input into the hook by invoking the "register" function */}
      <input name="username" placeholder="Username"  ref={register({ required: true })} />
      {errors.username && <span>This field is required</span>}
      {/* include validation with required or other standard HTML validation rules */}
   
   
      <input type="submit"/>
    </form>
  

          </div>



      </div>
   
  )
}

export default ForgotPassword;
