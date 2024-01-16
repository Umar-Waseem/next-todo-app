"use client"
import Link from 'next/link';
import { useState } from 'react';
import Loader from '../components/Loader';

import { toast } from 'react-hot-toast';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleEmailChange = (e: any) => setEmail(e.target.value);
    const handlePasswordChange = (e: any) => setPassword(e.target.value);
    const handleUsernameChange = (e: any) => setUsername(e.target.value);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await fetch('https://todo-api-umar.vercel.app/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    username,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(`Signup Successful!`, {
                    duration: 4000,
                });
                const { access_token } = data;
                localStorage.setItem('token', access_token);
                window.location.href = '/home';
            } else {
                toast.error(`Signup Failed: ${data.detail}!`, {
                    duration: 4000,
                });
                console.error('Signup failed');

            }

        } catch (error) {
            console.error('Error during signup:', error);
        } finally {
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
                            Create your account
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
                                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">
                                    Your Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    className="border text-black border-gray-300 sm:text-sm rounded-lg focus:ring-yellow-600 focus:border-yellow-600 block w-full p-2.5"
                                    placeholder="username"
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
                            {loading && <Loader />}
                            {!loading && <button
                                type="submit"
                                className="w-full text-white font-bold bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Sign up
                            </button>}
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?
                                <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Log in
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signup;
