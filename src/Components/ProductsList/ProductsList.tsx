import "./ProductsList.sass"
import SearchBar from "../SearchBar/SearchBar";
import React, {useEffect, useState} from "react";
import ProductCard from "./ProductCard/ProductCard";
import {iProductsMock, requestTime} from "../../Consts";
import {Product} from "../../Types";

const ProductsList = () => {

    const [products, setProducts] = useState<Product[]>([]);

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
            const products = raw["products"]

            setProducts(products)
            setIsMock(false)

        } catch (e) {

            createMock()

        }
    }

    const createMock = () => {

        setIsMock(true)
        setProducts(iProductsMock.filter(product => product.name.toLowerCase().includes(query.toLowerCase())))

    }

    useEffect(() => {
        searchProducts()
    }, [])

    const cards = products.map(product  => (
        <ProductCard product={product} key={product.id} isMock={isMock}/>
    ))

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await searchProducts()
    }

    return (
        <div className="cards-list-wrapper">

            <form className="top" onSubmit={handleSubmit}>

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