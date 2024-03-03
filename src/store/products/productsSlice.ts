import {createSlice} from "@reduxjs/toolkit"
import {Product} from "../../utils/types";

interface IProductsState {
	products: Array<Product>
	query: string
}

const initialState: IProductsState = {
	products: [],
	query: ""
};

const productsSlice = createSlice({
	name: 'products',
	initialState: initialState,
	reducers: {
		updateProducts(state, action) {
			state.products = action.payload
		},
		updateQuery(state, action) {
			state.query = action.payload
		}
	}
})

export const {
	updateProducts,
	updateQuery
} = productsSlice.actions;

export default productsSlice.reducer;