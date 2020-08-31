import React,{useState,useEffect,useContext} from 'react'
import axios from "axios";

import { useForm } from 'react-hook-form'
// import './style.css';

import { store } from '../../store';
import { useHistory } from 'react-router-dom'




export default function CreateUser() {

    const globalState = useContext(store);
    const { dispatch } = globalState;
    
   

   
    const [user, setUser] = useState({})  
  const { register, handleSubmit, watch, errors } = useForm()
  const history = useHistory()
    


  const onSubmit = data => { 
    setUser(data)
    let json ={
      "FirstName": data.firstname,
      "LastName": data.lastname,
      "EmailId": data.email,
      "PhoneNumber": data.phone
    
  } 
if(json.FirstName && json.EmailId && json.LastName && json.PhoneNumber)
{
  axios
  .post(`https://50zqi5mghk.execute-api.us-west-1.amazonaws.com/dev/customer/customer-registration`,json,{
      headers: { "x-api-key":"trTGOhKSks3mHvsVvGlMl95tdmTSIDjT6fUxPlFK"   }})
  .then(response => {
      dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
      console.log("create user component: ",globalState.state.post,"validateUser");
      history.push("/home")
      
  })
  .catch(error => {
      dispatch({ type: 'FETCH_ERROR',payload: error })
      console.log(globalState.state.post,"validateUser");
      history.push("/")
  })


}
 
   
}




  console.log(watch('name')) // watch input value by passing the name of it

  return (
      <div className="container validateuser">
          <div className="row">

    <div className="col-md-12">
<h1 className="subject">Kindly complete your profile to connect with Agent</h1>
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


