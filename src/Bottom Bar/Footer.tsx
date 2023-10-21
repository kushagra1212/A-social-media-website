import Styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PUBLIC_URL } from '../utils/constants/env';
const Footer = () => {
  const dispatch = useDispatch();
  const { home, search, like, profile } = useSelector((state) => state.main);
  const { profilepic } = useSelector((state) => state.user);
  const url = '';
  return (
    <>
      <div className={Styles.footer}>
        <Link to={`${url}/feed`}>
          <img
            src={home ? 'home/homeblack.png' : 'home/home.png'}
            onClick={() => {
              dispatch({ type: 'SHOWHOME', payload: true });
            }}
            alt=""
          />
        </Link>

        <Link to={`${url}/search`}>
          <img
            src={search ? 'search/searchblack.png' : 'search/search.png'}
            onClick={() => {
              dispatch({ type: 'SHOWSEARCH', payload: true });
            }}
            alt=""
          />
        </Link>
        <Link to={`${url}/likes`}>
          <img
            src={like ? 'like/heartblack.png' : 'like/heart.png'}
            onClick={() => {
              dispatch({ type: 'SHOWLIKE', payload: true });
            }}
            alt=""
          />
        </Link>
        <Link to={`${url}/profile`}>
          <img
            src={
              profile
                ? profilepic
                  ? profilepic
                  : 'userImage.png'
                : profilepic
                ? profilepic
                : 'userImage.png'
            }
            className={Styles.profile}
            onClick={() => {
              dispatch({ type: 'SHOWPROFILE', payload: true });
            }}
            alt=""
          />
        </Link>
      </div>
    </>
  );
};
export default Footer;
