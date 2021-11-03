import axios from "axios";
const URL = process.env.REACT_APP_URL;

const getusers=()=>{
        return new Promise(async (resolve,reject)=>{
                try{
                        const users=await axios.get(`${URL}/users/getusers?last=0&limit=5`);
                        resolve(users);
                }catch(err){
                        reject(err);
                }
        })
}

export default getusers;