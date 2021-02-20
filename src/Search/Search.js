import { useState } from "react";
import axios from 'axios';
import User from './Searchuser/User';
import Container from './Searchuser/Container'
import { useSelector } from "react-redux";
import Profile from '../Profile/Profile'
import Styles from './Search.module.css'
const URL=process.env.REACT_APP_URL;
const Search=()=>{
    const [searchuser,setsearchuser]=useState('');
    const [user,setuser]=useState('');
    const [loading,setloading]=useState(false);
    const [found,setfound]=useState({found:false,text:''});
    const [posts,setposts]=useState(null);
    const [showprofile,setshowprofile]=useState(false);
    const {username}=useSelector(state=>state.user);
    const collectposts=async(id)=>{
        try{
            const res=await axios.get(`${URL}/post/getpost?id=${id}`)
            if(res)
            {
                console.log(res);
                setposts(res.data);
            }
            
        }catch(err)
        {
            console.log(err);
        }
    }

    const searchuserhandle=async(username)=>{
        try{
            setloading(true);
            const res=await axios.get(`${URL}/users/getuser?username=${username}`);
            setloading(false);
            if(res){
                collectposts(res.data._id); 
            setuser(res.data);
            setfound({found:true,text:''});
console.log(res.data)
        }else{
            setfound({found:false,text:'user not found'});
        }
        }
        
        catch(err)
        {
            setloading(false);
            setfound({found:false,text:'user not found'});
            console.log(err);
        }
      
        
    }
  
    const showuserprofilehandle=()=>{
        setposts(null);
        setshowprofile(!showprofile)
    }
    
 
    if(showprofile)
    { if(username===searchuser)
        {
            return(<>
              <button className={Styles.backbut} onClick={showuserprofilehandle}  >BACK</button>
            
            <Profile/></>)
        }

        return(
            <>
               <button className={Styles.backbut} onClick={showuserprofilehandle}  >BACK</button>
            
            <User
            profpic={user.profilepic}
            name={user.name}
            bio={user.bio}
            postsnumber={user.postsnumber}
            followerscount={user.followerscount}
            followingcount={user.followingcount}
            username={user.username}
            
            />
            <Container  posts={posts}/>
            </>
        )

    }
    return(
        <div>
           <input placeholder="Search User Here" value={searchuser} onChange={e=>{setsearchuser(e.target.value); searchuserhandle(e.target.value);         }}    />
           <button   onClick={()=>setshowprofile(true)}  >Search</button>
           {loading?<div>Loading...</div>:null}
           {found.found?<div onClick={showuserprofilehandle} style={{backgroundColor:"pink"}} >
           <img width="30px" height="30px"  src={user.profilepic} />
           <h4>{user.name}</h4>
           <h6>@{user.username}</h6>
           <button>follow</button>
           
           
           
           </div>:<div></div>}
        </div>
    )
}

export default Search;