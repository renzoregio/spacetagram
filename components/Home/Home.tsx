import s from "./Home.module.css";
import { Header } from "../Header"
import { Categories} from "../Categories"
import { useEffect, useState } from "react"
import icons from "../../icons"
interface ApodCardDetails {
    title: string,
    date: string,
    img: string,
    explanation: string
}

const Home = () => {
    const [apodData, setApodData] = useState({
        date: "",
        explanation: "",
        hdurl: "",
        title: "",
        url: ""
    })

    useEffect(() => {
        getApod();
    }, [])

    const getApod = async() => {
        const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
        const data = await res.json();
        setApodData(data)
    }

    return (
        <div className={s.container}>
            <Header />
            
            <div className={s.apod__container}>
                <h1 className={s.apod__headline}>Astronomy Photo of the Day (APOD)</h1>
                <div className={s.apod__details__container}>
                    <div className={s.apod__img__container}>
                        <img src={apodData.hdurl} className={s.apod__img}/>
                        <div className={s.apod__like__container}>
                            <span className={s.apod__like__count}>0</span>
                            <span>{ icons.like }</span>
                        </div>
                    </div>
                    <div className={s.apod__text__container}>
                        <h2>{apodData.title}</h2>
                        <span>{apodData.date}</span>
                        <p>{apodData.explanation}</p>
                        <button className={s.apod__like__btn}>Like</button>
                    </div>
                </div>
            </div>
            <Categories />
        </div>
    )
}

export default Home;