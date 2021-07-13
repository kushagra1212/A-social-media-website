import Styles from "./Content.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { getpostsforfeed } from "../../../methods/getpostsforfeed";
import sharepic from "./images/share.png";
import { Suspense, useEffect, useState } from "react";
import getuser from "../../../methods/getuser";
import { useDispatch, useSelector } from "react-redux";
import getitem from "../../../methods/getitem";
import updatelikes from "../../../methods/updatelikes";
import deletelike from "../../../methods/deletelike";
import Feedposts from "../../../posts/Feedposts";
import Comments from "./comments/Comments";
import Loader from "../../../Animation/Loader/Loader";
import VerticalLoader from "../../../Animation/Loader/loader/VerticalLoader";
import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock";
import { SuspenseImg } from "./SuspenceImage/SuspenceImg";
import {
  updateLikesArray,
  updateUnlikesArray,
} from "../../../reduces/actions/userAction";
let likeCountArray = [];
let element = null;
const Contentmain = () => {
  const dispatch = useDispatch();
  const { _id, profilepic, username } = useSelector((state) => {
    console.log(state.user.username);
    return state.user;
  });
  const { likesArray } = useSelector((state) => {
    console.log(state.feedposts);
    return state.feedposts;
  });
  const [hasMore, sethasmore] = useState(true);
  const [isUnmounted, setIsUnmounted] = useState(false);
  let tempUserLikes = [];

  const [showcomments, setshowcomments] = useState(false);
  const [likeLoading, setlikeLoading] = useState(false);

  const unique = (array) => {
    let isvisited = {};
    let newarray = [];
    console.log(array, "arr");
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
  {
    console.log(state.feedposts);
  }

  const [loading, setloading] = useState(false);

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
    //temp section
  };
  const getothers = (post1) => {
    let post2 = [];
    console.log("OTHERS");
    if (username) {
      getitem(username).then((item) =>
        item?.following?.map((dat) => {
          let lastcount2 = state.feedposts.lastcount;
          getpostsforfeed(dat.username, lastcount2)
            .then((post) => {
              post2 = post;
              getuser(dat.username).then((ele) =>
                post2.map((elee) => {
                  elee["pic"] = ele.profilepic;
                })
              );

              let newArray = [];

              let newpost = [...post1, ...post2];
              newpost = unique(newpost);
              let feedpos = state.feedposts.posts;

              feedpos = unique(feedpos);

              if (newpost.length == 0) sethasmore(false);
              newpost.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
              );

              newpost.forEach((ele) => {
                newArray.push({
                  liked: ele.likes.find((elee) => elee.username == username),
                  length: ele.likes.length,
                });
              });
              newpost = [...feedpos, ...newpost];

              let array1 = [...array, ...newArray];

              let lastcount = 1,
                lastcount2 = 1;
              newpost = unique(newpost);
              newpost.forEach((ele) => {
                ele.likes.forEach((ele2) => {
                  dispatch(updateLikesArray(ele2.username, ele._id));
                });
              });
              Feedposts(newpost, lastcount, array1, lastcount2, dispatch);
              console.log(lastcount, "y", lastcount2);
              setarray([...array, ...newArray]);

              console.log([...array, ...newArray], "final array");
              console.log(newpost);

              setloading(false);
            })
            .catch((err) => console.log(err));
        })
      );
    } else {
      console.log("");
    }
  };
  let post1 = [];
  const call_func = async () => {
    if (username) {
      try {
        let lastcount = state.feedposts.lastcount;
        const res = await getpostsforfeed(username, lastcount);

        if (res) {
          post1 = res;

          getothers(post1);

          post1.map((ele) => {
            ele["pic"] = profilepic;
          });
          if (post1.length == 0) {
            setloading(false);
          }
          console.log(post1, "own");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setloading(false);
    }
  };
  const setcommentsfunc = ({ val, post }) => {
    element = document.querySelector("#infiniteScroll");
    setshowcomments({ val: val, post: post });
  };

  useEffect(() => {
    if (!isUnmounted) {
      if (state.feedposts.posts.length === 0) {
        setloading(true);

        call_func();
      }
      console.log(state.feedposts.lastcount, " ", state.feedposts.lastcount2);

      setarray(state.feedposts.array);
    }

    return () => setIsUnmounted(true);
  }, []);
  if (showcomments.val) disableBodyScroll(element);
  else if (element != null) enableBodyScroll(element);

  if (loading == true) {
    return <div className={Styles.loader}></div>;
  } else if (state.feedposts.posts.length == 0) {
    return (
      <div className={Styles.maincontent}>
        Seems like you are not following any one , please follow others to see
        their posts
      </div>
    );
  } else {
    return (
      <div className={Styles.maincontent} id="infiniteScroll">
        {showcomments.val ? (
          <Comments
            username={username}
            showcomments={showcomments}
            setcommentsfunc={setcommentsfunc}
          />
        ) : null}
        <InfiniteScroll
          className={Styles.infi}
          dataLength={state.feedposts.posts.length}
          next={call_func}
          hasMore={hasMore}
          loader={<div className={Styles.loader}></div>}
          endMessage={
            <p
              style={{
                textAlign: "center",
                backgroundColor: "black",
                color: "white",
                width: "100%",
                height: "30px",
                marginTop: "1%",
                marginBottom: "5%",
                position: "relative",
              }}
            >
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {state.feedposts.posts.map((post, key) => (
            <div key={post._id} className={Styles.singlecontainer}>
              <div className={Styles.topdiv}>
                <img src={post.pic} />

                <h5>{post.username}</h5>
              </div>
              <button
                onDoubleClick={() => likefunction(post, post._id)}
                className={Styles.imgdiv}
              >
                <Suspense fallback={<VerticalLoader />}>
                  <SuspenseImg alt="" src={post.picture} />
                </Suspense>
              </button>
              <div className={Styles.bottomdiv}>
                {likesArray.findIndex(
                  (ele) => ele.username == username && ele.postID == post._id
                ) >= 0 ? (
                  <span onClick={() => unlikefunction(post, post._id)}>
                    💖{" "}
                    {likeCountArray.findIndex(
                      (ele) =>
                        ele.username === username && ele.postID === post._id
                    ) >= 0
                      ? post.likes.length + 1
                      : post.likes.length}
                  </span>
                ) : (
                  <span onClick={() => likefunction(post, post._id)}>
                    🤍{" "}
                    {likeCountArray.findIndex(
                      (ele) =>
                        ele.username === username && ele.postID === post._id
                    ) >= 0
                      ? post.likes.length - 1
                      : post.likes.length}
                  </span>
                )}
                <span
                  onClick={() => setcommentsfunc({ val: true, post: post })}
                >
                  💬 {post?.comments?.length}
                </span>

                <img src={sharepic} width="4.5%" height="2%" />
              </div>
              <div className={Styles.caption}>{post.desc}</div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
};
export default Contentmain;
