import Styles from "./Container.module.css";
import { useState, Suspense, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Showdetailedpost from "./Showdetailedpost/Showdetailedpost";
import { useDispatch, useSelector } from "react-redux";
import { SuspenseImg } from "../../Home/Feed/content/SuspenceImage/SuspenceImg";
import { getpostsforfeed } from "../../methods/getpostsforfeed";
import { updateLikesArray } from "../../reduces/actions/userAction";
import { getcount } from "../../methods/getcount";
import { FluidLoaderFive } from "../../Animation/Loader/loader/FluidLoader";
import ContentLoader from "react-content-loader";
import { MyLoader } from "../../Home/Feed/content/Content";
import Loader from "../../Animation/Loader/Loader";
import Addcomment from "../../Home/Feed/content/comments/Addcomment";
import addcomment from "../../methods/addcomments";
import Comments from "../../Home/Feed/content/comments/Comments";
import VerticalLoader from "../../Animation/Loader/loader/VerticalLoader";
import updatelikes from "../../methods/updatelikes";
import deletelike from "../../methods/deletelike";
import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock";
import {animated as a,useSpring} from 'react-spring'
import { useAlert } from "react-alert";
const CURURL = process.env.REACT_APP_CURURL;
let heightofAni = window.screen.width >= 768 ? "45vh" : "20vh";
let widthofAni = window.screen.width >= 768 ? "100%" : "100%";
let heightofAniT = window.screen.width >= 768 ? "95vh" : "45vh";
let widthofAniT = window.screen.width >= 768 ? "100%" : "100%";
let element = null;
const MyLoaderGrid = (props) => (
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
const MyLoaderTable = (props) => (
  <ContentLoader
    speed={1}
    width={widthofAniT}
    height={heightofAniT}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {" "}
    <rect x="0" y="0" rx="1" ry="3" width="100%" height="100%" />
  </ContentLoader>
);
const Container = ({ toDelete, username }) => {
  const Alert = useAlert();

  const [grid, setGrid] = useState(true);
  const dispatch = useDispatch();
  const [showDetailedPost, setShowDetailedPost] = useState(false);
  const [post, setPost] = useState([]);
  const [showShare, setShowShare] = useState(false);
  const [showcomments, setshowcomments] = useState(false);
  const [sharePostURL, setSharePostURL] = useState("");
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [postCount, setPostCount] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [vis, setVis] = useState(true);
  const gridHandler = (bool) => {
    setGrid(bool);
  };
  const setShowDetailedPostHandler = (bool) => {
    setShowDetailedPost(bool);
  };
  const setPostHandler = (post) => {
    setPost(post);
    setShowDetailedPostHandler(true);
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
  const call_func = async () => {
    if (!isUnmounted) {
      let lastCount;
      if (posts) lastCount = posts.length;
      else lastCount = 0;
      let temp_array;
      try {
        temp_array = await getpostsforfeed(username, lastCount, 5);
        temp_array.forEach((ele) => {
          ele.likes.forEach((ele2) => {
            dispatch(updateLikesArray(ele2.username, ele._id));
          });
        });
        let newArray = [...posts, ...temp_array];
        newArray = unique(newArray);
        setPosts(newArray);
        if (newArray.length === postCount) setHasMore(false);
      } catch (err) {
        setHasMore(false);
        console.log(err);
      }
    }
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
  useEffect(() => {
    if (posts.length === 0) {
      setTimeout(() => {
        setVis(false);
      }, 1000);
    }
  }, [posts]);
  useState(() => {
    console.log(username);
    getcount(username).then((res) => {
      if (res.postcount === 0) setHasMore(false);
      call_func();
      setPostCount(res.postcount);
    });
  }, [username]);
  const setcommentsfunc = ({ val, post }) => {
    element = document.querySelector("#infiniteScroll");
    setshowcomments({ val: val, post: post });
  };
  if (showcomments.val) disableBodyScroll(element);
  else if (element != null) enableBodyScroll(element);
  const addCommentFuncforContent = async (comment, post) => {
    let id = post._id;
    let profilePicture = post.pic;
    let index = posts.findIndex((ele) => ele._id === id);
    let poss = [...posts];

    let com = await addcomment(id, username, comment, profilePicture);

    com.comments.sort((a, b) => new Date(b.date) - new Date(a.date));
    poss[index] = com;
    setPosts(poss);
  };
  const likefunction = (post, id) => {
    let index = posts.findIndex((ele) => ele._id === id);
    let poss = [...posts];
    poss[index].likes.push({ username: username, postID: id });
    updatelikes({ username: username, id: post._id });

    setPosts(poss);
  };
  const unlikefunction = (post, id) => {
    let index = posts.findIndex((ele) => ele._id === id);
    let poss = [...posts];
    poss[index].likes = poss[index].likes.filter(
      (ele) => ele.username !== username
    );
    deletelike({ username: username, id: post._id });
    setPosts(poss);
  };
  const showShareA = useSpring({
    y:showDetailedPost? "0%":"-50%",
    x:showDetailedPost? "0%":"0%",
    transform:showDetailedPost?"scale(1)":"scale(0.1)",
    opacity:showDetailedPost?"100%":"0%",
  });
  if (showDetailedPost)
    return (
      <div >
      <Showdetailedpost
        setShowDetailedPostHandler={setShowDetailedPostHandler}
        toDelete={toDelete}
        post={post}
      />
      </div>
    );
  else
    return (
      <>
        {showcomments.val ? (
          <div className={Styles.commenttopdiv}>
            <Comments
              username={username}
              showcomments={showcomments}
              setcommentsfunc={setcommentsfunc}
            />
          </div>
        ) : null}
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
        <div className={Styles.topButtons}>
          <button
            disabled={grid ? true : false}
            onClick={() => gridHandler(true)}
          >
            {" "}
            <img
              width="30px"
              height="30px"
              src="https://img.icons8.com/ios-glyphs/60/000000/grid-2.png"
              alt=""
            />
          </button>
          <button
            onClick={() => gridHandler(false)}
            disabled={grid ? false : true}
          >
            {" "}
            <img
              width="30px"
              height="30px"
              src="https://img.icons8.com/material-outlined/60/000000/ingredients-list.png"
              alt=""
            />
          </button>
          {postCount === 0 ? (
            <div className={Styles.noposts}> No Posts</div>
          ) : null}
        </div>

        {grid ? (
          <InfiniteScroll
            className={Styles.infi}
            dataLength={posts.length}
            next={call_func}
            hasMore={hasMore}
            loader={
              <div
                style={{ width: "10em", marginTop: "10%", height: "10em" }}
              ></div>
            }
            endMessage={""}
          >
            <div style={{}} className={Styles.maindiv}>
              {posts.map((post, id) => {
                return (
                  <div key={id} className={grid ? Styles.boxgrid : Styles.box}>
                    <div
                      className={Styles.test}
                      onClick={() => setPostHandler(post)}
                    >
                      <h1 style={{ color: "white" }}>View</h1>
                    </div>
                    <Suspense
                      fallback={grid ? <MyLoaderGrid /> : <MyLoaderTable />}
                    >
                      <SuspenseImg src={post.picture} />
                    </Suspense>
                  </div>
                );
              })}
              {vis ? <VerticalLoader /> : null}
            </div>
          </InfiniteScroll>
        ) : (
          <div className={Styles.maincontent} id="infiniteScroll">
            <InfiniteScroll
              className={Styles.infi}
              dataLength={posts.length}
              next={call_func}
              hasMore={hasMore}
              loader={
                <div
                  style={{ width: "10em", marginTop: "10%", height: "10em" }}
                ></div>
              }
              endMessage={
                <p className={Styles.infiP}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {posts.map((post, key) => (
                <div key={post._id} className={Styles.singlecontainer}>
                  <div className={Styles.topdiv}>
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
                    {post.likes.findIndex((ele) => ele.username === username) >=
                    0 ? (
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
                        {post.likes.length}
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
                        {post.likes.length}
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
                </div>
              ))}
            </InfiniteScroll>
          </div>
        )}
      </>
    );
};
export default Container;
