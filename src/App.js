import Main from "./Main";
import Signin from "./Sign in/Signin";
import Signup from "./Sign up/Signup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getuser, access_Action } from "./reduces/actions/userAction";
import { useEffect, useState } from "react";
import Post from "./posts/Post";
import Styles from "./App.module.css";
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  withRouter,
  useHistory,
} from "react-router-dom";
import Page404 from "./Page404";

const URL = process.env.REACT_APP_URL;
const App = ({ match }) => {
  const dispatch=useDispatch();
  const [isUnmounted, setUnmounted] = useState(false);

  useEffect(() => {
    if (!isUnmounted) {
      axios
        .get(`${URL}/auth/verify`, {
          withCredentials: true,
        })
        .then(async (res) => {
          sessionStorage.setItem('access',"true")
          dispatch(getuser(res.data.id));

          dispatch(access_Action(res.data.access));
        })
        .catch((err) => console.log(err));
    }
    return () => {
      setUnmounted(true);
    };
  }, []);
  return (
    <div className={Styles.main}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/signin" />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/main">
            <Main />
          </Route>
          <Route path={`/post/:id`}>
            <Post />
          </Route>
          <Route>
            <Page404 />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
export default withRouter(App);
