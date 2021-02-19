import {useDispatch } from 'react-redux'
const Message=()=>{
    const dispatch =useDispatch();
    return(<>
   <div>
       <button onClick={()=>dispatch({type:"SHOWHOME",payload:true})}  >BACK</button>
   </div>
    
    </>)
}
export default Message;