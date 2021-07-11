import {  useState } from "react";
import Addcomment from "./Addcomment";
import addcomment from "../../../../methods/addcomments";
import Styles from "./Comments.module.css";
import { useSelector } from "react-redux";

const Comment = ({ username, showcomments, setcommentsfunc }) => {
  const [post, setpost] = useState(showcomments.post);
  const profilepic= useSelector((state)=> state.user.profilepic );
  const addCommentFunc = async (comment) => {
    let id = showcomments.post._id;
    let profilePicture = post.pic;
  
    let com = await addcomment(id, username, comment, profilePicture);
    setpost(com);
  };

  return (
    <div className={Styles.maindiv}>
      <button
        className={Styles.backbut}
        onClick={() => setcommentsfunc({ val: false, post: null })}
      >
        back
      </button>
     <div className={Styles.topdiv}   >  <img alt="" className={Styles.profileimage}  src={profilepic} width="30px" height="30px" />
      <Addcomment addCommentFunc={addCommentFunc} /></div>
      <div className={Styles.main}>
        {console.log(post.comments)}
        {post?.comments.map((ele, id) => {
          return (
            <div className={Styles.commentdiv} key={id}>
             <img alt="" className={Styles.profileimage}   src={post.picture} width="20px" height="20px" />
              <div className={Styles.username}><strong>{ele.username}</strong> </div>
              <div className={Styles.comment}>{ele.comment}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
