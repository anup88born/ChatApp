import React, {useState, useEffect,useContext} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import axios from "axios";
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import TicketDetails from '../TicketDetails';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

function createData(ticketNumber, customerName, department, subject, status, priority, requestedOn) {
  return { ticketNumber, customerName, department, subject, status, priority, requestedOn };
}
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
const getComparator= (order, orderBy)=> {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
const stableSort =(array, comparator)=> {
  const stabilizedThis = array && array.map((el, index) => [el, index]);
  stabilizedThis && stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis && stabilizedThis.map((el) => el[0]);
}
const headCells = [
  { id: 'ticketNumber', numeric: false, disablePadding: true, label: 'Ticket Number' },
  { id: 'customerName', numeric: false, disablePadding: true, label: 'Customer Name' },
  { id: 'department', numeric: false, disablePadding: true, label: 'Department' },
  { id: 'subject', numeric: false, disablePadding: true, label: 'Subject' },
  { id: 'status', numeric: false, disablePadding: true, label: 'Status' },
  { id: 'Owner', numeric: false, disablePadding: true, label: 'Assigned To' },
  { id: 'priority', numeric: false, disablePadding: true, label: 'Priority' },
 
  { id: 'requestedOn', numeric: false, disablePadding: true, label: 'Requested On' }
];
function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        
		{headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              className={classes.tableHeader}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
// const TableCell = withStyles({
//   root: {
//     borderBottom: '12px solid #F2F4F5',
//     padding: '5px'
//   }
// })(TableCell);
const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    backgroundColor: "#f2f4f5",
    margin: "0px"
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: "#f2f4f5"
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: "#f2f4f5",
        },
  title: {
    flex: '1 1 100%',
  },
}));
const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
     
    </Toolbar>
  );
};
EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',  
    marginBottom: theme.spacing(2),
    boxShadow: ' none !important'
  },
  table: {
    // width: "auto",
   
    height: "auto",
    color: "#1d1d1d",
    backgroundColor: "#f2f4f5",
    [theme.breakpoints.down("md")] : {
      width: "auto",
      color: "#1d1d1d",
      backgroundColor: "#f2f4f5"
  },
  [theme.breakpoints.down("xs")]: {
      width: "20em"
  },
    height: "auto"
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  tableRow: {
    fontFamily: "ProximaNovaThin",
    textTransform: "capitalize",
    // width: "130px",
     width: "auto",
    height: "3em",
    fontSize: "14px",
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "0.95",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#1d1d1d",
    backgroundColor: "#ffffff",
    borderRadius: "75%",
    whiteSpace: "nowrap",
    padding: '5px'
  },
  tableHeader: {
    fontFamily: "ProximaNova",
    // width: "135px",
    width: "auto",
    height: "19px",
    fontSize: "14px",
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "0.95",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#1d1d1d",
    // backgroundColor: "#f2f4f5",
  	paddingLeft: "0px",
	  whiteSpace: "nowrap",
    marginBottom: "6px"
  },
  ticketNumber: {
    width: "87px",
    height: "47px",
    fontFamily: "ProximaNova",
    fontssize: "14px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.21",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#1d1d1d",
    backgroundColor: "#ffffff",
    borderRadius: "45px"
  },
  department: {
    width: "87px",
    height: "47px",
    fontFamily: "ProximaNova",
    fontssize: "14px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.21",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#1d1d1d",
    backgroundColor: "#ffffff",
  },
  customerName: {
    width: "87px",
    height: "47px",
    fontFamily: "ProximaNova",
    fontssize: "14px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.21",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#1d1d1d",
    backgroundColor: "#ffffff"
  },
  subject: {
    width: "173px",
    height: "47px",
    fontFamily: "ProximaNova",
    fontsize: "14px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#1d1d1d",
    backgroundColor: "#ffffff"
  },
  ticketStatus: {
    width: "73px",
    height: "47px",
    fontFamily: "ProximaNova",
    fontsize: "14px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#1d1d1d",
    backgroundColor: "#ffffff"
  },
  priority: {
    width: "51px",
    height: "47px",
    fontFamily: "ProximaNova",
    fontsize: "14px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.21",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#606060",
    backgroundColor: "#ffffff"
  },
  requestedOn: {
    width: "139px",
    height: "47px",
    fontFamily: "ProximaNova",
    fontsize: "14px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#1d1d1d",
    backgroundColor: "#ffffff",
    borderRadius: "45px"
  }
}));

export default function EnhancedTable(props) {
  console.log("search props: ", props)
  const classes = useStyles();
  const token = JSON.parse(sessionStorage.userData).idToken.jwtToken
  const email = JSON.parse(sessionStorage.userData).idToken.payload.email
  const [ticketId,setTicketId] = useState("")
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(13);
  const [ticketList, setTicketList] = useState([])
  const [open, setOpen] = useState(false);
  const [detailPage,setDetailPage] = useState(false)
  // const [ticketStatus, setTicketStatus] = useState(props.ticketStatus)
 
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleOpen = (value) => {
   
    setTicketId(value)
    // setDetailPage(true)
    sessionStorage.setItem("detailPage",true)
  };
  const handleClose = () => {
  
    sessionStorage.setItem("detailPage",false)
    

  };
  useEffect(()=>{
    //  getTicketList()
  },[])
  // Get Ticket List API

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = ticketList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, name) => {
    event.preventDefault()
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows = (rowsPerPage - Math.min(rowsPerPage, props.ticketList.length - page * rowsPerPage)) || null;
  const all_table = (
    <React.Fragment>
      <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={ticketList.length}
            />
            <TableBody>
              {stableSort(ticketList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected();
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const all_table = (
                    <React.Fragment>
                      <TableRow
                      // className={classes.tableRow}
                      className="ticMgmt"
                      hover
                      onClick={(event) => handleClick(event, '')}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                    
                      <TableCell style={{textAlign: "left"}} component="th" id={labelId} scope="row" >
                        <a href="#" onClick={()=>handleOpen(row.TicketId)}>{row.TicketId}</a>
                      </TableCell>
                      <TableCell  component="th" id={labelId} scope="row" >{row.CustomerName}</TableCell>
                      <TableCell  component="th" id={labelId} scope="row" >{row.DepartmentName}</TableCell>
                      <TableCell  component="th" id={labelId} scope="row" >{row.TicketSubject}</TableCell>
                      <TableCell  component="th" id={labelId} scope="row" >{row.TicketStatus}</TableCell>
                      <TableCell  component="th" id={labelId} scope="row" >{row.Owner}</TableCell>
                      <TableCell  component="th" id={labelId} scope="row" >{row.Priority}</TableCell>
                      <TableCell  component="th" id={labelId} scope="row">
                        {new Intl.DateTimeFormat("en-GB", {
                            hour12: true,
                            timeZone: 'UTC',
                            hour: 'numeric',
                            minute: 'numeric',
                            year: "numeric",
                            month: "long",
                            day: "2-digit"                            
                          }).format(new Date(row.TS_Created))
                        }
                      </TableCell>
                    </TableRow> 
                    </React.Fragment>
                  )

                  return (
                    all_table
                  );
                })}
              {emptyRows > 0 && (
                <TableRow >
                  <TableCell colSpan={6} style={{borderBottom:'none'}} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[12, 24, 36]}
          component="div"
          count={ticketList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </React.Fragment>
  )
  const status_table = (
    <React.Fragment>
      <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.ticketList.length}
            />
            <TableBody>
              {stableSort(props.ticketList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected();
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const status_based_table = (
                    <React.Fragment>
                      <TableRow
                      disableTypography
                      className="ticMgmt"
                      hover
                      onClick={(event) => handleClick(event, '')}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      
                      <TableCell style={{textAlign: "left"}} component="th" id={labelId} scope="row" >
                        <a href="#" onClick={()=>handleOpen(row.TicketId)}>{row.TicketId}</a>
                      </TableCell>
                      <TableCell  component="th" id={labelId} scope="row" >{row.CustomerName}</TableCell>
                      <TableCell  component="th" id={labelId} scope="row" >{row.DepartmentName}</TableCell>
                      <TableCell  component="th" id={labelId} scope="row" >{row.TicketSubject}</TableCell>
                      <TableCell  component="th" id={labelId} scope="row" >{row.TicketStatus}</TableCell>
                      <TableCell  component="th" id={labelId} scope="row" >{row.Owner}</TableCell>
                      <TableCell  component="th" id={labelId} scope="row" >{row.Priority}</TableCell>
                      <TableCell  component="th" id={labelId} scope="row">
                        {new Intl.DateTimeFormat("en-GB", {
                            hour12: true,
                            timeZone: 'UTC',
                            hour: 'numeric',
                            minute: 'numeric',
                            year: "numeric",
                            month: "long",
                            day: "2-digit"                            
                          }).format(new Date(row.TS_Created))
                        }
                      </TableCell>

                    </TableRow>  
                    </React.Fragment>
                  )

                  return (
                    status_based_table
                  );
                })}
               {emptyRows > 0 && (
                <TableRow >
                  <TableCell colSpan={6} style={{borderBottom:'none'}} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[12, 24, 36]}
          component="div"
          count={props.ticketList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </React.Fragment>
  )
  const search_table = (
    <React.Fragment>
      <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.searchArray && props.searchArray.length}
            />
            <TableBody>
              {stableSort(props.searchArray, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected();
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const search_table = (
                    <React.Fragment>
                      <TableRow
                      className={classes.tableRow}
                      hover
                      onClick={(event) => handleClick(event, '')}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      
                      <TableCell className={classes.customerName} component="th" id={labelId} scope="row" padding="none">
                        <a href="#" onClick={handleOpen}>{row.TicketId}</a>
                      </TableCell>
                      <TableCell className={classes.customerName} component="th" id={labelId} scope="row" padding="none">{row.CustomerName}</TableCell>
                      <TableCell className={classes.customerName} component="th" id={labelId} scope="row" padding="none">{row.DepartmentName}</TableCell>
                      <TableCell className={classes.subject} component="th" id={labelId} scope="row" padding="none">{row.TicketSubject}</TableCell>
                      <TableCell className={classes.ticketStatus} component="th" id={labelId} scope="row" padding="none">{row.TicketStatus}</TableCell>
                      <TableCell className={classes.ticketStatus} component="th" id={labelId} scope="row" padding="none">{row.Owner}</TableCell>
                      <TableCell className={classes.priority} component="th" id={labelId} scope="row" padding="none">{row.Priority}</TableCell>
                      <TableCell className={classes.requestedOn} component="th" id={labelId} scope="row" padding="none">{row.TS_Created}</TableCell>
                    </TableRow>  
                    </React.Fragment>
                  )

                  return (
                    search_table
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[12, 24, 36]}
          component="div"
          count={props.searchArray && props.searchArray.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </React.Fragment>
  )
  // const Paper = withStyles({
  //   root : {
  //     boxShadow:["none"],
  //     color: ["none"]
  //   }
  // })(MuiPaper);

  return (
    <>
   
    { sessionStorage.detailPage == "false" ?
    <div className="classes.table col-md-8 table-responsive">
    <div className={classes.root}>
      <Paper className='tckMgmt-Paper tablepadding' style={{boxShadow:'none'}}>
        <EnhancedTableToolbar numSelected={selected.length} />
      
      <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.ticketList.length}
            />
            <TableBody>
              {stableSort(props.ticketList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected();
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const status_based_table = (
                    <React.Fragment>
                      <TableRow
                      disableTypography
                      className={classes.tableRow}
                      hover
                      onClick={(event) => handleClick(event, '')}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      
                      <TableCell  component="th" id={labelId} scope="row" padding="none">
                        <a href="#" onClick={()=>handleOpen(row.TicketId)}>{row.TicketId}</a>
                      </TableCell>
                      <TableCell  component="th" id={labelId} scope="row" padding="none">{row.CustomerName}</TableCell>
                      <TableCell  component="th" id={labelId} scope="row" padding="none">{row.DepartmentName}</TableCell>
                      <TableCell  component="th" id={labelId} scope="row" padding="none">{row.TicketSubject}</TableCell>
                      <TableCell  component="th" id={labelId} scope="row" padding="none">{row.TicketStatus}</TableCell>
                      <TableCell  component="th" id={labelId} scope="row" padding="none">{row.Owner}</TableCell>
                      <TableCell  component="th" id={labelId} scope="row" padding="none">{row.Priority}</TableCell>
                      <TableCell  component="th" id={labelId} scope="row" padding="none">
                      {
                        new Intl.DateTimeFormat("en-GB", {
                          hour12: true,
                          timeZone: 'UTC',
                          hour: 'numeric',
                          minute: 'numeric',
                          year: "numeric",
                          month: "long",
                          day: "2-digit"                            
                        }).format(new Date(row.TS_Created))
                      }
                      </TableCell>
                    </TableRow>  
                    </React.Fragment>
                  )

                  return (
                    status_based_table
                  );
                })}
             
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[12, 24, 36]}
          component="div"
          count={props.ticketList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
  

      </Paper>
    
    </div>
 </div>
    :
    <TicketDetails  
      handleClose={handleClose}  
      ticketId={ticketId} 
      getTicketList={props.getTicketList} 
      // customerList={props.customerList}
      // getCustomerList={props.getCustomerList}
    />
  }
</>
  );
}
