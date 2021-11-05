import userEvent from "@testing-library/user-event";
import axios from "axios";

const URL = process.env.REACT_APP_URL;
const getitem =  (username) => {
  return new Promise(async(resolve,reject)=>{
    try {
      const res = await axios.get(`${URL}/item/getitem?username=${username}`);
      if (res.data) {
        resolve(res.data);
      } else {
       resolve( { msg: "not found" });
      }
    } catch (err) {
     reject(err);
    }
  })
};
export default getitem;
