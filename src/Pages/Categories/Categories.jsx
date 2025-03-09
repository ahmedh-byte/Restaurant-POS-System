import NavHeadr from "../../components/NavigationHeader/NavHeadr"
import styles from "./Categories.module.css"
import {useCategoriesData} from "../../Store/index.jsx"
import { useNavigate } from "react-router-dom";
 
export default function Categories() {
    const {data : appCategories,setActiveid,}=useCategoriesData();
    const navigate=useNavigate();
    const handelclick =(path)=>{
        navigate(path)
    }
    const  openCategory=(path,cat_id)=>{
        setActiveid(cat_id);
        navigate(path)

    }
   
  return (
  
    <div className={`categoriespage ${styles.categoriespage}`}>
         <NavHeadr tabName={"Categories"}/>
         <div className="d-flex flex-wrap col-12 container">
            {
                appCategories.map((el)=>(

                <div className="col-10 col-md-6 col-lg-4 p-3 " onClick={()=>openCategory(el.path,el.documentid)}>
                    <div className={` rounded shadow border col-12 p-3 ${styles.cards}`}>
                        <img src={el.imgUrl} alt="" />
                        <p key={el.documentid}>{el.name}</p>
                    </div>
                    
                </div>

                ))
            
            }
         </div>
        
        
        
    </div>
  )
}
