import Styles from "./Box.module.css";
import getuser from "../../methods/getuser";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import VerticalLoader from "../../Animation/Loader/loader/VerticalLoader";
import {
  setconversationID,
  setUserPicture,
} from "../../reduces/actions/MessageReducerAction";
import ContentLoader from "react-content-loader"

let heightofAni = window.screen.width >= 768 ? "20vh" : "15vh";

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
    <rect x="5" y="0" rx="10" ry="10" width="100%" height="50px" />
  </ContentLoader>
);
const List = ({ chatuser, conversationID,selectedID,selectIDHandler}) => {
 
  const dispatch = useDispatch();
  const state =useSelector((state)=>state);

  if (state?.user === null) {
    return (
      <div styles={{ height: "10px" }} className={Styles.listitem}>
        <MyLoader />
      </div>
    );
  }
  const showmessages = () => {
  
    selectIDHandler(state?.user?._id);
    dispatch({ type: "SETUSERCONVERSATION", payload: state?.user });
    dispatch(setconversationID(conversationID));
 
    let userPicture= state?.user?.profilepic
    ? state?.user?.profilepic
    : `${process.env.PUBLIC_URL}/userImage.png`;
    dispatch(setUserPicture(userPicture));
    if (window.screen.width < 768)
      dispatch({ type: "SHOWBOX", payload: false });
  };
  console.log(selectedID,state?.user?._id);
  return (
    <div className={Styles.listitem} style={state?.user?._id===selectedID?{backgroundColor:"rgba(5, 93, 133, 0.054)"}:{}} onClick={showmessages}>
      <div className={Styles.userimg}>
        <img
          src={
            state?.user?.profilepic
              ? state?.user?.profilepic
              : `${process.env.PUBLIC_URL}/userImage.png`
          }
          alt=""
        />
      </div>
      <div className={Styles.usernamediv}>
        <label style={{ fontWeight: "600" }}>{chatuser} </label>
        <label style={{ fontSize: "0.7em" }}>{state?.user?.bio}</label>
      </div>
    </div>
  );
};

const Box = ({ conversations, username,user }) => {
  const [selectedID,setSelectedID]=useState("");
  const selectIDHandler=(id)=>{
    setSelectedID(id);
  }
  if (conversations != null && conversations.length === 0) {
    return (
      <div
        className={Styles.maindiv2}
      >
          <img alt="" src={process.env.PUBLIC_URL+"/noconversation.gif"}  />
         <label>   You have no conversation</label>
        <h6>Please Follow your friends</h6>
      
      </div>
    );
  }
  return (
    <div className={Styles.maindiv}>
      <div className={Styles.messagetext}>  <h2 style={{ marginLeft: "10%", opacity: "0.6" }}>Messages</h2></div>
      <div className={Styles.list}>
 
        {conversations?.map((element, id) => {
          return (
            <List
            selectedID={selectedID}
              key={element._id}
              conversationID={element._id}
              selectIDHandler={selectIDHandler}
              chatuser={
                element.members[0] === username
                  ? element.members[1]
                  : element.members[0]
              }

              
            />
          );
        })}
 
      </div>
    </div>
  );
};

export default Box;
