import {useState} from 'react';
import Styles from './Picture.module.css';
const Picture=({pictures,set_picture_handle})=>{
    const [count,setcount]=useState(0);
    return (
        <div className={Styles.maindiv} >
        <button className={Styles.addMore} onClick={()=>set_picture_handle(false)}  >Add more</button>
        {pictures.map((pic,id)=>{<img key={id} src={pic.picture} width="100px"/ >})}
        </div>
    )
}
export default Picture;