
import Styles from "./Container.module.css";
import {useEffect} from 'react'

const Container = ({ posts }) => {
  useEffect(()=>{
    console.log(posts);
    posts.sort((a,b)=>{
    
      return(new Date(a.createdAt)-new Date(b.createdAt));
    });
    console.log(posts);
  },[posts])
  return (
      
    <div className={Styles.maindiv}>
         
      {posts.length > 0
        ? posts.map((dat, id) => {
            return <img key={id} src={dat.picture} />;
          })
        : null}
   
    </div>
  );
};
export default Container;
