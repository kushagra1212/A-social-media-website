import axios from 'axios';
import { API_END_POINT } from '../utils/constants/env';

const URL = API_END_POINT;
const getitem = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`${URL}/item/getitem?username=${username}`);
      if (res.data) {
        resolve(res.data);
      } else {
        resolve({ msg: 'not found' });
      }
    } catch (err) {
      reject(err);
    }
  });
};
export default getitem;
