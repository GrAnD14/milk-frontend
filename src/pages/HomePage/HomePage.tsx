import "./HomePage.sass"
import image from "/src/assets/home.png"

const HomePage = () => {
    return (
        <div className="home-page-wrapper">
            <h2>Добро пожаловать на сайт молочной кухни для детей!</h2>
            <p>Здесь вы можете заказать продукты для вашей молочной кухни</p>
            <img src={image} />
        </div>
    )
}

export default HomePage