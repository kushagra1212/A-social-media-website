import { useState } from "react";
import Styles from "./Addcomment.module.css";
const Addcomment = ({ addCommentFunc }) => {
  const [comment, setcomment] = useState("");
  const add_comment_handle = () => {
    if (comment != "") {
      addCommentFunc(comment);
      setcomment("");
    }
  };
  return (
    <div className={Styles.maindiv}>
      <input className={Styles.comment_input}
        onKeyDown={(event) =>
          event.key == "Enter" ? add_comment_handle() : null
        }
        placeholder="Write a Comment"
        type="text"
        value={comment}
        onChange={(e) => setcomment(e.target.value)}
      />
      <button
        className={Styles.add}
        style={
          comment === ""
            ? { display: "none" }
            : { opacity: 1, display: "block" }
        }
        onClick={add_comment_handle}
      >
        {" "}
        Add{" "}
      </button>
    </div>
  );
};
export default Addcomment;
