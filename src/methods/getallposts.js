import axios from "axios";
const URL = process.env.REACT_APP_URL;
const getallposts =  (username,last,limit) => {
   return new Promise(async(resolve,reject)=>{
      try{
        const res = await axios.get(
          `${URL}/post/allposts?username=${username}&last=${last}&limit=${limit}`
        );
 
        resolve(res.data);
      }catch(err){
        reject(err);
      }
   })
};

export default getallposts;
