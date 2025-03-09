import { IoIosArrowRoundBack } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa";

import styles from "./NavHeader.module.css"
import { useNavigate } from "react-router-dom";
import { useCategoriesData } from "../../Store";
import { MdOutlineShoppingCart } from "react-icons/md";


export default function NavHeadr({tabName}) {
  const navigate=useNavigate();
  const{active_cat_id}=useCategoriesData();

  return (
    <header className="col-12 d-flex p-3 align-items-center gap-4 align-items-center justify-content-between">
         <div className=" d-flex align-items-center gap-4 ">
            {active_cat_id!=0 &&   <IoIosArrowRoundBack className={styles.BackBtn}  onClick={()=> navigate('/orders')}/>}
            <div className="d-flex flex-row gap-2 align-items-center">
                <p className="m-0">Food & Drinks</p>
                <FaAngleRight />
                <p className="m-0">{tabName}</p>
            </div>
         </div>
         <MdOutlineShoppingCart className="fs-2" />






     </header> 
     
    )
}
