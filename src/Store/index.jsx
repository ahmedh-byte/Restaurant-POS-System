//global state

import { create } from "zustand";
import cola from "../assets/imgs/Categories/cola.jpg"
import pasta from "../assets/imgs/Categories/pasta.jpg"
import desserts from "../assets/imgs/Categories/desserts.jpg"
import wok from "../assets/imgs/Categories/wok.jpg"
import pizza from "../assets/imgs/Categories/pizza.jpg"
import burger from "../assets/imgs/Categories/burger.jpg"
import { data } from "react-router-dom";


//initate state
 export const useCategoriesData=create((set)=>(
    //return state as object
{
    domain:"http://localhost:1337",
    //value
  data:[
       {documentid:1,name:"Cold Drinks", path:"cold" ,imgUrl:cola},
       {documentid:2,name:"Burgers", path:"burger" ,imgUrl:pasta},
       {documentid:3,name:"pizza", path:"pizza",imgUrl:desserts},
       {documentid:4,name:"Wok", path:"wok" ,imgUrl:wok},
       {documentid:5,name:"deserts", path:"dessert",imgUrl:pizza},
       {documentid:6,name:"pasta", path:"pasta" ,imgUrl:burger},
   ],
   setData:(categories)=>(set(()=>({
    data:categories,
   }))),
    //actions
    active_cat_id:0,
    setActiveid:(activeTab)=>(set(()=>({active_cat_id:activeTab}))),
    resetActiveId:()=>(set(()=>({active_cat_id:0})))


}

))
export const useCart=create((set)=>({

    cartIndex:false,
    productInCart:[],
    checkOutIndex:false,
    openCheckOut:()=>(set(()=>({checkOutIndex:true}))),
    closeCheckOut:()=>(set(()=>({checkOutIndex:false}))),



    openCart:()=>(set(()=>({cartIndex:true}))),
    closeCart:()=>(set(()=>({cartIndex:false}))),


    decrementQty:(documentId) =>(set((state)=>{
         let copyArray=[...state.productInCart];
         let index=copyArray.findIndex(el=> el.documentId==documentId);
         if( copyArray[index].qty>1){
            copyArray[index].qty--;
         }
         else{
            copyArray.splice(index,1)
         }
        
        //new object state value
        return{ productInCart:copyArray}
    
    })),
    incrementQty:(documentId) =>(set((state)=>{
        let copyArray=[...state.productInCart];
        let index=copyArray.findIndex(el=> el.documentId==documentId);
        copyArray[index].qty++;
       
       
       //new object state value
       return{ productInCart:copyArray}
   
   })),
   addToCart:(product)=>(set((state)=>{
    let copy=[...state.productInCart];
    let obj=copy.find(el=>el.documentId==product.documentId)
    if(obj){
        state.incrementQty(product.documentId);
    }
    else{
        copy.push(product)
       // let copy=[...state.productInCart,product];
    }
    

     return{ productInCart:copy}

   })),
   resetCart:()=>(set(()=>({productInCart:[]}))),
}));

