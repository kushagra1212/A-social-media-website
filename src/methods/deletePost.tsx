import axios from 'axios';
import { API_END_POINT } from '../utils/constants/env';
const URL = API_END_POINT;
const deletePost = async (id, picture) => {
  try {
    const res = await axios.delete(`${URL}/post/deleteuserpost`, {
      data: {
        id,
        picture,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export default deletePost;
