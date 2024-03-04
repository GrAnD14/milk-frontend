import "./ProductCard.sass"
import {Product} from "../../../utils/types";
import {Link} from "react-router-dom";
import mockImage from "/src/assets/mock.png"

const ProductCard = ({ product, isMock }: {product:Product, isMock:boolean }) => {

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={isMock ? mockImage : product.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title">{product.name}</h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/products/${product.id}`}>
                        Подробнее
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default ProductCard;