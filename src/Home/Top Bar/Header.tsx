import Styles from './Header.module.css';

import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { show_user_stories_handle } from '../../reduces/actions/StoriesAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faMessage } from '@fortawesome/free-solid-svg-icons';
import Stories from '../Feed/Stories/Stories';
const Header = () => {
  const dispatch = useDispatch();

  return (
    <div className={Styles.Header}>
      <div
        id={Styles.cameraimg}
        onClick={() => {
          dispatch(show_user_stories_handle(true));
        }}
      >
        <FontAwesomeIcon icon={faCamera} color="white" />
      </div>
      <div className={Styles.stories}>
        <Stories />
      </div>
      <NavLink className={Styles.messageimg} to={`/messenger`} replace>
        <FontAwesomeIcon
          icon={faMessage}
          color="white"
          onClick={() => {
            dispatch({ type: 'SHOWMESSAGE', payload: true });
          }}
        />
      </NavLink>
    </div>
  );
};
export default Header;
