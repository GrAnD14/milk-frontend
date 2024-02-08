import {useDispatch, useSelector} from 'react-redux';
import {
	updateStatus,
	updateDateStart,
	updateDateEnd,
	updateUser
} from "../../store/orders/ordersSlice";
import {api} from "../../utils/api";
import {useToken} from "../users/useToken";

export function useOrders() {
	const status = useSelector(state => state.orders.status)
	const date_start = useSelector(state => state.orders.date_start)
	const date_end = useSelector(state => state.orders.date_end)
	const user = useSelector(state => state.orders.user)

	const dispatch = useDispatch()

	const {access_token} = useToken()

	const setStatus = (value) => {
		dispatch(updateStatus(value))
	}

	const setDateStart = (value) => {
		dispatch(updateDateStart(value))
	}

	const setDateEnd = (value) => {
		dispatch(updateDateEnd(value))
	}

	const setUser = (value) => {
		dispatch(updateUser(value))
	}

	const searchOrders = async () => {

		const {data} = await api.get(`orders/search/`, {
			params: {
				status: status,
				date_start: new Date(date_start),
				date_end: new Date(date_end)
			},
			headers: {
				'authorization': access_token
			}
		})

		return data.filter(order => order.owner.name.includes(user))

	}

	return {
		status,
		date_start,
		date_end,
		setStatus,
		searchOrders,
		setDateStart,
		setDateEnd,
		setUser
	};
}