import {createSlice} from "@reduxjs/toolkit"
import {Product} from "../../utils/types";

interface IProductState {
	product: Product | undefined
}

const initialState: IProductState = {
	product: undefined,
};

const productSlice = createSlice({
	name: 'product',
	initialState: initialState,
	reducers: {
		updateProduct(state, action) {
			state.product = action.payload
		},
		updateName(state, action) {
			state.product.name = action.payload
		},
		updateDescription(state, action) {
			state.product.description = action.payload
		},
		updatePrice(state, action) {
			state.product.price = action.payload
		},
		updateImage(state, action) {
			state.product.image = action.payload
		}
	}
})

export const {
	updateProduct,
	updateName,
	updateDescription,
	updatePrice,
	updateImage
} = productSlice.actions;

export default productSlice.reducer;