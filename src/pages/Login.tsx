import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { post } from '../services/api';

interface LoginRequestBody {
    email: string,
    password: string
}
interface LoginResponse {
    sucess: Boolean,
    user: {
        id: number,
        username: string,
        email: string
    },
    accessToken: string
}

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let body: LoginRequestBody = {
            email: email,
            password: password
        }
        requestLogin(body)
    }

    const requestLogin = async (body: LoginRequestBody) => {

        const API = "http://localhost:8080/auth/login";
        const headers = { 'Content-Type': 'application/json' }
        let result: LoginResponse = await post(API, headers, body);
        localStorage.setItem("bng_user", JSON.stringify(result.user));
        localStorage.setItem("bng_token", result.accessToken);
        navigate('/chat')
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>

                <form className="space-y-5" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter your email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter your password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login