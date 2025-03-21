'use client';

import { createClient } from '@/utils/supabase/client';

const GoogleLogin = async () => {

    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: 'http://localhost:3000/',
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
