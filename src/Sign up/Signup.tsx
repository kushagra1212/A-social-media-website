import Styles from './signup.module.css';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useAlert } from 'react-alert';
import { getusername } from '../reduces/actions/countAction';

import axios from 'axios';

import { NavLink, useNavigate } from 'react-router-dom';
import { Background } from '../Animation/Loader/Background/Background';
import { API_END_POINT } from '../utils/constants/env';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const URL = API_END_POINT;
const Signup = (): JSX.Element => {
  const Alert = useAlert();
  const history = useNavigate();
  const dispatch = useDispatch();
  const [email, setemail] = useState('');
  const [name, setname] = useState('');
  const [password, setpassword] = useState('');
  const [username, setusername] = useState('');
  const [showAlert, setShowAlert] = useState(true);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState({
    emailerr: false,
    nameerr: {
      err: false,
      text: '',
    },
    usernameerr: {
      err: false,
      text: '',
    },
    passworderr: false,
  });

  const errorfuncEmail = () => {
    if (email.length > 16) {
      if (!email.includes('@')) seterror((preverr) => ({ ...preverr, emailerr: true }));
      else seterror((preverr) => ({ ...preverr, emailerr: false }));
    } else seterror((preverr) => ({ ...preverr, emailerr: false }));
  };
  const checkforall = () => {
    if (!name.length > 0)
      seterror((prev) => ({
        ...prev,
        nameerr: {
          err: true,
          text: "Name field can't be empty",
        },
      }));
    else
      seterror((prev) => ({
        ...prev,
        nameerr: {
          err: false,
          text: '',
        },
      }));
    if (!username.length > 0)
      seterror((prev) => ({
        ...prev,
        usernameerr: {
          err: true,
          text: "Username field can't be empty",
        },
      }));
    else
      seterror((prev) => ({
        ...prev,
        usernameerr: {
          err: false,
          text: '',
        },
      }));
  };
  const submithandle = (e) => {
    e.preventDefault();
    setloading(true);
    if (!password || !email || !name || !username) {
      if (showAlert) {
        Alert.show('🤔 Enter the Details ', {
          onOpen: () => {
            setShowAlert(false);
          },
          onClose: () => {
            setShowAlert(true);
          },
        });
      }
      setloading(false);
      return;
    }
    try {
      console.log(URL, 'URL');
      axios
        .post(`${URL}/auth/signup`, {
          name: name,
          password: password,
          email: email,
          username: username,
        })
        .then((res) => {
          if (res.data?.properties?.message !== '' && showAlert) {
            Alert.show(res.data.properties.message, {
              onOpen: () => {
                setShowAlert(false);
              },
              onClose: () => {
                setShowAlert(true);
              },
            });
          } else if (res.data?.properties?.message === '') {
            axios
              .post(`${URL}/item/setstart`, {
                username: username,
              })
              .then((res) => {
                dispatch(getusername(username));

                Alert.success('successfully signed up 🤗 ');

                dispatch({ type: 'signup', payload: false });
                history('/', { replace: true });
              });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={Styles.main_container}>
      <div className={Styles.container_backdrop}> </div>
      <img className={Styles.logo} src={'logo.png'} alt="logo" />
      <div className={Styles.signin}>
        <h1>Sign Up</h1>
      </div>

      <div className={Styles.container}>
        <div className={Styles.input}>
          <input
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
              errorfuncEmail();
            }}
            placeholder="Email"
            type="email"
          />
          {error.emailerr ? <label className={Styles.error}>Email Should contain @</label> : null}
          <input
            value={name}
            onChange={(e) => setname(e.target.value.substr(0, 30))}
            placeholder="Full Name"
            type="text"
          />
          {error.nameerr ? <label className={Styles.error}>{error.nameerr.text}</label> : null}
          <input
            value={username}
            onChange={(e) => setusername(e.target.value.substr(0, 15).toLowerCase().trim(''))}
            placeholder="Username"
            type="text"
          />
          {error.usernameerr ? (
            <label className={Styles.error}>{error.usernameerr.text}</label>
          ) : null}
          <input
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);

              checkforall();
            }}
            placeholder="Password"
            type="password"
          />
          {password.length > 0 ? <label>Password Length {password.length}</label> : null}
        </div>
        <button onClick={submithandle} className={Styles.loginbut}>
          Sign up
        </button>
      </div>
      <NavLink
        to="/signin"
        replace
        className={Styles.account}
        onClick={() => dispatch({ type: 'signup', payload: false })}
      >
        <FontAwesomeIcon icon={faArrowLeft} className={Styles.icon} color="white" />
        <label> {'   '}Go to Login page </label>
      </NavLink>
    </div>
  );
};
export default Signup;
