import { useState, useEffect } from "react";
import getusers from "../../methods/getusers";
import Styles from "./SuggestionList.module.css";
import { useSelector } from "react-redux";
import ContentLoader from "react-content-loader";
import isconnection from "../../methods/isconnection";
import { setfollowers } from "../../methods/setfollowers";
import { useDispatch } from "react-redux";
import addconversation from "../../methods/addconversation";
import getconversations from "../../methods/getconversations";
const MyLoaderPC = (props) => (
  <ContentLoader
    speed={3}
    width={250}
    height={510}
    viewBox="0 0 250 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {" "}
    <rect x="15" y="70" rx="0" ry="3" width="140" height="20" />
    <rect x="15" y="0" rx="10" ry="10" width="60" height="60" />
    <rect x="140" y="5" rx="0" ry="3" width="100" height="30" />
  </ContentLoader>
);
const MyLoaderPhone = (props) => (
  <ContentLoader
    speed={3}
    width={550}
    height={510}
    viewBox="0 0 250 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {" "}
    <rect x="15" y="70" rx="0" ry="3" width="140" height="20" />
    <rect x="15" y="0" rx="10" ry="10" width="60" height="60" />
    <rect x="140" y="5" rx="0" ry="3" width="100" height="30" />
  </ContentLoader>
);

const SuggestionList = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const { username } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const checkUsers = async (Users) => {
    let newArray = [];

    for (let user of Users) {
      let currentusername = user.username;
      const found = await isconnection(currentusername, username);
      if (!found && username !== user.username)
        newArray.push({ user: user, following: false });
    }
    setUsers(newArray);
    setLoading(false);
  };
  useEffect(() => {
    getusers()
      .then((res) => {
        checkUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, [username]);

  const handleAdd = async (user) => {
    setfollowers(user.username, username, dispatch);
    let exists = false;

    const conver = await getconversations(username);

    conver.forEach((element) => {
      if (element.members.includes(user.username)) {
        exists = true;
      }
    });
    if (!exists) addconversation([username, user.username]);

    let index = users.findIndex((item) => item.user._id === user._id);
    console.log(index);
    let u = [...users];
    u[index].following = true;
    setUsers(u);
  };
  if (loading)
    return (
      <>
        {window.screen.width >= 778 ? 
          <div className={Styles.skeletondiv}>
            {" "}
            <MyLoaderPC /> <MyLoaderPC /> <MyLoaderPC />)
          </div>
        : 
          <div className={Styles.skeletondivphone}>
            {" "}
            <MyLoaderPhone /> <MyLoaderPhone /> <MyLoaderPhone />)
          </div>
    }
      </>
    );
  else
    return (
      <>
        <div className={Styles.maindiv}>
          {users.length > 0 &&
            users.map((user) => {
              return (
                <div key={user.user._id} className={Styles.listitem}>
                  <div className={Styles.listhead}>
                    <img
                      width="70px"
                      height="70px"
                      className={Styles.listimg}
                      alt=""
                      src={
                        user.user.profilepic
                          ? user.user.profilepic
                          : process.env.PUBLIC_URL + "/userImage.png"
                      }
                    />
                    <button
                      onClick={() => handleAdd(user.user)}
                      className={Styles.listbut}
                      styles={
                        user.following ? { backgroundColor: "black" } : {}
                      }
                    >
                      {user.following ? "following" : "follow"}
                    </button>
                  </div>
                  <h6>@{user.user.username}</h6>
                </div>
              );
            })}
        </div>
      </>
    );
};
export default SuggestionList;
