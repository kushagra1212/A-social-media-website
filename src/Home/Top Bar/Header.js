import Styles from "./Header.module.css";
import cameraimg from "./icons/camera.png";

import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { show_user_stories_handle } from "../../reduces/actions/StoriesAction";
const Header = () => {
  const dispatch = useDispatch();

  return (
    <div className={Styles.Header}>
      <div className={Styles.abovediv}>
     <div  id={Styles.cameraimg} >
            <span   
   >
          <i
      onClick={() => {
        dispatch(show_user_stories_handle(true));
      }}
            styles={{ color: "Dodgerblue", cursor: "pointer" }}
            className="fa fa-camera"
          ></i>
        </span>
        </div>
      </div>

      <div className={Styles.abovediv2}>
        
        <NavLink className={Styles.messageimg} to={`main/messenger`}>
        
                   <span   
  >
          <i
      onClick={() => dispatch({ type: "SHOWMESSAGE", payload: true })}
            styles={{ color: "Dodgerblue", cursor: "pointer" }}
            className="fas fa-comments"
          ></i>
        </span>
        </NavLink>
      </div>
    </div>
  );
};
export default Header;
