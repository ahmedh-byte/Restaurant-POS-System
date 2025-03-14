import { useState } from "react";
import { useCart } from "../../Store";
import styles from "./CheckOut.module.css";
export default function CheckOut() {
    const{closeCheckOut,productInCart}=useCart();
    const getTotal=()=>{
        return productInCart.reduce((acc,el)=> acc+(el.qty * el.product_price) ,0);
       

    }
    const [customerAmount,setCustomerAmount]=useState();
    const [remain,setRemain]=useState();

    const handelChange=(e)=>{
    setCustomerAmount(e.target.value);
    setRemain( +e.target.value - getTotal() )
    }

    const handelClose=(e)=>{
     e.stopPropagation();
     closeCheckOut()

    }
  return (



    <div className={styles.overlay} onClick={handelClose}>
        <div onClick={e=>e.stopPropagation()} className =" bg-white col-10 col-md-6 col-lg-4 p-3 rounded mt-5 shadow animate__animated animate__fadeInDown" id={styles.content}>
            <p>Check Out</p>
            <h3>Total is : $ {getTotal()}</h3>
            <h4>customer amount : { <input value={customerAmount}  onChange= {handelChange} className="form-control" type="number" placeholder="Enter your number here" /> } </h4>
            <h4>Remain : {remain}</h4>
            <button className="btn btn-primary col-12" disabled={remain <0 ? true : false}>Save & Print </button>


        </div>
        
    </div>
  )
}

