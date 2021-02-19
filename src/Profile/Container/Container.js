import Styles from './Container.module.css'

const images=[];
const Container=()=>{
    
    return(
        <div className={Styles.maindiv}>
        {images.map((image,key)=>(<img src={image} key={key}   />
           ))}


        </div>
    )
}
export default Container;