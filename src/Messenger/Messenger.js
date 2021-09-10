import {useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Styles from "./Messenger.module.css"
const Messenger=()=>{
    const dispatch =useDispatch();
    const history=useHistory();
    const backbButFun=()=>{
        dispatch({type:"SHOWHOME",payload:true})
        history.push("/main");
 
    }
    return(<>
   <div className={Styles.maindiv}>
       <button onClick={backbButFun} className={Styles.backbut}  ><img src={process.env.PUBLIC_URL+'/previous.png'} alt="" width="40px" height="40px" /></button>
   </div>
    
    </>)
}
export default Messenger;