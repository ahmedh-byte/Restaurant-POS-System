import NavHeadr from "../../components/NavigationHeader/NavHeadr"
import styles from "./Categories.module.css"
import {useCategoriesData} from "../../Store/index.jsx"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
 
export default function Categories() {
    const domain="http://localhost:1337"
    const {data:appCategories ,setActiveid,}=useCategoriesData();
    //const[appCategories,setappCategories]=useState([]);
    const navigate=useNavigate();
    const handelclick =(path)=>{
        navigate(path)
    }
    const  openCategory=(documentId)=>{
        setActiveid(documentId);
        navigate(documentId)

    }
    // const getData=()=>{
       
       
    //     let endPoint="/api/categories"
    //     let Url=domain+endPoint;
    //     axios.get(Url,{
    //          // query parameter to get image
    //       params:{
    //         populate:"*",
    //       }

    //     }).then((res)=>{
    //         setappCategories(res.data.data);
    //     })
        

    // }
    useEffect(()=>{
        // getData();

    } ,[])
   
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
