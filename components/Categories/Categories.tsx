import s from "./Categories.module.css"
import { Cards } from "../Cards"
import { useState } from "react"


const Categories = () => {
    const [category, setCategory] = useState("")

    return (
        <>
            <div className={s.categories__container}>
                <button onClick={() => setCategory("mars-rover")} className={category == "apod" || category == "" ? s.category__btn__unselected : s.category__btn__selected}>See Mars Rover Photos</button>
            </div>
            <Cards category={category} />
        </>
    )
}

export default Categories;