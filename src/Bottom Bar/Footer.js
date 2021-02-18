import Styles from './Footer.module.css'
import {useDispatch} from 'react-redux';
const Footer=()=>{
  const dispatch=useDispatch();
    return(
      <>
        <div className={Styles.Footer}>
           <button  onClick={()=>dispatch({type:"SHOWHOME",payload:true})}  >Home</button>
           <button onClick={()=>dispatch({type:"SHOWSEARCH",payload:true})}   >Search</button>
           <button  onClick={()=>dispatch({type:"SHOWLIKE",payload:true})}   >likes</button>
           <button  onClick={()=>dispatch({type:"SHOWPROFILE",payload:true})}   >profile</button>
          
        </div>
      </>
    )
}
export default Footer;