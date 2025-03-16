import { useState } from "react";
import { useCart, useCategoriesData } from "../../Store";
import styles from "./CheckOut.module.css";
import axios from "axios";
import Swal from "sweetalert2";
export default function CheckOut() {
    const{closeCheckOut,productInCart,resetCart,closeCart}=useCart();
    const getTotal=()=>{
        return productInCart.reduce((acc,el)=> acc+(el.qty * el.product_price) ,0);
       

    }
    const [customerAmount,setCustomerAmount]=useState();
    const [remain,setRemain]=useState();
    const {domain}=useCategoriesData();

    const handelChange=(e)=>{
    setCustomerAmount(e.target.value);
    setRemain( +e.target.value - getTotal() )
    }

    const handelClose=(e)=>{
     e.stopPropagation();
     closeCheckOut()

    }
    const createNewInvoice = (total)=>{
      let endpoint="/api/invoices";
      let data ={
        invoice_total:total,
        pos_user:{
          connect :["tscotlkga508iv2rnefoe86x"],
        //  doucmentId: "tscotlkga508iv2rnefoe86x",
        }
      }
      let url=domain+endpoint
      axios.post(url,{data : data}).then((res)=>{
        let newInvoiceId=res.data.data.documentId;
        createRecords(newInvoiceId);
        console.log('create new invoice id'+newInvoiceId);
      
      }).catch((err)=>{
        console.log(err);
      })
    }

    const createRecords=(invoiceId)=>{
      productInCart.forEach((el ,index)=> {
        let url=domain+'/api/invoices-details';
        let data={
          product_qty: el.qty,
          invoice: {
                    connect: [invoiceId]
                   },
          product: {
                   connect: [el.documentId]
                  }
        }
        axios.post(url,{data: data}).then((res)=>{
          console.log("record save")
        })
        
      });
      Swal.fire({
        icon:'success',
        title:"invoices successfully  saved",
        timer:1500
      }).then(()=>{
        resetCart();
        closeCart();
      })
    }


    const saveInvoice=()=>{
      //add fatora to system
      // i will use id \\\\\\
      let Total=getTotal();
      createNewInvoice(Total);
      console.log(Total);
    

    }
  return (



    <div className={styles.overlay} onClick={handelClose}>
        <div onClick={e=>e.stopPropagation()} className =" bg-white col-10 col-md-6 col-lg-4 p-3 rounded mt-5 shadow animate__animated animate__fadeInDown" id={styles.content}>
            <p>Check Out</p>
            <h3>Total is : $ {getTotal()}</h3>
            <h4>customer amount : { <input value={customerAmount}  onChange= {handelChange} className="form-control" type="number" placeholder="Enter your number here" /> } </h4>
            <h4>Remain : {remain}</h4>
            <button onClick={saveInvoice} className="btn btn-primary col-12" disabled={remain <0 ? true : false}>Save & Print </button>


        </div>
        
    </div>
  )
}

