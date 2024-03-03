import {useProducts} from "../../../hooks/products/useProducts";
import {useQuery} from "react-query";
import ProductsTable from "./ProductsTable/ProductsTable";

const ProductsTableWrapper = () => {

    const {searchProducts} = useProducts()

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["products"],
        () => searchProducts(),
        {
            keepPreviousData: true,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="products-wrapper">
            <ProductsTable isLoading={isLoading} data={data} isSuccess={isSuccess} refetch={refetch} />
        </div>
    )
}

export default ProductsTableWrapper