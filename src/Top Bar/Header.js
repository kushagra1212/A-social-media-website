import Styles from './Header.module.css';
const Header=()=>{
    return(
        <div>
            <div className={Styles.Header}>
               <button> camera</button>
              
              <button>  message</button>
            </div>
        </div>
    )
}
export default Header;