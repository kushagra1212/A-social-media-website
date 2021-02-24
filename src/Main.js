
import Home from './Home/Home';
import Like from './Like/Like';
import Search from './Search/Search';
import Footer from './Bottom Bar/Footer';
import {useSelector} from 'react-redux';
import Message from './Home/Messagesec/Message'
import Profile from './Profile/Profile';

const Main=()=>{
    let profile=useSelector(state=>state.main.profile);
    let home=useSelector(state=>state.main.home);
    let search=useSelector(state=>state.main.search);
    let like=useSelector(state=>state.main.like);
    let message=useSelector(state=>state.main.message);
    
  console.log(home,search,like,profile)
    return(
      <>
      
        {home?<Home/>:like?<Like/>:profile?<Profile/>:search?<Search  fromshowbar={false} usernameformshowbar={null}           />:message?<Message/>:null}
        <Footer/>
      </>


    )
}

export default Main;