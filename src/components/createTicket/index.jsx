import React,{useState,useEffect,useContext} from 'react'
import axios from "axios";
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PdfPreview from '../pdfPreview';
import { useForm } from 'react-hook-form'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import CloseIcon from '@material-ui/icons/Close';



const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);


const useStyles = makeStyles(theme => ({
  
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
    root: {
     
        display: 'flex',
        alignItems: 'center',
        // width: 590,
    height: 45,     
   },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        fontFamily: "ProximaNova",
        fontSize: "15px",
        fontWeight: "normal",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: 1.2,
        letterSpacing: "normal",
        textAlign: "left",
        color: "#1d1d1d",
        padding: "11px 0 8px !important",
       
      },
      rootDescription:
      {
        height: "100px",
        padding: "50px 0 0 10px"
      },
      iconButton: {
        padding: 10,
      },
    
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
     
      boxShadow: theme.shadows[3],
      padding: theme.spacing(2, 4, 3),
      width:650,
      borderRadius: "17px",
      backgroundColor: "#ffffff",
    },
  }));

export default function CreateTicket(props) {

    const classes = useStyles();
    const { register, handleSubmit, watch, errors } = useForm()
    const token = JSON.parse(sessionStorage.userData).idToken.jwtToken
    const accesstoken = JSON.parse(sessionStorage.userData).accessToken.jwtToken
    const [priority, setPriority] = React.useState('0');
  const [fileName,setFileName] = useState('')
  
    const [ticketSubject, setTS] = React.useState('');
    const [ticketDescription, setTD] = React.useState('');
const[oldTicket,setOldTicket] = useState(false)

const[newTicket,setNewTicket] = useState(true)
    const [commodity, setCommodity] = React.useState('0');
    const [department, setDepartment] = React.useState('0');
    const [type, setType] = React.useState('0');
    const [openPdf, setOpenPdf] = useState(false);
const [ticketDetails,setTicketDetails] = useState()
    const handleTS = event => {
      setTS(event.target.value);
    };

    const handleTD = event => {
      setTD(event.target.value);
    };

    const handleP = event => {
      setPriority(event.target.value);
    };

    const handleC = event => {
      setCommodity(event.target.value);
    };
    const handleT = event => {
      setType(event.target.value);
    };
    const handleD = event => {
      setDepartment(event.target.value);
    };
  const onSubmit = data => { 
  console.log(data)
   console.log(props.customerData)


   
    let json ={
      "CustomerName": props.customerData.customerName,
      "CustomerEmailId":props.customerData.customerEmailId,
      "AgentEmailId": props.customerData.agentEmailId,
      "CustomerConnectionId":props.customerData.connectionId,
      "AgentConnectionId":props.customerData.AgentConnectionId,
      "ConversationId": props.customerData.AgentConnectionId+'-'+props.customerData.connectionId,
      "TicketSubject":ticketSubject,
      "Priority":priority,
      "Description":ticketDescription,
      "Type":type,
      "DepartmentName":props.customerData.departmentName,
      "DepartmentId":props.customerData.departmentId,
      "Commodity": commodity,
      "CreatedBy": props.customerData.agentEmailId
      
     
    
  } 
if(sessionStorage.section === "agent")
{
  axios
  .post(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/ticket/create-ticket`,json,{
      headers: { "Authorization": token  }})
  .then(response => {
    console.log(response.data.data.TicketDetails)
     setTicketDetails(response.data.data.TicketDetails)
     handleOpenPdf()
    //  props.end()
    // alert("Success")
      
  })
  .catch(error => {
     
     
  })


}
 
   
}

const onNewTicket = ()=>
{
  if(newTicket === false)
  {
setOldTicket(false)
  }
  else
  {
    setOldTicket(true)
  }
setNewTicket(!newTicket)

}


const onOldTicket = ()=>
{
  if(oldTicket === false)
  {
setNewTicket(false)
  }
  else
  {
    setNewTicket(true)
  }


  setOldTicket(!oldTicket)
}

const  previewFile = (e)=>{
    
  const file = e.target.files[0];
  console.log(file)
  if (file) {
    setFileName(file.name)
    console.log("filename",file.name)
    let fileName = file.name;
    let fileType = file.type;
  
    const reader = new FileReader();
    console.log("qqq",reader);
    
    reader.readAsDataURL(e.target.files[0]);
   
    reader.onload = () => {
      let fileDataUri = reader.result;
      console.log("eeee",fileDataUri)
    
      
      let base64File = fileDataUri.toString().split(',')[1];
      // setBaseFile(base64File)
      uploadFIle(base64File)
      console.log("base64",base64File)
    }
  } 
}
const uploadFIle =(base64File)=>
{
  let json= 
  {
    "TicketId":"SRS00027",
    "fileType":"pdf",
    "base64File": base64File

  }
  axios
  .post(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/ticket/upload-file`,json,{
      headers: { "Authorization": token  }})
  .then(response => {
     
 console.log(response)
      
  })
  .catch(error => {
     
     
  })
}

const handleOpenPdf = () => {
  setOpenPdf(true);
};

const handleClosePdf = () => {
  setOpenPdf(false);
};

  return (
    <>
    <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    className={classes.modal}
    open={props.open}
    onClose={props.handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={props.open}>
      <div className={classes.paper}>


<form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">

<div className="col-md-3">

<h2 id="transition-modal-title" className="ctHead">Create Ticket</h2>
  </div>


  <div className="col-md-3">

  <span> <FormGroup row>
     
     <FormControlLabel
       control={
         <Checkbox
           checked={newTicket}
           onChange={onNewTicket}
           name="checkedB"
           color="primary"
         />
       }
       label="New Ticket"
       className="ct-txt"
     />
     </FormGroup>
     </span>
    </div>


    <div className="col-md-4">
    <span> <FormGroup row>
     
     <FormControlLabel
       control={
         <Checkbox
           checked={oldTicket}
           onChange={onOldTicket}
           name="checkedB"
           color="primary"
         />
       }
       label="Update Existing"
       className="ct-txt"
     />
     </FormGroup>
     </span>
    </div>

    <div className="col-md-2">
    <h2 id="transition-modal-title" className="closeBtn">
 <CloseIcon style={{color:'#47afaf'}}/>
</h2>
    </div>

   


        </div>
        <div className="row">
{oldTicket === true ?
 <> <div className="col-md-4 ctTxt">
Existing Ticket ID
</div>
<div className="col-md-8 ctTxt">
Ticket Subject
</div>
</>
:

<div className="col-md-12 ctTxt">
Ticket Subject
</div>

}

        </div>
     
        <div className="row">
{oldTicket === true ?
<>
  <div className="col-md-4">
<Paper component="form" className={classes.root}>
    
      <InputBase
        className={classes.input}
        placeholder=""
        inputProps={{ 'aria-label': '' }}
        onChange={handleTS}
        disabled={true}
        value={ticketDetails && ticketDetails.TicketId}
      />
  
    </Paper>

</div>
      
<div className="col-md-8">
<Paper component="form" className={classes.root}>
    
      <InputBase
        className={classes.input}
        placeholder="Refund Request for the caution deposit amount"
        inputProps={{ 'aria-label': 'Refund Request for the caution deposit amount' }}
        onChange={handleTS}
        value={ticketSubject}
      />
  
   
      <IconButton color="primary" className={classes.iconButton} aria-label="directions">
     
      <FormControl className={classes.margin}>
        {/* <InputLabel id="demo-customized-select-label">Age</InputLabel> */}
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          className="ctSelect"
          value={priority}
          onChange={handleP}
          input={<BootstrapInput />}
         
        >
          <MenuItem value="0">
            <em>Select Priority</em>
          </MenuItem>
          <MenuItem value="Priority 1">Priority 1</MenuItem>
          <MenuItem value="Priority 2">Priority 2</MenuItem>
          <MenuItem value="Priority 3">Priority 3</MenuItem>
        </Select>
      </FormControl>

      </IconButton>
    </Paper>

</div>
      
</>
:

<div className="col-md-12">
<Paper component="form" className={classes.root}>
    
      <InputBase
        className={classes.input}
        placeholder="Refund Request for the caution deposit amount"
        inputProps={{ 'aria-label': 'Refund Request for the caution deposit amount' }}
        onChange={handleTS}
        value={ticketSubject}
      />
  
   
      <IconButton color="primary" className={classes.iconButton} aria-label="directions">
     
      <FormControl className={classes.margin}>
        {/* <InputLabel id="demo-customized-select-label">Age</InputLabel> */}
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          className="ctSelect"
          value={priority}
          onChange={handleP}
          input={<BootstrapInput />}
         
        >
          <MenuItem value="0">
            <em>Select Priority</em>
          </MenuItem>
          <MenuItem value="Priority 1">Priority 1</MenuItem>
          <MenuItem value="Priority 2">Priority 2</MenuItem>
          <MenuItem value="Priority 3">Priority 3</MenuItem>
        </Select>
      </FormControl>

      </IconButton>
    </Paper>

</div>
      


}
  </div>

        <div className="row">

<div className="col-md-12 ctTxt">
Description

</div>
        </div>

        <div className="row">
          <div className="col-md-12">
          <Paper component="form" className={classes.rootDescription}>
    
    <InputBase
      className={classes.input}
      placeholder="Type a Description"
      inputProps={{ 'aria-label': 'Description' }}
      onChange={handleTD}
        value={ticketDescription}
    />
{oldTicket === true ?
<>
<span className="attach" onClick={()=>document.getElementById("file-pdf").click()}> <span><img src="/assets/img/paperclip (1).svg"  className="ct-img" /></span>{fileName ? fileName: "Attach the file"}</span>   
<input type="file" onChange={previewFile} id="file-pdf"  accept=".pdf"  style={{visibility:"hidden"}} />
</>
 :
 null
}

  </Paper>
          </div>
        </div>


        <div className="row">

<div className="col-md-12 ctTxt1">
Ticket Type
</div>
</div>


<div className="row">

<div className="col-md-4 ctTxt">
Commodity
</div>
<div className="col-md-4 ctTxt">
Department
</div>
<div className="col-md-4 ctTxt">
Type
</div>
</div>
     

<div className="row">

<div className="col-md-4 ctTxt">
<FormControl className={classes.margin}>
        {/* <InputLabel id="demo-customized-select-label">Age</InputLabel> */}
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={commodity}
          onChange={handleC}
          input={<BootstrapInput />}
          
        >
          <MenuItem value="0">
            <em>Select Commodity</em>
          </MenuItem>
          <MenuItem value="Commodity 1">Commodity 1</MenuItem>
          <MenuItem value="Commodity 2">Commodity 2</MenuItem>
          <MenuItem value="Commodity 3">Commodity 3</MenuItem>
        </Select>
      </FormControl>
</div>
<div className="col-md-4 ctTxt">
<FormControl className={classes.margin}>
        {/* <InputLabel id="demo-customized-select-label">Age</InputLabel> */}
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={department}
          onChange={handleD}
          input={<BootstrapInput />}
         
        >
          <MenuItem value="0">
            <em>Select Department</em>
          </MenuItem>
          <MenuItem value="Department 1">Department 1</MenuItem>
          <MenuItem value="Department 2">Department 2</MenuItem>
          <MenuItem value="Department 3">Department 3</MenuItem>
        </Select>
      </FormControl>
</div>
<div className="col-md-4 ctTxt">
<FormControl className={classes.margin}>
        {/* <InputLabel id="demo-customized-select-label">Age</InputLabel> */}
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={type}
          onChange={handleT}
          input={<BootstrapInput />}
         
        >
          <MenuItem value="0">
            <em>Select Type</em>
          </MenuItem>
          <MenuItem value="Type 1">Type 1</MenuItem>
          <MenuItem value="Type 2">Type 2</MenuItem>
          <MenuItem value="Type 3">Type 3</MenuItem>
        </Select>
      </FormControl>
</div>
</div>


<div className="row">

<div className="col-md-12 ctTxt1 ctBtnMain">
<button className="ctBtn" onClick={onSubmit}>Submit</button>
{/* <input type="submit" className="ctBtn"/> */}
</div>
</div>
</form>
      </div>
    </Fade>
  </Modal>
  
  <PdfPreview open={openPdf}  handleOpen={handleOpenPdf} handleClose={handleClosePdf} chatData={props.chatData} ticketDetails={ticketDetails} />
  </>
  )
}


