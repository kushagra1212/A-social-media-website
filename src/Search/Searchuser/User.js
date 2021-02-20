import Styles from './User.module.css'
const User=({profpic,name,username,bio,postsnumber,followingcount,followerscount})=>{
    return(
        <div className={Styles.maindiv}  >
          
        <div className={Styles.firstdiv} >
        <img src={profpic}  />
       
       

        </div>
        <div className={Styles.seconddiv}  >
        <h3>{name}</h3>
      
        <h6>@{username}</h6>
        <h5>{bio}</h5>
        
        </div>
        <div  className={Styles.thirddiv} >
<label>Posts <h6> {postsnumber}</h6></label>

<label>followers <h6>{followerscount}</h6></label>

<label>following <h6>{followingcount}</h6></label>

<button >follow </button>

        </div>
      

    </div>
    )
}
export default User;