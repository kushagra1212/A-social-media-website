
import getitem from '../methods/getitem';
import List from './list/List';
import { useEffect, useState } from 'react';
const Showbar=({username,setshowfollowershandle,setshowfollowinghandle,showfollowers,showfollowing})=>{
  
    const [item,setitem]=useState(null);
    const [loading,setloading]=useState(false);
    const [noone,setnoone]=useState({nofollowers:false,nofollowing:false});
useEffect(()=>{
  setloading(true)

  getitem(username).then(res=>{
 
if(res.following.length==0)
{
  setnoone({nofollowers:false,nofollowing:true})
}
else if(res.followers.length==0)
{
  setnoone({nofollowers:true,nofollowing:false})
}else if(res.followers.length==0 && res.following.length==0)
{
  setnoone({nofollowers:true,nofollowing:true})
}else{
  setnoone({nofollowers:false,nofollowing:false})
}

if(showfollowers)
{
  setitem(res.followers)
}else if(showfollowing) {
  setitem(res.following)
}

}).catch(err=>console.log(err));

},[]);


  if(item)
  {
   
    return(
      <div>
          <button onClick={()=>{setshowfollowershandle(false); setshowfollowinghandle(false)}}  > Back </button>
      <List   list={item}    />
    {noone.nofollowers && showfollowers? <div>
     <h1>   you have no followers</h1>
      </div>:null}
     

      {noone.nofollowing && showfollowing?      <div>
<h1>seems like no one is following you</h1>
      </div>:null}
      </div>
  )
  }else{
    return (<div>
      Loading... 
    </div>)
  }
 
}
export default Showbar;