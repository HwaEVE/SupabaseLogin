import { createClient } from '@/utils/supabase/server';
import { signOutAction } from "@/actions";

export default async function Page() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        // user_metadata에서 display name을 가져옴
        const displayName = user.user_metadata?.full_name ?? user.email;
        return (
            <>
                <h1>{displayName}님 환영합니다.</h1>
                <form action={signOutAction}>
                    <button type="submit">로그아웃</button>
                </form>
            </>
        );
    }

    return (
        <>
            <h1>OO님 환영합니다.</h1>
            <form action="/login">
                <button type="submit">로그인</button>
            </form>
        </>
    );
}
