import React, {useState} from 'react';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AssignmentIcon from '@material-ui/icons/Assignment';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Chip from '@material-ui/core/Chip';
import Switch from '@material-ui/core/Switch';

function createData(accountNumber,status,district,county)
{
    return{accountNumber,status,district,county};
}

const Customer= [
    createData('123-789-890', 'Active', 'California 17th Congressional District','Santa Clara County'),
    createData('783-759-000', 'Active', 'California 17th Congressional District','Nevada County'),
    createData('553-749-320', 'Active', 'California 17th Congressional District','Napa County')

];
function CRMInfo2 ()
{
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedC: true,
        checkedD : true
      });
    
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };

      const handleChange1 = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };

      const [icon,setIcon] = React.useState(false);
  
 return (
     <div className="crmInfo-background">
     <div style={{float:'right'}} >
         <div className="crmInfo-Box"> 
            <div className="crmInfo-Body">
              
                <div className="row">
                    <div className="crmInfo-Heading">
                        <span style={{fontWeight:'bold'}}>CRM Information</span>
                    </div>
                    <div className="crmInfo-Icons">
                        <span> <PersonOutlineIcon/> </span>
                        <span className="crmInfo-Assignment"> <AssignmentIcon/></span> 
                    </div>
           </div>
           
           <div className="crmInfo-Services">
               <span className="crmInfo-Contract">Services</span> 
               <div className="crmInfo-ServiceBox">
                   <div className="crmInfo-ServiceAddress"> 
                    <div className="crmInfo-AccountNumber">Account ID 123-677-567 &nbsp; &nbsp; <span className="crmInfo-dot" style={{backgroundColor:"#2dce98"}}/> &nbsp;Active </div>
                    <div className="crmInfo-Address"><span style={{fontWeight:"bold"}}>California 17th Congressional District,</span><span style={{fontWeight:"lighter"}}>&nbsp;Napa County</span><span style={{float:"right"}}><KeyboardArrowDownIcon onClick={{}}/></span></div> 
                   </div>
                   
                    </div>
                    
                        </div> 
               <div className="crmInfo-ContractInfo">
                   <span className="crmInfo-Contract"> 
                    Contract Information
                   </span>
                   <div className="row"> 
                   <div>
                   <div className="crmInfo-Contracttext">Easy MaxLoyalty Duel Fuel</div> 
                    <div style={{fontSize:'12px', fontWeight:'lighter', marginLeft:'16px'}}>5.79¢/kWh 3 Year Fixed Electricity</div>
                    </div>
                    <div style={{float:'right', marginLeft:'204px'}}><Chip size="small" label='Active' variant="outlined"/></div>   
                   </div>
               </div>
               <div className="crmInfo-commodityInfo">
                 
                       <div>
                           <span className="crmInfo-Contract">Commodity Information</span>
                       </div>
                       <div className="row" style={{marginLeft:'-1px', marginTop:'10px', marginLeft: '12px'}}>
                       <button className="crmInfo-Electricity" onclick={{backgroundColor: '#e7f4f4'}}><span><img src="/assets/img/light-bulb.svg" style={{ marginBottom: '3px',height: '16px'}}/></span>  Electricity</button> &nbsp; &nbsp;
                       <button className="crmInfo-Water"><span><img src="/assets/img/drop.svg" style={{ marginBottom: '3px',height: '16px'}}/></span> Water</button> &nbsp; &nbsp;
                       <button className="crmInfo-Gas"><span><img src="/assets/img/fire.svg" style={{ marginBottom: '3px',height: '16px'}}/></span>  Gas</button> &nbsp; &nbsp;
                       <button className="crmInfo-Sewage"><span><img src="/assets/img/waste-sewer-svgrepo-com.svg" style={{ marginBottom: '3px',height: '16px'}}/></span>  Sewage</button> &nbsp; &nbsp;
                       </div>
                       
                   </div>
`       <div className="crmInfo-Balance">
        <div className = "row">
            <div style={{float:'left', marginLeft:'16px'}}><span className="crmInfo-Contract">Balance</span></div>
            <div style={{float:'right', marginLeft:'330px'}}><KeyboardArrowDownIcon/></div>
        </div>
        <div>
            <div className="row">
                <div className="crmInfo-subHeadings">Total Billing Amount</div><div className="crmInfo-balanceAmount">$600</div>
            </div>

            <div className="row" >
                <div className="crmInfo-subHeadings">Last Billed Date </div><div className="crmInfo-balanceAmount">Feb 14, 2020</div>
            </div>
            <div className="row">
                <div className="crmInfo-subHeadings">Last Payment Amount</div><div className="crmInfo-balanceAmount">$600</div>
            </div>
            <div className="row">
                <div className="crmInfo-subHeadings">Past due Amount</div><div className="crmInfo-balanceAmount">$600</div>
            </div>
            <div className="row">
                <div className="crmInfo-subHeadings">Current Balance Due</div><div className="crmInfo-balanceAmount">$0</div>
            </div>
            <div  className="row">
                <div className="crmInfo-subHeadings">Next Balance Due</div><div className="crmInfo-balanceAmount">$600</div>
            </div >
        </div>

    
    
    </div>`

    <div className="crmInfo-Balance">
    <div className = "row">
            <div style={{float:'left', marginLeft:'12px'}}><span className="crmInfo-Contract">Credits and Collections</span></div>
            <div style={{float:'right', marginLeft:'200px'}}><KeyboardArrowDownIcon/></div>
        </div>
        <div style={{marginTop:'10px'}}>
            <div className="row">
                <div className="crmInfo-subHeadings1">Installments</div><div className="crmInfo-balanceAmount1">Mar 14,2020,$600</div>
            </div>

            <div className="row" >
                <div className="crmInfo-subHeadings1">Budgets </div><div className="crmInfo-balanceAmount1">Mar 14,2020,$600</div>
            </div>
            <div className="row">
                <div className="crmInfo-subHeadings1">Writeoffs</div><div className="crmInfo-balanceAmount1">Mar 14,2020,$600</div>
            </div>
            <div className="row">
                <div className="crmInfo-subHeadings1">Collection Agency </div><div className="crmInfo-balanceAmount1">Mar 14,2020,$600</div>
            </div>
            <div className="row">
                <div className="crmInfo-subHeadings1">Bankruptices</div><div className="crmInfo-balanceAmount1">Mar 14,2020,$600</div>
            </div>
        </div>
    </div>`


    <div className="crmInfo-Balance">
        <div className = "row">
            <div style={{float:'left', marginLeft:'16px'}}><span className="crmInfo-Contract">Payments</span></div>
            
        </div>
        <div>
            <div className="row">
                <div className="crmInfo-subHeadings2">Autopay</div><div className="crmInfo-balanceAmount2">
                <Switch
        checked={state.checkedB}
        onChange={handleChange}
        color="primary"
        name="checkedB"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      /> Enabled
                </div>
            </div>

            <div className="row">
                <div className="crmInfo-subHeadings2">Budget Pay </div><div className="crmInfo-balanceAmount2">

                <Switch
        checked={state.checkedD}
        onChange={handleChange1}
        color="primary"
        name="checkedD"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      /> Enabled
                </div>
            </div>




           </div>
           </div>
           </div>
         </div>
         </div>
         </div>
    
     
 );   
}


export default CRMInfo2;


