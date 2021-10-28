import Styles from "./Messages.module.css";
import { useEffect, useRef, useState, React } from "react";
import { useSelector, useDispatch } from "react-redux";
import TimeAgo from "react-timeago";
import getmessages from "../../../methods/getmessages";
import addmessage from "../../../methods/addmessage";

const Messages = () => {
  const { conversationID, user, socket,userPicture } = useSelector(
    (state) => state.MessageReducer
  );
  const [messages, setmessages] = useState(null);
  let Scrollref = useRef(null);
  let inputRef=useRef();
  const { username } = useSelector((state) => state.user);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  console.log(userPicture);
  useEffect(() => {
    if(!username)
     return;
    if (socket) {
      socket.on("getmessage", ({ sender, text }) => {
        if (sender === user.username) {
          const Message = {
            conversationID: conversationID?.conversationID,
            sender,
            text,
          };
          setmessages((messages) => [
            ...messages,
            { ...Message, createdAt: new Date() },
          ]);
        }
      });
    }
  }, [username, conversationID?.conversationID, socket, user?.username]);

  useEffect(() => {
    if (socket) {
      socket.on("connection", () => {
        console.log(socket);
        console.log("connection");
      });
      socket.emit("adduser", username);
      socket.on("getuser", (users) => {
        console.log(users, "users");
      });
    }
  }, []);

  useEffect(() => {
    const getmessagehelper = async () => {
      const mess = await getmessages(conversationID);
      setmessages(mess);
    };

    getmessagehelper();
  }, [conversationID]);

  useEffect(() => {
    Scrollref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
   
  }, [messages]);
useEffect(()=>{
  inputRef.current.focus();
},[])
  const sendButtonHandler = async () => {
    if (text.trim("") === "") return;

    const Message = {
      conversationID: conversationID.conversationID,
      sender: username,
      text: text,
    };
    console.log(user.username);

    socket?.emit("sendmessage", {
      receiver: user.username,
      sender: username,
      text: text,
    });

    setText("");

    setmessages((messages) => [
      ...messages,
      { ...Message, createdAt: new Date() },
    ]);

    await addmessage(Message);
    Scrollref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const backButFun = () => {
    dispatch({ type: "SHOWBOX", payload: true });
  };
  return (
    <>
      <div className={Styles.topdivmessage}>
    
        <div onClick={backButFun} className={Styles.icon}>
          <div className={Styles.arrow}></div>
        </div>
        <label>{user?.username}</label>
        <img width="30px" height="30px" className={Styles.userPicture} src={userPicture} alt="" />
        <label style={{opacity:"0.5",fontSize:"0.9em"}} >Status</label>
      </div>
      <div className={Styles.maindiv}></div>
      <div className={Styles.maindiv}>
        
        <div className={Styles.messages}>
          {messages?.map((message, id) => {
            return (
             <div    key={id} className={message.sender === username?Styles.to:Styles.fo}>
                <div
            
                className={
                  message.sender === username
                    ? Styles.perticularmessage_receiver
                    : Styles.perticularmessage_sender
                }
              >
                <h6 style={{opacity:"0.6"}}>{message.sender}</h6>
                <h3>{message.text}</h3>
            
              </div>
             <div>
             <div  className={
                  message.sender === username
                    ?Styles.timeright
                    :  Styles.timeleft
                } >
                 <h3> <TimeAgo date={new Date(message.createdAt)} /></h3>
                </div>
               </div>
               </div>
            );
          })}
          <div className={Styles.scrolldiv} ref={Scrollref}></div>
        </div>

        <div className={Styles.senddiv}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => (e.code === "Enter" ? sendButtonHandler() : null)}
            value={text}
            placeholder="Type messsage"
            className={Styles.textarea}
         ref={inputRef}
          />

          <img
            src={`${process.env.PUBLIC_URL}/sendIcon.png`}
            alt=""
            width="30px"
            height="50px"
            className={Styles.sendbut}
            onClick={sendButtonHandler}
          />
        </div>
      </div>
    </>
  );
};

export default Messages;
