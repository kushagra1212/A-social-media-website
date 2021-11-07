import { useState, useEffect, Suspense } from "react";
import Styles from "./Picture.module.css";
import { useDispatch } from "react-redux";
import { useTransition, useSpringRef, animated } from "react-spring";
import { show_user_stories_handle } from "../../../../reduces/actions/StoriesAction";
import { backgroundImages } from "./backgroundImages";
import { show_others_stories_handle } from "../../../../reduces/actions/StoriesAction";
import ContentLoader from "react-content-loader";
import { SuspenseImg } from "../../content/SuspenceImage/SuspenceImg";
let heightofAni = window.screen.width >= 768 ? "80vh" : "60vh";
let widthofAni = window.screen.width >= 768 ? "40vw" : "100vw";
const MyLoader = (props) => (
  <ContentLoader
    speed={1}
    width={widthofAni}
    height={heightofAni}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {" "}
    <rect x="0" y="0" rx="1" ry="3" width="100%" height="100%" />
  </ContentLoader>
);
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
      transform: `translate3d(${increased ? 100 : 0}%,0,0) scale(0.1)`,
    },
    enter: { opacity: 1, transform: "translate3d(0,0,0) scale(1)" },
    leave: {
      opacity: 1,
      transform: `translate3d(${increased ? 0 : 0}%,0,0) scale(0.1)`,
    },
    backgroundPosition: "-10% 10%",
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
        <span
          className={Styles.addMore}
          style={{ fontSize: "40px", color: "white" }}
        >
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
            <Suspense
              fallback={
                <div style={window.screen.width>=768?{ marginLeft: "10%" }:{}}>
                  <MyLoader />
                </div>
              }
            >
              <SuspenseImg src={documents[i].picture} width="100%" alt="" />
            </Suspense>
          </animated.div>
        );
      })}
      {window.screen.width >= 768 ? (
        <>
          <span className={Styles.bigright}>
            <i
              onClick={() =>
                count - 1 >= 0
                  ? decreaseCount()
                  : other === true
                  ? dispatch(show_others_stories_handle(false, -1))
                  : dispatch(show_user_stories_handle(false))
              }
              styles={{ color: "Dodgerblue", cursor: "pointer" }}
              className="fa fa-arrow-left"
            ></i>
          </span>
          <span className={Styles.bigleft}>
            <i
              onClick={() =>
                count + 1 <= documents.length - 1
                  ? increaseCount()
                  : other === true
                  ? dispatch(show_others_stories_handle(false, -1))
                  : dispatch(show_user_stories_handle(false))
              }
              styles={{ color: "Dodgerblue", cursor: "pointer" }}
              className="fa fa-arrow-right"
            ></i>
          </span>
        </>
      ) : (
        <>
          <button
            onClick={() =>
              count + 1 <= documents.length - 1
                ? increaseCount()
                : other === true
                ? dispatch(show_others_stories_handle(false, -1))
                : dispatch(show_user_stories_handle(false))
            }
            className={Styles.previous}
          ></button>
          <button
            onClick={() =>
              count - 1 >= 0
                ? decreaseCount()
                : other === true
                ? dispatch(show_others_stories_handle(false, -1))
                : dispatch(show_user_stories_handle(false))
            }
            className={Styles.next}
          ></button>
        </>
      )}
    </div>
  );
};
export default Picture;
