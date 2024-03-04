import "./ProductsList.sass"
import SearchBar from "../../components/SearchBar/SearchBar";
import React, {useEffect, useState} from "react";
import ProductCard from "./ProductCard/ProductCard";
import {iProductsMock, requestTime} from "../../utils/consts";
import {Product} from "../../utils/types";

const ProductsList = () => {

    const [Products, setProducts] = useState<Product[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);

    const searchProducts = async () => {

        try {

            const response = await fetch(`http://127.0.0.1:8000/api/products/search?&query=${query}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                createMock();
                return;
            }

            const raw = await response.json()
            const products: Product[] = raw["products"]

            setProducts(products)
            setIsMock(false)

        } catch (e) {

            createMock()

        }
    }

    const createMock = () => {

        setIsMock(true);
        setProducts(iProductsMock)

    }

    useEffect(() => {
        searchProducts()
    }, [])

    const cards = Products.map(product  => (
        <ProductCard product={product} key={product.id} isMock={isMock}/>
    ))

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        searchProducts()
    }

    return (
        <div className="cards-list-wrapper">

            <form className="top" onSubmit={(e) => handleSubmit(e)}>

                <h2>Поиск продуктов</h2>

                <SearchBar query={query} setQuery={setQuery} />

            </form>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default ProductsList;