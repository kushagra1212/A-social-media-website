import Styles from "./Stories.module.css";
import { backgroundImages } from "./Picture/backgroundImages";

import { useDispatch, useSelector } from "react-redux";
import {
  show_user_stories_handle,
  show_others_stories_handle,
} from "../../../reduces/actions/StoriesAction";

const Stories = () => {
  const dispatch = useDispatch();
  const { profilepic } = useSelector((state) => state.user);

  const { othersStories } = useSelector((state) => state.Stories);

  return (
    <div className={Styles.main}>
      <div className={Styles.stories}>
        <li
          onClick={() => dispatch(show_user_stories_handle(true))}
          className={Styles.particular}
        >
          <img
            src={
              profilepic ? profilepic : process.env.PUBLIC_URL + "/AddIcon.png"
            }
            alt=""
            width="100%"
            height="100%"
          />
        </li>
        {othersStories?.map((ele, id) =>
          ele.stories.length >= 1 ? (
            <li
              key={id}
              onClick={() => dispatch(show_others_stories_handle(true, id))}
              className={Styles.particular}
            >
              <img
                src={
                  ele.stories[0].profilepic !== ""
                    ? `url(${ele.stories[0].profilepic})`
                    : process.env.PUBLIC_URL + "/userImage.png"
                }
                alt=""
                width="100%"
                height="100%"
              />
            </li>
          ) : null
        )}
           
      </div>
    </div>
  );
};
export default Stories;
