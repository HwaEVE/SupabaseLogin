'use server';

import {encodedRedirect} from "@/utils/utils";
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { headers } from "next/headers";

export const signUpAction = async (formData: FormData) => {
    // 폼 데이터에서 값 추출 (옵셔널 체이닝 사용)
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirmPassword")?.toString();
    const supabase = await createClient();
    const origin = (await headers()).get("origin");

    // 필수 입력값 검증
    if (!email || !password || !confirmPassword) {
        return encodedRedirect(
            "error",
            "/sign-up",
            "Email, password, and confirm password are required"
        );
    }

    // 비밀번호 일치 여부 확인
    if (password !== confirmPassword) {
        return encodedRedirect(
            "error",
            "/sign-up",
            "Passwords do not match"
        );
    }

    // 회원가입 시 Supabase를 통한 회원가입 호출
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
        console.error(error.code + " " + error.message);
        return encodedRedirect("error", "/sign-up", error.message);
    }

    // data.user에 사용자 정보가 포함되어 있다고 가정 (예: { id: "user-uuid", ... })
    const uid = data.user?.id;
    if (!uid) {
        return encodedRedirect("error", "/sign-up", "User ID not available");
    }

    // 회원가입 성공 후 분류 생성 (예시로 3개의 분류)
    const classifications = [
        { uuid: uid, name: "의류" },
        { uuid: uid, name: "식량" },
        { uuid: uid, name: "주거" },
    ];

    for (const classification of classifications) {
        const response = await fetch(`${origin}/classifications`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(classification),
        });

        if (!response.ok) {
            console.error("Failed to create classification:", classification);
            // 필요에 따라 에러 처리를 추가할 수 있습니다.
        }
    }

    return encodedRedirect(
        "success",
        "/sign-up",
        "Thanks for signing up! Please check your email for a verification link."
    );
};

export const signInAction = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return encodedRedirect("error", "/sign-in", error.message);
    }

    return redirect("/");
};

export const signOutAction = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/');
};
