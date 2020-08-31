import React,{useState,useEffect,useContext} from 'react'
import axios from "axios";

import { useForm } from 'react-hook-form'
// import './style.css';
import CloseIcon from '@material-ui/icons/Close';
import CustomerLogin from '../logins'
import { store } from '../../store';
import { useHistory } from 'react-router-dom'




export default function ValidateUser(props) {

    const globalState = useContext(store);
    const { dispatch } = globalState;
    
    const [user, setUser] = useState({})  
  const { register, handleSubmit, watch, errors } = useForm()
  const history = useHistory()
    



  console.log(watch('name')) // watch input value by passing the name of it
  var companyName='e-Shift';
  return (

    <div className="loginHome">
    <div className="customer-loginBox" style={{height:window.innerHeight}}>
        <div>
            <div className="customer-login-top">
            
                <div className="row"> 
                <div className="col-md-9">
                <span className="customer-login-heading">Login to chat with us</span>
                

                </div>

                <div className="col-md-3">
                <div className="customer-login-close" style={{float:"right"}} onClick={props.handleCloseLogin}><CloseIcon/></div> 
                </div>
                  
                </div>
            </div>
            <div>
                <CustomerLogin />
            </div>
            <div> 
            <div className="customer-login-logo"> <span className="agentProfile" />
          </div>
            <div className="customer-login-companyName"><span> Powered by {companyName}</span> </div> 

            </div>
        </div>
        </div>

</div>


//       <div className="container validateuser">
//           <div className="row">

// <div className="col-md-12">
// <h1 className="subject">Please fill below form to connect with our Agent</h1>
// <form onSubmit={handleSubmit(onSubmit)}>
    
//       <input name="name" placeholder="Name"  ref={register} />
      
    
//       <input name="email" placeholder="Email Address" ref={register({ required: true })} />
     
//       {errors.email && <span>This field is required</span>}
      
//       <input type="submit"/>
//     </form>

// </div>



//           </div>



//       </div>
   
  )
}


