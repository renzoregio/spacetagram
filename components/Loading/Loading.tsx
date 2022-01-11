import s from "./Loading.module.css"

const Loading = () => {
    return(
        <div className={s.loading__dot__container}>
            <div className={s.loading__dot}></div>
            <div className={s.loading__dot}></div>
            <div className={s.loading__dot}></div>
        </div>
    )
}

export default Loading;