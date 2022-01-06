import s from "./Card.module.css"


interface RoverCardDetails {
    title: string,
    date: string,
    img: string,
}

import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;


const Card = ({ title, date, img } : RoverCardDetails ) => {
  
    return (
        <div className={s.card__container}>
            <span className={s.card__name}>Spacetagram</span>
            <span className={s.card__copyright}>Brought to you by NASA's Mars Rover Photos API</span>
            <img src={img} alt={title} className={s.card__img}/>
            <span className={s.card__title}>{title}</span>
            <span className={s.card__date}>{date}</span>
            {/* <p className={s.card__description}>{explanation}</p> */}
            <div className={s.card__reactions__container}>
                <FontAwesomeIcon icon={faHeart} />
                <span>0</span>
            </div>
        </div>
    )
}

export default Card;