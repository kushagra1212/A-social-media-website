import Feed from './Feed/Feed';
import Header from './Top Bar/Header'
import Styles from './Home.module.css'
import {useSelector} from 'react-redux';
import {useEffect,useState} from 'react';
import Userstories from '../Home/Feed/Stories/Userstories/Userstories'
import Othersstories from '../Home/Feed/Stories/Othersstories/Othersstories';
const Home=()=>{
         
         const {show_user_stories,show_others_stories}=useSelector((state)=>{
            console.log(state.Stories,"FROM HOME");
            return state.Stories;
           });

  if(show_others_stories.flag)
  {
      return (<div  className={Styles.maindiv} >
          <Othersstories/>
         
      </div>)
  }else{
    return(<div className={Styles.maindiv}>

    
        {show_user_stories?<Userstories/>:<><Header/> <Feed/></> }

        
    </div>)
  }
  
}
export default Home;