import {useDispatch, useSelector} from 'react-redux';
import {
	updateProducts,
	updateQuery
} from "../../store/products/productsSlice";
import {api} from "../../utils/api";
import {useOrder} from "../orders/useOrder";
import {useToken} from "../users/useToken";

export function useProducts() {
	const products = useSelector(state => state.products.products);
	const query = useSelector(state => state.products.query);

	const {access_token} = useToken()

	const {setOrderId} = useOrder()

	const dispatch = useDispatch()

	const setProducts = (value) => {
		dispatch(updateProducts(value))
	}

	const setQuery = (value) => {
		dispatch(updateQuery(value))
	}

	const searchProducts = async () => {

		const {data} = await api.get(`products/search/`, {
			params: {
				query: query
			},
			headers: {
				'authorization': access_token
			}
		})

		const draft_order_id = data["draft_order_id"]
		setOrderId(draft_order_id)

		return data["products"]
	}

	const deleteProduct = async (product) => {
		await api.delete(`products/${product.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})
	}

	return {
		products,
		setProducts,
		query,
		setQuery,
		searchProducts,
		deleteProduct
	};
}