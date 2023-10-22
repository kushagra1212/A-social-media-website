import Styles from './Content.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getitem from '../../../methods/getitem';
import updatelikes from '../../../methods/updatelikes';
import deletelike from '../../../methods/deletelike';
import Comments from './comments/Comments';
import { getstoriesFromOthers } from '../../../methods/uploadstories';
import { FluidLoaderFive } from '../../../Animation/Loader/loader/FluidLoader';
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';
import { SuspenseImg } from './SuspenceImage/SuspenceImg';
import { getstories } from '../../../methods/uploadstories';
import ContentMainAnimate from './ContentMainAnimate/ContentMainAnimate';
import Addcomment from './comments/Addcomment';
import addcomment from '../../../methods/addcomments';
import Search from '../../../Search/Search';
import { useAlert } from 'react-alert';
import SuggestionList from '../../../components/suggestionlist/SuggestionList';
import ContentLoader from 'react-content-loader';
import {
  updateLastCount,
  updateLatestLikesArray,
  updateLatestPost,
  updateLatestUnlikesArray,
  addLatestPosts,
  setScrollPositionHandler,
} from '../../../reduces/actions/PostAction';
import getallposts from '../../../methods/getallposts';
import { useSpring, animated as a } from 'react-spring';
import { PUBLIC_URL, REACT_APP_CURURL } from '../../../utils/constants/env';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Responsive from '../../../components/responsive/Responsive';
import { faComment, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
const CURURL = REACT_APP_CURURL;
let likeCountArray = []; // Array to store the likes count of each post
let element = null;
const LIMIT = 3;
export const MyLoader = (props) => {
  let heightofAni = window.screen.width >= 768 ? '100vh' : '45vh';

  return (
    <ContentLoader
      speed={1}
      width="100%"
      height={heightofAni}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      {' '}
      <rect x="0" y="0" rx="1" ry="3" width="100%" height="100%" />
    </ContentLoader>
  );
};
const Content = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();
  const { profilepic, username } = useSelector((state) => {
    return state.user;
  });
  const { likesLatestArray, scrollPosition } = useSelector((state) => {
    return state?.Posts;
  });
  const [hasMore, sethasmore] = useState(true);

  const [isUnmounted, setIsUnmounted] = useState(false);
  let tempUserLikes = [];
  const [showAlert, setShowAlert] = useState(false);
  const [showcomments, setshowcomments] = useState(false);
  const [likeLoading, setlikeLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [sharePostURL, setSharePostURL] = useState('');
  const sRef = useRef();
  const [noOne, setNoOne] = useState(false);
  const setShowProfileHandler = (val) => {
    if (val) setShowProfile(val);
  };
  const setUserSearchHandler = (val) => {
    setUserSearch(val);
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
  const state = useSelector((state) => state);
  const [array, setarray] = useState([]);

  const [loading, setloading] = useState(false);

  const likefunction = (post, key) => {
    if (!likeLoading) {
      setlikeLoading(true);

      tempUserLikes.push({ username: username, postID: key });

      dispatch(updateLatestLikesArray(username, key));
      let indexOflkesArray = likeCountArray.findIndex(
        (ele) => ele.username === username && ele.postID === post._id,
      );
      if (indexOflkesArray < 0) {
        likeCountArray.push({ username: username, postID: post._id });
      } else {
        likeCountArray.splice(indexOflkesArray, 1);
      }

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
        (ele) => ele.username === username && ele.postID === key,
      );
      if (indexTemp >= 0) {
        tempUserLikes.splice(indexTemp, 1);
      }

      let indexOflkesArray = likeCountArray.findIndex(
        (ele) => ele.username === username && ele.postID === post._id,
      );
      if (indexOflkesArray < 0) {
        likeCountArray.push({ username: username, postID: post._id });
      } else {
        likeCountArray.splice(indexOflkesArray, 1);
      }

      let likesArrayTemp = likesLatestArray;
      let ind = likesArrayTemp.findIndex((ele) => ele.username === username && ele.postID === key);
      if (ind >= 0) {
        likesArrayTemp.splice(ind, 1);

        dispatch(updateLatestUnlikesArray(likesArrayTemp));
      }

      deletelike({ username: username, id: post._id });
      setTimeout(() => {
        setlikeLoading(false);
      }, 400);
    }
  };

  const addCommentFuncforContent = async (comment, post) => {
    let id = post._id;
    let profilePicture = post.pic;

    let com = await addcomment(id, username, comment, profilePicture);

    dispatch(updateLatestPost(com, id));
  };
  const setcommentsfunc = ({ val, post }) => {
    element = document.querySelector('#infiniteScroll');
    setshowcomments({ val: val, post: post });
  };
  const copyToClipboardHandler = () => {
    if (!showAlert) {
      navigator.clipboard.writeText(sharePostURL);
      Alert.success('Link Copied', {
        onOpen: () => {
          setShowAlert(false);
        },
        onClose: () => {
          setShowAlert(true);
        },
      });
    }
  };
  const getPosts = () => {
    getallposts(username, state?.Posts.posts.length, LIMIT)
      .then((posts) => {
        if (posts.length > 0) {
          dispatch(updateLastCount(state?.Posts.posts.length + posts.length));
          dispatch(addLatestPosts(posts, array));
          setarray([...array, ...posts]);
          posts.forEach((ele) => {
            ele.likes.forEach((ele2) => {
              dispatch(updateLatestLikesArray(ele2.username, ele._id));
            });
          });
        } else {
          sethasmore(false);
        }
        setloading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (username) {
      getPosts();
      getstories(username, dispatch);
      getitem(username).then(async (item) => {
        item?.following.forEach((ele) => {
          getstoriesFromOthers(ele.username, dispatch);
        });
      });
    }
  }, [username]);
  useEffect(() => {
    setTimeout(() => {
      setNoOne(true);
    }, 3000);
  }, []);
  useEffect(() => {
    if (state.Posts.posts.length >= 1) {
      setloading(false);
      setNoOne(true);
    }
    window.scrollTo(0, scrollPosition);
  }, [showProfile, loading, noOne, state.Posts.posts.length, scrollPosition]);
  const contentProps = useSpring({
    opacity: showProfile ? 1 : 0,
    marginTop: showProfile ? 0 : -500,
  });
  const Popup = useSpring({
    y: showShare ? '0%' : '-50%',
    x: showShare ? '0%' : '0%',
    transform: showShare ? 'scale(1)' : 'scale(0.1)',
    opacity: showShare ? '100%' : '0%',
  });
  if (showcomments.val) disableBodyScroll(element);
  else if (element != null) enableBodyScroll(element);
  if (showProfile) {
    return (
      <a.div className={Styles.userprofilemain} style={{ ...contentProps, overflowX: 'hidden' }}>
        <span
          style={{
            fontSize: '50px',
            boxShadow: '1px 1px 10px 1px grey',
            border: '1px solid white',
            borderRadius: '60px',
            color: 'red',
          }}
        >
          <i
            onClick={() => {
              setShowProfile(false);
              setUserSearch('');
            }}
            styles={{ color: 'Dodgerblue', cursor: 'pointer' }}
            className="fa fa-times-circle"
          ></i>
        </span>

        <div
          className={Styles.userProfile}
          style={{ height: '100%', top: '0%', left: '0%', width: '100%' }}
        >
          <Search
            showprofilefromshowbar={showProfile}
            view={false}
            usernameformshowbar={userSearch}
            preview={true}
          />
        </div>
      </a.div>
    );
  }
  if (loading || !noOne) {
    return <ContentMainAnimate />;
  } else if (state.Posts.posts.length === 0 && noOne) {
    return (
      <>
        <div className={Styles.no_post_container}>
          <div className={Styles.no_post_container_backdrop}></div>

          <div className={Styles.maincontentstart}>No Post to See Please Follow your Friends !</div>
        </div>
        <SuggestionList
          setShowProfileHandler={setShowProfileHandler}
          setUserSearchHandler={setUserSearchHandler}
        />
      </>
    );
  } else {
    return (
      <>
        {showShare ? (
          <div className={Styles.topshare}>
            <span style={{ color: 'red' }}>
              <i
                onClick={() => setShowShare(false)}
                style={{
                  color: 'Dodgerblue',
                  cursor: 'pointer',
                  boxShadow: '8px 9px 15px 10px #5050504d',
                }}
                className="fa fa-times-circle"
              ></i>
            </span>
            <a.div style={Popup} className={Styles.showshare}>
              <input disabled value={sharePostURL} />
              <button onClick={copyToClipboardHandler}>Copy link</button>
            </a.div>
          </div>
        ) : null}

        {showcomments.val ? (
          <div className={Styles.commenttopdiv}>
            <Comments
              username={username}
              showcomments={showcomments}
              setcommentsfunc={setcommentsfunc}
            />
          </div>
        ) : null}
        <div className={Styles.maincontent} id="infiniteScroll">
          <InfiniteScroll
            className={Styles.infi}
            dataLength={state.Posts.posts.length}
            next={getPosts}
            hasMore={hasMore}
            loader={<div style={{ marginTop: '50px' }}></div>}
            endMessage={<p className={Styles.infiP}></p>}
            ref={sRef}
            onScroll={(e) => {
              const scrollY = window.scrollY;
              if (scrollY !== 0) dispatch(setScrollPositionHandler(scrollY));
            }}
          >
            {state?.Posts?.posts.map((post, key) => (
              <div key={post._id} className={Styles.singlecontainer}>
                <div
                  className={Styles.topdiv}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    dispatch(setScrollPositionHandler(window.scrollY));

                    setUserSearch(post.username);
                    setShowProfile(true);
                  }}
                >
                  <Suspense fallback={<FluidLoaderFive />}>
                    <img
                      src={post.profilepic?.length > 0 ? post.profilepic[0] : 'userImage.png'}
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
                  {likesLatestArray.findIndex(
                    (ele) => ele.username === username && ele.postID === post._id,
                  ) >= 0 ? (
                    <div>
                      <FontAwesomeIcon
                        icon={faHeart}
                        onClick={() => unlikefunction(post, post._id)}
                        color="red"
                        size="2x"
                      />{' '}
                      {likeCountArray.findIndex(
                        (ele) => ele.username === username && ele.postID === post._id,
                      ) >= 0
                        ? post?.likes?.length + 1
                        : post?.likes?.length}
                    </div>
                  ) : (
                    <div className={Styles.heart}>
                      <FontAwesomeIcon
                        onClick={() => likefunction(post, post._id)}
                        icon={faHeart}
                        cursor={'pointer'}
                        color="grey"
                        size="2x"
                      />{' '}
                      {likeCountArray.findIndex(
                        (ele) => ele.username === username && ele.postID === post._id,
                      ) >= 0
                        ? post.likes.length - 1
                        : post.likes.length}
                    </div>
                  )}
                  <div>
                    <FontAwesomeIcon
                      onClick={() => setcommentsfunc({ val: true, post: post })}
                      icon={faComment}
                      cursor={'pointer'}
                      color="white"
                      size="2x"
                    />{' '}
                    {post?.comments?.length}
                  </div>
                  <span
                    style={{
                      color: 'lightgreen',
                      cursor: 'pointer',
                    }}
                  >
                    <FontAwesomeIcon
                      onClick={() => {
                        setSharePostURL(`${CURURL}/post/${post._id}`);
                        setShowShare(true);
                      }}
                      icon={faShare}
                      cursor={'pointer'}
                      color="green"
                      size="1x"
                    />
                  </span>
                </div>
                <div style={post.desc !== '' ? { padding: '3%' } : {}} className={Styles.caption}>
                  {post.desc}
                </div>
                <Addcomment addCommentFunc={(comment) => addCommentFuncforContent(comment, post)} />
                {(key + 1) % 10 === 0 ? (
                  <Responsive displayIn={['Mobile', 'Tablet', 'MobilePortrait']}>
                    <SuggestionList
                      setShowProfileHandler={setShowProfileHandler}
                      setUserSearchHandler={setUserSearchHandler}
                    />
                  </Responsive>
                ) : null}
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </>
    );
  }
};
export default Content;
