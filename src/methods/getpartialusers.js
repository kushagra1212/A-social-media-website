import axios from "axios";
const URL = process.env.REACT_APP_URL;
const getpartialusers=(username)=>{
        
        return  new Promise(async(resolve,reject)=>{
                try{    
                        const res=await axios.get(`${URL}/users/searchuser/${username}`);
                        resolve(res.data);
                }catch(err){
                        reject(err)
                }
        })
}

export default getpartialusers;