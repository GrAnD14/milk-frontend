import "./ProductPage.sass"
import {Dispatch, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {iProductsMock, requestTime} from "../../Consts";
import {Product} from "../../Types";
import mockImage from "/src/assets/mock.png"

const ProductPage = ({ selectedProduct, setSelectedProduct }: { selectedProduct:Product | undefined, setSelectedProduct: Dispatch<Product | undefined>}) => {

    const { id } = useParams<{id: string}>();

    const [isMock, setIsMock] = useState<boolean>(false);

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

            const product: Product = await response.json()

            setSelectedProduct(product)
            setIsMock(false)

        } catch {
            CreateMock()
        }

    };

    const CreateMock = () => {
        id && setSelectedProduct(iProductsMock.find((product:Product) => product?.id == parseInt(id)))
        setIsMock(true)
    }

    useEffect(() => {
        fetchData()

        return () => {
            setSelectedProduct(undefined)
        }
    }, [])

    if (selectedProduct == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={isMock ? mockImage : selectedProduct.image} />

            </div>

            <div className="right">

                <div className="info-container">

                    <h2>{selectedProduct.name}</h2>

                    <br />

                    <span>Описание: { selectedProduct.description }</span>

                    <br />

                    <span>Цена: { selectedProduct.price } рублей</span>

                </div>

            </div>

        </div>
    )
}

export default ProductPage;