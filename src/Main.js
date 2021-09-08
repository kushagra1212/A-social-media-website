import { useEffect,useState } from "react";
import Home from "./Home/Home";
import Like from "./Like/Like";
import Search from "./Search/Search";
import Footer from "./Bottom Bar/Footer";
import { useSelector } from "react-redux";
import Message from "./Home/Messagesec/Message";

import Profile from "./Profile/Profile";
import { BrowserRouter,Switch,Route ,useHistory,Redirect, HashRouter,withRouter,useRouteMatch} from "react-router-dom";
import Loader from "./Animation/Loader/Loader";
const Main = ({match}) => {
  let profile = useSelector((state) => state.main.profile);
  let home = useSelector((state) => state.main.home);
  let search = useSelector((state) => state.main.search);
  let like = useSelector((state) => state.main.like);
  let message = useSelector((state) => state.main.message);
  const { show_others_stories } = useSelector((state) => state.Stories);
  let access = useSelector((state) => state.signinReducer.access);

  const { url, path } = useRouteMatch();  
  useEffect(() => {}, [show_others_stories.flag]);
 
 

  return (
    <>



<div> 

<BrowserRouter>

 <Footer url={url} path={path} />


<Switch>
<Route  exact path="/main">
      <Home/>
     </Route>
     
     <Route   path={`${path}/likes`}>
      <Like  />
     </Route>
     
     <Route   path={`${path}/profile`} component={Profile} />
   
 
     
     <Route  path={`${path}/search`}>
     <Search fromshowbar={false} usernameformshowbar={null} view={true} />
     </Route>
     <Route>
       <div>
         <Loader/>
       </div>
      </Route>
</Switch>
</BrowserRouter>


   </div>
  


      {/* <BrowserRouter>
    
       <Switch>
       <Route exact path="/main"   >
           {home?<Home/>:like?<Redirect to="/main/likes" />:search?<Redirect to="/main/search" />:profile?<Redirect to="/main/profile" />:<Redirect to="/main/messages" />}
           </Route> 
           <Route exact path="/main/like" >
           {like?<Like/>:home?<Redirect to="/main/" />:search?<Redirect to="/main/search" />:profile?<Redirect to="/main/profile" />:<Redirect to="/main/messages"/>}
           </Route>
           <Route exact path="/main/profile"  >
           {profile?<Profile/>:like?<Redirect to="/main/like" />:search?<Redirect to="/main/search" />:home?<Redirect to="/main" />:<Redirect to="messages"/>}
           </Route>
           <Route exact path="/main/search"  >
           {search?<Search fromshowbar={false} usernameformshowbar={null} view={true} />:like?<Redirect to="/main/like" />:profile?<Redirect to="/main/profile" />:home?<Redirect to="/main" />:<Redirect to="/main/messages" />}
           </Route>
           <Route>
           {message?<Message/>:like?<Redirect to="/main/like" />:profile?<Redirect to="/main/profile" />:home?<Redirect to="/main" />:<Redirect to="/main/search" />}
           </Route>
       </Switch>
    

      </BrowserRouter> */}
    
     
    </>
  );
};

export default withRouter(Main);
