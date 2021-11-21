import axios from "axios";
const URL = process.env.REACT_APP_URL;

const getuser = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`${URL}/users/getuser?username=${username}`);
     
      if (res.data) {
        resolve(res.data);
      } else {
        resolve({ msg: "NOt Found" });
      }
    } catch (err) {
      reject(err);
    }
  });
};
export default getuser;
