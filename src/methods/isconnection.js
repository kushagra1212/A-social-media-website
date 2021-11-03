import axios from "axios";
const URL = process.env.REACT_APP_URL;

const isconnection=async(currentusername,username)=>{
        return await new Promise(async(resolve,reject)=>{
                try{
                        const  res=await axios.get(`${URL}/item/isconnection/?currentusername=${currentusername}&username=${username}`);
                        console.log(res);
                        resolve(res.data.found);
                }catch(err){
                        reject(err);
                }
        })
}

export default isconnection;