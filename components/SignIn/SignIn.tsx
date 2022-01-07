import s from "./SignIn.module.css"
import icons  from "../../icons"
import { signIn } from "next-auth/react"


const SignIn = () => {
    return(
        <div className={s.signin__container}>
            <div className={s.signin__modal}>
                <h4>Please sign in start liking photos :)</h4>
                <button onClick={() => signIn()} className={s.signin__btn}>Click Here { icons.rocket }</button>
                <span className={s.signin__note}>Note: you will be redirected to a page with a button that says Auth0, click the button and you will have different log in options</span>
            </div>
        </div>
    )
}

export default SignIn;