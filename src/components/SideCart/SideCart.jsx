
import { useEffect, useState } from "react";
import { useCart } from "../../Store"
import styles from "./SideCart.module.css"
import Swal from "sweetalert2";
import CheckOut from "../CheckOut/CheckOut";
export default function SideCart() {
    const{closeCart,productInCart,decrementQty,incrementQty,resetCart,checkOutIndex,openCheckOut}=useCart();
    const [total,setTotal]=useState(0);
    const handelReset =()=>{
        Swal.fire({
            icon:"question",
            title:"are you sure you want to reset cart ?",
            text:"you are about to reset your cart",
            showCancelButton:true,
            cancelButtonText:"No",
            confirmButtonText:"yes",


        }).then((res)=>{
            if(res.isConfirmed)
            {
                resetCart();
            }

        })
    }

    useEffect((()=>{
        let newtotal=productInCart.reduce((acc,el)=> acc+(el.qty * el.product_price) ,0);
        setTotal(newtotal)

    }),[productInCart])
  return (
    <div className={styles.overlay} onClick={closeCart}>
       
        <div onClick={(event)=>event.stopPropagation()} id={styles.content} className="p-3 d-flex flex-column gap-3 animate__animated animate__fadeInRight">

            {
                productInCart.length>0 ?( 
                <div className="d-flex flex-column">
                    <p>Your Cart</p>
                    <table className="table table-dark table-bordered">
                        <thead>
                            <tr>
                                <th>-</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                            </tr>
    
                        </thead>
                        <tbody>
                            {
                                productInCart.map((el,index)=>{
                                    return(
                                        <tr key={el.documentId}>
                                        <td>{index+1}</td>
                                        <td>
                                            <div className="d-flex align-items-center gap-2">
                                                <img src={el.product_img} alt="image" />
                                                <p className="m-0">{el.product_name}</p>
    
                                            </div>
                                        </td>
                                        <td>${el.product_price}</td>
                                        <td>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <button className="btn btn-danger" onClick={()=>incrementQty(el.documentId)} >+</button>
                                                <p className="m-0">{el.qty}</p>
                                                <button className="btn btn-success" onClick={()=>decrementQty(el.documentId)}>-</button>
    
                                            </div>
                                        </td>
                                        <td>${el.qty * el.product_price}</td>
                                        </tr>
    
                                    )
    
    
                                })
                            }
                        
    
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={4}>total</td>
                                <td colSpan={1}>{total} </td>
                            </tr>
    
                        </tfoot>
    
                    </table>
                    <button  className="btn btn-danger" onClick={handelReset}>Reset</button>
                    <button  className="btn btn-primary" onClick={openCheckOut}>check out</button>
    
                </div>):<p>The Cart is Empty</p>
            }
           
          
           
        </div>
     {checkOutIndex &&  <CheckOut/>}  
    </div>
  )
}
