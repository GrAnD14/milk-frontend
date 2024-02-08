import "./ProductsFilters.sass"
import SearchBar from "../../../components/SearchBar/SearchBar";
import {useProducts} from "../../../hooks/products/useProducts";
import {useAuth} from "../../../hooks/users/useAuth";
import LinkButton from "../../../components/LinkButton/LinkButton";
import {variables} from "../../../utils/consts";
import CustomButton from "../../../components/CustomButton/CustomButton";

const ProductsFilters = ({refetch}) => {

    const {is_moderator} = useAuth()

    const {query, setQuery} = useProducts()

    const handleSubmit = (e) => {
        e.preventDefault()
        refetch()
    }

    return (
        <div className="products-filters">

            <h2>Поиск продуктов</h2>

            <div className="right-container" >

                {is_moderator &&
                    <LinkButton to="/products/add" bg={variables.primary}>
                        Добавить реактор
                    </LinkButton>
                }

                <form className="search-form" onSubmit={handleSubmit}>

                    <SearchBar query={query} setQuery={setQuery} placeholder={"Поиск..."} />

                    <CustomButton bg={variables.primary} >
                        Применить
                    </CustomButton>

                </form>

            </div>
        </div>
    )
}

export default ProductsFilters