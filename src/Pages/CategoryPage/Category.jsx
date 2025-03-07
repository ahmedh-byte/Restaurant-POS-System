import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import catimg from  "../../assets/imgs/Categories/pizza.jpeg"

export default function Category() {

    const params =useParams();
    const navigat=useNavigate();
    const [check,setCheck]=useState(false);
    const [categories,setCategories]=useState([
        {name:"Cold Drinks", path:"cold" ,image:{catimg}},
        {name:"Burgers", path:"burger" ,image:{catimg}},
        {name:"pizza", path:"pizza" ,image:{catimg}},
        {name:"Wok", path:"wok" ,image:{catimg}},
        {name:"pasta", path:"pasta" ,image:{catimg}},
])
    useEffect(()=>{

    let routes=["burger","pasta","pizza"];
    let myobj=categories.find((el)=>{return el.name=="pizza"})  
    console.log(myobj) ;
    let obj=categories.find((el)=>{return el.path==params.catname})
    if(obj)
    {
        setCheck(true);
       

    }
    else{
        navigat('/error')
    }

    },[])




   
  return (
   check&& <div>Products in {params.catname}</div>
  )
}
