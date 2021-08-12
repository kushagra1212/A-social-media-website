import Styles from './Footer.module.css'
import searchimg from '../Search/icons/search.png'
import searchblackimg from '../Search/icons/searchblack.png'
import likeimg from '../Like/icons/heart.png'
import likeblackimg from '../Like/icons/heartblack.png'
import homeimg from '../Home/icons/home.png'
import homeblackimg from '../Home/icons/homeblack.png'

import {useDispatch,useSelector} from 'react-redux';
const Footer=()=>{
  const dispatch=useDispatch();
  const {home,search,like,profile}=useSelector(state=>state.main);
  const {profilepic}=useSelector(state=>state.user);
  
    return(
      <>
        <div className={Styles.footer}>
           <img  src={home?homeblackimg:homeimg} onClick={()=>dispatch({type:"SHOWHOME",payload:true})} alt=""      />
           <img src={search?searchblackimg:searchimg}   onClick={()=>dispatch({type:"SHOWSEARCH",payload:true})} alt=""     />
           <img  src={like?likeblackimg:likeimg}    onClick={()=>dispatch({type:"SHOWLIKE",payload:true})} alt=""    />
           <img  src={profile?profilepic?profilepic:process.env.PUBLIC_URL+'/userImage.png':profilepic?profilepic:process.env.PUBLIC_URL+'/userImage.png'}    className={Styles.profile}  onClick={()=>dispatch({type:"SHOWPROFILE",payload:true})}  alt=""    />
          
        </div>
      </>
    )
}
export default Footer;