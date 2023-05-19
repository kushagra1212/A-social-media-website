import axiosInstance from '../Errors/httpInterceptor';

const URL = process.env.REACT_APP_URL;
export const getcount = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosInstance.get(
        `${URL}/count/getpostcount?username=${username}`
      );
      // console.log(res);
      resolve(res.data);
    } catch (err) {
      reject(err);
    }
  });
};
