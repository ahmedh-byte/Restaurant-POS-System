import { useState } from "react";
import styles from "./SideMenu.module.css"
import { PiCashRegisterFill } from "react-icons/pi";
import { MdOutlineDashboard } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { TbReportMoney } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";


import { Link, useNavigate } from "react-router-dom";







export default function SideMenu() {
    const [activetab,setActivetab]=useState(0);
    const navigate=useNavigate();
    const [links]=useState([
        {
            id:1,
        icon:<MdOutlineDashboard />,
         Name:"Dashboard",
         path:"/"
        },
        {icon:<IoFastFoodOutline />,
            Name:"Food & Drinks",
            id:2,
              path:"/orders"
        },
        {icon:<TbReportMoney /> ,
            Name:"bills",
            id:3,
             path:"/bills"
        },
        {icon:<IoSettingsOutline />,
            Name:"Settings",
            id:4,
            path:"/settings"
        },
        
    ]);
    const handellogout=()=>{
        navigate('/login')
      
    }
  return (
    <div className="d-flex flex-column " id={styles.SideMenu}>



       <div className="logo d-flex  flex-row align-items-center justify-content-center gap-2" id={styles.logo}>
            <PiCashRegisterFill />
            <p className="m-0">Samrt <span>Pos</span></p>
        </div> 

      <div className="d-flex flex-column justify-content-between h-100 py-5">
            <div className="tabs d-flex flex-column gap-3">
            {
                    links.map((ele,index)=>{
                    return(
                                <Link onClick={()=>setActivetab(index)} to={ele.path}  key={ele.id} className={`col-12 d-flex gap-2 align-items-center nav-link  ${styles.link}  ${activetab==index && styles.activelinks}` }>
                            
                                    {ele.icon}
                                    <p className="m-0">{ele.Name}</p>
                        

                            </Link>
                    )

                    })
                }
            </div>
            <div className="col-12 d-flex flex-column justify-content-center align-items-center">
                 <FaUserCircle  className="fs-2" />
                <h3>name</h3>
                <span>role</span>
                <button className="btn btn-primary col-8" onClick={handellogout}>log out</button>



            </div>

     </div>

       

    </div>
  )
}
