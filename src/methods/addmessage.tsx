import axiosInstance from '../Errors/httpInterceptor';
import { API_END_POINT } from '../utils/constants/env';

const URL = API_END_POINT;
const addmessage = async (Message) => {
  try {
    const res = await axiosInstance.post(`${URL}/messenger/message`, Message);

    if (res.data) return res.data;
    // else console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export default addmessage;
