import "./ProductPage.sass"
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useProduct} from "../../hooks/products/useProduct";

const ProductPage = () => {

    const { id } = useParams<{id: string}>();
    
    const {product, fetchProduct} = useProduct()
    
    useEffect(() => {
        id && fetchProduct(id)
    }, [])

    if (product == undefined) {
        return (
            <div>

            </div>
        )
    }

    const img = `http://127.0.0.1:8000/api/products/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2>{product.name}</h2>

                    <br />

                    <span>Описание: {product.description}</span>

                    <br />

                    <span>Цена: {product.price} рублей</span>
                </div>

            </div>

        </div>
    )
}

export default ProductPage;