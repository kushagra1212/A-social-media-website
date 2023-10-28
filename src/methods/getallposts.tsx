import axiosInstance from '../Errors/httpInterceptor';
import { API_END_POINT } from '../utils/constants/env';

const URL = API_END_POINT;
const getallposts = (username, last, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosInstance.get(
        `${URL}/post/allposts?username=${username}&last=${last}&limit=${limit}`,
      );
      //console.log(last, limit, 'last, limit');
      // console.log(res.data, 'Posts');
      resolve(res.data);
    } catch (err) {
      reject(err);
    }
  });
};

export default getallposts;
