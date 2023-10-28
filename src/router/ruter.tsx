import { Navigate, createBrowserRouter } from 'react-router-dom';
import AuthGuard from '../Guard/AuthGuard';
import Home from '../Home/Home';
import Like from '../Like/Like';
import Profile from '../Profile/Profile';
import Search from '../Search/Search';
import Messenger from '../Messenger/Messenger';
import Signin from '../Sign in/Signin';
import Signup from '../Sign up/Signup';
import Post from '../posts/Post';
import LimitReached from '../LimitReached/LimitReached';
import Page404 from '../Page404/Page404';
import FooterWrapper from '../custom-wrappers/FooterWrapper';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="feed" replace />,
  },
  {
    path: 'likes',
    element: <AuthGuard ProtectedRoute={<FooterWrapper children={<Like />} />} path="likes" />,
  },
  {
    path: 'profile',
    element: (
      <AuthGuard
        ProtectedRoute={<FooterWrapper children={<Profile preview={false} />} />}
        path="profile"
      />
    ),
  },
  {
    path: 'search',
    element: (
      <AuthGuard
        ProtectedRoute={
          <FooterWrapper>
            <Search
              showprofilefromshowbar={false}
              usernameformshowbar={null}
              view={true}
              preview={false}
            />
          </FooterWrapper>
        }
        path="search"
      />
    ),
  },
  {
    path: 'messenger',
    element: (
      <AuthGuard ProtectedRoute={<FooterWrapper children={<Messenger />} />} path="messenger" />
    ),
  },
  {
    path: 'feed',
    element: <AuthGuard ProtectedRoute={<FooterWrapper children={<Home />} />} path="feed" />,
  },
  {
    path: 'signin',
    element: <AuthGuard ProtectedRoute={<Signin />} path="signin" />,
  },
  {
    path: 'signup',
    element: <AuthGuard ProtectedRoute={<Signup />} path="signup" />,
  },
  {
    path: `post/:id`,
    element: <AuthGuard ProtectedRoute={<Post />} path="post/:id" />,
  },
  {
    path: `limit-reached`,
    element: <AuthGuard ProtectedRoute={<LimitReached />} path="limit-reached" />,
  },
  {
    path: '*',
    element: <Page404 />,
  },
]);
