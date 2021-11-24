import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import getconversations from "../methods/getconversations";
import Box from "./Box/Box";
import Styles from "./Messenger.module.css";
import Loader from "../../src/Animation/Loader/Loader";
import Messages from "./Box/Messages/Messages";
import io from "socket.io-client";
import { setsocket } from "../reduces/actions/MessageReducerAction";
const ENDPOINT = "https://eimentum-chat-app.herokuapp.com/";
//const ENDPOINT="http://localhost:8000/";
const Messenger = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [conversations, setconversations] = useState(null);
  const { box, socket } = useSelector((state) => state.MessageReducer);
  const [loading, setloading] = useState(false);
 
  const { username } = useSelector((state) => state.user);
  console.log(username);
  const backbButFun = () => {
    socket?.disconnect();

    dispatch({ type: "SHOWHOME", payload: true });
    history.push("/main");
  };

  useEffect(() => {
    if (username) {
      setloading(true);
      dispatch({ type: "SHOWMESSAGE", payload: true });
      const getconversation = async () => {
        const conver = await getconversations(username);
     
   

        dispatch(setsocket(io(ENDPOINT)));

        setconversations(conver);
        dispatch({ type: "SHOWBOX", payload: true });

        setloading(false);
      };

      getconversation();
    } else {
      dispatch({ type: "SHOWHOME", payload: true });
      history.push("/main");
    }
  }, []);

  return (
    <>
      <div className={Styles.maindiv}>
        <div onClick={backbButFun} className={Styles.icon}>
          <div className={Styles.arrow}></div>
        </div>
        <label className={Styles.chats_label}>chats</label>
        {loading ? (
          <Loader />
        ) : window.screen.width < 768 ? (
          box ? (
            <Box conversations={conversations} username={username}  />
          ) : (
            (conversations!==null && conversations.length===0?null:<Messages />)
          )
        ) : (
          <>
            {" "}
            <Box conversations={conversations} username={username}/>{" "}
            {(conversations!==null && conversations.length===0?null:<Messages />)}
          </>
        )}
      </div>
    </>
  );
};
export default Messenger;
