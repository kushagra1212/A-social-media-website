import Main from './Main';
import Signin from './Sign in/Signin';
import Signup from './Sign up/Signup';
import Post from './posts/Post';
import Styles from './App.module.css';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  withRouter,
} from 'react-router-dom';
import Page404 from './Page404';
import withAuthentication from './Guard/withAuthentication';
import LimitReached from './LimitReached/LimitReached';

const App = ({ match }) => {
  return (
    <div className={Styles.main}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/main" />
          </Route>
          <Route
            path="/signin"
            component={withAuthentication(Signin, '/signin')}
          />
          <Route
            path="/signup"
            component={withAuthentication(Signup, '/signup')}
          />

          <Route path="/main" component={withAuthentication(Main, '/main')} />

          <Route
            path={`/post/:id`}
            component={withAuthentication(Post, '/post/:id')}
          />
          <Route path={`/limit-reached`} exact component={LimitReached} />
          <Route>
            <Page404 />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
export default withRouter(App);
