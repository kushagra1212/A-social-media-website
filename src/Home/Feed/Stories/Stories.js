import Styles from './Stories.module.css'
import own from '../content/images/pic3.jpg'
import pic4 from '../content/images/pic4.jpg' 
import pic5 from '../content/images/pic5.jpg'
import pic6 from '../content/images/pic6.jpg'
const Stories=()=>{
    return (<>
       <div className={Styles.stories} >
  <img src={own} />
    <img src={pic4} className={Styles.otherstories}/>
    <img src={pic5} className={Styles.otherstories}/>
    <img src={pic6} className={Styles.otherstories}/>
       </div>
    </>)
}
export default Stories;
