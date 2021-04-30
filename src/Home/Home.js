import Feed from './Feed/Feed';
import Header from './Top Bar/Header'
import Styles from './Home.module.css'
import {useSelector} from 'react-redux';
import Userstories from '../Home/Feed/Stories/Userstories/Userstories'
const Home=()=>{
         
         const {show_user_stories}=useSelector((state)=>{
            console.log(state.Stories);
            return state.Stories;
           })

 
        return(<div className={Styles.maindiv}>
            {show_user_stories?<Userstories/>:<><Header/> <Feed/></> }
            
        </div>)
  
}
export default Home;