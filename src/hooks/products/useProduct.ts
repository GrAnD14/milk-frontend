import {useDispatch, useSelector} from 'react-redux';
import {
	updateProduct
} from "../../store/products/productSlice";
import {api} from "../../utils/api";

export function useProduct() {
	const product = useSelector(state => state.product.product);

	const dispatch = useDispatch()

	const setProduct = (value) => {
		dispatch(updateProduct(value))
	}

	const fetchProduct = async (id) => {

		const {data} = await api.get(`products/${id}`);

		setProduct(data)

	};

	return {
		product,
		setProduct,
		fetchProduct
	};
}