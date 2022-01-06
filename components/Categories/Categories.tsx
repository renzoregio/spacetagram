import s from "./Categories.module.css"
import { Cards } from "../Cards"
import { useState } from "react"


const Categories = () => {
    const [category, setCategory] = useState("apod")

    return (
        <>
            <div className={s.categories__container}>
                <button onClick={() => setCategory("mars-rover")} className={category == "apod" ? s.category__btn__unselected : s.category__btn__selected}>Mars Rover Photos</button>
                <button onClick={() => setCategory("apod")} className={category == "mars-rover" ? s.category__btn__unselected : s.category__btn__selected}>Astronomy Picture of the Day</button>
            </div>
            <Cards category={category} />
        </>
    )
}

export default Categories;