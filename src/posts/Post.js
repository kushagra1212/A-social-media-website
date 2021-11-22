import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Styles from "./Post.module.css";
const URL = process.env.REACT_APP_URL;
const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => {
    const getPost = async () => {
      const rawRes = await fetch(`${URL}/post/userpost/${id}`, {
        method: "get",
      });
      const res = await rawRes.json();
      console.log(res);
      res.map((post) => setPost(post));
    };
    getPost();
  }, []);
  if (post === null) return <div>Loading....</div>;
  else
    return (
      <div className={Styles.maincontent}>
        <div key={post._id} className={Styles.singlecontainer}>
          <div className={Styles.topdiv}>
            <img src={process.env.PUBLIC_URL + "/userImage.png"} alt=" " />

            <h5>{post.username}</h5>
          </div>
          <button onDoubleClick={() => {}} className={Styles.imgdiv}>
            <img src={post.picture} width="100%" alt=" " />
          </button>

          <div className={Styles.bottomdiv}></div>
          <div className={Styles.caption}>{post.desc}</div>
        </div>
      </div>
    );
};

export default Post;
