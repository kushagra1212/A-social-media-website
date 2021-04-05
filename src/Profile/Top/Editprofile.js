import {useDispatch,useSelector} from 'react-redux';
import FileBase64 from 'react-file-base64';
import axios from 'axios';
import {useAlert} from 'react-alert';
import { useState } from 'react';
import Styles from './Editprofile.module.css'
const URL=process.env.REACT_APP_URL;
const Editprofile=({edit_it,setprofpichandle})=>{
    const Alert=useAlert();
    const dispatch=useDispatch();
    const {username,email,profilepic,_id,bio}=useSelector(state=>state.user);
    const [file,setfile]=useState(profilepic);
    const [newemail,setnewemail]=useState(email);
    const [newusername,setnewusername]=useState(username);
    const [loading,setloading]=useState(false);
    
    const [newbio,setnewbio]=useState(bio);
    const save_it=async()=>{
        setloading(true);
     try{
        const res=await axios.patch(`${URL}/upload/updateuser`,{
            email:newemail,username:newusername,_id:_id,profilepic:file,bio:newbio
        });
        if(res) {console.log("fromclient");setprofpichandle(file); setloading(false) 
      
      dispatch({type:"UPDATE_USER",payload:{email:newemail,username:newusername,profilepic:file,bio:newbio}});
      
      edit_it();
      }
        else console.log("err");
     }catch(err)
     {
       console.log(err)
        
     console.log("H")
       Alert.show("Bio word limit 80 ");
setTimeout(()=>{
    setloading(false);
    edit_it();
},2000)

       
     }
    
    }
    if(loading)
    {
        return(<div>Loading</div>)
    }
    return(
        <div className={Styles.editprofile}>
            <button className={Styles.editbut} onClick={edit_it}  >Back</button>
            <img className={Styles.editimg} width="50px" height="50px"  src={file} />
            <FileBase64 multiple={false} onDone={e=>{setfile(e.base64); console.log(e)}}        />
            <input  onChange={e=>setnewemail(e.target.value)}   value={newemail} />
            <input onChange={e=>setnewusername(e.target.value)} value={newusername}  />
            <input onChange={e=>setnewbio(e.target.value)}  value={newbio}   />
            <button className={Styles.savebut} onClick={save_it}  >save</button>

        </div>
    )
}
export default Editprofile;