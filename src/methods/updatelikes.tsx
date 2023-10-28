import axios from 'axios';
import { API_END_POINT } from '../utils/constants/env';
const URL = API_END_POINT;
const updatelikes = async ({ username, id }) => {
  try {
    const res = await axios.patch(`${URL}/post/updatelikes?username=${username}&id=${id}`);
    if (res.data) {
    } else {
      console.log('error occoured');
    }
  } catch (err) {
    console.log(err);
  }
};
export default updatelikes;
