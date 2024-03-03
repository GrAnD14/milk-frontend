import OrdersTable from "./OrdersTable/OrdersTable";
import {useAuth} from "../../hooks/users/useAuth";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom"

const OrdersPage = () => {    

    const {is_authenticated} = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/products")
        }
    }, [])

    return (
        <div>
            <OrdersTable />
        </div>
    )
}

export default OrdersPage;

