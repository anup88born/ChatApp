import React, { useState } from 'react';

import { Link } from 'react-router-dom'
import  ValidateUser  from '../../components/validateUser';


function Landing() {
  const [isOpen,setIsOpen] = useState(false)
  const handleOpenLogin = ()=>
  {
setIsOpen(true)
  }
  const handleCloseLogin = ()=>
  {
    setIsOpen(false)
  }
  const navbar = (
    <>
    <nav class="navbar navbar-expand-lg navbar-light ">
      <li class="nav-item ">
        <Link class="nav-link" to="/agent/login">Agent Login</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/supervisor/login">Supervisor Login</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="" onClick={handleOpenLogin}>Customer Login</Link>
      </li>
  </nav> 
  </>
  ) 
  return (<>
    <div className="bgImage" style={{height:window.innerHeight}}>
    {navbar}
    </div>

   
 { isOpen === true ?
  <ValidateUser  handleOpenLogin={handleOpenLogin} handleCloseLogin={handleCloseLogin} />
  :
  null
   
 }  
     
    
     </>
  );
}

export default Landing;
