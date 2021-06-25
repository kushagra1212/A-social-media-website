import { useEffect, useState } from 'react';
import Styles from './Container.module.css'
const Container=({collectposts,user})=>{
  const [posts,setposts]=useState(null);
  const [loading,setloading]=useState(true);
  const [isUnmounted,setUnmounted]=useState(false);
  const [grid,setGrid]=useState(true);
   useEffect(()=>{
    if(!isUnmounted)
    {
      setloading(true);
      collectposts(user._id).then(res=>{setposts(res);setloading(false)}).catch(err=>console.log(err));
   
    }
return ()=>setUnmounted(true);
   },[]);

   const gridHandler=(bool)=>{
    setGrid(bool);
  }

    if(loading)
    {
        return (<div  ><div className={Styles.loader}></div></div>);
        
    }else{
      return(
      <>
      <div className={Styles.topButtons}       >
   <button disabled={grid?true:false} onClick={()=>gridHandler(true)}   > <img width="30px" height="30px"  src="https://img.icons8.com/ios-glyphs/60/000000/grid-2.png"/></button>
   <button  onClick={()=>gridHandler(false)} disabled={grid?false:true}     > <img  width="30px" height="30px" src="https://img.icons8.com/material-outlined/60/000000/ingredients-list.png"/></button>
    </div>


      <div style={grid?{}:{flexDirection:"column",alignItems:"center"}} className={Styles.maindiv}>
        {posts?.length > 0
          ? posts.map((dat, id) => {
              return <img  key={id} src={dat.picture} />;
            })
          : null}
      </div>
      </>
      )

    }
    
}
export default Container;