import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import styles from './Category.module.css'
import NavHeadr from "../../components/NavigationHeader/NavHeadr";
import { useCategoriesData } from "../../Store";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios from "axios";


export default function Category() {

    const param=useParams();
    const navigat=useNavigate();
    const [check,setCheck]=useState(true);
    const [categoryinfo,setGategoryinfo]=useState({});
   
const {data:categories,resetActiveId,active_cat_id,domain}=useCategoriesData();
    useEffect(()=>{
        let documentId=param.id;

      
        let endPoint=`/api/categories/${documentId}`
        let Url=domain+endPoint;
      
        axios.get(Url,{params:
            {populate:{
               products:{
                 populate:"*"
               }
            }

            }}).then((res)=>{
            console.log(res.data.data)
            setGategoryinfo(res.data.data);
            setCheck(true);
        }).catch((recj)=>{
            navigat('/error')
        })
       

   
        


    
    
   return ()=>{
    //i will execute after component un mount
    resetActiveId();
   };

    },[])




   
  return (
   check&& <div className="flex-grow-1 ">
              
              

                <NavHeadr tabName={categoryinfo.category_name}/>
                <h1>products in category : {categoryinfo.category_name                }</h1>
                <div className="col-12 d-flex flex-wrap ">
                  {
                   categoryinfo.products&& categoryinfo.products.map((el,index)=>{
                        return(
                            <ProductCard
                             key={el.documentId}
                              name={el.product_name}
                               price={el.product_price} 
                               imgUrl={domain+el.product_img.url}
                               product={el}

                              />
                        )

                    })
                  }
                  {
                      categoryinfo.products&&categoryinfo.products.length==0 && <h1 className="text-danger">there is no products</h1>
                  }
                </div>
               
               
    
            </div>
  )
}
