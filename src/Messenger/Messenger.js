import {useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useEffect,useState,useRef } from 'react';
import getconversations from '../methods/getconversations';
import Box from "./Box/Box";
import Styles from "./Messenger.module.css"
import Loader from "../../src/Animation/Loader/Loader"
import Messages from './Box/Messages/Messages';
import io from "socket.io-client";
const SURL="https://eimentum-chat-socket-server.vercel.app";
const Messenger=()=>{
    const socket = useRef();
    const dispatch =useDispatch();
    const history=useHistory();
    const [conversations,setconversations]=useState(null);
    const {box}=useSelector(state=>state.MessageReducer);
    const [loading,setloading]=useState(false);
    const {username}=useSelector(state => state.user)
    
    const backbButFun=()=>{
    
        socket.current?.disconnect();

 
        
        dispatch({type:"SHOWHOME",payload:true})
        
        history.push("/main");
     
 
    }

  

  useEffect(() => {
 

      setloading(true); 
      dispatch({type:"SHOWMESSAGE",payload:true});
         const getconversation=async()=>{
    
       
         const conver=await getconversations(username);
          console.log(conver);
         socket.current = io.connnect(SURL);
        //   socket.current = io.connect("http://localhost:8000/");
            setconversations(conver);
            dispatch({type:"SHOWBOX",payload:true});
     
            setloading(false);
      
    
    
    }


     getconversation();

  }, [username]);


    return(<>
   <div className={Styles.maindiv}>
{/* 
   <button className={Styles.topbar} /> */}
       <button onClick={backbButFun} className={Styles.backbut}  ><img src={process.env.PUBLIC_URL+'/previous.png'} alt="" width="100%" height="100%" /></button>
    {loading?<Loader/>  :
         box?<Box   conversations={conversations} username={username}  />:<Messages socket={socket}   /> }   
       

   </div>
    
    </>)
}
export default Messenger;