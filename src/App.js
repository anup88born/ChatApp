import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Switch,Redirect,IndexRoute } from 'react-router-dom';
import Landing from './views/Landing';
import Home from './views/Home';
import CreateUser from './views/CreateUser';
import Agent from './views/Agent';
import Admin from './views/Admin';
import Supervisor from './views/Supervisor';
import ResetPassword from './components/resetPassword'
import CreateAccount from './components/createAccount'
import Dashboard from './components/dashboard'
import ForgotPassword from './components/forgotPassword'
import CreateDepartment from './components/createDepartment'
import ChangePassword from './components/changePassword'
import AssignDepartment from './components/assignDepartment'
import Test from './components/test'
import CreateTicket from './components/createTicket'
import TicketDetails from './components/TicketDetails';
import Reports from './components/Reports'
import CustomereviewForm from './components/CustomerReviewForm'
import CRMInfo2 from './components/CRMInfo2';
import VideoChat from './components/videoChat'

// import SupervisorDashboard from './components/supervisorDashboard'


function App() {
  return (
    <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/test" component={Test} />
    <Route  exact path="/createUser" component={CreateUser} />
    {/* <Route exact path="/createTicket" component={CreateTicket} /> */}
    <Route  exact path="/admin" component={Admin} />
    <Route  exact path="/dashboard" component={Dashboard} />
    <Route  exact path="/supervisor/login" component={Supervisor} />
    <Route  path="/supervisor/reset-password" component={ResetPassword} />
    {/* Route for the Reports screen */}
    <Route exact path="/reports" component={Reports} />
    {/* Route for the customer review form */}
    <Route exact path ="/customerreviewform" component ={CustomereviewForm} />
    {/* Route for teh CRM Info screen */}
    <Route  path="/crminfo" component={CRMInfo2} />
    <Route  path="/supervisor/assign-department" component={AssignDepartment} />
    {/* <Route  path="/supervisor/dashboard" component={SupervisorDashboard} /> */}

    {/* <Route exact path="/ticketDetails/:id" component={TicketDetails} />     */}
 
    {/* <Route exact path="/ticketDetails/:id" render={() => TicketDetails} /> */}
    <Route  path="/admin/reset-password" component={ResetPassword} />
    <Route  exact path="/supervisor/create-account" component={CreateAccount} />
    <Route  path="/agent/reset-password" component={ResetPassword} />
    <Route  exact path="/agent/create-account" component={CreateAccount} />
    <Route  exact path="/forgot-password" component={ForgotPassword} />
    <Route exact path="/agent/login" component={Agent} />
    <Route exact path="/videoChat" component={VideoChat} />

    <Route exact path="/admin/change-password" component={ChangePassword} />
    <Route exact path="/admin/create-department" component={CreateDepartment} />

    <Redirect to="/#/" />
  </Switch>
   
  );
}

export default App;
