
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ListAltIcon from '@material-ui/icons/ListAlt';

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
}));

export default function TicketInfo() {
  const classes = useStyles();

  return (
<div className={classes.root}>
    <div className="row">
      <div className="col-md-6">
      <span className="crmHead">Ticket Details</span>
      </div>

      <div className="col-md-6">
<img src="/assets/img/Group 134.svg" style={{float: "right"}} />
      </div>

   
    </div>
     <div className="row">
     <div className="col-md-12">
   
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Ticket Type</Typography>
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




        <ExpansionPanelDetails>
        <div className={classes.column}>
        <span className="crmInnerHead">Social Security Number</span>
         
          </div>
          <div className={classes.column}>
          <span className="crmInnerTxt" >2342-3423</span> 
          </div>


        
         
        </ExpansionPanelDetails>



        <ExpansionPanelDetails>
        <div className={classes.column}>
        <span className="crmInnerHead">Driving License</span>
         
          </div>
          <div className={classes.column}>
          <span className="crmInnerTxt" >123-34-2323</span> 
          </div>


        
         
        </ExpansionPanelDetails>















      </ExpansionPanel>


      </div>
      </div>
        <div className="row">
        <div className="col-md-12">
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Timeline of Conversation</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
   
    </div>
</div>
</div>
  );
}