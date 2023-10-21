import { useState, useEffect } from "react";
import Styles from "./SuggestionList.module.css";
import { useSelector } from "react-redux";
import ContentLoader from "react-content-loader";
import { setfollowers } from "../../methods/setfollowers";
import { useDispatch } from "react-redux";
import addconversation from "../../methods/addconversation";
import getconversations from "../../methods/getconversations";
import { addSuggestions } from "../../reduces/actions/SuggestionsAction";
import getSuggestion from "../../methods/getSuggestion";
import { PUBLIC_URL } from "../../utils/constants/env";
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
    width={"100%"}
    height={170}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {" "}
    <rect x="15" y="20" rx="10" ry="10" width="100" height="100" />
    <rect x="15" y="135" rx="1" ry="1" width="100" height="25" />
  </ContentLoader>
);

const SuggestionList = ({ setShowProfileHandler, setUserSearchHandler }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.user);
  const { suggestion } = useSelector((state) => state.Suggestions);
  const checkUsers = async () => {
    let suggestedUser = [];
    try {
      suggestedUser = await getSuggestion(username);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(addSuggestions(suggestedUser));
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username && username !== "") {
      checkUsers();
    }
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

    let index = suggestion.findIndex((item) => item._id === user._id);

    let u = suggestion;
    u[index].following = true;
    dispatch(addSuggestions(u));
  };
  if (loading)
    return (
      <>
        {window.screen.width >= 778 ? (
          <div className={Styles.skeletondiv}>
            {" "}
            <MyLoaderPC /> <MyLoaderPC /> <MyLoaderPC />
          </div>
        ) : (
          <div className={Styles.skeletondivphone}>
            {" "}
            <MyLoaderPhone /> <MyLoaderPhone /> <MyLoaderPhone />
          </div>
        )}
      </>
    );
  return (
    <>
      <div className={Styles.maindiv}>
        {suggestion.length &&
          suggestion?.map((user) => {
            return (
              <div key={user._id} className={Styles.listitem}>
                <div className={Styles.listhead}>
                  <img
                    width="70px"
                    height="70px"
                    className={Styles.listimg}
                    alt=""
                    src={user.profilepic ? user.profilepic : "userImage.png"}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      let x = user.username;
                      setUserSearchHandler(x);

                      setShowProfileHandler(true);
                    }}
                  />
                  <button
                    onClick={() => handleAdd(user)}
                    className={Styles.listbut}
                    styles={user.following ? { backgroundColor: "black" } : {}}
                  >
                    {user.following ? "following" : "follow"}
                  </button>
                </div>
                <h6>@{user.username}</h6>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default SuggestionList;
