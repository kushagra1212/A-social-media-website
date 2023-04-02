import { addposts } from '../reduces/actions/userAction';
import axios from 'axios';
const URL = process.env.REACT_APP_URL;
export const getposts = async (_id, dispatch) => {
  try {
    const posts = await axios.get(`${URL}/post/getpost?id=${_id}`);
    if (posts.data) {
      dispatch(addposts(posts.data));
    }
  } catch (err) {
    console.log(err);
  }
};
