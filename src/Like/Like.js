import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getpostsforfeed } from "../methods/getpostsforfeed";
import { populateLike } from "../reduces/actions/userAction";

import InfiniteScroll from "react-infinite-scroll-component";
import Styles from "./Like.module.css";

const Like = () => {
  const [hasMore, sethasmore] = useState(true);
  const [isUnmounted, setunmounted] = useState(false);
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.Likeposts);
  const { username } = useSelector((state) => state.user);
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

  const getposts = () => {
    setloading(true);

    getpostsforfeed(username, state.lastcount, 2)
      .then((res) => {
        if (res.length > 0) {
          let arr = [...state.posts, ...res];
          arr = unique(arr);
          let lastcount = state.lastcount + 2;
          dispatch(populateLike(arr, lastcount));

          setloading(false);
        } else {
          sethasmore(false);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (!isUnmounted) {
      if (state.posts.length === 0) {
        getposts();
      } else {
        setloading(false);
      }
    }
    return () => setunmounted(true);
  }, [username]);

  return (
    <>
      <InfiniteScroll
        hasMore={hasMore}
        dataLength={state.posts.length}
        next={getposts}
        loader={loading ? <div className={Styles.loader}></div> : null}
        endMessage={
          <div className={Styles.infiP}>
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          </div>
        }
      >
        <div className={Styles.maindiv}>
          {state.posts.map((post, id) => {
            return (
              <div className={Styles.posts} key={id}>
                <div className={Styles.postimg}>
                  <img src={post.picture} width="60px" height="60px" alt="" />
                </div>
                {post?.likes.length > 0 ? (
                  post?.likes?.map((like, id) => {
                    return (
                      <div key={id} className={Styles.likes}>
                        {like.username === username ? (
                          <h3> ❤️ You liked your post</h3>
                        ) : (
                          <h3>{like.username}❤️ liked your post</h3>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className={Styles.likes}>
                    <h1>💛</h1>
                  </div>
                )}
              </div>
            );
          })}
          <button className={Styles.loadmorebut} onClick={() => getposts()}>
            SEE MORE
          </button>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Like;
