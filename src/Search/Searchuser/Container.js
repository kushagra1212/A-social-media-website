import Styles from './Container.module.css'
const Container=({posts})=>{
    if(!posts)
    {
        return (<div>Loading...</div>);
        
    }
    return(<div className={Styles.maindiv}>
        {posts.length > 0
          ? posts.map((dat, id) => {
              return <img key={id} src={dat.picture} />;
            })
          : null}
      </div>)
}
export default Container;