import {useDispatch, useSelector} from 'react-redux';
import {
	updateOrder,
	updateOrderId,
	updateProducts,
	updateName,
	updateDescription,
	updateDatePerform
} from "../../store/orders/orderSlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";
import {useNavigate} from "react-router-dom"

export function useOrder() {

	const {access_token} = useToken()

	const order = useSelector(state => state.order.order)
	const order_id = useSelector(state => state.order.order_id)
	const name = useSelector(state => state.order.name)
	const description = useSelector(state => state.order.description)
	const date_perform = useSelector(state => state.order.date_perform)

	const is_draft = order?.status == 1

	const navigate = useNavigate()

	const dispatch = useDispatch()

	const setOrder = (value) => {
		dispatch(updateOrder(value))
	}

	const setProducts = (value) => {
		dispatch(updateProducts(value))
	}

	const setOrderId = (value) => {
		dispatch(updateOrderId(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setDescription = (value) => {
		dispatch(updateDescription(value))
	}

	const setDatePerform = (value) => {
		dispatch(updateDatePerform(value))
	}

	const sendOrder = async () => {

		const response = await api.put(`orders/${order.id}/update_status_user/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setOrder(undefined)
			setOrderId(undefined)
			navigate("/orders")
		}
	}

	const deleteOrder = async () => {

		const response = await api.delete(`orders/${order.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setOrder(undefined)
			setOrderId(undefined)
			navigate("/")
		}

	}

	const saveOrder = async () => {

		const formData = new FormData()
		formData.append("name", name)
		formData.append("description", description)
		formData.append("date_perform", date_perform)

		await api.put(`orders/${order.id}/update/`, formData, {
			headers: {
				'authorization': access_token
			}
		})

	}

	const fetchOrder = async (order_id) => {

		const {data} = await api.get(`orders/${order_id}/`, {
			headers: {
				'authorization': access_token
			},
		})

		setOrder(data)
		setName(data["name"])
		setDescription(data["description"])
		setDatePerform(data["date_perform"].split('T')[0])
	}

	const addProductToOrder = async (product) => {
		await api.post(`products/${product.id}/add_to_order/`, {}, {
			headers: {
				'authorization': access_token
			}
		})
	}

	const deleteProductFromOrder = async (product) => {
		const response = await api.delete(`orders/${order.id}/delete_product/${product.id}/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200){
			await fetchOrder(order_id)
		} else if (response.status == 201) {
			navigate("/")
		}
	}

	return {
		order,
		order_id,
		is_draft,
		name,
		description,
		date_perform,
		setOrder,
		saveOrder,
		sendOrder,
		deleteOrder,
		fetchOrder,
		addProductToOrder,
		deleteProductFromOrder,
		setOrderId,
		setProducts,
		setName,
		setDescription,
		setDatePerform
	};
}