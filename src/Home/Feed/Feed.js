import { useEffect,useState } from 'react';
import Content from './content/Contentmain';
import Styles from './Feed.module.css'
import Stories from './Stories/Stories';
const Feed=()=>{
    const [go,setgo]=useState(false);
    useEffect(()=>{
   setTimeout(()=>{
setgo(true);
   },100)
    },[])
    return(
        <div className={Styles.maindiv}>
        <Stories/>
        {go?<Content/>:null}
        </div>
    )
}
export default Feed;