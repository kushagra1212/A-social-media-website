import getuser from '../methods/getuser';
import getitem from '../methods/getitem';
import { useEffect, useState } from 'react';
const Showbar=(username)=>{
    const [user,setuser]=useState(null);
    const [item,setitem]=useState(null);
useEffect(()=>{
  
    setitem(getitem(username));
   
})


    return(
        <div>

        </div>
    )
}