import { useEffect, useReducer, useState } from 'react';
import getuser from '../../methods/getuser'
import Search from '../../Search/Search'
const List=({list})=>{
    const [users,setusers]=useState([]);
    useEffect(()=>{
      
      list.map(ele=>{
          setusers(old=>[...old,ele]);
      })

    },[])

    if(users)
    {
       console.log(list,"list")
        return(
            <div>
                
              
              {users.map((ele,id)=><div  key={id}     >

                    <Search  fromshowbar={true} usernameformshowbar={ele.username}       />


              </div>)}

            </div>
        )
        
    }


    return(
        
<div>

       loading..
      
   
   

</div>
    )
}
export default List;