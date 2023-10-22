import Styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHome, faSearch, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
const Footer = () => {
  const dispatch = useDispatch();
  const { home, search, like, profile } = useSelector((state) => state.main);
  const { profilepic } = useSelector((state) => state.user);
  const url = '';
  return (
    <div className={Styles.footer_container}>
      <div className={Styles.footer_backdrop}></div>
      <div className={Styles.footer}>
        <Link to={`${url}/feed`}>
          <FontAwesomeIcon
            onClick={() => {
              dispatch({ type: 'SHOWHOME', payload: true });
            }}
            icon={faHome}
            color={home ? 'black' : 'white'}
            size="2x"
            className={home ? Styles.selected : Styles.notselected}
          />
        </Link>

        <Link to={`${url}/search`}>
          <FontAwesomeIcon
            onClick={() => {
              dispatch({ type: 'SHOWSEARCH', payload: true });
            }}
            icon={faSearch}
            className={search ? Styles.selected : Styles.notselected}
            size="2x"
          />
        </Link>
        <Link to={`${url}/likes`}>
          <FontAwesomeIcon
            onClick={() => {
              dispatch({ type: 'SHOWLIKE', payload: true });
            }}
            icon={faHeart}
            className={like ? Styles.selected : Styles.notselected}
            size="2x"
          />
        </Link>
        <Link to={`${url}/profile`}>
          <FontAwesomeIcon
            onClick={() => {
              dispatch({ type: 'SHOWPROFILE', payload: true });
            }}
            icon={faUserAstronaut}
            className={profile ? Styles.selected : Styles.notselected}
            size="2x"
          />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
