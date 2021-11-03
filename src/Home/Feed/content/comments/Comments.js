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
    <>
         <div className={Styles.wrapspan}>
      <span style={{ fontSize: "40px", color: "red",cursor:'pointer' }}>
          <i
          onClick={() => setcommentsfunc({ val: false, post: null })}
            styles={{ color: "Dodgerblue", cursor: "pointer" }}
            className="fa fa-times-circle"
          ></i>
        </span>
  


      </div>
    <animated.div className={Styles.maindiv} style={Popup}>
    <img
          alt=""
 
          src={profilepic?profilepic:process.env.PUBLIC_URL+'/userImage.png'}
          width="30px"
          height="30px"
          style={{borderRadius:"10px",cursor:"unset"}}
        />
      <div className={Styles.topdiv}>
   
      <div>
 
        </div>
        {post?<div><Addcomment addCommentFunc={addCommentFunc} /></div>:null}
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
    </>
  );
};

export default Comment;
