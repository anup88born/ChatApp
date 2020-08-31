
import  React , {useState, useEffect,useContext} from 'react';
// import { Icon, Menu } from 'semantic-ui-react';
// import './assets/css/style.css';
import { store } from '../../store';

function SideBar (props)
{
  const globalState = useContext(store);
  const { dispatch } = globalState;
//  const [iconConfig,setConfig]=useState()

     useEffect(()=>{
      // dispatch({ type: 'FETCH_MENULIST', payload: response.data })
      console.log(globalState.state.menu)
      // if(globalState.state.menu.length > 0)
      // {
      //   window.location.reload()
      // }
     },[])
  const chatSelected = (item) =>
 {
  //  console.log("chat selected: ",item)
   dispatch({ type: 'FETCH_MENULIST', payload: item })
    // setConfig(iconConfig.map(data=> data.text == name ?{...data,status:!status}:{...data,status:false}))
  
 }

 console.log(globalState.state.menu)

  return(
    <>
      <nav className ='sidebar'  fixed="left">
        {
          globalState.state.menu && globalState.state.menu.length > 0 && globalState.state.menu.map(function(item) {
            return  <div className="chats">
            <div className={item.status === false ?"sidebar-icons-chats":"sidebar-icons-chats selected"} ><img src={item.status === false ?item.blackIcon:item.whiteIcon} onClick= {()=>{chatSelected(item)} } id="chats" className={item.status === false ? "img-icon" :"img-icon img-select"} /></div>
            <div className={item.status === false ?"sidebar-text-chats":"sidebar-text-chats noDisplay"} id="chats-text">{item.text}</div>
            </div>
          })
        }
      </nav>
      {/* <nav className = 'sidebar'  fixed="left">
        {
          globalState.state.menu && globalState.state.menu.length > 0 && globalState.state.menu.map(function(item) {
            return  <div className="chats">
            <div className={item.status === false ?"sidebar-icons-chats":"sidebar-icons-chats selected"} ><img src={item.status === false ?item.blackIcon:item.whiteIcon} onClick= {()=>{chatSelected(item)} } id="chats" className="img-icon" /></div>
            <div className={item.status === false ?"sidebar-text-chats":"sidebar-text-chats noDisplay"} id="chats-text">{item.text}</div>
            </div>
          })
        }
      </nav> */}
    </>   
  )
}

export default SideBar
