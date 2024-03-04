import "./NavMenu.sass"
import {Link} from "react-router-dom";

const NavMenu = () => {
    return (
        <div className="menu-wrapper">

            <Link to="/home" className="menu-item">
                <span>Главная</span>
            </Link>

            <Link to="/products" className="menu-item">
                <span>Продукты</span>
            </Link>

            <Link to="/profile" className="menu-item">
                <span>Личный кабинет</span>
            </Link>

        </div>
    )
}

export default NavMenu;