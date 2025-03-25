"use client";

import { createClient } from "@/utils/supabase/client"; // 클라이언트용 Supabase 초기화 파일
import { useRouter } from "next/navigation";

export default function GitHubLogin() {
    const supabase = createClient();
    const router = useRouter();

    const handleGitHubLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) {
            console.error("GitHub 로그인 에러:", error);
        }
    };
}

export function GitHubLoginButton() {
    return (
        <div>
            <button type="button" onClick={GitHubLogin} style={{ textDecoration: 'none' }}>
                GitHub로 로그인
            </button>
        </div>
    );

}