//roots
//main layout
//main component

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import SideMenu from "./components/SideMenu/SideMenu";
import { useEffect, useState } from "react";
import Category from "./Pages/CategoryPage/Category";
import Categories from "./Pages/Categories/Categories";
import { useCart, useCategoriesData } from "./Store";
import axios from "axios";
import Swal from "sweetalert2";
import SideCart from "./components/SideCart/SideCart";
import Invoices from "./Pages/Invoices/Invoices";


export default function App() {
 
 const {domain,data : categories,setData}=useCategoriesData();

let catsRoutes=categories.map((el)=>{return "/orders/"+el.path })
  // accptance routes to see side menu in it 
  const [acceptroutes,setacceptroutes]=useState(["/orders","/settings","/invoices","/"])
  const{cartIndex}=useCart();
  const location=useLocation();
  const[path,setpath]=useState();
  useEffect(()=>{
    setpath(location.pathname)
  },[location.pathname])
  useEffect(()=>{
    console.log('data fetched')
    let url=domain+"/api/categories"
    axios.get(url,{params:{populate:"*"}}).then((res)=>{
      let cats=res.data.data;
      
      let routes=cats.map(el=> '/orders/'+el.documentId);
      setacceptroutes([...acceptroutes,...routes]);
      setData(cats);

     }).catch((err)=>{
      if(err.code=="ERR_NETWORK"){
        Swal.fire({
          icon:"error",
          title:"NETWORK ERROR"
        })
        
      }
      console.log(err.code);
     })



  },[])
  

  return (
    <div className="App col-12 d-flex flex-row">

        {/* conditional renderiing */}
         {cartIndex&&  <SideCart/>}
       
        {(acceptroutes.includes(path) ) &&  <SideMenu/>}
        <Routes>
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="/orders" element={<Categories/>}></Route>
          <Route path="/orders/:id" element={<Category/>}></Route>
          <Route path="/settings" element={<h1> settings</h1>}></Route>
          <Route path="/invoices" element={<Invoices/>}></Route>
          <Route path="/login" element={<h1>login</h1>}></Route>
          <Route path="/register" element={<h1>register</h1>}></Route>
          <Route path="*" element={<h1>error404</h1>}></Route>

        </Routes>
 
     
    </div>
  )
}
//categories
//categories-products