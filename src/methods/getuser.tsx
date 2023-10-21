import axios from 'axios';
import { API_END_POINT } from '../utils/constants/env';
const URL = API_END_POINT;

const getuser = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`${URL}/users/getuser?username=${username}`);

      if (res.data) {
        resolve(res.data);
      } else {
        resolve({ msg: 'NOt Found' });
      }
    } catch (err) {
      reject(err);
    }
  });
};
export default getuser;
