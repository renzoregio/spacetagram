import s from "./Home.module.css";
import { Header } from "../Header"
import { ApodSection } from "../Apod"
import { Categories} from "../Categories"
import { Loading } from "../Loading"

const Home = () => {
    return (
        <div className={s.container}>
            <Header />
            <ApodSection />
            <Categories />
        </div>
    )
}

export default Home;