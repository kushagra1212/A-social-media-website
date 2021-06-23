import {useState,useEffect} from 'react';
import Styles from './Picture.module.css';
import {useDispatch} from 'react-redux';
import {useTransition,useSpringRef,animated} from 'react-spring';
import {show_user_stories_handle} from '../../../../reduces/actions/StoriesAction';
import { backgroundImages } from './backgroundImages';
const Picture=({documents,set_picture_handle})=>{

    const [count,setcount]=useState(0);
    const [backgroundCount,setbackgroundCount]=useState(Math.floor(Math.random()*backgroundImages.length));
    const dispatch=useDispatch();
    const transForRef=useSpringRef();
    const tranBacref=useSpringRef();
    const [increased,setIncreased]=useState(true);
    const Transition=useTransition(count,{
      ref:transForRef,
      keys:null,
      from:{opacity:1,transform:`translate3d(${increased?100:-100}%,0,0) scale(0.5)`},
      enter:{opacity:1,transform:"translate3d(0,0,0) scale(1)"},
      leave:{opacity:1,transform:`translate3d(${increased?100:-100}%,0,0) scale(0.5)`},
      backgroundPosition:"10% 0%",
      config:{duration:300}
    })
   
    const increaseCount=()=>{
        setcount(count+1);
        
        setIncreased(true);
        setTimeout(()=>      setbackgroundCount(Math.floor(Math.random()*backgroundImages.length)),330);
    }
    const decreaseCount=()=>{
        setcount(count-1);
      
        setIncreased(false);
        setTimeout(()=>      setbackgroundCount(Math.floor(Math.random()*backgroundImages.length)),330);
    }

    useEffect(() => {
      
    transForRef.start();

    }, [count])

    return (
        <div className={Styles.maindiv} >
       <button className={Styles.addMore} onClick={()=>set_picture_handle(false)}  >Add more</button>
      
              {Transition((style,i)=>{
                  return (
                    <animated.div  className={Styles.picture} style={{backgroundImage:backgroundImages[backgroundCount],...style}}  >
                        
                    <img src={documents[i].picture}  width="100%"     />
                    </animated.div>
                    
                  )
              })}
               
      
               <button  className={Styles.next}  onClick={()=>count+1<=documents.length-1?increaseCount():dispatch(show_user_stories_handle(false))}    > </button>
               <button  className={Styles.previous}  onClick={()=>count-1>=0?decreaseCount():dispatch(show_user_stories_handle(false))}    > </button>
        </div>
      
    )
}
export default Picture;