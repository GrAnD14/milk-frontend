import {useDispatch, useSelector} from 'react-redux';
import {
	updateProduct,
	updateName,
	updateDescription,
	updatePrice,
	updateImage
} from "../../store/products/productSlice";
import {api} from "../../utils/api";

export function useProduct() {
	const product = useSelector(state => state.product.product);

	const dispatch = useDispatch()

	const setProduct = (value) => {
		dispatch(updateProduct(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setDescription = (value) => {
		dispatch(updateDescription(value))
	}

	const setPrice = (value) => {
		dispatch(updatePrice(value))
	}

	const setImage = (value) => {
		dispatch(updateImage(value))
	}

	const fetchProduct = async (id) => {

		const {data} = await api.get(`products/${id}`);

		setProduct(data)

	};

	return {
		product,
		setProduct,
		fetchProduct,
		setName,
		setDescription,
		setPrice,
		setImage
	};
}