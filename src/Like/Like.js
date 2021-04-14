import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getpostsforfeed } from "../methods/getpostsforfeed";
import InfiniteScroll from "react-infinite-scroll-component";
import Styles from './Like.module.css'
const Like = () => {
  const { username } = useSelector((state) => state.user);
  const [posts, setposts] = useState([]);
  const [hasMore, sethasmore] = useState(true);
  const [last, setlast] = useState(0);
  const [loading,setloading]=useState(true);
  const getposts = async () => {
    setloading(true);
    getpostsforfeed(username, last)
      .then((res) => {
        if (res.length > 0) {
          let arr = [...posts, ...res];
          setposts(arr);
          setlast(last + 2);
          setloading(false)
          console.log(res);
        } else {
          sethasmore(false);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getposts();
  }, []);
  {console.log(posts)}
  return (
 <>
      <InfiniteScroll
        hasMore={hasMore}
        dataLength={posts.length}
        next={getposts}
        loader={loading?<div className={Styles.loader} ></div>:null}
        endMessage={
         <div className={Styles.endmessage}>
            <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
         </div>

        }
      >
           <div
    className={Styles.maindiv}
    >
        {posts.map((post, id) => {
          return (
            <div className={Styles.posts} key={id}>
                  <img
             src={post.picture}
             width="60px"
             height="60px"
              />
              {post?.likes.length>0?post?.likes?.map((like, id) => {
                return (
                  <div
                    key={id}
                  className={Styles.likes}
                  >
                
                   <h3>{like.username} liked your post</h3>
                  </div>
                );
              }):<div   className={Styles.likes}><h3>Not liked yet</h3></div>}
            </div>
          );
        })}
       <button className={Styles.loadmorebut} onClick={()=>getposts()}>
          MORE
        </button>
        </div>
       
      </InfiniteScroll>
     
     
 </>
  );
};

export default Like;
