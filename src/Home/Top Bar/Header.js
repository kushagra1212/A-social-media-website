import Styles from './Header.module.css';
import cameraimg from './icons/camera.png'
import messageimg from './icons/chat.png'
import {useDispatch} from 'react-redux';
const Header=()=>{
    const dispatch=useDispatch();
    return(
        <div>
            <div className={Styles.Header}>
              <img id={Styles.cameraimg} src={cameraimg} />
               <img onClick={()=>dispatch({type:"SHOWMESSAGE",payload:true})}  src={messageimg}  />
              
            </div>
        </div>
    )
}
export default Header;