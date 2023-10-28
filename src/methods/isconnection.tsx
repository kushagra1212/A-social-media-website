import axios from 'axios';
import { API_END_POINT } from '../utils/constants/env';
const URL = API_END_POINT;

const isconnection = async (currentusername, username) => {
  return await new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(
        `${URL}/item/isconnection/?currentusername=${currentusername}&username=${username}`,
      );

      resolve(res.data.found);
    } catch (err) {
      reject(err);
    }
  });
};

export default isconnection;
