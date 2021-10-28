import { useState } from "react";
import backIcon from "./icons/back.png";
import Styles from "./Showdetailedpost.module.css";
import {
  updateLikesArray,
  updateUnlikesArray,
} from "../../../reduces/actions/userAction";
import Comments from "../../../Home/Feed/content/comments/Comments";
import updatelikes from "../../../methods/updatelikes";
import deletelike from "../../../methods/deletelike";
import { useAlert } from "react-alert";
import deletePost from "../../../methods/deletePost";
import { useDispatch, useSelector } from "react-redux";

let likeCountArray = [];
const Showdetailedpost = ({ post, setShowDetailedPostHandler, toDelete }) => {
  const Alert = useAlert();
  const dispatch = useDispatch();
  const [showcomments, setshowcomments] = useState(false);
  const [likeLoading, setlikeLoading] = useState(false);
  const [setting, setSetting] = useState(false);
  const { likesArray } = useSelector((state) => {
    return state.feedposts;
  });
  const { _id, profilepic, username } = useSelector((state) => {
    return state.user;
  });

  let tempUserLikes = [];

  const likefunction = (post, key) => {
    if (!likeLoading) {
      setlikeLoading(true);

      tempUserLikes.push({ username: username, postID: key });
      dispatch(updateLikesArray(username, key));
      let indexOflkesArray = likeCountArray.findIndex(
        (ele) => ele.username === username && ele.postID === post._id
      );
      if (indexOflkesArray < 0) {
        likeCountArray.push({ username: username, postID: post._id });
      } else {
        likeCountArray.splice(indexOflkesArray, 1);
      }

      //  let index=array.findIndex(ele=>ele.key==key);

      updatelikes({ username: username, id: post._id });
      setTimeout(() => {
        setlikeLoading(false);
      }, 400);
    }
  };

  const unlikefunction = (post, key) => {
    if (!likeLoading) {
      setlikeLoading(true);
      let indexTemp = tempUserLikes.findIndex(
        (ele) => ele.username === username && ele.postID === key
      );
      if (indexTemp >= 0) {
        tempUserLikes.splice(indexTemp, 1);
      }

      let indexOflkesArray = likeCountArray.findIndex(
        (ele) => ele.username === username && ele.postID === post._id
      );
      if (indexOflkesArray < 0) {
        likeCountArray.push({ username: username, postID: post._id });
      } else {
        likeCountArray.splice(indexOflkesArray, 1);
      }

      let likesArrayTemp = likesArray;
      let ind = likesArrayTemp.findIndex(
        (ele) => ele.username === username && ele.postID === key
      );
      if (ind >= 0) {
        likesArrayTemp.splice(ind, 1);
        dispatch(updateUnlikesArray(likesArrayTemp));
      }
      // let index=array.findIndex(ele=>ele.key==key);

      deletelike({ username: username, id: post._id });
      setTimeout(() => {
        setlikeLoading(false);
      }, 400);
    }
  };

  const setcommentsfunc = ({ val, post }) => {
    setshowcomments({ val: val, post: post });
  };
  const deletePostHandle = async (id, picture) => {
    Alert.error("Post can not be deleted ! 😉");
    return;
    await deletePost(id, picture);
  };
  return (
    <div className={Styles.maincontent}>

      <span className={Styles.backbut} style={{fontSize:"50px",color:"blue",cursor:"pointer"  }}   onClick={() => setShowDetailedPostHandler(false)}  >
      <i styles={{color:"Dodgerblue",cursor:"pointer" }}  className="fa fa-arrow-circle-left"></i>
        </span>
      {showcomments.val ? (
        <Comments
          username={username}
          showcomments={showcomments}
          setcommentsfunc={setcommentsfunc}
        />
      ) : (
     
          <div key={post._id} className={Styles.singlecontainer}>
          <div className={Styles.topdiv}>
            <img
              src={
                profilepic
                  ? profilepic
                  : process.env.PUBLIC_URL + "/userImage.png"
              }
              alt=" "
            />

            <h5>{post.username}</h5>
          </div>
          <button
            onDoubleClick={() => likefunction(post, post._id)}
            className={Styles.imgdiv}
          >
            <img
              src={
                post.picture
                  ? post.picture
                  : process.env.PUBLIC_URL + "/userImage.png"
              }
              width="100%"
              alt=" "
            />
          </button>
          <div className={Styles.bottomdiv}>
            {likesArray.findIndex(
              (ele) => ele.username === username && ele.postID === post._id
            ) >= 0 ? (
              <div>
                <img
                  className={Styles.bottombarImg}
                  alt=""
                  src={process.env.PUBLIC_URL + "/likeIcon.png"}
                  onClick={() => unlikefunction(post, post._id)}
                />{" "}
                {likeCountArray.findIndex(
                  (ele) => ele.username === username && ele.postID === post._id
                ) >= 0
                  ? post.likes.length + 1
                  : post.likes.length}
              </div>
            ) : (
              <div>
                <img
                  className={Styles.bottombarImg}
                  alt=""
                  src={process.env.PUBLIC_URL + "/unlikeIcon.png"}
                  onClick={() => likefunction(post, post._id)}
                />{" "}
                {likeCountArray.findIndex(
                  (ele) => ele.username === username && ele.postID === post._id
                ) >= 0
                  ? post.likes.length - 1
                  : post.likes.length}
              </div>
            )}
            <div>
              <img
                className={Styles.bottombarImg}
                alt=""
                src={process.env.PUBLIC_URL + "/chatIcon.png"}
                onClick={() => setcommentsfunc({ val: true, post: post })}
              />
              {post?.comments?.length}
            </div>

            <img
              className={Styles.bottombarImg}
              src={process.env.PUBLIC_URL + "/shareIcon.png"}
              width="4.5%"
              height="2%"
              alt=""
            />

            {toDelete ? (
              setting ? (
                <option
                  value="delete"
                  className={Styles.delete}
                  onClick={() => deletePostHandle(post._id, post.picture)}
                >
                  {" "}
                  ❌Delete{" "}
                </option>
              ) : (
                <button onClick={() => setSetting(true)}>⚙️</button>
              )
            ) : null}
          </div>
          <div className={Styles.caption}>{post.desc}</div>
        </div>
    
      )}
    </div>
  );
};

export default Showdetailedpost;
