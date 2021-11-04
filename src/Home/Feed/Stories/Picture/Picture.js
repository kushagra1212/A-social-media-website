import { useState, useEffect } from "react";
import Styles from "./Picture.module.css";
import { useDispatch } from "react-redux";
import { useTransition, useSpringRef, animated } from "react-spring";
import { show_user_stories_handle } from "../../../../reduces/actions/StoriesAction";
import { backgroundImages } from "./backgroundImages";
import { show_others_stories_handle } from "../../../../reduces/actions/StoriesAction";
const Picture = ({ documents, set_picture_handle, other }) => {
  const [count, setcount] = useState(0);
  const [backgroundCount, setbackgroundCount] = useState(
    Math.floor(Math.random() * backgroundImages.length)
  );
  const dispatch = useDispatch();
  const transForRef = useSpringRef();

  const [increased, setIncreased] = useState(true);
  const Transition = useTransition(count, {
    ref: transForRef,
    keys: null,
    from: {
      opacity: 1,
      transform: `translate3d(${increased ? 100 : -100}%,0,0) scale(0.5)`,
    },
    enter: { opacity: 1, transform: "translate3d(0,0,0) scale(1)" },
    leave: {
      opacity: 1,
      transform: `translate3d(${increased ? 100 : -100}%,0,0) scale(0.5)`,
    },
    backgroundPosition: "10% 0%",
    config: { duration: 300 },
  });

  const increaseCount = () => {
    setcount(count + 1);

    setIncreased(true);
    setTimeout(
      () =>
        setbackgroundCount(Math.floor(Math.random() * backgroundImages.length)),
      330
    );
  };
  const decreaseCount = () => {
    setcount(count - 1);

    setIncreased(false);
    setTimeout(
      () =>
        setbackgroundCount(Math.floor(Math.random() * backgroundImages.length)),
      330
    );
  };

  useEffect(() => {
    transForRef.start();
  }, [count]);

  return (
    <div className={Styles.maindiv}>
      {other === true ? null : (
  
                <span    className={Styles.addMore} style={{ fontSize: "40px", color: "white" }}>
                <i
               
                 onClick={() => set_picture_handle(false)}
                  styles={{ color: "Dodgerblue", cursor: "pointer" }}
                  className="fa fa-plus"
                ></i>
              </span>
      )}

      {Transition((style, i) => {
        return (
          <animated.div
            className={Styles.picture}
            style={{
              
              ...style,
            
            }}
          >
            <img src={documents[i].picture} width="100%" alt="" />
          </animated.div>
        );
      })}
              {window.screen.width>=768?<>
                <span className={Styles.bigright}   >
                <i
               
               onClick={() =>
                count + 1 <= documents.length - 1
                  ? increaseCount()
                  : other === true
                  ? dispatch(show_others_stories_handle(false, -1))
                  : dispatch(show_user_stories_handle(false))
              }
                  styles={{ color: "Dodgerblue", cursor: "pointer" }}
                  className="fa fa-arrow-left"
                ></i>
              </span>
              <span  className={Styles.bigleft}   >
                <i
               
               onClick={() =>
                count - 1 >= 0
                  ? decreaseCount()
                  : other === true
                  ? dispatch(show_others_stories_handle(false, -1))
                  : dispatch(show_user_stories_handle(false))
              }
                  styles={{ color: "Dodgerblue", cursor: "pointer" }}
                  className="fa fa-arrow-right"
                ></i>
              </span></>:<>
              
              <button    onClick={() =>
                count + 1 <= documents.length - 1
                  ? increaseCount()
                  : other === true
                  ? dispatch(show_others_stories_handle(false, -1))
                  : dispatch(show_user_stories_handle(false))
              }  className={Styles.previous} ></button>
              <button       onClick={() =>
                count - 1 >= 0
                  ? decreaseCount()
                  : other === true
                  ? dispatch(show_others_stories_handle(false, -1))
                  : dispatch(show_user_stories_handle(false))
              } className={Styles.next} >

              </button>
              </>}
     
    </div>
  );
};
export default Picture;
