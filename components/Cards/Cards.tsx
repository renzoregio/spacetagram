import s from "./Cards.module.css"
import { RoverCard, ApodCard } from "../Card"
import { useEffect, useState } from "react"


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
    const [apodData, setApodData] = useState({
        date: "",
        explanation: "",
        hdurl: "",
        title: "",
        url: ""
    })

    useEffect(() => {
        category === "mars-rover" ? getRover() : getApod()
    }, [category])

    const getRover = async() => {
        const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=${process.env.API_KEY}`)
        const data = await res.json()
        setRoverData(data.photos)        
    } 

    const getApod = async() => {

        const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
        const data: IApodData = await res.json();
        setApodData(data)
    }

    return(
        <div className={s.cards__container}>

            {category === "mars-rover" ? 
                roverData.map((data: RoverApiResult) => (
                    <RoverCard key={data.id} title={`${data.rover.name} Rover - ${data.camera.full_name}`} date={data.earth_date} img={data.img_src}/>
                ))
                :
                <ApodCard title={apodData.title} date={apodData.date} explanation={apodData.explanation} img={apodData.hdurl}/>

        
            }
            
            
        </div>
    )
}

export default Cards;