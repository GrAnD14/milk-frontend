import "./ProductPage.sass"
import {Dispatch, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {iProductsMock, requestTime} from "../../utils/consts";
import {Product} from "../../utils/types";
import mockImage from "/src/assets/mock.png"

const ProductPage = ({ selectedProduct, setSelectedProduct }: { selectedProduct:Product | undefined, setSelectedProduct: Dispatch<Product| undefined>}) => {

    const { id } = useParams<{id: string}>();

    const [isMock, setIsMock] = useState<boolean>(false);

    useEffect(() => {
        fetchData()
    }, [])

    if (id == undefined){
        return;
    }

    const fetchData = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok)
            {
                CreateMock()
                return;
            }

            const service: Product = await response.json()

            setSelectedProduct(service)

            setIsMock(false)

        } catch
        {
            CreateMock()
        }

    };

    const CreateMock = () => {
        setSelectedProduct(iProductsMock.find((service:Product) => service?.id == parseInt(id)))
        setIsMock(true)
    }

    const img = `http://127.0.0.1:8000/api/products/${id}/image/`

    if (selectedProduct == undefined) {
        return (
            <div className="page-details-wrapper">

                <Link className="return-link" to="/">
                    Назад
                </Link>

            </div>
        )
    }

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={isMock ? mockImage : img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2>{selectedProduct?.name}</h2>

                    <br/>

                    <span>Описание: {selectedProduct?.description}</span>

                    <br/>

                    <span>Цена: {selectedProduct?.price} рублей</span>

                </div>

            </div>

        </div>
    )
}

export default ProductPage;