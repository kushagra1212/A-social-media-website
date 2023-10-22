import axiosInstance from '../Errors/httpInterceptor';
import { API_END_POINT } from '../utils/constants/env';

const URL = API_END_POINT;
const addcomment = async (id, username, comment) => {
  try {
    const res = await axiosInstance.patch(`${URL}/post/addcomment`, {
      id: id,
      username: username,
      comment: comment,
    });
    if (res.data) {
      return res.data;
    } else {
      console.log('error in getting post after adding comments');
    }
  } catch (err) {
    console.log(err);
  }
};
export default addcomment;
