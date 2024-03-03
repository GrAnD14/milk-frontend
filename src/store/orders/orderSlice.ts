import {createSlice} from "@reduxjs/toolkit"
import {Order} from "../../utils/types";

interface IOrderState {
	order: Order | undefined,
	order_id: number | undefined,
	name: string,
	description: string,
	date_perform: string
}

const initialState: IOrderState = {
	order: undefined,
	order_id: undefined,
	name: "",
	description: "",
	date_perform: ""
};

const orderSlice = createSlice({
	name: 'order',
	initialState: initialState,
	reducers: {
		updateOrder(state, action) {
			state.order = action.payload
		},
		updateProducts(state, action) {
			state.order.products = action.payload
		},
		updateOrderId(state, action) {
			state.order_id = action.payload
		},
		updateName(state, action) {
			state.name = action.payload
		},
		updateDescription(state, action) {
			state.description = action.payload
		},
		updateDatePerform(state, action) {
			state.date_perform = action.payload
		}
	}
})

export const {updateOrder, updateProducts, updateOrderId, updateName, updateDescription, updateDatePerform} = orderSlice.actions;

export default orderSlice.reducer;