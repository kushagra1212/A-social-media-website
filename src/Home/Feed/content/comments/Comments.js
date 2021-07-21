import { useState } from "react";
import Addcomment from "./Addcomment";
import addcomment from "../../../../methods/addcomments";
import Styles from "./Comments.module.css";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSpring,animated } from "react-spring";

import { updatepost } from "../../../../reduces/actions/userAction";
const Comment = ({ username, showcomments, setcommentsfunc }) => {
  const [post, setpost] = useState();
  const profilepic = useSelector((state) => state.user.profilepic);
  const [comments,setcomments]=useState(null);
  const dispatch=useDispatch();
  const addCommentFunc = async (comment) => {
    let id = showcomments.post._id;
    let profilePicture = post.pic;

    let com = await addcomment(id, username, comment, profilePicture);

    com.comments.sort((a, b) => new Date(b.date) - new Date(a.date));
    setpost(com);

    dispatch(updatepost(com));
  };
  useEffect(()=>{
    let com=showcomments.post;
    com.comments.sort((a, b) => new Date(b.date) - new Date(a.date));
  setpost(com);
  },[]);
  const Popup = useSpring({
    from: { y: "100%", x: "-50%", transform: "scale(0.1)" },
    y: "-50%",
    x: "-50%",
    transform: "scale(1)",

    config: { mass: 10, tension: 100, friction: 10, duration: 200 },
  });

  return (
    <animated.div className={Styles.maindiv} style={Popup}>
      <button
        className={Styles.backbut}
        onClick={() => setcommentsfunc({ val: false, post: null })}
      >
        back
      </button>
      <div className={Styles.topdiv}>
        {" "}
        <img
          alt=""
          className={Styles.profileimage}
          src={profilepic?profilepic:process.env.PUBLIC_URL+'/userImage.png'}
          width="30px"
          height="30px"
        />
        <Addcomment addCommentFunc={addCommentFunc} />
      </div>
      <div className={Styles.main}>
        {post?.comments.map((ele, id) => {
          return (
            <div className={Styles.commentdiv} key={id}>
              <img
                alt=""
                className={Styles.profileimage}
                src={process.env.PUBLIC_URL+'/userImage.png'}
                width="20px"
                height="20px"
              />
              <div className={Styles.username}>
                <strong>{ele.username}</strong>{" "}
              </div>
              <div className={Styles.comment}>{ele.comment}</div>
            </div>
          );
        })}
      </div>
    </animated.div>
  );
};

export default Comment;
