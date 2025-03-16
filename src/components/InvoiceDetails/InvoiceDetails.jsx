import { useEffect, useState } from "react";
import { useCategoriesData, useInvoiceDetails } from "../../Store"
import styles from "./InvoiceDetails.module.css"
import axios from "axios";
export default function InvoiceDetails() {
    const { domain } = useCategoriesData();
    const{index,closeDetails,activeInvoiceId}=useInvoiceDetails();
    const [detials, setDetials] = useState();
    useEffect(() => {
        if (activeInvoiceId) {
            let url = domain + `/api/invoices/${activeInvoiceId}`;
            axios.get(url, {
                params: {
                    populate: {
                        invoices_details: {
                            populate: {
                                product: {
                                    populate: "*"
                                }
                            }
                        }
                    }
                }
            }).then((res) => {
                setDetials(res.data.data);
                console.log(res.data.data);
            })
        }
    }, [])

       
  return (
    <div id=  {styles.overLay} className="overlay" onClick={closeDetails} >
         <div className="content animate__animated animate__fadeInRight p-3" onClick={e => e.stopPropagation()}>
         <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>-</th>
                            <th>Item Name</th>
                            <th>Item Price</th>
                            <th>Item Qty</th>
                            <th>total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            detials && detials.invoices_details.map((el, index) => {
                                return (
                                    <tr key={el.documentId}>
                                        <th>{index + 1}</th>
                                        <th><img height={30} src={domain + el.product.product_img.url} /> {el.product.product_name}</th>
                                        <th>{el.product.product_price}</th>
                                        <th>{el.product_qty}</th>
                                        <th>{el.product.product_price * el.product_qty}</th>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Total</td>
                            <td colSpan={4}>{detials && detials.invoice_total}</td>
                        </tr>
                    </tfoot>
                </table>

         </div>
    </div>
  )
}
