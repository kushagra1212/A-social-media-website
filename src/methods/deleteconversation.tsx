import axiosInstance from '../Errors/httpInterceptor';
import { API_END_POINT } from '../utils/constants/env';

const URL = API_END_POINT;

const deleteconversation = async (members) => {
  try {
    const res = await axiosInstance.patch(`${URL}/messenger/deleteconversation`, {
      members,
    });

    // console.log(res.data);
    if (res.data) return res.data;
  } catch (err) {
    console.log(err);
  }
};
export default deleteconversation;
