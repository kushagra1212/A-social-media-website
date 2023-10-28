import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../Errors/httpInterceptor';
import { access_Action, getuser } from '../../reduces/actions/userAction';
import { API_END_POINT } from '../../utils/constants/env';

const useAuth = (): {
  isAuthenticated: boolean;
  loading: boolean;
} => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    useSelector((state) => state.signinReducer.access),
  );
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let isUnmounted = false;
    if (!isUnmounted) {
      axiosInstance
        .get(`${API_END_POINT}/auth/verify`, {
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
      isUnmounted = true;
    };
  }, []);

  return { isAuthenticated, loading };
};

export default useAuth;
