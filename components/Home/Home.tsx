import s from "./Home.module.css";
import { Header } from "../Header"
import { Categories} from "../Categories"



const Home = () => {
    
    return (
        <div className={s.container}>
            <Header />
            <Categories />
        </div>
    )
}

export default Home;