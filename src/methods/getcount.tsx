import axiosInstance from '../Errors/httpInterceptor';
import { API_END_POINT } from '../utils/constants/env';

const URL = API_END_POINT;
export const getcount = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosInstance.get(`${URL}/count/getpostcount?username=${username}`);
      // console.log(res);
      resolve(res.data);
    } catch (err) {
      reject(err);
    }
  });
};
