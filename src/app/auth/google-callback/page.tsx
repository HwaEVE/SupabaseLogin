import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import {createClassifications} from "@/components/createClassifications";

export default async function GoogleCallbackPage() {
    const supabase = await createClient();
    const origin = (await headers()).get("origin");

    // Supabase Auth에서 현재 로그인한 사용자의 정보를 가져옴
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
        // 사용자 정보가 없으면 에러 페이지로 리디렉션
        redirect('/error');
    }
    const uid = data.user.id;
    if (typeof origin === "string") {
        await createClassifications(uid, origin);
    }

    // 분류 생성 후 원하는 페이지로 리다이렉트 (예: 대시보드)
    redirect('/');
}
