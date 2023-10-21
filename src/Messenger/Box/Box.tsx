import Styles from "./Box.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setconversationID,
  setUserPicture,
} from "../../reduces/actions/MessageReducerAction";
import ContentLoader from "react-content-loader";
import io from "socket.io-client";
import { setsocket } from "../../reduces/actions/MessageReducerAction";
import { PUBLIC_URL, REACT_APP_SOCKETURL } from "../../utils/constants/env";
let heightofAni = window.screen.width >= 768 ? "100vh" : "100vh";

const ENDPOINT = REACT_APP_SOCKETURL;
const MyLoader = (props) => (
  <ContentLoader
    speed={1}
    width="100%"
    height={heightofAni}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {" "}
    <rect x="5" y="0" rx="10" ry="10" width="100%" height="100%" />
  </ContentLoader>
);
const List = ({ chatuser, conversationID, selectedID, selectIDHandler }) => {
  const { username } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const showmessages = () => {
    let sec = io.connect(ENDPOINT);
    dispatch(setsocket(sec));
    let userPicture = chatuser.profilepic
      ? chatuser.profilepic
      : 'userImage.png';
    selectIDHandler(chatuser._id);

    dispatch(setconversationID(conversationID));
    dispatch(setUserPicture(userPicture));
    dispatch({ type: "SETUSERCONVERSATION", payload: chatuser });
    if (window.screen.width < 768)
      dispatch({ type: "SHOWBOX", payload: false });
    sec.on("connection", () => {});
    sec.emit("adduser", username);
    sec.on("getuser", (users) => {
      // console.log(users, 'users');
    });
  };

  return (
    <div
      className={Styles.listitem}
      style={
        chatuser._id === selectedID
          ? { backgroundColor: "rgba(5, 93, 133, 0.054)" }
          : {}
      }
      onClick={showmessages}
    >
      <div className={Styles.userimg}>
        <img
          src={chatuser.profilepic ? chatuser.profilepic : `userImage.png`}
          alt=""
        />
      </div>
      <div className={Styles.usernamediv}>
        <label style={{ fontWeight: "600" }}>{chatuser.username} </label>
        <label style={{ fontSize: "0.7em" }}>{chatuser.bio}</label>
      </div>
    </div>
  );
};

const Box = ({ conversations, username }) => {
  const [selectedID, setSelectedID] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationState, setConversationState] = useState([]);
  const selectIDHandler = (id) => {
    setSelectedID(id);
  };
  // useEffect(() => {
  //   if (conversations !== null && conversationState.length === 0) {
  //     let conv = [];
  //     const getUsersHandler = async () => {
  //       setLoading(true);
  //       let con = conversations;

  //       let us;
  //       for (let i = 0; i < con.length; i++) {
  //         us =
  //           con[i].members[0] === username
  //             ? con[i].members[1]
  //             : con[i].members[0];

  //         let USER = await getuser(us);
  //         conv.push({ element: con[i], USER: USER });
  //       }
  //       setConversationState(conv);
  //       setLoading(false);
  //     };
  //     getUsersHandler();
  //   }
  // }, []);
  if (conversations != null && conversations.length === 0) {
    return (
      <div className={Styles.maindiv2}>
        <img alt="" src={"noconversation.gif"} />
        <label> You have no conversation</label>
        <h6>Please Follow your friends</h6>
      </div>
    );
  }
  if (loading) {
    return (
      <div className={Styles.list}>
        <MyLoader />
      </div>
    );
  }
  return (
    <div className={Styles.maindiv}>
      <div className={Styles.messagetext}>
        {" "}
        <h2 style={{ marginLeft: "10%", opacity: "0.6" }}>Messages</h2>
      </div>
      <div className={Styles.list}>
        {conversations?.map((element, id) => {
          // console.log(element);
          return (
            <List
              selectedID={selectedID}
              key={id}
              conversationID={element._id}
              selectIDHandler={selectIDHandler}
              chatuser={element.chatWithUser[0]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Box;
