import { useEffect, useState } from 'react';
import Styles from './Container.module.css'
const Container=({collectposts,user})=>{
  const [posts,setposts]=useState(null);
   useEffect(()=>{
    collectposts(user._id).then(res=>setposts(res)).catch(err=>console.log(err))
    

   },[]);
    if(!posts)
    {
        return (<div>Loading...</div>);
        
    }
    return(<div className={Styles.maindiv}>
        {posts.length > 0
          ? posts.map((dat, id) => {
              return <img key={id} src={dat.picture} />;
            })
          : <h3></h3>}
      </div>)
}
export default Container;