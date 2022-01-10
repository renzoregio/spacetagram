
export interface LikedUsers {
    username: string
}


export interface ApodCardDetails {
    title: string,
    date: string,
    hdurl: string,
    explanation: string
}


export interface RoverCardDetails {
    id: number,
    title: string,
    date: string,
    img: string,
}


export interface RoverApiResult {
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
