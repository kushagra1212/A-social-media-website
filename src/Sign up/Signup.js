import Styles from "./signup.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useAlert } from "react-alert";
import {getusername} from '../reduces/actions/countAction'
import axios from "axios";
const URL = process.env.REACT_APP_URL;
console.log(URL);
const Signup = () => {
  const Alert = useAlert();
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");

  const [error, seterror] = useState({
    emailerr: false,
    nameerr: {
      err: false,
      text: "",
    },
    usernameerr: {
      err: false,
      text: "",
    },
    passworderr: false,
  });

  const errorfuncEmail = () => {
    if (email.length > 16) {
      if (!email.includes("@"))
        seterror((preverr) => ({ ...preverr, emailerr: true }));
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
          text: "",
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
          text: "",
        },
      }));
  };
  const submithandle = async (e) => {
    e.preventDefault();
    if (!password || !email || !name || !username) {
      Alert.show("Enter the Details");
      return;
    }
    try {
      const data = await axios.post(`${URL}/auth/signup`, {
        name: name,
        password: password,
        email: email,
        username: username,
      });
      if (data.data.properties) {
        Alert.show(data.data.properties.message);
      } else {
        await axios.post(`${URL}/item/setstart`, {
          username: username,
        });
        dispatch(getusername(username));
 
        Alert.success("successfully signed up ");
        setTimeout(() => {
          dispatch({ type: "signup", payload: false });
        }, 2200);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className={Styles.container}>
        <label className={Styles.instagram}>Instagram</label>
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
          {error.emailerr ? (
            <label className={Styles.error}>Email Should contain @</label>
          ) : null}
          <input
            value={name}
            onChange={(e) => setname(e.target.value.substr(0, 30))}
            placeholder="Full Name"
            type="text"
          />
          {error.nameerr ? (
            <label className={Styles.error}>{error.nameerr.text}</label>
          ) : null}
          <input
            value={username}
            onChange={(e) => setusername(e.target.value.substr(0, 15))}
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
          {password.length > 0 ? (
            <label>Password Length {password.length}</label>
          ) : null}
        </div>
        <button onClick={submithandle} className={Styles.loginbut}>
          Sign up
        </button>
        <button
          className={Styles.goto}
          onClick={() => dispatch({ type: "signup", payload: false })}
        >
          Go to Login page
        </button>
      </div>
    </>
  );
};
export default Signup;
