import {useDispatch, useSelector} from 'react-redux';
import {
	updateOrder,
	updateOrderId,
	updateText,
} from "../../store/orders/orderSlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";
import {useNavigate} from "react-router-dom"

export function useOrder() {

	const {access_token} = useToken()

	const order = useSelector(state => state.order.order)
	const order_id = useSelector(state => state.order.order_id)
	const text = useSelector(state => state.order.text)

	const navigate = useNavigate()

	const is_draft = order?.status == 1

	const dispatch = useDispatch()

	const setOrder = (value) => {
		dispatch(updateOrder(value))
	}

	const setText = (value) => {
		dispatch(updateText(value))
	}

	const setOrderId = (value) => {
		dispatch(updateOrderId(value))
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
			setText(undefined)
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
			setText(undefined)
		}

	}

	const saveOrder = async () => {

		const form_data = new FormData()

		form_data.append('text', text)

		await api.put(`orders/${order.id}/update/`, form_data, {
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
		setText(data["text"])
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

		if (response.status == 200) {
			await fetchOrder(order_id)
		} else if (response.status == 201) {
			navigate("/")
		}
	}

	return {
		order,
		order_id,
		is_draft,
		text,
		setOrder,
		setText,
		saveOrder,
		sendOrder,
		deleteOrder,
		fetchOrder,
		addProductToOrder,
		deleteProductFromOrder,
		setOrderId
	};
}