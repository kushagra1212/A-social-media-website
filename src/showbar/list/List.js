import { useEffect, useState } from "react";
import getuser from "../../methods/getuser";
import Styles from "./List.module.css";

import Loader from "../../Animation/Loader/Loader";
import Search from "../../Search/Search";
const List = ({ list }) => {
  const [users, setusers] = useState([]);
  const [usernames, setusernames] = useState(list);
  const [loading, setloading] = useState(true);
  const [showprofile, setshowprofile] = useState(false);
  const [username, setusername] = useState([]);
  const [isUnmounted, setIsUnmounted] = useState(false);


  const setusershandle = async () => {
    usernames.map(async (ele) => {
      const { username } = ele;
      const data = await getuser(username);

      try {
        if (data) {
          setusers((prev) => [...prev, data]);
        }
      } catch (err) {
        console.log(err);
      }
    });
    setloading(false);
  };
  useEffect(() => {
    setusershandle();

    return () => setIsUnmounted(true);
  }, []);

  if (loading) return <Loader width={1} height={1} />;
  if (users.length > 0 && showprofile === false) {
    return (
      <div className={Styles.maindiv}>
        {users.map((user, id) => {
          return (
            <div className={Styles.userprofile} key={id}>
              <img
                width="30px"
                height="30px"
                src={
                  user.profilepic
                    ? user.profilepic
                    : process.env.PUBLIC_URL + "/userImage.png"
                }
                alt=""
              />

              <div>
                <h6>@{user.username}</h6>
                <h4>{user.name}</h4>
              </div>
              <button
                onClick={() => {
                  setshowprofile(true);
                  setusername(user.username);
                }}
              >
                Go to profile
              </button>
            </div>
          );
        })}
        {list.length === users.length ? null : (
          <Loader width={1} height={1} fontSize={10} />
        )}
      </div>
    );
  } else {
    return (
      <div>
        <Search
          showprofilefromshowbar={showprofile}
          view={false}
          usernameformshowbar={username}
        />
      </div>
    );
  }
};
export default List;
