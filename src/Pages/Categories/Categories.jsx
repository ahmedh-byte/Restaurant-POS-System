import NavHeadr from "../../components/NavigationHeader/NavHeadr"
import styles from "./Categories.module.css"
import {useCart, useCategoriesData} from "../../Store/index.jsx"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import SideCart from "../../components/SideCart/SideCart.jsx";
 
export default function Categories() {

   const{cartIndex}=useCart();
    const {data:appCategories ,setActiveid,domain}=useCategoriesData();
    //const[appCategories,setappCategories]=useState([]);
    const navigate=useNavigate();
    const handelclick =(path)=>{
        navigate(path)
    }
    const  openCategory=(documentId)=>{
        setActiveid(documentId);
        navigate(documentId)

    }
 
   
  return (
  
    <div className={`categoriespage ${styles.categoriespage}`}>
     
         <NavHeadr tabName={"Categories"}/>
         <div className="d-flex flex-wrap col-12 ">
            {
                appCategories.map((el)=>(

                <div key={el.documentId} className="col-10 col-md-6 col-lg-4 p-3 " onClick={()=>openCategory(el.documentId)}>
                    <div className={` rounded shadow border col-12 p-3 ${styles.cards}`}>
                        <img src={domain+el.category_img.url}  />
                        <p key={el.documentId}>{el.category_name}</p>
                    </div>
                    
                </div>

                ))
            
            }
         </div>
        
        
        
    </div>
  )
}
