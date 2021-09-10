import Styles from "./Messages.module.css";
import { useEffect ,useState} from "react";
import { useSelector } from "react-redux";
import getmessages from "../../../methods/getmessages";
const Messages=()=>{
        const {conversationID}=useSelector(state=>state.MessageReducer);
        const [messages,setmessages]=useState(null);

        const getmessagehelper=async()=>{
                const mess=await getmessages(conversationID);

                setmessages(mess);
        
        }
        useEffect(() => {
           getmessagehelper();
         
  
        }, [conversationID])
        console.log(messages);
        return <div className={Styles.maindiv}>
                MEssages;
        </div>
}

export default Messages;