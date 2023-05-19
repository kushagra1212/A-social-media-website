import axiosInstance from '../Errors/httpInterceptor';

const URL = process.env.REACT_APP_URL;
const getpartialusers = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosInstance.get(
        `${URL}/users/searchuser/${username}`
      );
      resolve(res.data);
    } catch (err) {
      reject(err);
    }
  });
};

export default getpartialusers;
