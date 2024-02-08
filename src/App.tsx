import "./Styles/Main.sass"
import "./Styles/Reset.sass"
import {useState} from "react";
import Header from "./Components/Header/Header";
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import ProductsList from "./Components/ProductsList/ProductsList";
import ProductPage from "./Components/ProductPage/ProductPage";
import {Product} from "./Types";

function App() {

    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined)

    return (
        <div className="App">

            <div className="wrapper">

                <Header />

                <div className={"content-wrapper"}>

                    <BrowserRouter basename="/milk-frontend">

                        <Breadcrumbs selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct}/>

                        <Routes>

                            <Route path="/" element={<Navigate to="/products" replace />} />

                            <Route path="/products" element={<ProductsList />} />

                            <Route path="/products/:id" element={<ProductPage selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />} />

                        </Routes>

                    </BrowserRouter>

                </div>

            </div>

        </div>
    )
}

export default App
