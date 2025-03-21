'use client';

import { createClient } from '@/utils/supabase/client';

const GoogleLogin = async () => {

    const supabase = createClient();

    const {} = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
        },
    })
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
