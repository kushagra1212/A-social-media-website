import {useState,useEffect} from 'react';
import Styles from './Picture.module.css';
import {useDispatch} from 'react-redux';
import {useTransition,useSpringRef,animated} from 'react-spring';
import {show_user_stories_handle} from '../../../../reduces/actions/StoriesAction';
const Picture=({documents,set_picture_handle})=>{
    const [count,setcount]=useState(0);
    const dispatch=useDispatch();
    const transRef=useSpringRef();
    const Transition=useTransition(count,{
      ref:transRef,
      keys:null,

      from:{opacity:1,transform:"translate3d(100%,0,0)"},
      enter:{opacity:1,transform:"translate3d(0,0,0)"},
      leave:{opacity:1,transform:"translate3d(-50%,0,0)"}

    })
    useEffect(() => {
    
        transRef.start();
    }, [count])
    return (
        <div className={Styles.maindiv} >
       <button className={Styles.addMore} onClick={()=>set_picture_handle(false)}  >Add more</button>
      
              {Transition((style,i)=>{
                  return (
                    <animated.img className={Styles.picture} style={style}  src={documents[i].picture}  width="100px" />)
              })}
               
      
               <button  className={Styles.next}  onClick={()=>count+1<=documents.length-1?setcount(count+1):dispatch(show_user_stories_handle(false))}    > </button>
               <button  className={Styles.previous}  onClick={()=>count-1>=0?setcount(count-1):dispatch(show_user_stories_handle(false))}    > </button>
        </div>
      
    )
}
export default Picture;