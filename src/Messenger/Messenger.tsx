import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';
import getconversations from '../methods/getconversations';
import Box from './Box/Box';
import Styles from './Messenger.module.css';
import Loader from '../../src/Animation/Loader/Loader';
import Messages from './Box/Messages/Messages';

import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Messenger = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [conversations, setconversations] = useState(null);
  const { box, socket } = useSelector((state) => state.MessageReducer);
  const [loading, setloading] = useState(false);

  const { username } = useSelector((state) => state.user);

  const backbButFun = () => {
    dispatch({ type: 'SHOWHOME', payload: true });
    history('/feed', { replace: true });
  };

  useEffect(() => {
    if (username) {
      setloading(true);
      dispatch({ type: 'SHOWMESSAGE', payload: true });
      const getconversation = async () => {
        const conver = (await getconversations(username)) as any;

        setconversations(conver);
        dispatch({ type: 'SHOWBOX', payload: true });

        setloading(false);
      };

      getconversation();
    } else {
      dispatch({ type: 'SHOWHOME', payload: true });
      history('/feed', { replace: true });
    }

    dispatch({ type: 'SHOWMESSAGE', payload: true });
  }, []);
  const contentProps = useSpring({
    from: { marginTop: -500, opacity: 0 },
    marginTop: 0,
    opacity: 1,
    config: { duration: 500 },
  });
  return (
    <div>
      <animated.div style={contentProps} className={Styles.maindiv}>
        <div className={Styles.backarrow} onClick={backbButFun}>
          <FontAwesomeIcon icon={faArrowLeft} size="2x" color="white" />
        </div>
        <label className={Styles.chats_label}>chats</label>
        {loading ? (
          <Loader />
        ) : window.screen.width < 768 ? (
          box ? (
            <Box conversations={conversations} username={username} />
          ) : conversations !== null && conversations.length === 0 ? null : (
            <Messages />
          )
        ) : (
          <>
            <Box conversations={conversations} username={username} />
            {conversations !== null && conversations.length === 0 ? null : <Messages />}
          </>
        )}
      </animated.div>
    </div>
  );
};
export default Messenger;
