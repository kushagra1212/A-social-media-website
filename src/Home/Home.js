import Feed from "./Feed/Feed";
import Header from "./Top Bar/Header";
import Styles from "./Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import { animated, useSpring } from "react-spring";
import Userstories from "../Home/Feed/Stories/Userstories/Userstories";
import Othersstories from "../Home/Feed/Stories/Othersstories/Othersstories";
import { getstories } from "../methods/uploadstories";
import SuggestionList from "../components/suggestionlist/SuggestionList";
import Search from "../Search/Search";
import { setScrollPositionHandler } from "../reduces/actions/PostAction";
const Home = () => {
  const { username } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);

  const [userSearch, setUserSearch] = useState("");
  const { show_user_stories, show_others_stories } = useSelector((state) => {
    return state.Stories;
  });
  const fade = useSpring({
    opacity: show_user_stories ? 1 : 1,
    config: { duration: 250 },
  });
  const func = async () => {
    return getstories(username, dispatch);
  };
  useEffect(() => {
    func();

    dispatch({ type: "SHOWHOME", payload: true });
  }, []);
  const setShowProfileHandler=(val)=>{
    setShowProfile(val);
   }
   const setUserSearchHandler=(val)=>{
     setUserSearch(val);
   }
  if(showProfile){
    
   return ( <div className={Styles.userprofilemain}>
    <span style={{ fontSize: "40px", color: "red" }}>
      <i
        onClick={() => { 
      
 
          setShowProfile(false); setUserSearch(""); }}
        styles={{ color: "Dodgerblue", cursor: "pointer" }}
        className="fa fa-times-circle"
      ></i>
    </span>

    <div className={Styles.userProfile}>
     
      <Search
        showprofilefromshowbar={showProfile}
        view={false}
        usernameformshowbar={userSearch}
        preview={false}
      />
    </div>
  </div>)

}
  if (show_others_stories.flag) {
    return (
      <div
        className={Styles.maindiv}
        style={{
          height: "100vh",
          backgroundColor: "white",
          position: "absolute",
          width: "100vw",
          zIndex: 10,
        }}
      >
        <animated.div style={fade}>
          {" "}
          <Othersstories />
        </animated.div>
      </div>
    );
  } else {
    return (
      <div
        className={Styles.maindiv}
        style={
          show_user_stories
            ? {
                height: "100vh",
                backgroundColor: "white",
                position: "absolute",
                width: "100vw",
                zIndex: 10,
              }
            : {}
        }
      >
        {show_user_stories ? (
          <animated.div className={Styles.userstoriesani} style={fade}>
            <div className={Styles.helperdiv} ><Userstories /></div>
          </animated.div>
        ) : (
          <>
            <Header /> <Feed />  {window.screen.width>=768?<SuggestionList setShowProfileHandler={setShowProfileHandler} setUserSearchHandler={setUserSearchHandler} />:null}
           
          </>
        )}
      </div>
    );
  }
};
export default Home;
