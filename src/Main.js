import { useEffect, useState } from "react";
import Home from "./Home/Home";
import Like from "./Like/Like";
import Search from "./Search/Search";
import Footer from "./Bottom Bar/Footer";
import { useSelector, useDispatch } from "react-redux";
import Messenger from "./Messenger/Messenger";
import Profile from "./Profile/Profile";
import {
  BrowserRouter,
  Switch,
  Route,
  withRouter,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import getSessionStorageOrDefault from "./methods/getSessionStorageOrDefault";
import Page404 from "./Page404";
import getuser from "./methods/getuser";
import { access_Action } from "./reduces/actions/userAction";
import axios from "axios";
const Main = ({ match }) => {
  const { show_others_stories } = useSelector((state) => state.Stories);
  const { message } = useSelector((state) => state.main);
  const access_s=getSessionStorageOrDefault('access', '')
  const { url, path } = useRouteMatch();
  useEffect(() => {}, [show_others_stories.flag]);
  const dispatch=useDispatch();
  const history = useHistory();

useEffect(()=>{
if(access_s!=="true"){
  history.replace('/signin');
}else{
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
},[])
  return (
    <>
      <div>
        <BrowserRouter>
          {message ? null : <Footer url={url} path={path} />}

          <Switch>
            <Route exact path="/main">
              <Home />
            </Route>

            <Route  path={`${path}/likes`}>
              <Like />
            </Route>

            <Route  path={`${path}/profile`} component={Profile} />

            <Route  path={`${path}/search`}>
              <Search
                fromshowbar={false}
                usernameformshowbar={null}
                view={true}
                preview={false}
              />
            </Route>
            <Route  path={`${path}/messenger`}>
              <Messenger />
            </Route>
           
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
};

export default withRouter(Main);
