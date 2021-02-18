import Feed from './Feed/Feed';
import Styles from './Home.module.css'
const Home=()=>{
    return(<div className={Styles.maindiv}>
        <Feed/>  
    </div>)
}
export default Home;