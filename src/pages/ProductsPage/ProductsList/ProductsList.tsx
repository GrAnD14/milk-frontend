import "./ProductsList.sass"
import ProductCard from "../../../components/ProductCard/ProductCard";
import {useProducts} from "../../../hooks/products/useProducts";
import {useQuery} from "react-query";
import ProductsFilters from "../ProductsFilters/ProductsFilters";

const ProductsList = () => {

    const {searchProducts} = useProducts()

    const { isLoading, data, refetch } = useQuery(
        ["products"],
        () => searchProducts(),
        {
            keepPreviousData: false,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    const cards = data.map(product  => (
        <ProductCard product={product} key={product.id} refetch={refetch}/>
    ))

    return (
        <div className="products-wrapper">
            <div className="products-list-wrapper">

                <ProductsFilters refetch={refetch}/>

                <div className="products-list">
                    { cards }
                </div>

            </div>
        </div>
    )
}

export default ProductsList;