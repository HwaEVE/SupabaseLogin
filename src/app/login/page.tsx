import { GoogleLoginButton } from "@/components/googleLogin";
import { KakaoLoginButton } from "@/components/kakaoLogin";
import { signInAction } from "@/actions";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="login-page">
            {/* 로그인 폼 */}
            <form className="login-form" action={signInAction}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input id="email" name="email" type="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input id="password" name="password" type="password" required />
                </div>
                <button type="submit">Log in</button>
            </form>

            {/* 소셜 로그인 버튼 */}
            <div className="social-login">
                <GoogleLoginButton />
                <KakaoLoginButton />
            </div>

            {/* 회원가입 페이지로 이동 */}
            <div className="signup-link">
                <Link href="/signup">회원가입</Link>
            </div>
        </div>
    );
}
