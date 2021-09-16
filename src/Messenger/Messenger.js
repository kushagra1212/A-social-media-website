import {useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useEffect,useState } from 'react';
import getconversations from '../methods/getconversations';
import Box from "./Box/Box";
import Styles from "./Messenger.module.css"
import Loader from "../../src/Animation/Loader/Loader"
import Messages from './Box/Messages/Messages';
const Messenger=()=>{
    const dispatch =useDispatch();
    const history=useHistory();
    const [conversations,setconversations]=useState(null);
    const {box}=useSelector(state=>state.MessageReducer);
    const [loading,setloading]=useState(false);
    const {username}=useSelector(state => state.user)
    const backbButFun=()=>{
        dispatch({type:"SHOWHOME",payload:true})
        history.push("/main");
 
    }
    const getconversation=async()=>{
    
    
         const conver=await getconversations(username);
      
         setconversations(conver);
         dispatch({type:"SHOWBOX",payload:true});
  
         setloading(false);
    
    
    }
  useEffect(() => {
 

      setloading(true); 
      dispatch({type:"SHOWMESSAGE",payload:true});
     getconversation();

  }, [username]);


    return(<>
   <div className={Styles.maindiv}>
{/* 
   <button className={Styles.topbar} /> */}
       <button onClick={backbButFun} className={Styles.backbut}  ><img src={process.env.PUBLIC_URL+'/previous.png'} alt="" width="100%" height="100%" /></button>
    {loading?<Loader/>  :
         box?<Box conversations={conversations} username={username}  />:<Messages    /> }   
       

   </div>
    
    </>)
}
export default Messenger;