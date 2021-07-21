import { useEffect } from "react";
import Home from "./Home/Home";
import Like from "./Like/Like";
import Search from "./Search/Search";
import Footer from "./Bottom Bar/Footer";
import { useSelector } from "react-redux";
import Message from "./Home/Messagesec/Message";
import Profile from "./Profile/Profile";

const Main = () => {
  let profile = useSelector((state) => state.main.profile);
  let home = useSelector((state) => state.main.home);
  let search = useSelector((state) => state.main.search);
  let like = useSelector((state) => state.main.like);
  let message = useSelector((state) => state.main.message);
  const { show_others_stories } = useSelector((state) => state.Stories);
  console.log(home, search, like, profile);
  useEffect(() => {}, [show_others_stories.flag]);
  return (
    <>
      {home ? (
        <Home />
      ) : like ? (
        <Like />
      ) : profile ? (
        <Profile />
      ) : search ? (
        <Search fromshowbar={false} usernameformshowbar={null} view={true} />
      ) : message ? (
        <Message />
      ) : null}
      <Footer />
    </>
  );
};

export default Main;
