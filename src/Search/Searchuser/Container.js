import { useEffect, useState } from 'react';
import Styles from './Container.module.css'
const Container=({collectposts,user})=>{
  const [posts,setposts]=useState(null);
  const [loading,setloading]=useState(true);
   useEffect(()=>{
     setloading(true);
    collectposts(user._id).then(res=>{setposts(res);setloading(false)}).catch(err=>console.log(err))
    setTimeout(()=>{
setloading(false);
    },2000)

   },[]);
 
    if(loading)
    {
        return (<div  ><div className={Styles.loader}></div></div>);
        
    }else{
      return(<div className={Styles.maindiv}>
        {posts?.length > 0
          ? posts.map((dat, id) => {
              return <img  key={id} src={dat.picture} />;
            })
          : <h3>Nothing posted YET</h3>}
      </div>)

    }
    
}
export default Container;