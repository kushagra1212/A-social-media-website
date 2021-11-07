import { useState } from "react";
import Styles from "./Showdetailedpost.module.css";
import {
  resetFeedPosts,
  resetUserPosts,
  updateLikesArray,
  updateUnlikesArray,
} from "../../../reduces/actions/userAction";
import Comments from "../../../Home/Feed/content/comments/Comments";
import updatelikes from "../../../methods/updatelikes";
import deletelike from "../../../methods/deletelike";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import deletePost from "../../../methods/deletePost";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../../../Firebase/index";
import axios from "axios";
import { updatecountforpost } from "../../../reduces/actions/countAction";
import { getcount } from "../../../methods/getcount";
const URL = process.env.REACT_APP_URL;
const CURURL = process.env.REACT_APP_CURURL;
let likeCountArray = [];
const Showdetailedpost = ({ post, setShowDetailedPostHandler, toDelete }) => {
  const Alert = useAlert();
  const dispatch = useDispatch();
  let { postcount } = useSelector((state) => state.count);
  const [showcomments, setshowcomments] = useState(false);
  const [likeLoading, setlikeLoading] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [sharePostURL, setSharePostURL] = useState("");
  const [setting, setSetting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteIt, setDeleteIt] = useState(false);
  const [deletePost, setDeletePost] = useState(null);
  const { likesArray } = useSelector((state) => {
    return state.feedposts;
  });
  const { _id, profilepic, username } = useSelector((state) => {
    return state.user;
  });
  const [showAlert, setShowAlert] = useState(false);

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
  const copyToClipboardHandler = () => {
    navigator.clipboard.writeText(sharePostURL);
    if (!showAlert) {
      Alert.success("Link Copied", {
        onOpen: () => {
          setShowAlert(false);
        },
        onClose: () => {
          setShowAlert(true);
        },
      });
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
  useEffect(() => {
    const deletePostHandle = async () => {
      const fileRef = firebase.storage().refFromURL(deletePost.picture);
      fileRef
        .delete()
        .then(async () => {
          const res = await axios.delete(
            `${URL}/post/deleteuserpost/${deletePost._id}`
          );
          dispatch(resetFeedPosts());
          dispatch(resetUserPosts());

          let c = postcount;
          c -= 2;
          dispatch(updatecountforpost(username, c));
          setDeleteIt(false);
          window.location.reload("/main");
        })
        .catch((err) => {
          setDeleteIt(false);
          console.log(err);
        });
    };
    if (deleteIt) deletePostHandle();
  }, [deleteIt]);
  if (showConfirm) {
    return (
      <div className={Styles.confirmmain}>
        <div className={Styles.confirm}>
          <label>Do you want to delete ?</label>
          <div>
            <button
              className={Styles.confirmno}
              onClick={() => setShowConfirm(false)}
            >
              No
            </button>
            <button
              className={Styles.confirmyes}
              onClick={() => {
                setShowConfirm(false);
                setDeleteIt(true);
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      {showShare ? (
        <div className={Styles.topshare}>
          <span style={{ color: "red" }}>
            <i
              onClick={() => setShowShare(false)}
              styles={{
                color: "Dodgerblue",
                cursor: "pointer",
                boxShadow: "8px 9px 15px 10px #5050504d",
              }}
              className="fa fa-times-circle"
            ></i>
          </span>
          <div className={Styles.showshare}>
            <input disabled value={sharePostURL} />
            <button onClick={copyToClipboardHandler}>Copy link</button>
          </div>
        </div>
      ) : showcomments.val ? (
        <div className={Styles.topshare}>
          <Comments
            username={username}
            showcomments={showcomments}
            setcommentsfunc={setcommentsfunc}
          />
        </div>
      ) : (
        <div className={Styles.maincontent}>
          <span
            className={Styles.backbut}
            style={{ fontSize: "50px", color: "blue", cursor: "pointer" }}
            onClick={() => setShowDetailedPostHandler(false)}
          >
            <i
              styles={{ color: "Dodgerblue", cursor: "pointer" }}
              className="fa fa-arrow-circle-left"
            ></i>
          </span>
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
                  <span
                    style={{
                      color: "red",
                      position: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    <i
                      onClick={() => unlikefunction(post, post._id)}
                      styles={{
                        color: "Dodgerblue",
                        cursor: "pointer",
                        boxShadow: "8px 9px 15px 10px #5050504d",
                      }}
                      className="fa fa-heart"
                      aria-hidden="true"
                    ></i>
                  </span>{" "}
                  {likeCountArray.findIndex(
                    (ele) =>
                      ele.username === username && ele.postID === post._id
                  ) >= 0
                    ? post.likes.length + 1
                    : post.likes.length}
                </div>
              ) : (
                <div>
                  <span
                    style={{
                      color: "grey",
                      position: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    <i
                      onClick={() => likefunction(post, post._id)}
                      styles={{
                        color: "Dodgerblue",
                        cursor: "pointer",
                        boxShadow: "8px 9px 15px 10px #5050504d",
                      }}
                      className="fa fa-heart"
                      aria-hidden="true"
                    ></i>
                  </span>{" "}
                  {likeCountArray.findIndex(
                    (ele) =>
                      ele.username === username && ele.postID === post._id
                  ) >= 0
                    ? post.likes.length - 1
                    : post.likes.length}
                </div>
              )}
              <div>
                <span
                  style={{
                    color: "black",
                    position: "inherit",
                    cursor: "pointer",
                  }}
                >
                  <i
                    onClick={() => setcommentsfunc({ val: true, post: post })}
                    styles={{
                      color: "Dodgerblue",
                      cursor: "pointer",
                      boxShadow: "8px 9px 15px 10px #5050504d",
                    }}
                    className="far fa-comment-alt"
                    aria-hidden="true"
                  ></i>
                </span>
                {post?.comments?.length}
              </div>
              <div>
                <span
                  style={{
                    color: "lightgreen",
                    position: "inherit",
                    cursor: "pointer",
                  }}
                >
                  <i
                    onClick={() => {
                      setSharePostURL(`${CURURL}/post/${post._id}`);

                      setShowShare(true);
                    }}
                    styles={{
                      color: "Dodgerblue",
                      cursor: "pointer",
                      boxShadow: "8px 9px 15px 10px #5050504d",
                    }}
                    className="fa fa-share-alt"
                    aria-hidden="true"
                  ></i>
                </span>
              </div>
            <div>

              {!toDelete ? (
                setting ? (
                  <span
               
                    style={{  position: "inherit",
                    cursor: "pointer", color: "red" }}
                    onClick={() => {
                      setDeletePost(post);
                      setShowConfirm(true);
                    }}
                  >
                    <i className="fa fa-trash"></i>
                  </span>
                ) : (
                  <span
                  style={{  position: "inherit",
                  cursor: "pointer" }}
                    onClick={() => setSetting(true)}
                  >
                    <i className="fa fa-gear"></i>
                  </span>
                )
              ) : null}
              </div>
            </div>
            <div className={Styles.caption}>{post.desc}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Showdetailedpost;
