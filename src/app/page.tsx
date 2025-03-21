import { createClient } from '@/utils/supabase/server';
import {logout} from "@/app/actions";

export default async function Page() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // 로그인된 경우: 사용자 이메일을 보여주고 로그아웃 버튼을 표시
    if (user) {
        return (
            <>
                <h1>{user.email}님 환영합니다.</h1>
                <form action={logout}>
                    <button type="submit">로그아웃</button>
                </form>
            </>
        );
    }

    // 로그인되지 않은 경우: "OO님 환영합니다."와 로그인 버튼(클릭 시 /login으로 이동)
    return (
        <>
            <h1>OO님 환영합니다.</h1>
            <form action="/login">
                <button type="submit">로그인</button>
            </form>
        </>
    );
}
