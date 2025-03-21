'use client';

import { createClient } from '@/utils/supabase/client';

const Kakaologin = async () => {

    const supabase = createClient();

    const {} = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
    })
};

export function KakaoLoginButton() {
    return (
        <div>
            <button type="button" onClick={Kakaologin} style={{ textDecoration: 'none' }}>
                Kakao 로그인
            </button>
        </div>
    );
}
