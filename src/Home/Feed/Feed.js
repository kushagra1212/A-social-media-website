import { useEffect,useState } from 'react';
import Contentmain from './content/Contentmain';
import Styles from './Feed.module.css'
import Stories from './Stories/Stories';
const Feed=()=>{
    const [go,setgo]=useState(false);
    useEffect(()=>{
   setTimeout(()=>{
setgo(true);
   },1000)
    },[]);
    return(
        <div className={Styles.maindiv}>
        <Stories/>
        {go?<Contentmain/>:null}
        </div>
    )
}
export default Feed;