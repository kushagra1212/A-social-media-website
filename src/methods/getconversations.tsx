import axiosInstance from '../Errors/httpInterceptor';
import { API_END_POINT } from '../utils/constants/env';

const URL = API_END_POINT;
const getconversations = async (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      const conversations = await axiosInstance.get(
        `${URL}/messenger/conversation?username=${username}`,
      );
      resolve(conversations.data);
    } catch (err) {
      reject(err);
    }
  });
};

export default getconversations;
