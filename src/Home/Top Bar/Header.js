import Styles from './Header.module.css';
import cameraimg from './icons/camera.png'
import messageimg from './icons/chat.png';
import { useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import Userstories from "../Feed/Stories/Userstories/Userstories";
import { show_user_stories_handle } from '../../reduces/actions/StoriesAction';
const Header=()=>{
    const dispatch=useDispatch();
    const {message}=useSelector((state) => state.main);
  
    return(
  
            <div className={Styles.Header}>
           <div className={Styles.abovediv}>
           <img onClick={()=>{dispatch(show_user_stories_handle(true))}}  id={Styles.cameraimg} src={cameraimg} alt="" />
           </div>

        <div  className={Styles.abovediv2} >
        <NavLink      className={Styles.messageimg} to={`main/messenger`}>
          <img
            src={ `${process.env.PUBLIC_URL}/chatIcon.png` }
        
            onClick={()=>dispatch({type:"SHOWMESSAGE",payload:true})} 
            alt=""
          />
        </NavLink>
        </div>
              
            </div>
    
    )
}
export default Header;