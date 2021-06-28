
import Styles from "./Container.module.css";
import {useEffect,useState} from 'react'


const Container = ({ posts }) => {
  const [grid,setGrid]=useState(true);
  useEffect(()=>{
    console.log(posts);
    posts.sort((a,b)=>{
    
      return(new Date(a.createdAt)-new Date(b.createdAt));
    });
    console.log(posts);
  },[posts])
  
  const gridHandler=(bool)=>{
    setGrid(bool);
  }
 
  return (
   <>   
    <div className={Styles.topButtons}       >
   <button disabled={grid?true:false} onClick={()=>gridHandler(true)}   > <img width="30px" height="30px"  src="https://img.icons8.com/ios-glyphs/60/000000/grid-2.png"/></button>
   <button  onClick={()=>gridHandler(false)} disabled={grid?false:true}     > <img  width="30px" height="30px" src="https://img.icons8.com/material-outlined/60/000000/ingredients-list.png"/></button>
    </div>
    <div style={grid?{}:{flexDirection:"column",alignItems:"center"}}  className={Styles.maindiv}>
   
      {posts.length > 0
        ? posts.map((dat, id) => {
            return <img className={Styles.post}       key={id} src={dat.picture} />;
          })
        : null}
   
    </div></>
  );
};
export default Container;
