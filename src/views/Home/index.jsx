import React,{useEffect} from 'react';

import  ChatWindowUser  from '../../components/chatWindowUser';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function Home() {
 
useEffect(()=>{
if(sessionStorage.customerData)
{
  NotificationManager.success('Welcome Back, '+JSON.parse(sessionStorage.customerData).UserName);
}
},[])

    return (
    <div>

    <ChatWindowUser role="customer" />
    <NotificationContainer/>
    </div>
  );

}

export default (Home);
