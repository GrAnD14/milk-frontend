import {configureStore} from "@reduxjs/toolkit";

import productReducer from "./products/productSlice"
import draftOrderReducer from "./orders/orderSlice"
import authReducer from "./users/authSlice"
import ordersReducer from "./orders/ordersSlice"
import productsReducer  from "./products/productsSlice"

export default configureStore({
	reducer: {
		product: productReducer,
		products: productsReducer,
		order: draftOrderReducer,
		orders: ordersReducer,
		user: authReducer
	}
});