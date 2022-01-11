import s from "./Categories.module.css"
import { Cards } from "../Cards"
import { useState, useRef } from "react"


const Categories = () => {
    const categoryRef = useRef()
    const [positionY, setPositionY] = useState(0)
    const [clicked, setClicked] = useState(false)

    const clickCategory = () => {
        setClicked(true)
        setPositionY(categoryRef!.current!.offsetTop)
    }
    return (
        <>
            <div  className={s.categories__container}>
                <button  ref={categoryRef} onClick={clickCategory} className={ !clicked ? s.category__btn__unselected : s.category__btn__selected}>See Mars Rover Photos</button>
            </div>
            <Cards positionY={positionY} />
        </>
    )
}

export default Categories;