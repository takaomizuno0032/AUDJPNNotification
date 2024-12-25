"use client";

import {useRouter} from "next/navigation";

export default function Login() {
    const router = useRouter();
    const handleLogin = () => {
        router.push("home");
    }

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleLogin}
                className="px-6 py-2 text-white bg-blue-500 rounded hover: bg-blue-700"
            >
                Login
            </button>
        </div>
    );
}