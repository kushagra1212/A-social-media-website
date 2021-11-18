import Styles from "./Footer.module.css";
import searchimg from "../Search/icons/search.png";
import searchblackimg from "../Search/icons/searchblack.png";
import likeimg from "../Like/icons/heart.png";
import likeblackimg from "../Like/icons/heartblack.png";
import homeimg from "../Home/icons/home.png";
import homeblackimg from "../Home/icons/homeblack.png";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setScrollPositionHandler } from "../reduces/actions/PostAction";
const Footer = ({ url, path }) => {
  const dispatch = useDispatch();
  const { home, search, like, profile } = useSelector((state) => state.main);
  const { profilepic } = useSelector((state) => state.user);

  return (
    <>
      <div className={Styles.footer}>
        <Link to={`${url}`}>
          <img
            src={home ? homeblackimg : homeimg}
            onClick={() =>{dispatch(setScrollPositionHandler(window.scrollY)); dispatch({ type: "SHOWHOME", payload: true });}}
            alt=""
          />
        </Link>

        <Link to={`${url}/search`}>
          <img
            src={search ? searchblackimg : searchimg}
            onClick={() =>{dispatch(setScrollPositionHandler(window.scrollY)); dispatch({ type: "SHOWSEARCH", payload: true });}}
            alt=""
          />
        </Link>
        <Link to={`${url}/likes`}>
          <img
            src={like ? likeblackimg : likeimg}
            onClick={() =>{dispatch(setScrollPositionHandler(window.scrollY)); dispatch({ type: "SHOWLIKE", payload: true });}}
            alt=""
          />
        </Link>
        <Link to={`${url}/profile`}>
          <img
            src={
              profile
                ? profilepic
                  ? profilepic
                  : process.env.PUBLIC_URL + "/userImage.png"
                : profilepic
                ? profilepic
                : process.env.PUBLIC_URL + "/userImage.png"
            }
            className={Styles.profile}
            onClick={() =>{dispatch(setScrollPositionHandler(window.scrollY)); dispatch({ type: "SHOWPROFILE", payload: true });}}
            alt=""
          />
        </Link>
      </div>
    </>
  );
};
export default Footer;
