import Styles from "./Stories.module.css";

import {useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {show_user_stories_handle,show_others_stories_handle} from '../../../reduces/actions/StoriesAction';

const Stories = () => {
   const dispatch=useDispatch();
  const {username,profilepic} =useSelector(state=>state.user);

  const {othersStories,loading} =useSelector(state=>state.Stories);

  return (


      <div className={Styles.stories}>
        <div onClick={()=> dispatch(show_user_stories_handle(true))} className={Styles.userStories} ><img src={profilepic?profilepic:process.env.PUBLIC_URL+'/userImage.png'} alt="" width="100%" height="100%" /></div>
     
        {othersStories?.map((ele,id)=>
     
          ele.stories.length>=1?<div key={id} onClick={()=>dispatch(show_others_stories_handle(true,id))} className={Styles.particular}></div>:null
      
       )}
       
      </div>

  );

  

   
};
export default Stories;
