import Styles from "./Content.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { Suspense, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getitem from "../../../methods/getitem";
import updatelikes from "../../../methods/updatelikes";
import deletelike from "../../../methods/deletelike";
import Comments from "./comments/Comments";
import { getstoriesFromOthers } from "../../../methods/uploadstories";
import { updatepost } from "../../../reduces/actions/userAction";
import { FluidLoaderFive } from "../../../Animation/Loader/loader/FluidLoader";
import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock";
import { SuspenseImg } from "./SuspenceImage/SuspenceImg";
import { getstories } from "../../../methods/uploadstories";
import ContentMainAnimate from "./ContentMainAnimate/ContentMainAnimate";
import Addcomment from "./comments/Addcomment";
import addcomment from "../../../methods/addcomments";
import Search from "../../../Search/Search";
import { useAlert } from "react-alert";
import SuggestionList from "../../../components/suggestionlist/SuggestionList";
import ContentLoader from "react-content-loader";
import {
  updateLastCount,
  updateLatestLikesArray,
  updateLatestPost,
  updateLatestUnlikesArray,
  addLatestPosts,
  setScrollPositionHandler,
} from "../../../reduces/actions/PostAction";
import getallposts from "../../../methods/getallposts";

const CURURL = process.env.REACT_APP_CURURL;
let likeCountArray = [];
let element = null;
export const MyLoader = (props) => {
  let heightofAni = window.screen.width >= 768 ? "100vh" : "45vh";

return(  <ContentLoader
  speed={1}
  width="100%"
  height={heightofAni}
  backgroundColor="#f3f3f3"
  foregroundColor="#ecebeb"
  {...props}
>
  {" "}
  <rect x="0" y="0" rx="1" ry="3" width="100%" height="100%" />
</ContentLoader>);
};
const Content = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();
  const { profilepic, username } = useSelector((state) => {
    return state.user;
  });
  const { likesLatestArray, scrollPosition } = useSelector((state) => {
    return state?.Posts;
  });

  const [hasMore, sethasmore] = useState(true);

  const [isUnmounted, setIsUnmounted] = useState(false);
  let tempUserLikes = [];
  const [showAlert, setShowAlert] = useState(false);
  const [showcomments, setshowcomments] = useState(false);
  const [likeLoading, setlikeLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [sharePostURL, setSharePostURL] = useState("");
  const sRef = useRef();
  const [noOne, setNoOne] = useState(false);
  const setShowProfileHandler = (val) => {
    if (val) setShowProfile(val);
  };
  const setUserSearchHandler = (val) => {
    setUserSearch(val);
  };
  const unique = (array) => {
    let isvisited = {};
    let newarray = [];

    array.forEach((ele) => {
      if (!isvisited[ele.picture]) {
        newarray.push(ele);
        isvisited[ele.picture] = true;
      }
    });
    return newarray;
  };
  const state = useSelector((state) => state);
  const [array, setarray] = useState([]);

  const [loading, setloading] = useState(false);

  const likefunction = (post, key) => {
    if (!likeLoading) {
      setlikeLoading(true);

      tempUserLikes.push({ username: username, postID: key });

      dispatch(updateLatestLikesArray(username, key));
      let indexOflkesArray = likeCountArray.findIndex(
        (ele) => ele.username === username && ele.postID === post._id
      );
      if (indexOflkesArray < 0) {
        likeCountArray.push({ username: username, postID: post._id });
      } else {
        likeCountArray.splice(indexOflkesArray, 1);
      }

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

      let likesArrayTemp = likesLatestArray;
      let ind = likesArrayTemp.findIndex(
        (ele) => ele.username === username && ele.postID === key
      );
      if (ind >= 0) {
        likesArrayTemp.splice(ind, 1);

        dispatch(updateLatestUnlikesArray(likesArrayTemp));
      }

      deletelike({ username: username, id: post._id });
      setTimeout(() => {
        setlikeLoading(false);
      }, 400);
    }
  };

  const addCommentFuncforContent = async (comment, post) => {
    let id = post._id;
    let profilePicture = post.pic;

    let com = await addcomment(id, username, comment, profilePicture);

    com.comments.sort((a, b) => new Date(b.date) - new Date(a.date));

    dispatch(updateLatestPost(com));
  };
  const setcommentsfunc = ({ val, post }) => {
    element = document.querySelector("#infiniteScroll");
    setshowcomments({ val: val, post: post });
  };
  const copyToClipboardHandler = () => {
    if (!showAlert) {
      navigator.clipboard.writeText(sharePostURL);
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
  const getPosts = () => {
    getallposts(username, state?.Posts.lastcount, 3)
      .then((posts) => {
        console.log(posts);
        if (posts.length > 0) {
          dispatch(addLatestPosts(posts, array));
          setarray([...array, ...posts]);
          dispatch(updateLastCount(state?.Posts.lastcount + 3));
          posts.forEach((ele) => {
            ele.likes.forEach((ele2) => {
              dispatch(updateLatestLikesArray(ele2.username, ele._id));
            });
          });
        } else {
          sethasmore(false);
        }
        setloading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (username) {
      getPosts();
      getstories(username, dispatch);
      getitem(username).then(async (item) => {
        item?.following.forEach((ele) => {
          getstoriesFromOthers(ele.username, dispatch);
        });
      });
    }
  }, [username]);
  useEffect(() => {
    setTimeout(() => {
      setNoOne(true);
    }, 3000);
  }, []);
  useEffect(() => {
    if (state.Posts.posts.length >= 1) {
      setloading(false);
      setNoOne(true);
    }
    window.scrollTo(0, scrollPosition);
  }, [showProfile, loading, noOne, state.Posts.posts.length, scrollPosition]);

  if (showcomments.val) disableBodyScroll(element);
  else if (element != null) enableBodyScroll(element);
  if (showProfile) {
    return (
      <div className={Styles.userprofilemain}>
        <span style={{ fontSize: "40px", color: "red" }}>
          <i
            onClick={() => {
              setShowProfile(false);
              setUserSearch("");
            }}
            styles={{ color: "Dodgerblue", cursor: "pointer" }}
            className="fa fa-times-circle"
          ></i>
        </span>

        <div className={Styles.userProfile}>
          <Search
            showprofilefromshowbar={showProfile}
            view={false}
            usernameformshowbar={userSearch}
            preview={true}
          />
        </div>
      </div>
    );
  }
  if (loading || !noOne) {
    return <ContentMainAnimate />;
  } else if (state.Posts.posts.length === 0 && noOne) {
    return (
      <>
        <div className={Styles.maincontentstart} style={{ overflow: "hidden" }}>
          No Post to See Please Follow your Friends !
          <img
            width="100%"
            height="90%"
            alt=""
            src={process.env.PUBLIC_URL + "/nopost.gif"}
          />
        </div>
        {window.screen.width < 768 ? (
          <SuggestionList
            setShowProfileHandler={setShowProfileHandler}
            setUserSearchHandler={setUserSearchHandler}
          />
        ) : null}
      </>
    );
  } else {
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
        ) : null}
        {showcomments.val ? (
          <div className={Styles.commenttopdiv}>
            <Comments
              username={username}
              showcomments={showcomments}
              setcommentsfunc={setcommentsfunc}
            />
          </div>
        ) : null}
        <div className={Styles.maincontent} id="infiniteScroll">
          <InfiniteScroll
            className={Styles.infi}
            dataLength={state.Posts.posts.length}
            next={getPosts}
            hasMore={hasMore}
            loader={<div style={{ marginTop: "50px" }}></div>}
            endMessage={
              <p className={Styles.infiP}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            ref={sRef}
            onScroll={(e) => {
              const scrollY = window.scrollY; //Don't get confused by what's scrolling - It's not the window
              if (scrollY !== 0) dispatch(setScrollPositionHandler(scrollY));
            }}
          >
            {state?.Posts?.posts.map((post, key) => (
              <div key={post._id} className={Styles.singlecontainer}>
                <div
                  className={Styles.topdiv}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    dispatch(setScrollPositionHandler(window.scrollY));

                    setUserSearch(post.username);
                    setShowProfile(true);
                  }}
                >
                  <Suspense fallback={<FluidLoaderFive />}>
                    <img
                      src={
                        post.profilepic
                          ? post.profilepic
                          : process.env.PUBLIC_URL + "/userImage.png"
                      }
                      alt=""
                    />
                  </Suspense>
                  <h6 className={Styles.usernamediv}>{post.username}</h6>
                </div>
                <button className={Styles.imgdiv}>
                  <Suspense fallback={<MyLoader />}>
                    <SuspenseImg alt="" src={post.picture} />
                  </Suspense>
                </button>
                <div className={Styles.bottomdiv}>
                  {likesLatestArray.findIndex(
                    (ele) =>
                      ele.username === username && ele.postID === post._id
                  ) >= 0 ? (
                    <div>
                      <span
                        style={{
                          color: "red",

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
                        ? post?.likes?.length + 1
                        : post?.likes?.length}
                    </div>
                  ) : (
                    <div className={Styles.heart}>
                      <span
                        style={{
                          color: "grey",

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
                          className={"fa fa-heart"}
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

                        cursor: "pointer",
                      }}
                    >
                      <i
                        onClick={() =>
                          setcommentsfunc({ val: true, post: post })
                        }
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
                  <span
                    style={{
                      color: "lightgreen",

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
                <div
                  style={post.desc !== "" ? { padding: "3%" } : {}}
                  className={Styles.caption}
                >
                  {post.desc}
                </div>
                <Addcomment
                  addCommentFunc={(comment) =>
                    addCommentFuncforContent(comment, post)
                  }
                />
                {(key + 1) % 10 === 0 && window.screen.width < 768 ? (
                  <SuggestionList
                    setShowProfileHandler={setShowProfileHandler}
                    setUserSearchHandler={setUserSearchHandler}
                  />
                ) : null}
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </>
    );
  }
};
export default Content;
