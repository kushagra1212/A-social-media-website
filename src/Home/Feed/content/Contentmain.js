import Styles from "./Content.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { getpostsforfeed } from "../../../methods/getpostsforfeed";
import sharepic from "./images/share.png";
import { useEffect, useState } from "react";
import getuser from "../../../methods/getuser";
import { useDispatch, useSelector } from "react-redux";
import getitem from "../../../methods/getitem";
import updatelikes from "../../../methods/updatelikes";
import deletelike from "../../../methods/deletelike";
import Feedposts from "../../../posts/Feedposts";
import Comments from "./comments/Comments";
const Contentmain = () => {
  const dispatch = useDispatch();
  const { _id, profilepic, username } = useSelector((state) => {
    console.log(state.user.username);
    return state.user;
  });
  const [hasMore, sethasmore] = useState(true);
  const [isUnmounted, setIsUnmounted] = useState(false);

  const [start, setstart] = useState(false);

  const [showcomments, setshowcomments] = useState(false);
  const { access } = useSelector((state) => state.signinReducer);

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
    setstart(true);

    post.liked = true;
    let newArray = [...array];

    //  let index=array.findIndex(ele=>ele.key==key);

    if (key >= 0) {
      newArray[key] = {
        ...newArray[key],
        liked: true,
        length: newArray[key].length + 1,
      };
      setarray(newArray);
      console.log(newArray);
    }

    updatelikes({ username: username, id: post._id });
  };
  const unlikefunction = (post, key) => {
    setstart(false);
    // let index=array.findIndex(ele=>ele.key==key);
    let newArray = [...array];

    if (key >= 0) {
      newArray[key] = {
        ...newArray[key],
        liked: false,
        length: newArray[key].length - 1,
      };

      setarray(newArray);
      console.log(newArray);
    }
    deletelike({ username: username, id: post._id });
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

          console.log(post1, "own");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const setcommentsfunc = ({ val, post }) => {
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
      <>
        {showcomments.val ? (
          <Comments
            username={username}
            showcomments={showcomments}
            setcommentsfunc={setcommentsfunc}
          />
        ) : (
          <div className={Styles.maincontent}>
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
                <div key={key} className={Styles.singlecontainer}>
                  <div className={Styles.topdiv}>
                    <img src={post.pic} />

                    <h5>{post.username}</h5>
                  </div>
                  <button
                    onDoubleClick={likefunction}
                    className={Styles.imgdiv}
                  >
                    <img src={post.picture} width="100%" height="200px" />
                  </button>
                  <div className={Styles.bottomdiv}>
                    {console.log(array[key]?.liked, "checker")}
                    {(post.likes.find((ele) => ele.username == username) &&
                      array[key]?.liked) ||
                    array[key]?.liked ? (
                      <span onClick={() => unlikefunction(post, key)}>
                        💖 {array[key]?.length}
                      </span>
                    ) : (
                      <span onClick={() => likefunction(post, key)}>
                        🤍 {array[key]?.length}
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
        )}
      </>
    );
  }
};
export default Contentmain;
