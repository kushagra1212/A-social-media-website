import Styles from "./Stories.module.css";
import own from "../content/images/pic3.jpg";
import pic4 from "../content/images/pic4.jpg";
import pic5 from "../content/images/pic5.jpg";
import pic6 from "../content/images/pic6.jpg";
import {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {show_user_stories_handle} from '../../../reduces/actions/StoriesAction';
import Userstories from "./Userstories/Userstories";
const Stories = () => {
   const dispatch=useDispatch();
  
 

  return (

    <>
      <div className={Styles.stories}>
        <div onClick={()=> dispatch(show_user_stories_handle(true))} className={Styles.userStories}></div>
        <div className={Styles.particular}></div>
        <div className={Styles.particular}></div>
      </div>
    </>
  );

  

   
};
export default Stories;
