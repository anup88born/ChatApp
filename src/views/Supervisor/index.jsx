import React, { useState,useEffect,useContext } from 'react';

import  Login  from '../../components/login';



function Supervisor(props) {


    useEffect(()=>{
        sessionStorage.setItem('section',"supervisor")
          },[])

    var ApplicationName  = 'e-Shift';
    return (
      <div className="agent-Login">
     
      
              <div className="row agent-Login-logo">
                 
                   <div className="col-md-12 col-12 agent-Login-name"><span>{ApplicationName}</span></div>
              </div>
              
          
          <div className="row agent-LoginBox">
              <div className="col-md-12 col-12">
                  <div><h2 className="agent-LoginHeading">Supervisor Login </h2> </div>
                  <div> 
                      <Login  title="Agent login"
        
        page="agent" />
                  </div>
              </div>
       
      </div>
  </div>
    
  );
}

export default Supervisor
