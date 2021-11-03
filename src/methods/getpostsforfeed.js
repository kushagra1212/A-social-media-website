import axios from "axios";
const URL = process.env.REACT_APP_URL;
export const getpostsforfeed = async (username, lastcount, limit) => {

  try {
    const res = await axios.get(
      `${URL}/post/getposts?username=${username}&last=${lastcount}&limit=${limit}`
    );
   
    if (res.data) {
      return res.data;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};
