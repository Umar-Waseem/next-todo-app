"use client"
import Link from 'next/link';
import { useState } from 'react';

import Loader from '../components/Loader';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e: any) => setEmail(e.target.value);
    const handlePasswordChange = (e: any) => setPassword(e.target.value);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');

    const handleSubmit = async (e: any) => {
        setError('');

        e.preventDefault();

        try {
            setLoading(true);
            const response = await fetch('https://todo-api-umar.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {

                const { access_token } = data;
                localStorage.setItem('token', access_token);
                window.location.href = '/home';

            } else {

                setError(data.detail);
                console.error('Login failed');

            }
        } catch (error: any) {
            // alert(error.message);
            alert('Login failed.');
            console.error('Error during login:', error);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <nav className="bg-yellow-500 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/" className="text-white text-xl font-bold">Todo App</Link>
                    <div>
                        <Link href="/login" className="text-white mx-2">Login</Link>
                        <Link href="/register" className="text-white mx-2">Signup</Link>
                    </div>
                </div>
            </nav>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-black">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    className="border text-black border-gray-300 sm:text-sm rounded-lg focus:ring-yellow-600 focus:border-yellow-600 block w-full p-2.5"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="••••••••"
                                    className="border text-black border-gray-300 sm:text-sm rounded-lg focus:ring-yellow-600 focus:border-yellow-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                            {error && <div className='flex justify-center items-center'>
                                <p className='inline-block text-xs text-center bg-red-500 text-white p-2 rounded'>{error}</p>
                            </div>}

                            {loading && <Loader />}
                            {!loading && <>
                                <button
                                    type="submit"
                                    className="w-full text-white font-bold bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Sign in
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Dont have an account yet?
                                    <Link href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        Sign up
                                    </Link>
                                </p>
                            </>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
