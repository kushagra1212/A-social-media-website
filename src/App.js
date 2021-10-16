import Main from "./Main";
import Signin from "./Sign in/Signin";
import Signup from "./Sign up/Signup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getuser, access_Action } from "./reduces/actions/userAction";
import { useEffect, useState } from "react";

import Styles from "./App.module.css";
import { BrowserRouter, Route, Redirect, withRouter } from "react-router-dom";
const URL = process.env.REACT_APP_URL;
const App = ({ match }) => {
  const dispatch = useDispatch();

  const [isUnmounted, setUnmounted] = useState(false);

  useEffect(() => {
    if (!isUnmounted) {
      axios
        .get(`${URL}/auth/verify`, {
          withCredentials: true,
        })
        .then(async (res) => {
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
      </BrowserRouter>
    </div>
  );
};
export default withRouter(App);
