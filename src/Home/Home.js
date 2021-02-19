import Feed from './Feed/Feed';
import Header from './Top Bar/Header'
import Styles from './Home.module.css'
const Home=()=>{
    return(<div className={Styles.maindiv}>
        <Header/>
        <Feed/>  
    </div>)
}
export default Home;