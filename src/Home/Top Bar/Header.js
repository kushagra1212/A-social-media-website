import Styles from './Header.module.css';
import cameraimg from './icons/camera.png'
import messageimg from './icons/chat.png';
import { useState } from 'react';
import {useDispatch} from 'react-redux';
import Userstories from "../Feed/Stories/Userstories/Userstories";
import { show_user_stories_handle } from '../../reduces/actions/StoriesAction';
const Header=()=>{
    const dispatch=useDispatch();

  
    return(
  
            <div className={Styles.Header}>
              <img onClick={()=>{dispatch(show_user_stories_handle(true))}}  id={Styles.cameraimg} src={cameraimg} />
               <img onClick={()=>dispatch({type:"SHOWMESSAGE",payload:true})}  src={messageimg}  />
              
            </div>
    
    )
}
export default Header;