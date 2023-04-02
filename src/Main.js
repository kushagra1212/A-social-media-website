import { useEffect } from 'react';
import Home from './Home/Home';
import Like from './Like/Like';
import Search from './Search/Search';
import Footer from './Bottom Bar/Footer';
import { useSelector } from 'react-redux';
import Messenger from './Messenger/Messenger';
import Profile from './Profile/Profile';
import {
  BrowserRouter,
  Switch,
  Route,
  withRouter,
  useRouteMatch,
} from 'react-router-dom';
import Page404 from './Page404';

const Main = ({ match }) => {
  const { show_others_stories } = useSelector((state) => state.Stories);
  const { message } = useSelector((state) => state.main);
  const { url, path } = useRouteMatch();
  useEffect(() => {}, [show_others_stories.flag]);

  return (
    <>
      <div>
        <BrowserRouter>
          {message ? null : <Footer url={url} path={path} />}

          <Switch>
            <Route exact path="/main">
              <Home />
            </Route>

            <Route exact path={`${path}/likes`}>
              <Like />
            </Route>

            <Route exact path={`${path}/profile`} component={Profile} />

            <Route exact path={`${path}/search`}>
              <Search
                fromshowbar={false}
                usernameformshowbar={null}
                view={true}
                preview={false}
              />
            </Route>
            <Route exact path={`${path}/messenger`}>
              <Messenger />
            </Route>
            <Route>
              <Page404 />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
};

export default withRouter(Main);
