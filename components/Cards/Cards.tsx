import s from "./Cards.module.css"
import { Card } from "../Card"
import { useEffect, useState } from "react"

// interface ApiResult {
//     copyright: string,
//     date: string,
//     explanation: string
//     media_type: string,
//     service_version: string,
//     hdurl: string,
//     title: string,
//     url: string
// }


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

const Cards = () => {

    const [roverData, setRoverData] = useState([])

    useEffect(() => {
        getApod()
    }, [])

    const getApod = async() => {
        // const res = await fetch("https://api.nasa.gov/planetary/apod?api_key=sT0QN6LFXmwHVzFsj1ddeJlI9eyCswPGaz4WYcei")
        const res = await fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=sT0QN6LFXmwHVzFsj1ddeJlI9eyCswPGaz4WYcei")
        const data = await res.json()
        setRoverData(data.photos)
    
        
    } 


    return(
        <div className={s.cards__container}>
            { roverData.map((data: RoverApiResult) => (
                <Card key={data.id} title={`${data.rover.name} Rover - ${data.camera.full_name}`} date={data.earth_date} img={data.img_src} explanation=""/>
            ))}
        </div>
    )
}

export default Cards;