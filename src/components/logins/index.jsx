import React,{useState,useEffect,useContext} from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import Chekcbox from '@material-ui/core/Checkbox';
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { useForm } from 'react-hook-form'
import { store } from '../../store';
import { useHistory } from 'react-router-dom'
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

 
function CustomerLogin()
{
    const globalState = useContext(store);
    const { dispatch } = globalState;
    
    const [user, setUser] = useState({})  
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [openPopup,setOpenPopup] = useState(false)
const[txt,setTxt] = useState('')
const [severity,setSeverity] = useState("success")
  const { register, handleSubmit, watch, errors } = useForm()
  const history = useHistory()
    
const onName = (e)=>
{
setName(e.target.value)
}


const onEmail = (e)=>
{
setEmail(e.target.value)
}
  const onSubmit = () => { 
    
    // setUser(data)
    // console.log(data) 
   

    let json = {
        "UserName": name,
        "EmailId": email
    }
  if(json.UserName && json.EmailId)
  {
    axios
    .post(`https://50zqi5mghk.execute-api.us-west-1.amazonaws.com/dev/customer/customer-pre-check`,json,{
        headers: { "x-api-key":"trTGOhKSks3mHvsVvGlMl95tdmTSIDjT6fUxPlFK"  }})
    .then(response => {
      if(response.data.data.MainData === "Customer Multiple Log-in")
      {
        setOpenPopup(true)
        setSeverity("error")
        setTxt("Customer already logged in")
      }
     else if(response.data.data.MainData === "Customer not Exist")
     {
     
      history.push("createUser")
     
     }
      else{
        {
          console.log(response.data.data.MainData,"response")
          dispatch({ type: 'FETCH_SUCCESS', payload: response })
          sessionStorage.setItem("customerData",JSON.stringify(json))
          console.log(globalState.state.post,"validateUser");
        
          history.push("home")
         }
      } 
    })
    .catch(error => {
      
        console.log(error.type,"Multiple log-in");
        // history.push("createUser")
    })


  }
   
}

const handleClosePopup = (event, reason) => {
 
  if (reason === 'clickaway') {
    return;
  }
  setOpenPopup(false);
 
};

  console.log(watch('name'))
    return(
        <>
        <div> 
       <form onSubmit={handleSubmit(onSubmit)}>
                
                <div className="Login-email" name="name"> 
                <TextField id="outlined-basic" label="Name" variant="outlined" name="name" value={name} onChange={onName} />
                </div>
                <div className="Login-password"   name="email">
                <TextField
                 id="outlined-password-input"
                 label="Email"
                 name="email"
                 type="email"
                 autoComplete="current-password"
                 variant="outlined" value={email} onChange={onEmail} />
                </div>
                <div className="row"> 
                    <div className="col-md-5 login-keepLogin"> 
                        <Chekcbox /><span>Keep me logged in.</span>
                    </div>
                    <div className="col-md-7 login-forgotPassword">
                        <span>Forgot password?</span>
                    </div>
                </div>
                <div> 
              
                    <button className = "agentLogin-submitButton" style={{width:"95%"}} onClick={onSubmit}>Login</button>
                </div>
            </form>

        </div>
                    <NotificationContainer/>
                    <Snackbar open={openPopup} autoHideDuration={3000} onClose={handleClosePopup}>
       <Alert onClose={handleClosePopup} severity={severity}>
        {txt}
       </Alert>
     </Snackbar> 
                    </>    );
}

export default CustomerLogin;
