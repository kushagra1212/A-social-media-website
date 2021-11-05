import axios from "axios";
const URL = process.env.REACT_APP_URL;
export const getpostsforfeed =  (username, lastcount, limit) => {
  return  new Promise(async(resolve,reject)=>{
    try {
      const res = await axios.get(
        `${URL}/post/getposts?username=${username}&last=${lastcount}&limit=${limit}`
      );
     
      if (res.data) {
        resolve(res.data);
      } else {
        resolve([]);
      }
    } catch (err) {
       reject(err);
    }
  })
};
