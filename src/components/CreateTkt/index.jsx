import React,{useState,useEffect,useContext} from 'react'
import axios from "axios";
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useForm } from 'react-hook-form'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { store } from '../../store';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import CloseIcon from '@material-ui/icons/Close';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
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
    // fontFamily: [
    //   '-apple-system',
    //   'BlinkMacSystemFont',
    //   '"Segoe UI"',
    //   'Roboto',
    //   '"Helvetica Neue"',
    //   'Arial',
    //   'sans-serif',
    //   '"Apple Color Emoji"',
    //   '"Segoe UI Emoji"',
    //   '"Segoe UI Symbol"',
    // ].join(',')
    fontFamily: "ProximaNovaThin",
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
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    display: 'flex',
    alignItems: 'center',
    // width: 590,
    height: 45,     
  },
  input: {
    width: "100%",
    marginLeft: theme.spacing(1),
    flex: 1,
    fontFamily: "ProximaNovaThin",
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
  descriptioninput:
  {
    width: "95%",
    marginLeft: theme.spacing(1),
    flex: 1,
    fontFamily: "ProximaNovaThin",
    fontSize: "15px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.2,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#1d1d1d",
	border: "0",
	height: "auto !important",
	overflowY: "scroll !important",
    padding: "11px 0 8px !important",
    wordWrap: 'break-word'
  },
  rootDescription:
  {
    height: "110px",
    padding: "20px 0 0 10px",
    wordWrap: 'break-word'
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

export default function CreateTkt(props) {
  console.log("ticketStatus:",props.ticketStatus)
  const classes = useStyles();
  const globalState = useContext(store);
  const { dispatch } = globalState;
  
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState(0);
  const [emailId, setEmailId] = useState("");
  const [priority, setPriority] = React.useState('0');
  const [fileName,setFileName] = useState('')
  const [ticketSubject, setTS] = React.useState('');
  const [ticketDescription, setTD] = React.useState('');
  const [commodity, setCommodity] = React.useState('0');
  const [department, setDepartment] = React.useState('0');
  const [deptId, setDeptId] = React.useState('0');
  const [departList,setDepartList] = useState([])
  const [commodityList,setCommodityList] = useState([])
  // const [type, setType] = React.useState('0');
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [okClick, setOkClick] = React.useState(false);
  const [error, setError] = React.useState("");
  const [openPopup,setOpenPopup] = useState(false)
const[txt,setTxt] = useState('')
const [baseFile,setBaseFile] = useState()
const [severity,setSeverity] = useState("success")

  const { register, handleSubmit, watch, errors } = useForm()
  const token = JSON.parse(sessionStorage.userData).idToken.jwtToken
  const accesstoken = JSON.parse(sessionStorage.userData).accessToken.jwtToken
  const agentEmail = JSON.parse(sessionStorage.userData).idToken.payload.email
  const agentName = JSON.parse(sessionStorage.userData).idToken.payload.name
  const supervisorName = JSON.parse(sessionStorage.userData).idToken.payload.username

useEffect(()=>{
getDepartment()
getCommodity()
},[])

  const getDepartment = () =>
  {
    if( sessionStorage.section == "agent")
    {
    axios
    .get(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/transfer-chat/get-department-list`,{
      headers: { "Authorization":token   }})
    .then(response => {
        //  dispatch({ type: 'FETCH_DEPARTMENTLIST', payload: response.data.data })
        setDepartList(response.data.data.MainData)
       
    //  setDepartment(props.agentDetails.Department_details && props.agentDetails.Department_details[0].DeptName)
    //  console.log(supervisorList,"list");
    })
    .catch(error => {
        // dispatch({ type: 'FETCH_ERROR',payload: error })
        // console.log(globalState.state.post,"validateUser");
        // history.push("createUser")
        // alert("Please try again")
    })
  
  }
  if( sessionStorage.section == "supervisor")
  {
  axios
  .get(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/chat-supervisor/department/get-department-list`,{
    headers: { "Authorization":token   }})
  .then(response => {
      //  dispatch({ type: 'FETCH_DEPARTMENTLIST', payload: response.data.data })
      setDepartList(response.data.data.MainData)
   
  //  console.log(supervisorList,"list");
  })
  .catch(error => {
      // dispatch({ type: 'FETCH_ERROR',payload: error })
      // console.log(globalState.state.post,"validateUser");
      // history.push("createUser")
      // alert("Please try again")
  })

}
  }

  const getCommodity = () =>
  {
    if( sessionStorage.section == "agent")
    {
    axios
    .get(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/chat-agent/commodity-list/get-commodity-list`,{
      headers: { "Authorization":token   }})
    .then(response => {
        //  dispatch({ type: 'FETCH_DEPARTMENTLIST', payload: response.data.data })
        setCommodityList(response.data.data.MainData)
       
    //  setDepartment(props.agentDetails.Department_details && props.agentDetails.Department_details[0].DeptName)
    //  console.log(supervisorList,"list");
    })

  
  }
  if( sessionStorage.section == "supervisor")
  {
  axios
  .get(`https://50zqi5mghk.execute-api.us-west-1.amazonaws.com/dev/customer/get-commodity-list`,{
    headers: { "Authorization":token   }})
  .then(response => {
      //  dispatch({ type: 'FETCH_DEPARTMENTLIST', payload: response.data.data })
      setCommodityList(response.data.data.MainData)
   
  //  console.log(supervisorList,"list");
  })
 

}
  }
  const handleTS = event => {
    setTS(event.target.value)
  }
  const handleMobileNumber = event => {
    setMobileNumber(event.target.value)
  }
  const handleEmail = event => {
    setEmailId(event.target.value)
  }  
  const handleCustomerName = event => {
    setCustomerName(event.target.value);
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
  // const handleT = event => {
  //   setType(event.target.value);
  // };
  const handleD = event => {
    setDepartment(event.target.value);
    setDeptId(event.currentTarget.id);
  };
  const onSubmit = data => { 
    if (
      customerName.length <= 1 ||
      emailId.length <= 1 ||
      mobileNumber.length <= 1 || 
      priority.length <= 1 || 
      ticketSubject.length <= 1 ||
      ticketDescription.length <= 1 || 
      commodity.length <= 1 || 
      department.length <= 1  
      ){
        setError("Please enter required fields!");  
      }
    if (
      customerName.length >= 1 ||
      emailId.length >= 1 ||
      mobileNumber.length >= 2 && 
      priority.length >= 1 && 
      ticketSubject.length >= 1 &&
      ticketDescription.length >= 1 && 
      commodity.length >= 1 && 
      department.length >= 1
    ) {
      setError("");
    }  
 
      
  
    if(sessionStorage.section === "agent")
    {
      let json ={
        "CustomerName": customerName,
        "AgentName":agentName,
        "AgentEmailId": emailId,
        "CustomerPhoneNumber":mobileNumber,
        "TicketId": props.id,
        "CustomerEmailId": emailId,
        "TicketSubject": ticketSubject,
        "Priority": priority,
        "Description": ticketDescription,
        "DepartmentName": department,
        "DepartmentId": deptId,
        "Commodity": commodity,
        "CreatedBy": agentEmail,
        "fileType": "pdf", //optional
        "base64File":baseFile
    
      } 
      axios
      .post(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/ticket/create-direct-ticket`,json,{
          headers: { "Authorization": token  }})
      .then(response => {
        props.getTicketList(sessionStorage.agentDetails)
        props.handleClose()
        clearFields()
        handleClose()
        setOpenPopup(true)
     setTxt("Ticket created successfully")
        // setMsg(response.data.data.MainData)
        // console.log("after sending response: ",response.data)
      })
    }
    if(sessionStorage.section === "supervisor")
    {
      let json ={
        "CustomerName": customerName,
        "SupervisorName":props.agentDetails.Profile_details && props.agentDetails.Profile_details.Items[0].FirstName,
        "SupervisorEmailId": props.agentDetails.Profile_details && props.agentDetails.Profile_details.Items[0].EmailId,
        "CustomerPhoneNumber":mobileNumber,
        "TicketId": props.id,
        "CustomerEmailId": emailId,
        "TicketSubject": ticketSubject,
        "Priority": priority,
        "Description": ticketDescription,
        "DepartmentName": department,
        "DepartmentId": deptId,
        "Commodity": commodity,
        "CreatedBy": props.agentDetails.Profile_details && props.agentDetails.Profile_details.Items[0].EmailId,
        "fileType": "pdf", //optional
        "base64File":baseFile
    
      } 

      axios
      .post(`https://qx7yhdv5p4.execute-api.us-west-1.amazonaws.com/dev/ticket/create-direct-ticket`,json,{
          headers: { "Authorization": token  }})
      .then(response => {
        props.getTicketList(sessionStorage.agentDetails)
        props.handleClose()
        clearFields()
        handleClose()
        setOpenPopup(true)
        setTxt("Ticket created successfully")
        // setMsg(response.data.data.MainData)
        // console.log("after sending response: ",response.data)
      })
    }
  }
  const handleClosePopup = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenPopup(false);
   
  };
  const previewFile = (e)=>{
      
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
        setBaseFile(base64File)
        // uploadFIle(base64File)
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
  const handleClick = () => {
    // const json ={
    //   "DepartmentId": deptId,
    //   "TicketStatus": "In-Progress"
    // }
    // axios
    // .post(`https://l90fdmvs25.execute-api.us-west-1.amazonaws.com/dev/ticket/get-ticket-based-on-status`,json,{
    //   headers: { "Authorization":token  }})
    // .then(response => {
    //   dispatch({ type: 'FETCH_TICKET', payload: {
    //     status: response.data,
    //     clicked: true 
    //   }})        
    // })
    props.handleClose()
    clearFields()
    handleClose()
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const clearFields = () => {
    setCustomerName("")
    setMobileNumber(0)
    setEmailId("")
    setPriority("")
    setTS("")
    setTD("")
    setCommodity("")
    setDepartment("")
  }

  return (<>
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
            {/* Row 1 */}
            <div className="row">
              <div className="col-md-6">
                <h2 style={{textAlign: "left"}} id="transition-modal-title" className="ctHead">Create Ticket</h2>
              </div>
              <div className="col-md-6">
                <h2 onClick={props.handleClose} id="transition-modal-title" className="closeBtn">
                  <CloseIcon style={{color:'#47afaf'}}/>
                </h2>
              </div>
            </div>
            {/* Row 2 */}
            <div className="row">
              <> 
                <div className="col-md-4 ctTxt">
                  Ticket ID
                </div>
                <div className="col-md-4 ctTxt">
                  Customer Name
                </div>
                <div className="col-md-4 ctTxt">
                  Email ID
                </div>
              </>
            </div>
            {/* Row 2 */}
            <div className="row">
              <>
                <div className="col-md-4">
                  <Paper component="form" className={classes.root}>
                    {/* <InputBase
                      className={classes.input}
                      placeholder=""
                      inputProps={{ 'aria-label': '' }}
                      onChange={handleTS}
                      value={props.id}
                    />   */}
                    {props.id}                                        
                  </Paper>
                </div>
                <div className="col-md-4">
                  <Paper component="form" className={classes.root}>
                  <InputBase
                      className={classes.input}
                      placeholder=""
                      inputProps={{ 'aria-label': '' }}
                      onChange={handleCustomerName}
                      value={customerName}
                    />
                  </Paper>
                </div>
                <div className="col-md-4">
                  <Paper component="form" className={classes.root}>
                  <InputBase
                      className={classes.input}
                      placeholder=""
                      inputProps={{ 'aria-label': '' }}
                      onChange={handleEmail}
                      value={emailId}
                    />
                  </Paper>
                </div>
              </>
            </div>
            {/* Row 3 */}
             <div className="row">
              <> 
                <div className="col-md-6 ctTxt">
                  Mobile Number
                </div>
                <div className="col-md-6 ctTxt">
                  Priority
                </div>
              </>
            </div>
            {/* Row 3 */}
            <div className="row">
              <>
                <div className="col-md-6">
                  <Paper component="form" className={classes.root}>
                    <InputBase
                      type="number"
                      className={classes.input}
                      placeholder=""
                      inputProps={{ 'aria-label': '' }}
                      onChange={handleMobileNumber}
                      value={mobileNumber}
                    />
                  </Paper>
                </div>
                <div className="col-md-6">
                    <IconButton component="form" color="primary" className={classes.iconButton} aria-label="directions">
                      <FormControl className={classes.margin}>
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
                          <MenuItem value="High">High</MenuItem>
                          <MenuItem value="Medium">Medium</MenuItem>
                          <MenuItem value="Low">Low</MenuItem>
                          <MenuItem value="Escalated">Escalated</MenuItem>
                        </Select>
                      </FormControl>
                    </IconButton> 
                  
                </div>
              </>
            </div>
            {/* Row 4 */}
            <div className="row">
              <div className="col-md-12 ctTxt1">
                Ticket Type
              </div>
            </div>
            {/* Row 4 */}
            <div className="row">
              <div className="col-md-6 ctTxt">
                Commodity
              </div>
              <div className="col-md-6 ctTxt">
                Department
              </div>
            </div>
            {/* Row 4 */}
            <div className="row">
              <div className="col-md-6 ctTxt">
                <FormControl className={classes.margin}>
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
                    {commodityList.length>0 && commodityList.map((commodity)=>{
              return  <MenuItem value={commodity.CommodityName} >{commodity.CommodityName}</MenuItem>
            })}
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-6 ctTxt">
                <FormControl className={classes.margin}>
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={department}
                    onChange={handleD}
                    input={<BootstrapInput />}
                  
                  >
                     <MenuItem value="0">
              <b>Department</b>
            </MenuItem>
            {departList.length>0 && departList.map((depart)=>{
              return  <MenuItem value={depart.DeptName} id={depart.DepartmentId} >{depart.DeptName}</MenuItem>
            })}
                  </Select>
                </FormControl>
              </div>
            </div>
            {/* Row 5 */}
            <div className="row">
              <> 
                <div className="col-md-12 ctTxt">
                  Ticket Subject
                </div>
              </>
            </div>
            {/* Row 5 */}
            <div className="row">
              <>
                <div className="col-md-12">
                  <Paper component="form" className={classes.root}>
                    <InputBase
                      className={classes.input}
                      placeholder=""
                      inputProps={{ 'aria-label': '' }}
                      onChange={handleTS}
                      value={ticketSubject}
                    />
                  </Paper>
                </div>
              </>
            </div>
            {/* Row 6 */}
            <div className="row">
              <div className="col-md-12 ctTxt">
                Description
              </div>
            </div>
            {/* Row 6 */}
            <div className="row">
              <div className="col-md-12">
                <Paper component="form" className={classes.rootDescription}>
               
                   <TextareaAutosize
                   className={classes.descriptioninput}
                    placeholder="Type a Description"
                    inputProps={{ 'aria-label': 'Description' }}
                    onChange={handleTD}
                    value={ticketDescription}
                  />
                  <>
                    <span className="attach" onClick={()=>document.getElementById("file-pdf").click()}> <span><img src="/assets/img/paperclip (1).svg"  className="ct-img" /></span>{fileName ? fileName: "Attach the file"}</span>   
                    <input type="file" onChange={previewFile} id="file-pdf"  accept=".pdf"  style={{visibility:"hidden"}} />
                  </>
                </Paper>
              </div>
            </div>
            {/* Row 7 */}
            <div className="row">
              <div className="col-md-12 ctTxt1 ctBtnMain">
                <button className="ctBtn" onClick={onSubmit}>Submit</button>
                {
                  error.length != 0 ?
                  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                      This is a error message! {error}
                    </Alert>
                  </Snackbar> 
                  :
                  <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle id="alert-dialog-slide-title"></DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description">
                        {msg || "Hi"}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClick} color="primary">
                        Ok
                      </Button>
                    </DialogActions>
                  </Dialog>
                }
              </div>
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
     <Snackbar open={openPopup} autoHideDuration={3000} onClose={handleClosePopup}>
     <Alert onClose={handleClosePopup} severity={severity}>
      {txt}
     </Alert>
   </Snackbar> 
   </>
  )
}


 