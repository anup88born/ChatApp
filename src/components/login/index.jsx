import React,{useState,useEffect,useContext} from 'react';
// import {Link} from 'react-router';
import {Config, CognitoIdentityCredentials} from "aws-sdk";
// import * as AWS from 'aws-sdk/global';
// import 'cross-fetch/polyfill';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoRefreshToken,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from "axios";
import { useForm } from 'react-hook-form'
import { useHistory,Link } from 'react-router-dom'
import { store } from '../../store';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import Chekcbox from '@material-ui/core/Checkbox';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// import './style.css';

let appConfig,userPool;
// appConfig = {
//   region: 'us-west-2',
//   IdentityPoolId: 'us-west-2:9f8588a1-0656-46ad-8c05-aac9c02243c8',
//   UserPoolId: 'us-west-2_Ipx1Fs8S2',
//   ClientId: '1hdf7i0af0fur257u2jib4b5lh',
 
// };



 

function Login(props) {

console.log(props)
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const [user, setUser] = useState({})  
  const [ email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const { register, handleSubmit, watch, errors } = useForm()
  const [openPopup,setOpenPopup] = useState(false)
  const[txt,setTxt] = useState('')
  const [severity,setSeverity] = useState("")
  const history = useHistory()

  // const token = JSON.parse(sessionStorage.userData).idToken.jwtToken

useEffect(()=>{
//   if(token)
//   {
  serverSetup()
// let pool = await userPool
// console.log(pool)
// history.push('admin/dashboard')
//   }
})

const serverSetup = () =>
{


if((window.location.hash).split("/")[1] == "admin")
{
 
   appConfig = {
    region: 'us-west-2',
    IdentityPoolId: 'us-west-2:9f8588a1-0656-46ad-8c05-aac9c02243c8',
    UserPoolId: 'us-west-2_Ipx1Fs8S2',
    ClientId: '1hdf7i0af0fur257u2jib4b5lh',
   
  };
  Config.region = appConfig.region;
  Config.credentials = new CognitoIdentityCredentials({
    IdentityPoolId: appConfig.IdentityPoolId
  });
  
  
   userPool = new CognitoUserPool({
    UserPoolId: appConfig.UserPoolId,
    ClientId: appConfig.ClientId,
  });

}
if((window.location.hash).split("/")[1] == "agent")
{
   appConfig = {
    region: 'us-west-2',
    IdentityPoolId: 'us-west-2:9f8588a1-0656-46ad-8c05-aac9c02243c8',
    UserPoolId: 'us-west-2_pDEhPkScp',
    ClientId: '5l8leuufqobfeoci045ges46tu',
   
  };
  Config.region = appConfig.region;
Config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: appConfig.IdentityPoolId
});


 userPool = new CognitoUserPool({
  UserPoolId: appConfig.UserPoolId,
  ClientId: appConfig.ClientId,
});


}

if((window.location.hash).split("/")[1] == "supervisor")
{

   appConfig = {
    region: 'us-west-2',
    IdentityPoolId: 'us-west-2:9f8588a1-0656-46ad-8c05-aac9c02243c8',
    UserPoolId: 'us-west-2_JCaCZFtnV',
    ClientId: '741glq7lgs1oe20ashc1j46gh9',
   
  };
  Config.region = appConfig.region;
  Config.credentials = new CognitoIdentityCredentials({
    IdentityPoolId: appConfig.IdentityPoolId
  });
  
  
   userPool = new CognitoUserPool({
    UserPoolId: appConfig.UserPoolId,
    ClientId: appConfig.ClientId,
  });
 
}

}
const goToPage = async (link)=>{



//  await dispatch({ type: 'FETCH_ADMIN', payload: props })
  

// console.log(globalState.state.data.authData)

history.push(link)
  
}
  // console.log(props.authData.signInUserSession.idToken.jwtToken)
  const onEmail = (e)=>
  {
    e.preventDefault()
  setEmail(e.target.value)
  }
  const onPassword = (e)=>
{
  e.preventDefault()
setPassword(e.target.value)
}
  const onSubmit = () => { 
    if(userPool)
    {


  
    // setUser(data)
    // console.log(data) 
    const authenticationData = {
      Username: email,
      Password:  password,
  };
  
    const authenticationDetails = new AuthenticationDetails(
     authenticationData
    );
    // const attributeList = [
    //   new CognitoUserAttribute({
    //     Username: 'username',
    // Pool: userPool
       
    //   })
    // ];
    var userData = {
      Username : email,
      Pool : userPool
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
          // var accessToken = result.getRefreshToken();
    //       cognitoUser.getSession()
    // console.log(cognitoUser.getSession(),"getSession")
          // console.log(result)
       
          sessionStorage.setItem('userData',JSON.stringify(result))
          sessionStorage.setItem('agentStatus',"Online")
          //  dispatch({ type: 'FETCH_ADMIN', payload: result })
          //  window.location.href="/#/dashboard"
          window.location.href="/#/dashboard"
          setTimeout(()=>{
          window.location.reload()
        },2000)
        setInterval(()=>
        {
          onSession()
        },400000)
      },
      onFailure: function(err) {
        // alert(err);
        setOpenPopup(true)
        setSeverity("error")
      setTxt("Please enter valid credentials")
      },
  
    })
  }
  else
  {
    setOpenPopup(true)
    setSeverity("error")
  setTxt("Please enter valid credentials")
  }
}

const onSession = ()=>
{
  var refreshToken = JSON.parse(sessionStorage.userData).refreshToken.token;
  var token = new CognitoRefreshToken({ RefreshToken: refreshToken })
  const cognitoUser = userPool.getCurrentUser();

  cognitoUser.refreshSession(token, function (err, session) {
    console.log(err, session,"SessionTImeout");
    sessionStorage.setItem('userData',JSON.stringify(session))
    sessionStorage.setItem('agentStatus',"Online")
    // var idToken = session.getIdToken().getJwtToken();
})
//   var poolData = {
//     UserPoolId: 'us-west-2_pDEhPkScp', // Your user pool id here
//     ClientId: '5l8leuufqobfeoci045ges46tu', // Your client id here
// };
// var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
// var cognitoUser = userPool.getCurrentUser();
 
// if (cognitoUser != null) {
//   cognitoUser.getSession(function(err, session) {
//       if (err) {
//           alert(err.message || JSON.stringify(err));
//           return;
//       }
//       console.log('session validity: ' + session.isValid());

//       // NOTE: getSession must be called to authenticate user before calling getUserAttributes
//       cognitoUser.getUserAttributes(function(err, attributes) {
//           if (err) {
//               // Handle error
//           } else {
//              console.log(attributes,"attributes")
//           }
//       });

//       AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//           IdentityPoolId: 'us-west-2:9f8588a1-0656-46ad-8c05-aac9c02243c8', // your identity pool id here
//           Logins: {
//               // Change the key below according to the specific region your user pool is in.
//               'cognito-idp.us-west-2.amazonaws.com/us-west-2_pDEhPkScp': session
//                   .getIdToken()
//                   .getJwtToken(),
//           },
//       });

//       // Instantiate aws sdk service objects now that the credentials have been updated.
//       // example: var s3 = new AWS.S3();
//   });
// }
}

const handleClosePopup = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpenPopup(false);
};
console.log(watch('username')) // watch input value by passing the name of it

  return (
    <div> 
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="Login-email" > 
          <TextField id="outlined-basic" label="Email Address" variant="outlined" name="email" value={email} onChange={onEmail} />
        </div>
        <div className="Login-password"   name="password">
          <TextField
            id="outlined-password-input"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            variant="outlined" value={password} onChange={onPassword} 
          />
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
        {/* <div>
          <Link to="/forgot-password" ><span >Forgot Password?</span></Link>
          <input type="submit"/>
        </div> */}
      </form>
      <Snackbar open={openPopup} autoHideDuration={6000} onClose={handleClosePopup}>
                    <Alert onClose={handleClosePopup} severity={severity}  >
                     {txt}
                       {/* {error} */}
                    </Alert>
                  </Snackbar> 
    </div>
  )
}
//       <div className="container validateuser">
//           <div className="row">

// <form onSubmit={handleSubmit(onSubmit)}>
  
//       <input name="username" placeholder="Username"  ref={register({ required: true })} />
//       {errors.username && <span>This field is required</span>}
     
//       <input type="password" name="password" placeholder="Password" ref={register({ required: true })} />
     
//       {errors.password && <span>This field is required</span>}
      

//      <Link to="/forgot-password" ><span >Forgot Password?</span></Link>
//       <input type="submit"/>
//     </form>
  

//           </div>



//       </div>

   
  


export default Login;
