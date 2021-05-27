import Styles from "./Stories.module.css";
import own from "../content/images/pic3.jpg";
import pic4 from "../content/images/pic4.jpg";
import pic5 from "../content/images/pic5.jpg";
import pic6 from "../content/images/pic6.jpg";
import {useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {show_user_stories_handle,show_others_stories_handle} from '../../../reduces/actions/StoriesAction';
import Userstories from "./Userstories/Userstories";
import getitem from '../../../methods/getitem';
import {getstoriesFromOthers} from '../../../methods/uploadstories';
const Stories = () => {
   const dispatch=useDispatch();
  const {username} =useSelector(state=>state.user);

  const {othersStories,loading} =useSelector(state=>state.Stories);
  const [othersStory,setotherstory]=useState(null);
 useEffect(()=>{
   
  if(loading && username)
  {
    getitem(username).then(res=>{
   

      res?.following.map((ele)=>{
        console.log("e",ele.username);
        getstoriesFromOthers(ele.username,dispatch);
      })
    
         
    })
       
        setotherstory(othersStories);
  }
 },[])
     
 

  return (


      <div className={Styles.stories}>
        <div onClick={()=> dispatch(show_user_stories_handle(true))} className={Styles.userStories}></div>
        {othersStory?.map((ele,id)=>
     
          ele.stories.length>=1?<div key={id} onClick={()=>dispatch(show_others_stories_handle(true,id))} className={Styles.particular}></div>:null
      
       )}
       
      </div>

  );

  

   
};
export default Stories;
