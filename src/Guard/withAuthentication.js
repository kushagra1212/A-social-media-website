import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { access_Action } from '../reduces/actions/userAction';
import { getuser } from '../reduces/actions/userAction';
const authRoutePaths = ['/signin', '/signup'];

const URL = process.env.REACT_APP_URL;
const withAuthentication = (ProtectedRoute, path) => {
  const AuthenticatedRoute = (props) => {
    const dispatch = useDispatch();
    const [isUnmounted, setUnmounted] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(
      useSelector((state) => state.signinReducer.access)
    );
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (!isUnmounted) {
        axios
          .get(`${URL}/auth/verify`, {
            withCredentials: true,
          })
          .then(async (res) => {
            sessionStorage.setItem('access', 'true');
            dispatch(getuser(res.data.id));
            setIsAuthenticated(res.data.access);
            dispatch(access_Action(res.data.access));
          })
          .catch((err) => console.log(err))
          .finally(() => setLoading(false));
      }
      return () => {
        setUnmounted(true);
      };
    }, []);
    if (loading) return <div></div>;
    if (isAuthenticated) {
      if (authRoutePaths.includes(path)) return <Redirect to="/main" />;
      return <ProtectedRoute {...props} />;
    } else {
      if (authRoutePaths.includes(path)) return <ProtectedRoute {...props} />;
      return <Redirect to="/signin" />;
    }
  };

  return AuthenticatedRoute;
};

export default withAuthentication;
