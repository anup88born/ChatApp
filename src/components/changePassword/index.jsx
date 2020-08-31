import React,{useState,useEffect,useContext} from 'react';
// import {Link} from 'react-router';


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
// useEffect(()=>{
//  dispatch({ type: 'FETCH_PAGE', payload: "admin" })

// console.log(globalState)
// })


const token = JSON.parse(sessionStorage.userData).idToken.jwtToken
const accesstoken = JSON.parse(sessionStorage.userData).accessToken.jwtToken
  // console.log(props.authData.signInUserSession.idToken.jwtToken)

  const onSubmit = data => { 
    console.log(globalState.state.data)
    console.log(data) 

    let json = {
      
      "AccessToken":accesstoken,
      "PreviousPassword":data.oldpassword,
      "ProposedPassword":data.newpassword
      
    
    }
  if(json.PreviousPassword)
  {
  
      axios
      .post(`https://9boms4jdg5.execute-api.us-west-1.amazonaws.com/dev/admin/change-password`,json,{
        headers: { "Authorization":token   }})
      .then(response => {
          dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
          console.log(globalState.state.post,"validateUser");
        
          alert("Success")
          history.push("admin")
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



  return (
      <div className="container validateuser">
          <div className="row">


<form onSubmit={handleSubmit(onSubmit)}>
    {/* register your input into the hook by invoking the "register" function */}
   
      <input type="password" name="oldpassword" placeholder="Old Password"  ref={register({ required: true })} />
      {/* {errors.oldpassword && <span>This field is required</span>} */}

      <input type="password" name="newpassword" placeholder="New Password"  ref={register({ required: true })} />
      {/* {errors.newpassword && <span>This field is required</span>} */}
   
      <input type="submit"/>
    </form>
  

          </div>



      </div>
   
  )
}

export default ForgotPassword;
