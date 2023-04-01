import Styles from './signin.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { getuser } from '../reduces/actions/userAction';
import { useAlert } from 'react-alert';
import { Link, Redirect } from 'react-router-dom';
import { Background } from '../Animation/Loader/Background/Background';
const URL = process.env.REACT_APP_URL;
const Signin = () => {
  const dispatch = useDispatch();
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [showAlert, setShowAlert] = useState(true);

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
      const res = await axios.post(
        `${URL}/auth/signin`,
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      const success = res.data.success;

      if (success) {
        sessionStorage.setItem('access', 'true');
        dispatch({ type: 'access', payload: success });

        dispatch(getuser(res.data.user._id));
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
  if (access) {
    return <Redirect push to="/main" />;
  }
  return (
    <>
      <div className={Styles.container}>
        <img
          className={Styles.logo}
          src={process.env.PUBLIC_URL + '/logo.svg'}
          alt="logo"
        />
        <div className={Styles.input}>
          {' '}
          <input
            placeholder="username"
            onChange={(e) =>
              setusername(e.target.value.substr(0, 15).toLowerCase().trim(''))
            }
            value={username}
            type="text"
          />
          <input
            onKeyDown={(event) =>
              event.key === 'Enter' ? loginhandle(event) : null
            }
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
          <Link
            to="/signup"
            onClick={() => dispatch({ type: 'signup', payload: true })}
          >
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
