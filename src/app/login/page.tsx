
import {GoogleLoginButton} from "@/components/googleLogin";
import {KakaoLoginButton} from "@/components/kakaoLogin";
import {signInAction} from "@/actions";

export default function LoginPage() {
    return (
        <div>
        <form action={signInAction}>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required />
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required />
            <button> Log in </button>
        </form>
            <GoogleLoginButton />
            <KakaoLoginButton />
            <form action="/signup">
                <button type="submit">회원가입</button>
            </form>
        </div>
    )
}
