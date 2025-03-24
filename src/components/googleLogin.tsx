'use client';

import { createClient } from '@/utils/supabase/client';

const GoogleLogin = async () => {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            // 구글 로그인 완료 후 이 URL로 리다이렉션 (실제 도메인에 맞게 수정)
            redirectTo: `${window.location.origin}/auth/google-callback`,
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
        },
    });
};

export function GoogleLoginButton() {
    return (
        <div>
            <button type="button" onClick={GoogleLogin} style={{ textDecoration: 'none' }}>
                Google 로그인
            </button>
        </div>
    );
}
