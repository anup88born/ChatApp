 
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ListAltIcon from '@material-ui/icons/ListAlt';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Chip from '@material-ui/core/Chip';
import Chart from './Charts.jsx'
import Switch from '@material-ui/core/Switch';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Bar } from "react-chartjs-2";
import { Scrollbars } from 'react-custom-scrollbars';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
 
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: "15px",
    paddingRight: 0,
    backgroundColor: "#ffffff",
  },
  column: {
    flexBasis: '50%',
    
  },
  heading: {
    fontFamily: "ProximaNova",
  fontWeight: "bold",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: 0.95,
  letterSpacing: "normal",
  textAlign: "left",
  color: "#1d1d1d",
     fontSize: theme.typography.pxToRem(14),
    
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }
}));
 
export default function CrmInfo() {
  const [tabs, setTabs] = React.useState(true);
  const [custTab, setcustTab] = React.useState(true);
  const [serTab, setserTab] = React.useState(false);

  const handleChangeTabs = (event) => {
    setTabs(!tabs);
    setcustTab(!custTab);
    setserTab(!serTab);
  };
  const handleChangeTabs1 =  (event) => 
  {
    setTabs(!tabs);
    setcustTab(!custTab);
    setserTab(!serTab);
  };
  
  const [state, setState] = React.useState({
    
    checkedB: true,
    
    checkedD : true
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleChange1 = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  function CustomerInfoIcon()
  {
    if (handleChangeTabs1 === 'true')
    {
      return ({backgroundColor:'#47afaf'});
    }
    else
    {
      return({backgroundColor:'#606060'});
    }
  }


  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: 'rgba(35, 49, 86, 0.8)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };
  
  const CustomScrollbars = props => (
    <Scrollbars
      renderThumbHorizontal={renderThumb}
      renderThumbVertical={renderThumb}
      {...props}
    />
  );
  
  const[charts, setCharts] = React.useState(
    {
   data: {
     labels: [
       "Jan",
       "Feb",
       "Mar",
       "Apr",
       "May",
       "Jun",
       "Jul"
     ],
     datasets: [
       {
         label: "Account ID 123-677-567",
         backgroundColor: "#11CDEF",
         borderColor: "#11CDEF",
         borderWidth: 1, 
         cornerRadius: 20,
         //stack: 1,
        //  hoverBackgroundColor: "rgba(255,99,132,0.4)",
        //  hoverBorderColor: "rgba(255,99,132,1)",
         data: [65, 59, 80, 81, 56, 55, 40]
       },
  
       {
         
         label: "Account ID 124-687-967",
         backgroundColor: "#7764E4",
         borderColor: "#7764E4",
         borderWidth: 1,
         //stack: 1,
        //  hoverBackgroundColor: "rgba(255,99,132,0.4)",
        //  hoverBorderColor: "rgba(255,99,132,1)",
         data: [45, 79, 50, 41, 16, 85, 20]
       },
       {
         label: "Account ID 126-687-887",
         backgroundColor: "#2DCE98",
         borderColor: "#2DCE98",
         borderWidth: 1,
         //stack: 1,
        //  hoverBackgroundColor: "rgba(255,99,132,0.4)",
        //  hoverBorderColor: "rgba(255,99,132,1)",
         data: [45, 79, 50, 41, 16, 85, 20]
       }
     ]
   }
  
  });
  
 
  const options = {
    responsive: true,
    cornerRadius: 20,
    legend: {
      display: false
    },
    type: "bar", 
    animation: {
      duration: 0 // general animation time
  },
  hover: {
      animationDuration: 0 // duration of animations when hovering an item
  },
  responsiveAnimationDuration: 0 // animation duration after a resize
    //   scales: {
    //     xAxes: [{
    //         stacked: true
    //     }],
    //     yAxes: [{
    //         stacked: true
    //     }]
    // }
  };

  const classes = useStyles();
  function ServiceInfo()
  {
    return(
      
        <React.Fragment style={{ overflow: 'auto', overflowY: 'scroll',
        overflowX: 'hidden'}} >

    {/* Services */}
    <div >
    <div className="row" style={{padding:'2%'}}>
     <div className="col-md-12">
       
     <div className="crmInfo-Services">
               <span className="crmInfo-Contract" style={{padding:'1%'}}>Services</span> 
               <div className="crmInfo-ServiceBox" >
                   <div className="crmInfo-ServiceAddress"> 
                    <div className="crmInfo-AccountNumber" >Account ID 123-677-567 &nbsp; &nbsp; <span className="crmInfo-dot" style={{backgroundColor:"#2dce98"}}/> &nbsp;Active </div>
                    <div style={{float:'right'}}>
                    
                 
                <ExpandMoreIcon
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                     aria-expanded={expanded}
               aria-label="show more"
                
                
                />
                 





                    </div>
                    <div className="crmInfo-Address"><span>CA 17th Congressional District,</span><span className="crmInfo-County">&nbsp;Napa County</span></div> 
                   </div>
                    </div>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <div className="crmInfo-ServiceBox" >
                     <div className="crmInfo-ServiceAddress"> 
                    <div className="crmInfo-AccountNumber" >Account ID 124-687-967 &nbsp; &nbsp; <span className="crmInfo-dot" style={{backgroundColor:"#2dce98"}}/> &nbsp;Active </div>
                    
                    <div className="crmInfo-Address"><span>Bay Area District,</span><span className="crmInfo-County">&nbsp;San Francisco County</span></div> 
                   </div>
                    </div>
                    <div className="crmInfo-ServiceBox" >
                     <div className="crmInfo-ServiceAddress"> 
                    <div className="crmInfo-AccountNumber" >Account ID 126-687-887 &nbsp; &nbsp; <span className="crmInfo-dot" style={{backgroundColor:"#2dce98"}}/> &nbsp;Active </div>
                    
                    <div className="crmInfo-Address"><span>Arizona District,</span><span className="crmInfo-County">&nbsp;Maricopa County</span></div> 
                   </div>
                    </div>
                    </Collapse>





                    </div>

    
      </div>
      </div>

      {/* Contract information */}

      <div className="row" style={{padding:'2%'}}>
      <div className="col-md-12">
      <div className="crmInfo-ContractInfo">
                   <div>
                   <span className="crmInfo-Contract"> 
                    Contract Information
                   </span>
                   </div>
                   <div style={{marginTop:'2%'}}>
                   <div className="crmInfo-Contracttext">Easy MaxLoyalty Duel Fuel</div>  
                   
                    <div className="crmInfo-Contracttext2">5.79¢/kWh 3 Year Fixed Electricity
                    <div style={{float:'right'}}><span>
                    <button className="crmInfo-ContractInfoButton">Active</button>
                    </span>
                    </div>
                    </div>
                    </div>
                      
                   
        </div>        
        </div>   
        </div>

{/* Commodity Information */}

  <div className="row" style={{padding:'2%'}}>
  <div className ="col-md-12">

  <div className="crmInfo-commodityInfo">
                 
                 <div>
                     <span className="crmInfo-Contract" style={{padding:'2%'}}>Commodity Information</span>
                 </div>
                 <div style={{ marginTop:'5%'}}>
                  <span> 
                 <button className="crmInfo-Electricity" style={{backgroundColor: '#e7f4f4',color:'#009ce8', fontFamily:'ProximaNovaThin'}} ><span><img src="/assets/img/light-bulb.svg" style={{height: '15%',width:'15%',BackgroundColor:'#009ce8'}}/></span>  Electricity</button> &nbsp; 
                 <button className="crmInfo-Water" style={{ fontFamily:'ProximaNovaThin'}}><span><img src="/assets/img/drop.svg" style={{height: '15%',width:'15%'}} /></span> Water</button> &nbsp; 
                 <button className="crmInfo-Gas" style={{ fontFamily:'ProximaNovaThin'}}><span><img src="/assets/img/fire.svg" style={{height: '17%',width:'17%'}} /></span>  Gas</button> &nbsp;
                 <button className="crmInfo-Sewage" style={{ fontFamily:'ProximaNovaThin'}}><span><img src="/assets/img/waste-sewer-svgrepo-com.svg" style={{height: '17%',width:'17%'}} /></span>Sewage</button> &nbsp; 
                 </span>
                 </div>
                 
                 <div className="crmInfo-Charts">
                     {/* <Chart/> */}
                     <Bar
        data= {charts.data}
        width={null}
        height={null}
        options={options}
      />
                 </div>
             </div>
  </div>
  </div>
  
  {/* Balance */}
  <div className="row" style={{padding:'2%', marginTop:'5%'}}>
     <div className="col-md-12">
   
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="crmInfo-Contract">Balance</div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <div className={classes.column}>
        <span className="crmInnerHead">Total Billing Amount</span>
         
          </div>
          <div className={classes.column}>
          <span className="crmInnerTxt" >$600</span> 
          </div>
 
 
        
         
        </ExpansionPanelDetails>
        <ExpansionPanelDetails>
        <div className={classes.column}>
        <span className="crmInnerHead">Last Billed Date</span>
         
          </div>
          <div className={classes.column}>
          <span className="crmInnerTxt"> Apr 20,2020</span> 
          </div>
 
 
        
         
        </ExpansionPanelDetails>
 
        <ExpansionPanelDetails>
        <div className={classes.column}>
        <span className="crmInnerHead">Last Payment Amount</span>
         
          </div>
          <div className={classes.column}>
          <span className="crmInnerTxt" >$600</span> 
          </div>
 
 
        
         
        </ExpansionPanelDetails>
        <ExpansionPanelDetails>
        <div className={classes.column}>
        <span className="crmInnerHead">Past Due Amount</span>
         
          </div>
          <div className={classes.column}>
          <span className="crmInnerTxt" >$600</span> 
          </div>
 
 
        
         
        </ExpansionPanelDetails>
 
 
        <ExpansionPanelDetails>
        <div className={classes.column}>
        <span className="crmInnerHead">Current Due Balance</span>
         
          </div>
          <div className={classes.column}>
          <span className="crmInnerTxt" >$0</span> 
          </div>
 
 
        
         
        </ExpansionPanelDetails>
 
 
 
 
        <ExpansionPanelDetails>
        <div className={classes.column}>
        <span className="crmInnerHead">Next Balance Due</span>
         
          </div>
          <div className={classes.column}>
          <span className="crmInnerTxt" >$600</span> 
          </div>
 
 
        
         
        </ExpansionPanelDetails>
      </ExpansionPanel>
 
 
      </div>
      </div>

{/* Credit and Collection */}
<div className="row" style={{padding:'2%', marginTop:'-3%'}}>
     <div className="col-md-12">
   
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
{/* 
Total Billing Amount $600
Last Billed Date Feb 14, 2020
Last Payment Amount $600
Past due Amount $600
Current Balance Due $0
Next Balance Due $600



Installments Mar 14,2020,$600
Budgets
Writeoffs
Collection Agency 
Bankruptices */}


          <div className="crmInfo-Contract">Credit and Collection</div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <div className={classes.column}>
        <span className="crmInnerHead">Installments</span>
         
          </div>
          <div className={classes.column}>
          <span className="crmInnerTxt">Apr 20,2020,$600</span> 
          </div>
 
 
        
         
        </ExpansionPanelDetails>
        <ExpansionPanelDetails>
        <div className={classes.column}>
        <span className="crmInnerHead">Budgets</span>
         
          </div>
          <div className={classes.column}>
          <span className="crmInnerTxt"> Apr 20,2020,$600</span> 
          </div>
 
 
        
         
        </ExpansionPanelDetails>
 
        <ExpansionPanelDetails>
        <div className={classes.column}>
        <span className="crmInnerHead">Writeoffs</span>
         
          </div>
          <div className={classes.column}>
          <span className="crmInnerTxt">Apr 20,2020,$600</span> 
          </div>
 
 
        
         
        </ExpansionPanelDetails>
        <ExpansionPanelDetails>
        <div className={classes.column}>
        <span className="crmInnerHead">Collection Agency</span>
         
          </div>
          <div className={classes.column}>
          <span className="crmInnerTxt">Apr 20,2020,$600</span> 
          </div>
 
 
        
         
        </ExpansionPanelDetails>

        <ExpansionPanelDetails>
        <div className={classes.column}>
        <span className="crmInnerHead">Bankruptices</span>
         
          </div>
          <div className={classes.column}>
          <span className="crmInnerTxt">Apr 20,2020,$600</span> 
          </div>
 
 
        
         
        </ExpansionPanelDetails>
 
 
      </ExpansionPanel>
 
 
      </div>
      </div>

{/* Payments */}
<div className="row" style={{padding:'2%', marginTop:'5%'}}>
<div className="col-md-12">
<div className="crmInfo-Balance">
        <div >
            <div><span className="crmInfo-Contract">Payments</span></div>
            
        </div>
        <div>
        <div className="row" style={{padding:'4%', marginLeft:'4%'}}>
                <div className="crmInfo-subHeadings2">Autopay</div><div className="crmInfo-balanceAmount2" style={{float:'right',marginTop:'-2%', marginLeft:'33%'}}>
                <Switch
        checked={state.checkedB}
        onChange={handleChange}
        color="primary"
        name="checkedB"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      /> {state.checkedB ? 'Enabled' : 'Disabled'}
                </div>
            </div>

            <div className="row" style={{padding:'4%', marginLeft:'4%'}}>
                <div className="crmInfo-subHeadings2">Budget Pay </div><div className="crmInfo-balanceAmount2" style={{float:'right',marginTop:'-2%', marginLeft:'24%'}}>

                <Switch
        checked={state.checkedD}
        onChange={handleChange1}
        color="primary"
        name="checkedD"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      /> {state.checkedD ? 'Enabled' : 'Disabled'}
                </div>
            </div>







           </div>
           </div>
           </div>
           </div>


           
           </div>

        </React.Fragment>
      
    );
  }
  
  function CustomerInfo()
  {
    return(
      <React.Fragment>
        <div className="row">
     <div className="col-md-12">
   
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="crmInnerMHead">General Details</div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <div className={classes.column}>
        <span className="crmInnerHead">Name</span>
         
          </div>
          <div className={classes.column}>
          <span className="crmInnerTxt" >Arpit Kalra</span> 
          </div>
 
 
        
         
        </ExpansionPanelDetails>
        <ExpansionPanelDetails>
        <div className={classes.column}>
        <span className="crmInnerHead">Customer ID</span>
         
          </div>
          <div className={classes.column}>
          <span className="crmInnerTxt" >123691</span> 
          </div>
 
 
        
         
        </ExpansionPanelDetails>
 
        <ExpansionPanelDetails>
        <div className={classes.column}>
        <span className="crmInnerHead">Phone Number</span>
         
          </div>
          <div className={classes.column}>
          <span className="crmInnerTxt" >+1 4930 383 2990</span> 
          </div>
 
 
        
         
        </ExpansionPanelDetails>
        <ExpansionPanelDetails>
        <div className={classes.column}>
        <span className="crmInnerHead">Email ID</span>
         
          </div>
          <div className={classes.column}>
          <span className="crmInnerTxt" >arpit.jjbytes@gmail.com</span> 
          </div>
 
 
        
         
        </ExpansionPanelDetails>
 
 
        <ExpansionPanelDetails>
        <div className={classes.column}>
        <span className="crmInnerHead">Mailing Address</span>
         
          </div>
          <div className={classes.column}>
          <span className="crmInnerTxt" >16, Balentine Drive,<br />
                                         Thunderbay, Canada</span> 
          </div>
 
 
        
         
        </ExpansionPanelDetails>
 
 
 
 
 
 
 
 
      </ExpansionPanel>
 
 
      </div>
      </div>
        <div className="row">
        <div className="col-md-12">
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <div className="crmInnerMHead">Timeline of Conversation</div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography >
           <span className="crmInnerTime">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur.</span> 
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
   
    </div>
</div>

      </React.Fragment>
    );
  }


  return (
<div className={classes.root+" "+"crmInfo"}>
    <div className="row " style={{padding: '13px 0 16px 0'}}>
      <div className="col-md-6">
      <span className="crmHead">CRM Information</span>
      </div>
 
      <div className="col-md-3">
{/* <PersonOutlineIcon style={{ color: " #009ce8",marginLeft: "25%" }} /> */}
{/* <img src="/assets/img/CRM Info - Customer Info.svg" style={{ color: " #009ce8",marginLeft: "25%" }} className="imgsize1" onClick={handleChangeTabs1} />*/}



{/* <PersonIcon 
onClick={handleChangeTabs1}
style={{fill: custTab? '#47afaf': '#606060'}}
 /> */}
<img  src = {custTab? '/assets/img/CRM Info - Customer Info.svg' : '/assets/img/CRM Info - Customer Info Inactive.svg'} className="crmicon" onClick={handleChangeTabs1}
 style={{marginLeft:'32%'}}/>
<p className="crmP " style={{color: custTab? '#009ce8': '#606060'}}>Customer Info</p>
      </div>
 
      <div className="col-md-3">
{/* <ListAltIcon style={{ color: " #009ce8",marginLeft: "20%" }} /> 



selectedColor

*/}
{/* <img src="/assets/img/CRM Info - Service Info Inactive.svg" style={{ Backgroundcolor: " #009ce8",marginLeft: "20%" }} className="imgsize1" onClick={handleChangeTabs}/> */}
<img src = {serTab? '/assets/img/CRM Info - Service Info.svg' : '/assets/img/CRM Info - Service Info Inactive.svg'} className="crmicon" onClick={handleChangeTabs} style={{marginLeft:'25%'}}/> 
<p className="crmP"   style={{color: serTab? '#009ce8': '#606060'}}>Service Info</p>
      </div>
    </div>
    <div>
    {/* {tabs ? <CustomerInfo/> : <ServiceInfo style={{ overflowY: 'scroll',
    overflowX: 'hidden'}}/>} */}
    {tabs ? <CustomerInfo/> :  <ServiceInfo/>}
    </div>







</div>
  );
}
