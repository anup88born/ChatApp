// store.js
import React, {createContext, useReducer} from 'react';
import axios from 'axios';

const initialState = {
  ticket: {
    status: {},
    clicked: false
  },
  agentStatus:"Online",
  chat:[],
  commentBox:[],
  menu:sessionStorage.section === "agent" ? 
  [{

    whiteIcon:"/assets/img/Chat Active.svg",
    blackIcon:"/assets/img/Chat Menu.svg",
    text:"Chats",
    status:true

    }
    ,{

    whiteIcon:"/assets/img/Archives Active.svg",
    blackIcon:"/assets/img/Archives.svg",
    text:"Archives",
    status:false

    },{

    whiteIcon:"/assets/img/agents_selected.svg",
    blackIcon:"/assets/img/Agents-1.svg",
    text:"Agents",
    status:false

    },{

    whiteIcon:"/assets/img/Tickets Active.svg",
    blackIcon:"/assets/img/Tickets-1.svg",
    text:"Tickets",
    status:false

    },{

    whiteIcon:"/assets/img/Settings Active.svg",
    blackIcon:"/assets/img/Settings.svg",
    text:"Settings",
    status:false

    }]   : [{

          whiteIcon:"/assets/img/Chat Active.svg",
          blackIcon:"/assets/img/Chat Menu.svg",
          text:"Chats",
          status:true
  
          }
          ,{

            whiteIcon:"/assets/img/Customers Active.svg",
            blackIcon:"/assets/img/Customers.svg",
            text:"Customer",
            status:false
    
            }
            ,{
  
          whiteIcon:"/assets/img/Archives Active.svg",
          blackIcon:"/assets/img/Archives.svg",
          text:"Archives",
          status:false
  
          },{
  
          whiteIcon:"/assets/img/agents_selected.svg",
          blackIcon:"/assets/img/Agents-1.svg",
          text:"Agents",
          status:false
  
          },{
  
          whiteIcon:"/assets/img/Tickets Active.svg",
          blackIcon:"/assets/img/Tickets-1.svg",
          text:"Tickets",
          status:false
  
          }
          ,{
  
            whiteIcon:"/assets/img/Departments Active.svg",
            blackIcon:"/assets/img/Departments.svg",
            text:"Departments",
            status:false
    
            }
            ,{
  
              whiteIcon:"/assets/img/Reports Active.svg",
              blackIcon:"/assets/img/Reports.svg",
              text:"Reports",
              status:false
      
              },{
  
          whiteIcon:"/assets/img/Settings Active.svg",
          blackIcon:"/assets/img/Settings.svg",
          text:"Settings",
          status:false
  
          }] ,
  
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
          case 'FETCH_TICKET':
            return {
              ticket: action.payload
            }
          case 'FETCH_SUCCESS':
          return {
            post: action.payload,
          }
          case 'FETCH_ERROR':
          return {

          post: action.payload.response,

          }

          case 'FETCH_ADMIN':
          return {

          data: action.payload,

          }
          case 'FETCH_DEPARTMENTLIST':
          return {

          departlist: action.payload,

          }
          case 'FETCH_AGENTSTATUS':
            return {
  
            agentStatus: action.payload,
  
            }
          case 'FETCH_SUPERVISOR':
          return {

          svData: action.payload,

          }

          case 'FETCH_CHATHISTORY':
          return {
            ...state,
          chat: state.chat && state.chat.length > 0 ? [...state.chat,action.payload] :[action.payload],
          // chat: state.chat && state.chat.length > 0 ? [...state.chat.map(data=> Object.keys(data).map(key=> key === Object.keys(action.payload)[0] ? data[key] && data[key].length > 0 ? data[key].map(dataChat=> [...dataChat,action.payload[key]] ): [action.payload[key]] :[...data,action.payload] ))] :[action.payload],
        
          }
          case 'FETCH_WINDOWOPEN':
            return {
            chatOpen: action.payload,
            }
          case 'FETCH_MENULIST':
            return {
              ...state,
            menu: state.menu.length > 0 ? [...state.menu.map(data=> data.text == action.payload.text ?{...data,status:!action.payload.status}:{...data,status:false})]:[state.menu] 
  
            }
         case 'FETCH_COMMENTBOX':
              return {
                ...state,
              commentBox: state.commentBox && state.commentBox.length > 0 ? [...state.commentBox,action.payload] :[action.payload],
              }
 default:
        return state
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }