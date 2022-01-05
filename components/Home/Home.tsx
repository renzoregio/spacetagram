import s from "./Home.module.css";
import { Header } from "../Header"
const Home = () => {
    return (
        <div className={s.container}>
            <Header />
            <div className={s.categories__container}>
                <h1>categories</h1>
            </div>
        </div>
    )
}

export default Home;