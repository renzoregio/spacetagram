import s from "./Header.module.css"

const Header = () => {
    return (
        <div className={s.container}>
            <div className={s.header__container}>
                <h1 className={s.header__title}>#spacetagram</h1>
            </div>
            <div className={s.description__container}>
                <h2 className={s.header__description}>image-sharing from the final frontier</h2>
            </div>
        </div>
    )
}

export default Header;