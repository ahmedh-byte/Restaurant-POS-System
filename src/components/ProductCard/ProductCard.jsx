import { useCart } from "../../Store";
import styles from "./ProductCard.module.css"

export default function ProductCard({name,price,imgUrl,product}) {
  const{addToCart}=useCart();
  const handelAdd=()=>{
    let obj = {
      documentId: product.documentId,
      product_name: product.product_name,
      product_price: product.product_price,
      qty: 1,
      product_img: imgUrl
  };
    addToCart(obj)
    //console.log(obj)
  }
    
  return (
    <div className="col-12 col-md-6 col-lg-3 p-3">
       <div className={` shadow rounded p-3 col-12 d-flex flex-column ${styles.card}`}>
        <img src={imgUrl}  />
        <h2> {name}</h2>
        <p>$ {price}</p>
        <button className="btn btn-primary" onClick={handelAdd}>Add To cart</button>


       </div>
    </div>
  )
}
