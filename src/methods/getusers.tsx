import axios from 'axios';
import { API_END_POINT } from '../utils/constants/env';
const URL = API_END_POINT;

const getusers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await axios.get(`${URL}/users/getusers?last=0&limit=10000`);
      resolve(users);
    } catch (err) {
      reject(err);
    }
  });
};

export default getusers;
