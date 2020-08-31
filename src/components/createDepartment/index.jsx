import React,{useState,useEffect,useContext} from 'react'
import axios from "axios";
import FileBase64 from 'react-file-base64';
import { useForm } from 'react-hook-form'
// import './style.css';

import { store } from '../../store';
import { useHistory } from 'react-router-dom'




export default function CreateDepartment() {

    const globalState = useContext(store);
    const { dispatch } = globalState;
    
  
   
    const [user, setUser] = useState({})  
     
    const [files, setFiles] = useState({})  
  const { register, handleSubmit, watch, errors } = useForm()
  const history = useHistory()

  const token = JSON.parse(sessionStorage.userData).idToken.jwtToken

  const onSubmit = data => { 
  
   
      setUser(data)
      let json ={
        "DeptName":user.dname,
        "CreatedBy": JSON.parse(sessionStorage.userData).idToken.payload.email,
        "City":user.city,
        "State": user.state,
        "Address":user.address,
        "fileType":files.type,
        "base64File":files.base64 // pass base64
      
    } 
  if(json.DeptName)
  {
if(sessionStorage.section == "admin")
{

  axios
  .post(`https://9boms4jdg5.execute-api.us-west-1.amazonaws.com/dev/chat-admin/department/create-department`,json,{
      headers: { "Authorization":token  }})
  .then(response => {
      dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
      console.log(globalState.state.post,"Department");
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

  axios
  .post(`https://9boms4jdg5.execute-api.us-west-1.amazonaws.com/dev/chat-admin/department/create-department`,json,{
      headers: { "Authorization":token  }})
  .then(response => {
      dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
      console.log(globalState.state.post,"Department");
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

const  getFiles = (data)=>{
  setFiles(data)
  console.log(files)
}



  // console.log(watch('name')) // watch input value by passing the name of it

  return (
      <div className="container validateuser">
          <div className="row">

    <div className="col-md-12">
<h1 className="subject">Create Department</h1>
<form onSubmit={handleSubmit(onSubmit)}>
   
      <input name="dname" placeholder="Department Name"  ref={register} />
      <input name="email" placeholder="Email Address" ref={register} />
      <input name="city" placeholder="City" ref={register} />
      <input name="state" placeholder="State" ref={register} />
      <input name="country" placeholder="Country" ref={register} />
      <input name="address" placeholder="Address" ref={register} />
      <FileBase64
        multiple={ false }
        onDone={getFiles } />

      <input type="submit" />
    </form>

</div>



          </div>



      </div>
   
  )
}


