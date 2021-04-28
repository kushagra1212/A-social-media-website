import Feed from './Feed/Feed';
import Header from './Top Bar/Header'
import Styles from './Home.module.css'
import {useSelector} from 'react-redux';
import Userstories from '../Home/Feed/Stories/Userstories/Userstories'
const Home=()=>{
 
   //   if(stories.show_user_stories) return (<div><Userstories/></div>);
 
        return(<div className={Styles.maindiv}>
            <Header/>
            <Feed/>  
        </div>)
  
}
export default Home;