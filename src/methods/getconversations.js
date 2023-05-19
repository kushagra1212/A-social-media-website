import axiosInstance from '../Errors/httpInterceptor';

const URL = process.env.REACT_APP_URL;
const getconversations = async (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      const conversations = await axiosInstance.get(
        `${URL}/messenger/conversation?username=${username}`
      );
      resolve(conversations.data);
    } catch (err) {
      reject(err);
    }
  });
};

export default getconversations;
