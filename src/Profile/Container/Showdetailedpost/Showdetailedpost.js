import { useState } from "react";
import Styles from "./Showdetailedpost.module.css";
import {
  updateLikesArray,
  updateUnlikesArray
} from "../../../reduces/actions/userAction";
import Comments from "../../../Home/Feed/content/comments/Comments";
import updatelikes from "../../../methods/updatelikes";
import deletelike from "../../../methods/deletelike";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../../../Firebase/index";
import axios from "axios";
import { useSpring, animated as a } from "react-spring";
import NormalLoader from "../../../Animation/Loader/loader/NormalLoader";
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
    
       
         const resP=await axios.patch(`${URL}/count/decreasepostcount`,{
          username:username
        });
         window.location.reload("/main");
     
        })
        .catch(async (err) => {
          try{
            const res = await axios.delete(
              `${URL}/post/deleteuserpost/${deletePost._id}`
            );
         
           
            const resP=await axios.patch(`${URL}/count/decreasepostcount`,{
              username:username
            });
             window.location.reload("/main");


          }catch(err2){
            console.log(err2);
          }
          console.log(err);
        });
    };
    if (deleteIt) deletePostHandle();
  }, [deleteIt]);

  const showShareA = useSpring({
   from:{marginTop:-500,opacity:0},
   marginTop:0,
   opacity:1
  });
  const deleteAni = useSpring({
    marginTop:(!deleteIt && showConfirm)?250:500,
    opacity:(!deleteIt && showConfirm)?1:0
   });
  const showShareB = useSpring({
    from:{marginBottom:-1000,opacity:0},
    marginBottom:0,
    opacity:1
   });
  if (showConfirm) {

    if(deleteIt)
    return ( <a.div className={Styles.confirmmain} style={{...showShareB,display:"flex",alignItems:"center",flexDirection:"row",justifyContent:"center",justifyItems:"center"}}><NormalLoader/>    

     </a.div>)
    else
    return (
      <div   className={Styles.confirmmain}>
        <a.div style={deleteAni}  className={Styles.confirm}>
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
                setDeleteIt(true);
              }}
            >
              Yes
            </button>
          </div>
        </a.div>
      </div>
    );
  }
  return (
    <div>
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
        <div className={Styles.maincontent} >
          <span
            className={Styles.backbut}
            style={{ fontSize: "40px", color: "blue", cursor: "pointer" }}
            onClick={() => setShowDetailedPostHandler(false)}
          >
            <i
              styles={{ color: "Dodgerblue", cursor: "pointer" }}
              className="fa fa-arrow-circle-left"
            ></i>
          </span>
          <div  key={post._id} className={Styles.singlecontainer}>
            <a.div style={showShareB} className={Styles.topdiv}>
              <img
                src={
                  post.profilepic?.length>0
                    ? post.profilepic[0]
                    : process.env.PUBLIC_URL + "/userImage.png"
                }
                alt=" "
              />

              <h2>{post.username}</h2>
            </a.div>
            <a.button
      style={showShareA}
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
            </a.button>
            <a.div     style={showShareB} className={Styles.bottomdiv}>
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

              {toDelete ? (
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
            </a.div>
            <div style={{fontSize:"1.3em"}} className={Styles.caption}>{post.desc}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Showdetailedpost;
