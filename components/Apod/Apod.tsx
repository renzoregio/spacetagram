import s from "./Apod.module.css"
import { useEffect, useState } from "react"
import { useSession} from "next-auth/react"
import { SignIn } from "../SignIn"
import icons from "../../icons"

interface ApodCardDetails {
    id: string,
    title: string,
    date: string,
    hdurl: string,
    explanation: string
}

const Apod = () => {
    const { data: session } = useSession();
    const [likeCount, setLikeCount] = useState(0)
    const [displaySignInModal, setDisplaySignInModal] = useState(false)

    const [apodData, setApodData] = useState<ApodCardDetails>({
        id: "",
        date: "",
        explanation: "",
        hdurl: "",
        title: "",
    })

    const likeApod = () : void => {
        if(session){
            setLikeCount(likeCount + 1)
        } else {
            setDisplaySignInModal(true)
        }
    }

    useEffect(() => {
        getApod();
    }, [])
    
    const getApod = async() => {
        const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
        const data = await res.json();
        setApodData(data)
    }
    
    return (
        <div className={s.apod__container}>
            <h1 className={s.apod__headline}>Astronomy Photo of the Day (APOD)</h1>
            <div className={s.apod__details__container}>
                { displaySignInModal ? <SignIn /> 
                :
                <div className={s.apod__img__container}>
                    <img src={apodData.hdurl} className={s.apod__img}/>
                    <div className={s.apod__like__container}>
                        <span className={s.apod__like__count}>{likeCount}</span>
                        <span className={likeCount > 0 ? s.apod__img__heart : ""}>{ icons.like }</span>
                    </div>
                </div>
                }
                <div className={s.apod__text__container}>
                    <h2>{apodData.title}</h2>
                    <span>{apodData.date}</span>
                    <p>{apodData.explanation}</p>
                    <button onClick={likeApod} className={s.apod__like__btn}>Like</button>
                </div>
            </div>
        </div>
    )
}

export default Apod;