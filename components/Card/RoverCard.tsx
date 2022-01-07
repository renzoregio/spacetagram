import { useState } from "react"
import s from "./Card.module.css"
import icons from "../../icons"


interface RoverCardDetails {
    title: string,
    date: string,
    img: string,
}




const Card = ({ title, date, img } : RoverCardDetails ) => {
    const [likeCount, setLikeCount] = useState(0)

    const likePost = () : void => {
        setLikeCount(likeCount + 1)
    }

    return (
        <div className={s.card__container}>
            <span className={s.card__name}>Spacetagram</span>
            <span className={s.card__copyright}>Brought to you by NASA's Mars Rover Photos API</span>
            <img src={img} alt={title} className={s.card__img}/>
            <span className={s.card__title}>{title}</span>
            <span className={s.card__date}>{date}</span>
            <div className={s.card__reactions__container}>
                <div onClick={likePost} className={s.card__like__container}> {icons.like} </div>
                <span>{likeCount}</span>
            </div>
        </div>
    )
}

export default Card;