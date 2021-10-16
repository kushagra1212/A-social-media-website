import getitem from "../methods/getitem";
import List from "./list/List";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Styles from "./Showbar.module.css";
const Showbar = ({
  username,
  setshowfollowershandle,
  setshowfollowinghandle,
  showfollowers,
  showfollowing,
}) => {
  const dispatch = useDispatch();
  const [item, setitem] = useState(null);
  const [loading, setloading] = useState(false);
  const [isUnmounted, setUnmounted] = useState(false);
  const [noone, setnoone] = useState({
    nofollowers: false,
    nofollowing: false,
  });
  useEffect(() => {
    if (!isUnmounted) {
      setloading(true);

      getitem(username)
        .then((res) => {
          dispatch({
            type: "SET_FOLLOWING_USERS",
            payload: { following: res.following },
          });
          if (res.following.length === 0) {
            setnoone({ nofollowers: false, nofollowing: true });
          } else if (res.followers.length === 0) {
            setnoone({ nofollowers: true, nofollowing: false });
          } else if (res.followers.length === 0 && res.following.length === 0) {
            setnoone({ nofollowers: true, nofollowing: true });
          } else {
            setnoone({ nofollowers: false, nofollowing: false });
          }

          if (showfollowers) {
            setitem(res.followers);
          } else if (showfollowing) {
            setitem(res.following);
          }
        })
        .catch((err) => console.log(err));
    }

    return () => setUnmounted(true);
  }, []);
  if (item) {
    return (
      <div className={Styles.maindiv}>
        {" "}
        <button
          className={Styles.backbut}
          onClick={() => {
            setshowfollowershandle(false);
            setshowfollowinghandle(false);
          }}
        >
          Back
        </button>
        <List list={item} />
      </div>
    );
  }
  if (item) {
    return (
      <div className={Styles.maindiv}>
        <div className={Styles.maindiv}>
          <div className={Styles.list}>
            {noone.nofollowers && showfollowers ? (
              <div>
                <h1> no followers</h1>
              </div>
            ) : null}

            {noone.nofollowing && showfollowing ? (
              <div>
                <h1>seems like no one is following</h1>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default Showbar;
