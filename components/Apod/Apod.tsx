import s from "./Apod.module.css"
import { useEffect, useState } from "react"
import { useSession} from "next-auth/react"
import { SignIn } from "../SignIn"
import icons from "../../icons"
import { LikedUsers, ApodCardDetails } from "../../Interfaces"

const Apod = () => {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(true)
    const [likeCount, setLikeCount] = useState(0)
    const [displaySignInModal, setDisplaySignInModal] = useState(false)
    const [likedByUsers, setLikedByUsers] = useState<LikedUsers[]>([])
    const [liked, setLiked] = useState(false)
    const [apodData, setApodData] = useState<ApodCardDetails>({
        date: "",
        explanation: "",
        hdurl: "",
        title: "",
    })

    const checkLikeStatus = async() : Promise<void> => {
        const res = await fetch(`http://localhost:3000/api/posts/${apodData.date}`);
        const {data} = await res.json();
        console.log(data)
        if(data && data.likedBy){
            const users = data.likedBy;
            for(let i = 0; i < users.length; i++){
                if(users[i].username === session!.user!.name){
                    setLiked(true)
                }
            }
        }
    }
    

    if(session && apodData){
        checkLikeStatus()
    }

    const unlikedApod = async () : Promise<void> => {
        setLikeCount(likeCount - 1)
        setLiked(false)
        const users = likedByUsers.filter(arr => arr.username !== session!.user!.name);
        await fetch(`http://localhost:3000/api/posts/${apodData.date}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json", "Content-Type": "application/json",
            },
            body: JSON.stringify({ likeCount: likeCount - 1, likedBy: [...users] })
        })
    }

    const likeApod = async () : Promise<void> => {
        if(session){
            setLikeCount(likeCount + 1)
            setLiked(true)
            await fetch(`http://localhost:3000/api/posts/${apodData.date}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json", "Content-Type": "application/json",
            },
            body: JSON.stringify({ likeCount: likeCount + 1, likedBy: [...likedByUsers, {username: session!.user!.name}] })
        })
        } else {
            setDisplaySignInModal(true)
        }
    }

    useEffect(() => {
        getApod() 
    }, [likeCount])


    
    const getApod = async() : Promise<void> => {
        const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
        const data = await res.json();
        setApodData(data)
        setIsLoading(false)
        const retrievedData = await fetch(`http://localhost:3000/api/posts/${data.date}`);
        console.log(retrievedData)
        if(retrievedData.status === 200){
            const foundPost = await retrievedData.json();
            console.log(foundPost)
            const users = foundPost.data.likedBy;
            setLikeCount(foundPost.data.likeCount);
            setLikedByUsers(users);
        } else {
            await fetch("http://localhost:3000/api/posts", {
                method: "POST",
                headers: {
                    "Accept": "application/json", 
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: data.date })
            })
        }
    }
    
    return (
        <div className={s.apod__container}>
            <h1 className={s.apod__headline}>Astronomy Photo of the Day (APOD)</h1>
           { isLoading ? 
            <h1>Loading...</h1>
            :

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
                { liked ? 
                <button onClick={unlikedApod} className={s.apod__like__btn}>Unlike</button>
                :
                <button onClick={likeApod} className={s.apod__like__btn}>Like</button>
                }
            </div>
        </div>
            }
        </div>
    )
}

export default Apod;