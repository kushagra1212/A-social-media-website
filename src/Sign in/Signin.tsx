import Styles from './signin.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getuser, setuser } from '../reduces/actions/userAction';
import { useAlert } from 'react-alert';
import { Link, useHref, useNavigate } from 'react-router-dom';
import { Background } from '../Animation/Loader/Background/Background';
import axiosInstance from '../Errors/httpInterceptor';
import { API_END_POINT } from '../utils/constants/env';
const URL = API_END_POINT;
const Signin = () => {
  const dispatch = useDispatch();
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [showAlert, setShowAlert] = useState(true);
  const history = useNavigate();
  const Alert = useAlert();
  let access = useSelector((state) => state.signinReducer.access);

  const loginhandle = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      if (showAlert) {
        Alert.error('Field is Empty !', {
          onOpen: () => {
            setShowAlert(false);
          },
          onClose: () => {
            setShowAlert(true);
          },
        });
      }
      return;
    }
    try {
      const res = await axiosInstance.post(
        `${URL}/auth/signin`,
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        },
      );
      const success = res.data.success;

      if (success) {
        sessionStorage.setItem('access', 'true');
        window.location.reload();
      } else {
        if (showAlert) {
          Alert.error(res.data.message, {
            onOpen: () => {
              setShowAlert(false);
            },
            onClose: () => {
              setShowAlert(true);
            },
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={Styles.container}>
        <img className={Styles.logo} src={'logo.svg'} alt="logo" />
        <div className={Styles.input}>
          {' '}
          <input
            placeholder="username"
            onChange={(e) => setusername(e.target.value.substr(0, 15).toLowerCase().trim(''))}
            value={username}
            type="text"
          />
          <input
            onKeyDown={(event) => (event.key === 'Enter' ? loginhandle(event) : null)}
            onChange={(e) => setpassword(e.target.value.trim(''))}
            value={password}
            placeholder="Password"
            type="password"
          />
        </div>
        <button onClick={loginhandle} className={Styles.loginbut}>
          Log in
        </button>

        <div className={Styles.account}>
          <label>Don't have an account ?</label>
          <Link to="/signup" onClick={() => dispatch({ type: 'signup', payload: true })}>
            {' '}
            Sign up
          </Link>
        </div>
      </div>
      <Background />
    </>
  );
};
export default Signin;
