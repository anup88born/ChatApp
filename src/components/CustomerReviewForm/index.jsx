import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';


function CustomerFeedback()
{
    
    return(
        <div className="customerFeedback">
            <div className="customerFeedback-header">
                <div style={{fontSize:'12px', fontFamily:'ProximaNova', color:'white'}}>
                    Billing and Payments
                </div>
                <div>
                <div style={{fontSize:'16px', fontFamily:'ProximaNova', color:'white'}}>You have ended the chat
                 <span style={{float:'right'}}><ExpandMoreIcon/></span><span style={{float:'right'}}><ClearIcon/> </span>
                 </div>
                </div>
                </div>
                <div className="customerFeedback-body">
                <div className="customerFeedback-box">
                    <div style={{marginLeft:'43%'}}>
                        <img src="/assets/img/CustomerFeedback.svg" style ={{height:'30px', width: '30px'}}/> 
                    </div>
                    <div style={{marginLeft:'24%'}}>
                        <span style={{fontSize:'12px', fontFamily:'ProximaNova'}}>Help us build eShift better</span>
                    </div>
                    <div style={{marginLeft:'17%'}}>
                        <span style={{fontSize:'12px', fontFamily:'ProximaNova'}}>We would appriciate your feedback</span>
                    </div>
                    <div className="Feedback-box">
                    <div>
                        <span style={{fontSize:'12px', fontFamily:'ProximaNova'}}>Is this the first time you have chatted with us  about this case/issue</span>
                    </div>
                    <div>
                        <span><Button variant="outlined" style={{width:'30%'}}>No</Button>&nbsp; &nbsp;<Button variant="outlined"  style={{width:'30%'}}>Yes</Button></span>
                    </div>

                    <div>
                        <span style={{fontSize:'12px', fontFamily:'ProximaNova'}}>Was the issue resolved during the chat?</span>
                    </div>
                    <div>
                        <span><Button variant="outlined" style={{width:'30%'}}>No</Button>&nbsp; &nbsp;<Button variant="outlined" style={{width:'30%'}}>Yes</Button></span>
                    </div>

                    <div>
                        <span style={{fontSize:'12px', fontFamily:'ProximaNova'}}>How would you rate this chat?</span>
                    </div>
                    <div>
                        <span><Button variant="outlined" style={{width:'30%'}}><ThumbDownAltIcon/></Button>&nbsp; &nbsp;<Button variant="outlined" style={{width:'30%'}}><ThumbUpAltIcon/></Button></span>
                    </div>

                </div>
                <div style={{marginTop:'2%'}}> 
                    <Button variant="contained" style={{backgroundColor:'#47afaf', color:'white', width:'99%'}}>Submit</Button>
                </div>

                </div>
                
                </div>

            </div>

        
    );

}


export default CustomerFeedback;