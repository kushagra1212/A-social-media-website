import axiosInstance from '../Errors/httpInterceptor';
import { API_END_POINT } from '../utils/constants/env';

const URL = API_END_POINT;

const addconversation = async (members) => {
  // console.log(members);
  try {
    const res = await axiosInstance.post(`${URL}/messenger/conversation`, {
      members,
    });
    if (res.data) return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default addconversation;
