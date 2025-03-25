'use client';

import { useState } from 'react';
import { signUpAction } from "@/actions";

export default function SignupPage() {
    const [error, setError] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        if (password !== confirmPassword) {
            event.preventDefault(); // 폼 제출 취소
            setError('비밀번호가 일치하지 않습니다.');
        } else {
            setError('');
            // 비밀번호가 일치하면 폼 제출이 진행되어 서버 액션이 호출됩니다.
        }
    };

    return (
        <form action={signUpAction} onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required />

            <label htmlFor="nickname">Nickname:</label>
            <input id="nickname" name="nickname" type="text" required />

            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required />

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input id="confirmPassword" name="confirmPassword" type="password" required />

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button type="submit">Sign up</button>
        </form>
    );
}
