import "./styles/Main.sass"
import "./styles/Reset.sass"
import Header from "./components/Header/Header";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate, useLocation} from 'react-router-dom';
import ProductPage from "./pages/ProductPage/ProductPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import {QueryClient, QueryClientProvider } from "react-query";
import {Provider} from "react-redux"
import store from "./store/store"
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import {useAuth} from "./hooks/users/useAuth";
import OrderConstructor from "./components/OrderConstructor/OrderConstructor";
import OrderPage from "./pages/OrderPage/OrderPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import ProductEditPage from "./pages/ProductEditPage/ProductEditPage";
import ProductAddPage from "./pages/ProductAddPage/ProductAddPage";
import ProductsList from "./pages/ProductsPage/ProductsList/ProductsList";
import ProductsTable from "./pages/ProductsPage/ProductsTableWrapper/ProductsTable/ProductsTable";
import ProductsTableWrapper from "./pages/ProductsPage/ProductsTableWrapper/ProductsTableWrapper";


const TopPanelWrapper = () => {

    const {is_authenticated, is_moderator} = useAuth()

    const location = useLocation()

    return (
        <div className="top-panel-wrapper">
            <Breadcrumbs />
            {is_authenticated && !is_moderator && location.pathname.endsWith("products-list") && <OrderConstructor /> }
        </div>
    )
}


function App() {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>

            <Provider store={store}>

                <BrowserRouter basename="/milk">

                    <div className="App">

                        <div className="wrapper">

                            <Header />

                            <div className={"content-wrapper"}>

                                <TopPanelWrapper />

                                <Routes>

                                    <Route path="/" element={<Navigate to="/products-list" replace />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/products-list" element={<ProductsList />} />

                                    <Route path="/products-table" element={<ProductsTableWrapper />} />

                                    <Route path="/products/add" element={<ProductAddPage />} />

                                    <Route path="/products/:id" element={<ProductPage />} />

                                    <Route path="/products/:id/edit" element={<ProductEditPage />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/orders/:id" element={<OrderPage />} />

                                    <Route path="/orders" element={<OrdersPage />} />

                                    <Route path="/login" element={<LoginPage />} />

                                    <Route path="/register" element={<RegisterPage />} />

                                </Routes>

                            </div>

                        </div>

                    </div>

                </BrowserRouter>

            </Provider>

        </QueryClientProvider>
    )
}

export default App
