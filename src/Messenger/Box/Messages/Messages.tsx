import Styles from './Messages.module.css';
import { useEffect, useRef, useState, React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TimeAgo from 'react-timeago';
import getmessages from '../../../methods/getmessages';
import addmessage from '../../../methods/addmessage';
import { PUBLIC_URL } from '../../../utils/constants/env';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Messages = () => {
  const { conversationID, user, socket, userPicture } = useSelector(
    (state) => state.MessageReducer,
  );
  const [messages, setmessages] = useState(null);
  let Scrollref = useRef(null);
  let inputRef = useRef();
  const { username } = useSelector((state) => state.user);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!username || user?.username === null) return;
    if (socket) {
      socket.on('getmessage', ({ sender, text }) => {
        if (sender === user?.username) {
          const Message = {
            conversationID: conversationID?.conversationID,
            sender,
            text,
          };
          setmessages((messages) => [...messages, { ...Message, createdAt: new Date() }]);
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    const getmessagehelper = async () => {
      const mess = await getmessages(conversationID);
      setmessages(mess);
    };

    getmessagehelper();
  }, [conversationID]);

  useEffect(() => {
    Scrollref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [messages]);
  useEffect(() => {
    inputRef.current.focus();
    return () => {
      socket?.disconnect();
    };
  }, []);
  const sendButtonHandler = async (e) => {
    inputRef.current.focus();
    if (text.trim('') === '') return;

    const Message = {
      conversationID: conversationID.conversationID,
      sender: username,
      text: text,
    };
    await addmessage(Message);

    setText('');

    setmessages((messages) => [...messages, { ...Message, createdAt: new Date() }]);
    socket?.emit('sendmessage', {
      receiver: user.username,
      sender: username,
      text: text,
    });

    Scrollref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
  const backButFun = () => {
    dispatch({ type: 'SHOWBOX', payload: true });
  };
  if (user === null) {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', height: '100%' }}>
        <div className={Styles.chatWidthFriends}>
          <img alt="" src={'chat2.gif'} />
          <h4 style={{ fontSize: '4em', opacity: '0.5' }}> Chat with Friends</h4>{' '}
        </div>

        <div className={Styles.scrolldiv} ref={Scrollref}></div>
        <textarea
          hidden
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => (e.code === 'Enter' ? sendButtonHandler(e) : null)}
          value={text}
          placeholder="Type messsage"
          className={Styles.textarea}
          ref={inputRef}
        />
      </div>
    );
  }
  return (
    <div className={Styles.maindiv}>
      <div className={Styles.topdivmessage}>
        <label style={{ fontSize: '1.2em' }}>{user?.username}</label>
        <img width="30px" height="30px" className={Styles.userPicture} src={userPicture} alt="" />
      </div>
      <div className={Styles.messages}>
        {messages?.map((message, id) => {
          return (
            <div key={id} className={message.sender === username ? Styles.to : Styles.fo}>
              <div
                className={
                  message.sender === username
                    ? Styles.perticularmessage_receiver
                    : Styles.perticularmessage_sender
                }
              >
                <div style={{ opacity: '0.6', fontSize: '0.3' }}>{message.sender}</div>
                <h3>{message.text}</h3>
              </div>
              <div>
                <div className={message.sender === username ? Styles.timeright : Styles.timeleft}>
                  <h3>
                    {' '}
                    <TimeAgo date={new Date(message.createdAt)} />
                  </h3>
                </div>
              </div>
            </div>
          );
        })}

        {messages?.length === 0 ? (
          <div className={Styles.nomessages}>
            <h2>Start Chatting</h2>
            <img src={'chat.gif'} width="50%" height="50%" alt="" />
          </div>
        ) : null}
        <div className={Styles.scrolldiv} ref={Scrollref}></div>
      </div>
      <div className={Styles.senddiv}>
        <textarea
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => (e.code === 'Enter' ? sendButtonHandler() : null)}
          value={text}
          placeholder="Type messsage"
          className={Styles.textarea}
          ref={inputRef}
        />

        <img
          src={`sendIcon.png`}
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
