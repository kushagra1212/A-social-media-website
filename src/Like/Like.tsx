import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getpostsforfeed } from '../methods/getpostsforfeed';
import { populateLike } from '../reduces/actions/userAction';

import InfiniteScroll from 'react-infinite-scroll-component';
import Styles from './Like.module.css';

const Like = () => {
  const [hasMore, sethasmore] = useState(true);
  const [isUnmounted, setunmounted] = useState(false);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.Likeposts);
  const { username } = useSelector((state) => state.user);

  const getposts = () => {
    setloading(true);
    getpostsforfeed(username, state.lastcount, 2)
      .then((res) => {
        if (res.length > 0) {
          dispatch(
            populateLike([...state.posts, ...res], state.lastcount + res.length)
          );
        } else {
          sethasmore(false);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setloading(false));
  };
  useEffect(() => {
    if (!isUnmounted) {
      if (state.posts.length === 0) {
        getposts();
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
            <p style={{ textAlign: 'center' }}>
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
                  <img src={post?.picture} width="60px" height="60px" alt="" />
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
                ) : !loading ? (
                  <div className={Styles.likes}>
                    <h1>💛</h1>
                  </div>
                ) : null}
              </div>
            );
          })}
          <span
            className={Styles.loadmorebut}
            style={{ fontSize: '40px', color: 'white', cursor: 'pointer' }}
          >
            <i
              onClick={() => getposts()}
              styles={{ color: 'Dodgerblue' }}
              className="fa fa-plus"
            ></i>
          </span>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Like;
