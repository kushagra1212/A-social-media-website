import axiosInstance from '../Errors/httpInterceptor';
import { addposts } from '../reduces/actions/userAction';
import { API_END_POINT } from '../utils/constants/env';

const URL = API_END_POINT;
export const getposts = async (_id, dispatch) => {
  try {
    const posts = await axiosInstance.get(`${URL}/post/getpost?id=${_id}`);
    if (posts.data) {
      dispatch(addposts(posts.data));
    }
  } catch (err) {
    console.log(err);
  }
};
