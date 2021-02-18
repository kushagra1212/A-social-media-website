import Content from './content/Contentmain';
import Styles from './Feed.module.css'
import Stories from './Stories/Stories';
const Feed=()=>{
    return(
        <div className={Styles.maindiv}>
        <Stories/>
        <Content/>
        </div>
    )
}
export default Feed;