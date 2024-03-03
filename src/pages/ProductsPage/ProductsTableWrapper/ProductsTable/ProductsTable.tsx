import CustomTable from "../../../../components/CustomTable/CustomTable";
import {useCustomTable} from "../../../../hooks/other/useCustomTable";
import {Link, useNavigate} from "react-router-dom";
import ProductsFilters from "../../ProductsFilters/ProductsFilters";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import {variables} from "../../../../utils/consts";
import React from "react";
import {useProducts} from "../../../../hooks/products/useProducts";

const ProductsTable = ({isLoading, data, isSuccess, refetch}) => {

    const {deleteProduct} = useProducts()

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Название",
            accessor: "name",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Цена",
            accessor: "price",
            Cell: ({ value }) => { return value + " руб." }
        },
        {
            Header: "Действие",
            accessor: "edit_button",
            Cell: ({ cell }) => (
                <Link to={`/products/${cell.row.values.id}/edit`}>
                    <CustomButton bg={variables.primary}>Редактировать</CustomButton>
                </Link>
            )
        },
        {
            Header: "Действие",
            accessor: "delete_button",
            Cell: ({ cell }) => (
                <CustomButton onClick={() => handleDeleteProduct(cell.row.values.id)} bg={variables.red}>Удалить</CustomButton>
            )
        }
    ]

    const navigate = useNavigate()

    const {
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow
    } = useCustomTable(
        columns,
        isSuccess,
        data
    )

    const openCityPage = (product_id) => {
        navigate(`/products/${product_id}/`)
    }

    const handleDeleteProduct = async (product_id) => {
        await deleteProduct(product_id)
        refetch()
    }

    return (
        <div>

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={openCityPage}
            >
                <ProductsFilters refetch={refetch} />
            </CustomTable>

        </div>

    )
}

export default ProductsTable