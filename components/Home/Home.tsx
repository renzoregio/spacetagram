import s from "./Home.module.css";
import { Header } from "../Header"
import { Cards } from "../Cards"

const Home = () => {
    return (
        <div className={s.container}>
            <Header />
            <Cards />
        </div>
    )
}

export default Home;