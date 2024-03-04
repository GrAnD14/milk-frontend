import "./Breadcrumbs.sass"
import {Dispatch} from "react";
import { Link, useLocation } from "react-router-dom";
import {FaChevronRight} from "react-icons/fa6";
import {FaHome} from "react-icons/fa";
import { Product } from "../../utils/types";
 

const Breadcrumbs = ({ selectedProduct, setSelectedProduct }: { selectedProduct:Product| undefined, setSelectedProduct:Dispatch<Product| undefined> }) => {

    const location = useLocation()

    let currentLink = ''

    const topics: Record<string, string> = {
        "home": "Главная",
        "products": "Продукты",
        "profile": "Личный кабинет"
    }

    const resetSelectedProduct = () => setSelectedProduct(undefined)

    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {

        currentLink += `/${crumb}`

        if (Object.keys(topics).find(x => x == crumb))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink} onClick={resetSelectedProduct}>
                        { (topics as never)[crumb] }
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        if (currentLink.match(new RegExp('products/(d*)')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        { selectedProduct?.name }
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }
    });

    return (
        <div className="breadcrumbs-wrapper">
            <div className="breadcrumbs">

                <div className="crumb">

                    <Link to={"/products"}>
                        <FaHome className="home-icon" />
                    </Link>

                    <FaChevronRight className="chevron-icon" />

                </div>

                {crumbs}

            </div>
        </div>
    )
}

export default Breadcrumbs;