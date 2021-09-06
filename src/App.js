import Main from "./Main";
import Signin from "./Sign in/Signin";
import Signup from "./Sign up/Signup";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getuser, access_Action } from "./reduces/actions/userAction";
import { useEffect, useState } from "react";
import Styles from "./App.module.css";
import { BrowserRouter, useHistory, Switch, Route,Redirect,withRouter,useRouteMatch } from "react-router-dom";
const URL = process.env.REACT_APP_URL;
const App = ({match}) => {
  const dispatch = useDispatch();
 
  const issignup = useSelector((state) => state.signinReducer.signup);
  
  const [isUnmounted, setUnmounted] = useState(false);
 
  useEffect(() => {
    if (!isUnmounted) {
      axios
        .get(`${URL}/auth/verify`, {
          withCredentials: true,
        })
        .then(async (res) => {
          setTimeout(() => {
            dispatch(getuser(res.data.id));
          }, 0);

          setTimeout(() => {
            dispatch(access_Action(res.data.access));
         
          }, 1000);
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


 
      <Route exact path="/" >
     
    <Redirect to="/signin"/>
      </Route>
      <Route path="/signin">
      <Signin />
      </Route>
        <Route  path="/signup" >
        <Signup />
      </Route>
      <Route path="/main">
       <Main/>
      </Route>
    

 
   

</BrowserRouter>
    </div>
  );
};
export default withRouter(App);
