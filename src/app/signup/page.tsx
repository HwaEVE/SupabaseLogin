// page.tsx
import { signup } from "@/app/signup/actions";

export default function SignupPage() {
    return (
        <form action={signup}>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required />

            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required />

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input id="confirmPassword" name="confirmPassword" type="password" required />

            <button type="submit">Sign up</button>
        </form>
    );
}
