import Styles from "./Messages.module.css";
import { useEffect, useRef, useState, React } from "react";
import { useSelector } from "react-redux";
import TimeAgo from "react-timeago";
import getmessages from "../../../methods/getmessages";
import addmessage from "../../../methods/addmessage";

const Messages = () => {
  const { conversationID, user,socket } = useSelector((state) => state.MessageReducer);
  const [messages, setmessages] = useState(null);
  let Scrollref = useRef(null);
  const { username } = useSelector((state) => state.user);
  const [text, setText] = useState("");

 console.log(socket);
  useEffect(() => {
     if(socket){
       
    socket.on("getmessage",({sender,text})=>{
      if(sender===user.username){
        const Message = {
          conversationID: conversationID.conversationID,
          sender,
          text
        };
        setmessages((messages) => [
          ...messages,
          { ...Message, createdAt: new Date() },
        ]);
     
      }
        
  
      })
     }
  }, [username]);

  useEffect(() => {

  if(socket){
    socket.on("connection", () => {
      console.log(socket);
      console.log("connection")
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

  const sendButtonHandler = async () => {
    if (text.trim("") === "") return;

    const Message = {
      conversationID: conversationID.conversationID,
      sender: username,
      text: text
    };
 console.log(user.username);
   
    socket?.emit("sendmessage",{receiver:user.username,sender:username,text:text});

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

  return (
    <div className={Styles.maindiv}>
      <div className={Styles.messages}>
        {messages?.map((message, id) => {
          return (
            <div
              key={id}
              className={
                message.sender === username
                  ? Styles.perticularmessage_receiver
                  : Styles.perticularmessage_sender
              }
            >
              <label>{message.sender}</label>
              <h3>{message.text}</h3>
              <p>
                <TimeAgo date={new Date(message.createdAt)} />
              </p>
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
          className={Styles.textarea}
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
  );
};

export default Messages;
