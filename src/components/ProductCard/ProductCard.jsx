import styles from "./ProductCard.module.css"

export default function ProductCard() {
  return (
    <div className="col-12 col-md-6 col-lg-3 p-3">
       <div className={` shadow rounded p-3 col-12 d-flex flex-column ${styles.card}`}>
        <img src="gdg"  />
        <h2>product name</h2>
        <span>product weight</span>
        <p>$product price</p>
        <button className="btn btn-primary">Add To cart</button>


       </div>
    </div>
  )
}
