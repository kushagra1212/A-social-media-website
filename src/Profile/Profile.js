import { useDispatch } from "react-redux";
import axios from 'axios';
const URL= process.env.REACT_APP_URL;
const Profile = () => {
  const dispatch = useDispatch();

  const logouthandle = () => {
      axios.get(`${URL}/auth/logout`,{withCredentials:true}).then(res=>{
        dispatch({ type: "access", payload: false });
      }).catch(err=>console.log(err));
   
  };
  return (
    <div>
      profile
      <button onClick={logouthandle}>Log out</button>
    </div>
  );
};

export default Profile;
