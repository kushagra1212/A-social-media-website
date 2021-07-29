import Feed from './Feed/Feed';
import Header from './Top Bar/Header'
import Styles from './Home.module.css'
import {useSelector,useDispatch} from 'react-redux';
import { useEffect } from 'react';
import {animated, useSpring, useTransition} from 'react-spring';
import Userstories from '../Home/Feed/Stories/Userstories/Userstories'
import Othersstories from '../Home/Feed/Stories/Othersstories/Othersstories';
import { getstories } from '../methods/uploadstories';
const Home=()=>{
         
  const {username} =useSelector(state=>state.user);
  const dispatch=useDispatch();
    
         const {show_user_stories,show_others_stories}=useSelector((state)=>{
           
            return state.Stories;
           });
const fade=useSpring({

  opacity:show_user_stories?1:1,
  config:{duration:250}

});
useEffect(async() => {
 
    await getstories(username, dispatch);
  
 
}, []);
  if(show_others_stories.flag)
  {
      return (<div  className={Styles.maindiv} style={{  height:"100vh",
      backgroundColor: "white",
      position: "absolute",
      width: "100vw"
     }}>
        <animated.div style={fade}  >  <Othersstories/></animated.div>
         
      </div>)
  }else{
    return(<div className={Styles.maindiv}   style={show_user_stories?{  height:"100vh",
      backgroundColor: "white",
      position: "absolute",
      width: "100vw",
      zIndex: 10}:{}}>
   
       
    
        {show_user_stories?<animated.div style={fade }   ><Userstories/></animated.div>:<><Header/> <Feed/></> }

        
    </div>)
  }
  
}
export default Home;