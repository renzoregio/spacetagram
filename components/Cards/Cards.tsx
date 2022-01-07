import s from "./Cards.module.css"
import { RoverCard, ApodCard } from "../Card"
import { useEffect, useState } from "react"
import icons from "../../icons"
interface RoverApiResult {
    id: number,
    camera: RoverCamera,
    img_src: string,
    rover: RoverObj,
    earth_date: string,
}

interface RoverCamera {
    full_name: string
}

interface RoverObj {
    name: string
}

interface IApodData {
    date: string,
    explanation: string,
    hdurl: string,
    title: string,
    url: string
}
const Cards = ({ category } : any )  => {

    const [roverData, setRoverData] = useState([])
    const [currentRoverPage, setCurrentRoverPage] = useState(1)
    
    useEffect(() => {
        category && getRover();
    }, [category])

    
    const getRover = async(pageNum : number = 1) => {
        setTimeout(async () => {
            const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${pageNum}&api_key=${process.env.API_KEY}`)
            const data = await res.json()
            setRoverData(data.photos) 
            if(pageNum >= 1){
                setCurrentRoverPage(pageNum)
            }
        }, 100)
        setTimeout(() => window.scrollTo(1700, 1700), 1000)
    } 

    
    return(
        <div className={s.container}>
            
        <div className={s.cards__container}>

            {category === "mars-rover" &&
                roverData.map((data: RoverApiResult) => (
                    <RoverCard key={data.id} title={`${data.rover.name} Rover - ${data.camera.full_name}`} date={data.earth_date} img={data.img_src}/>
                ))
            }

        </div>

        { category === "mars-rover" && 
            currentRoverPage >= 1 &&
                <div className={s.pagination__container}>
                    { currentRoverPage > 1 && <div className={s.pagination__btn} onClick={() => getRover(currentRoverPage - 1)}> {icons.previous} </div>}
                    { currentRoverPage > 1 && roverData.length === 25 && <span className={s.pagination__count}>{currentRoverPage}</span>}
                    { roverData.length === 25 && <div className={s.pagination__btn} onClick={() => getRover(currentRoverPage + 1)}> {icons.next} </div> }
                </div>
        }

       
        </div>
    )
}

export default Cards;