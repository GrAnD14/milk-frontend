import "./OrderConstructor.sass"
import {useOrder} from "../../hooks/orders/useOrder";
import {Link} from "react-router-dom";

const OrderConstructor = () => {

    const {order_id} = useOrder()

    if (order_id == undefined) {
        return (
            <div className="constructor-container disabled">
                <span className="title">Новый заказ</span>
            </div>
        )
    }

    return (
        <Link to={`/orders/${order_id}`} className="constructor-container">
            <span className="title">Новый заказ</span>
        </Link>
    )
}

export default OrderConstructor