import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import styles from './Category.module.css'
import NavHeadr from "../../components/NavigationHeader/NavHeadr";
import { useCategoriesData } from "../../Store";


export default function Category() {

 
    const navigat=useNavigate();
    const [check,setCheck]=useState(false);
    const [categoryinfo,setGategoryinfo]=useState({});
   
const {data:categories,resetActiveId,active_cat_id}=useCategoriesData();
    useEffect(()=>{

   
        
        let obj=categories.find((el)=>{return el.documentid==active_cat_id})
        if(obj)
        {
            setGategoryinfo(obj);
            setCheck(true);
           
    
        }
        else{
            navigat('/error')
        }

    
    
   return ()=>{
    //i will execute after component un mount
    resetActiveId();
   };

    },[])




   
  return (
   check&& <div>
              
              

                <NavHeadr tabName={categoryinfo.name}/>
                <h1>products in category{categoryinfo.name}</h1>
               
    
            </div>
  )
}
