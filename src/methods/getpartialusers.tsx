import axiosInstance from '../Errors/httpInterceptor';
import { API_END_POINT } from '../utils/constants/env';

const URL = API_END_POINT;
const getpartialusers = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosInstance.get(`${URL}/users/searchuser/${username}`);
      resolve(res.data);
    } catch (err) {
      reject(err);
    }
  });
};

export default getpartialusers;
