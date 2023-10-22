import { useState } from 'react';
import Addcomment from './Addcomment';
import addcomment from '../../../../methods/addcomments';
import Styles from './Comments.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

import { updatepost } from '../../../../reduces/actions/userAction';
import { updateLatestPost } from '../../../../reduces/actions/PostAction';
import { API_END_POINT, PUBLIC_URL } from '../../../../utils/constants/env';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
const Comment = ({ username, showcomments, setcommentsfunc }) => {
  const [post, setpost] = useState();
  const profilepic = useSelector((state) => state.user.profilepic);

  const dispatch = useDispatch();

  const addCommentFunc = async (comment) => {
    let id = showcomments.post._id;
    await addcomment(id, username, comment);
    await getComments();
  };
  const getComments = async () => {
    try {
      const res = await axios.get(`${API_END_POINT}/post/getcomments/${showcomments.post._id}`);
      if (res.data) {
        setpost({
          ...showcomments.post,
          comments: res.data,
        });
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (showcomments.post) {
      getComments();
    }
  }, []);

  const Popup = useSpring({
    from: { marginTop: 500, opacity: 0 },
    marginTop: 0,
    opacity: 1,
  });

  return (
    <>
      <animated.div className={Styles.maindiv} style={Popup}>
        {/* <img
          alt=""
          src={
            profilepic ? profilepic : "userImage.png"
          }
          width="30px"
          height="30px"
          style={{ borderRadius: "10px", cursor: "unset" }}
        /> */}{' '}
        <FontAwesomeIcon
          color="white"
          onClick={() => setcommentsfunc({ val: false, post: null })}
          icon={faClose}
          className={Styles.closeIcon}
        />
        <div className={Styles.topdiv}>
          {post ? (
            <div>
              <Addcomment addCommentFunc={addCommentFunc} />
            </div>
          ) : null}
        </div>
        <div className={Styles.main}>
          {post?.comments.length > 0 ? (
            post?.comments.map((ele, id) => {
              return (
                <div className={Styles.commentdiv} key={id}>
                  <img
                    alt=""
                    className={Styles.profileimage}
                    src={ele?.cuProfilepic ? ele?.cuProfilepic : 'userImage.png'}
                  />
                  <div className={Styles.username}>
                    <strong>{ele.username}</strong>{' '}
                  </div>
                  <div className={Styles.comment}>{ele.comment.comment}</div>
                </div>
              );
            })
          ) : (
            <div
              className={Styles.commentdiv}
              style={{
                opacity: 0.5,
                fontSize: '1em',
                alignSelf: 'center',
                justifySelf: 'center',
              }}
            >
              <div
                className={Styles.comment}
                style={{
                  opacity: 0.5,
                  fontSize: '1em',
                  alignSelf: 'center',
                  justifySelf: 'center',
                }}
              >
                Eimentum
              </div>
            </div>
          )}
        </div>
      </animated.div>
    </>
  );
};

export default Comment;
