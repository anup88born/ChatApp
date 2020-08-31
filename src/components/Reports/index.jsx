import React,{useState,useEffect,useContext} from 'react';

import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import ReactApexChart from 'react-apexcharts';
import CardContent from '@material-ui/core/CardContent';
import {
    RadialGauge
} from '@progress/kendo-react-gauges';



const useStyles = makeStyles((theme) => ({
    root: {
        
        fontFamily: 'ProximaNovaThin',
        borderRadius: '15px '
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      }
}));

const useStyles1 = makeStyles((theme)=>({


    root:{
        maxWidth:100,
        padding:'20px'
    },
}));

export default function Report() {


    const radialOptions = {
        value: 2.3,
        shape: 'line',
        scale: {
            minorUnit: 0,
            majorUnit: 3,
            max: 3,
            ranges: [
                { from: 0, to: 1, color: '#ffc700' },
                { from: 1, to:2, color: '#ff7a00' },
                { from: 2, to: 3, color: '#c20000' }
            ]
        }
    };

  const classes = useStyles();
  const classes1 = useStyles1();
  const token = JSON.parse(sessionStorage.userData).idToken.jwtToken
  const [chartDetails, setchartDetails] = React.useState({
    Agents: [{
      name:"Active Tickets",
        data: [44, 55, 41, 64, 22, 43, 21]
      }, {
        name:"Tickets Resolved",
        data: [53, 32, 33, 52, 13, 44, 32]
      }],
      options: {
        chart: {
          type: 'bar',
          height: 300
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: 'top',
            },
          }
        },
        // dataLabels: {
        //   enabled: true,
        //   offsetX: -6,
        //   style: {
        //     fontSize: '12px',
        //     fontFamily: 'ProximaNova',
        //     colors: ['#fff']
        //   }
        // },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff']
        },
        xaxis: {
          categories: ['Billing', 'Support','Payments', 'Refunds', 'Complaints', 'Complaints', 'Complaints'],
        },
        colors: ['#47afaf', '#1e3574'],
        
      },
    } );
    const [ticketsData,setTicketData] =useState([])

    const [reportData,setReportData] = useState({})

useEffect(()=>
{
  getReports()
},[])

  const getReports = () =>
  {
  let json = 
  {
    "DepartmentId": "DEPT1"
  }

   if( sessionStorage.section == "supervisor")
   {
    axios
    .post(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/chat-supervisor/reports/get-reports`,json,{
      headers: { "Authorization":token   }})
    .then(response => {
        // dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
        setReportData(response.data.data)
        const ClosedTickets=[],ticketActive=[]; 
        for(let t=0;t<response.data.data.HigherToLowerTickets.length;t++)
        {
          if(response.data.data.HigherToLowerTickets[t].ClosedTickets)
          {
            ClosedTickets.push(response.data.data.HigherToLowerTickets[t].ClosedTickets)
          }
          else{
            ClosedTickets.push(0)
          }
         if(response.data.data.HigherToLowerTickets[t].ActiveTickets)
         {
          ticketActive.push(response.data.data.HigherToLowerTickets[t].ActiveTickets)
         }
         else
         {
          ticketActive.push(0)
         }
         
          
        }
       
console.log(ClosedTickets,ticketActive,"ticketData")
const agentData = [{ClosedTickets},{ticketActive}]
setTicketData(agentData)
     console.log(reportData,"list");
    })
    .catch(error => {
        // dispatch({ type: 'FETCH_ERROR',payload: error })
        // console.log(globalState.state.post,"validateUser");
        // history.push("createUser")
        // alert("Please try again")
    })
   }

   

  }


  
  function ReportHeader() {
    return (
      <React.Fragment>
        <Grid item xs={3}>
        <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings" style={{padding: '10px'}}>
            <img src="/assets/img/Report-Chats.svg" style={{height:'70px', width:'70px'}} />
          </IconButton>
        }
        title={reportData.TotalActiveChats}
        subheader="Active Chats"
      />
     
    </Card>
        </Grid>
        <Grid item xs={3}>
        <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings" style={{padding: '10px'}}>
            <img src="/assets/img/Reports-Queued.svg" style={{height:'70px', width:'70px'}}/>
          </IconButton>
        }
        title="21"
        subheader="Queued Chats"
      />
     
    </Card>
        </Grid>   
        <Grid item xs={3}>
        <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings" style={{padding: '10px'}}>
            <img src="/assets/img/Reports-Online.svg" style={{height:'70px', width:'70px'}}/>
          </IconButton>
        }
        title={reportData.TotalAgentsOnline}
        subheader="Agents Online"
      />
     
    </Card>
        </Grid>
        <Grid item xs={3}>
        <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings" style={{padding: '10px'}}>
            <img src="/assets/img/Reports-Escalated.svg" style={{height:'70px', width:'70px'}}/>
          </IconButton>
        }
        title={reportData.TotalEscalatedTickets}
        subheader="Escalated Tickets"
      />
     
    </Card>
        </Grid>     
      </React.Fragment>
    );
  }

  function ReportBody()
  {
      return(
          <React.Fragment>
              <Grid item xs={4}>
                  <Card>
                      <CardHeader 
                      title="First Chat Resolution (FCR)">
                          
                      </CardHeader>
                      <CardContent>
                          <div style={{padding:'20px', border:'1px solid #f2fafd', backgroundColor:'#f2fafd', borderRadius:'10px'}}>
                              <div className="row">
                              <div style={{padding:'5px'}}> 
                              <img src="/assets/img/Reports-FCR.svg" style={{height:'70px', width:'70px'}}/>
                              </div>
                              <div style={{padding:'10px'}}>
                                 <div> <h3>64.7%</h3></div>
                                 <div style={{fontWeight:'lighter'}}>Chats answered in the first minute</div> 
                                  </div>
                                  </div>
                          </div>
                          <div className="row" >
                              <div style={{float:'left', width:'40%',padding:'10px'}}>
                                  <div>
                                      <h3>31</h3>
                                  </div>
                                  <div style={{float:'left'}}>
                                      Answered within the first minute

                                      </div>  
                              </div>
                              <div style={{float:'right', width:'40%',padding:'10px'}}>
                                  <div>
                                      <h3>31</h3>
                                  </div>
                                  <div style={{float:'left'}}>
                                      Answered within the first minute

                                      </div>  
                              </div>
                          </div>
                          <div>
                              <div>
                                  <span style={{fontWeight: "bolder"}}>Average Handle Time</span>
                              </div>
                            <div><RadialGauge {...radialOptions} /></div>  
                          </div>


                      </CardContent>

                  </Card>

              </Grid>
              <Grid item xs ={6}>
              <Card>
                  <CardHeader
                  subheader="Highest to Lower tickets"
                  > 

                  </CardHeader>
                <CardContent>
               <ReactApexChart options={chartDetails.options} series={chartDetails.Agents} type="bar" height={430} />
               </CardContent>
               </Card>
              
               </Grid>
              
              
          </React.Fragment>
      );
  }

  return (
    <div className={classes.root} style={{backgroundColor:'#f2f4f5',width: '90%',
    margin: '30px 50px'}}>
      <Grid container spacing={3}>
        {/* <Grid container item xs={12} spacing={3}> */}
          <ReportHeader />
        {/* </Grid> */}
        {/* <Grid container item xs={12} spacing={}> */}
            <ReportBody/>
        {/* </Grid> */}
       
      </Grid>
    </div>
  );
}

