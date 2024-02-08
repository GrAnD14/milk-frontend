import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	product: undefined,
};

const productSlice = createSlice({
	name: 'product',
	initialState: initialState,
	reducers: {
		updateProduct(state, action) {
			state.product = action.payload
		}
	}
})

export const {
	updateProduct
} = productSlice.actions;

export default productSlice.reducer;