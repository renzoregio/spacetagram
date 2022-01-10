import { useEffect, useState } from "react"
import s from "./Card.module.css"
import icons from "../../icons"
import { useSession} from "next-auth/react"
import { SignIn } from "../SignIn"
import { RoverCardDetails, LikedUsers } from "../../Interfaces"


const Card = ({ title, date, img, id } : RoverCardDetails ) => {
    const { data: session } = useSession();
    const [likeCount, setLikeCount] = useState(0)
    const [liked, setLiked] = useState(false)
    const [likedByUsers, setLikedByUsers] = useState<LikedUsers[]>([])
    const [displaySignInModal, setDisplaySignInModal] = useState(false)

    useEffect(() => {
        getRoverData()
    }, [])

    const getRoverData = async() : Promise<void> => {
        try {
            const res = await fetch(`http://localhost:3000/api/posts/${id}-${date}`)
            if(res.status === 400){
                const postId = `${id}-${date}`
                await fetch("http://localhost:3000/api/posts", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json", 
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: postId })
                })
            } else {
                const data = await res.json();
                const { likeCount, likedBy } = data.data;
                if(likeCount >= 1){
                    setLikeCount(likeCount)
                    setLikedByUsers(likedBy)
                    for(let i = 0; i < likedBy.length; i++){
                        if(likedBy[i].username === session!.user!.name){
                            setLiked(true)
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const likePost = async() : Promise<void> => {
        if(session){
            setLikeCount(likeCount + 1)
            setLiked(true)
            await fetch(`http://localhost:3000/api/posts/${id}-${date}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json", "Content-Type": "application/json",
                },
                body: JSON.stringify({ likeCount: likeCount + 1, likedBy: [...likedByUsers,{ username: session!.user!.name}]})
            })
        } else {
            setDisplaySignInModal(true)
        }
    }

    const unlikePost = async() : Promise<void> => {
        setLikeCount(likeCount - 1)
        setLiked(false)
        const users = likedByUsers.filter(arr => arr.username !== session!.user!.name);
        await fetch(`http://localhost:3000/api/posts/${id}-${date}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json", "Content-Type": "application/json",
            },
            body: JSON.stringify({ likeCount: likeCount - 1, likedBy: [...users] })
        })
    }

    return (
        <div className={s.card__container}>
            <span className={s.card__name}>Spacetagram</span>
            <span className={s.card__copyright}>Brought to you by NASA's Mars Rover Photos API</span>
            <img src={img} alt={title} className={s.card__img}/>
            <span className={s.card__title}>{title}</span>
            <span className={s.card__date}>{date}</span>
            <div className={s.card__reactions__container}>
                <div onClick={liked ? unlikePost : likePost} className={liked ? `${s.card__like__container} ${s.card__is__liked}` : s.card__like__container}> {icons.like} </div>
                <span>{likeCount}</span>
            </div>
            { displaySignInModal && <SignIn />}
        </div>
    )
}

export default Card;