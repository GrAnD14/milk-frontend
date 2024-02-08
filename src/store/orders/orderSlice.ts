import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	order: undefined,
	order_id: undefined,
	text: undefined
};

const orderSlice = createSlice({
	name: 'order',
	initialState: initialState,
	reducers: {
		updateOrder(state, action) {
			state.order = action.payload
		},
		updateText(state, action) {
			state.text = action.payload
		},
		updateOrderId(state, action) {
			state.order_id = action.payload
		}
	}
})

export const {
	updateOrder,
	updateText,
	updateOrderId
} = orderSlice.actions;

export default orderSlice.reducer;