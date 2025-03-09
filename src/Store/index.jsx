//global state

import { create } from "zustand";
import cola from "../assets/imgs/Categories/cola.jpg"
import pasta from "../assets/imgs/Categories/pasta.jpg"
import desserts from "../assets/imgs/Categories/desserts.jpg"
import wok from "../assets/imgs/Categories/wok.jpg"
import pizza from "../assets/imgs/Categories/pizza.jpg"
import burger from "../assets/imgs/Categories/burger.jpg"


//initate state
 export const useCategoriesData=create((set)=>(
    //return state as object
{
    //value
  data:[
       {documentid:1,name:"Cold Drinks", path:"cold" ,imgUrl:cola},
       {documentid:2,name:"Burgers", path:"burger" ,imgUrl:pasta},
       {documentid:3,name:"pizza", path:"pizza",imgUrl:desserts},
       {documentid:4,name:"Wok", path:"wok" ,imgUrl:wok},
       {documentid:5,name:"deserts", path:"dessert",imgUrl:pizza},
       {documentid:6,name:"pasta", path:"pasta" ,imgUrl:burger},
   ],
    //actions
    active_cat_id:0,
    setActiveid:(activeTab)=>(set(()=>({active_cat_id:activeTab}))),
    resetActiveId:()=>(set(()=>({active_cat_id:0})))


}

))

