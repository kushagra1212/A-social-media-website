import axios from 'axios';
import { API_END_POINT } from '../utils/constants/env';
const URL = API_END_POINT;
const deletelike = async ({ username, id }) => {
  try {
    const res = await axios.delete(`${URL}/post/deletelike?username=${username}&id=${id}`);
    if (res.data) {
    }
  } catch (err) {
    console.log(err);
  }
};
export default deletelike;
