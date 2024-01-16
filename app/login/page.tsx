"use client"
import Link from 'next/link';
import { useState } from 'react';

import Loader from '../components/Loader';

import { toast } from 'react-hot-toast';

import "../globals.css";
import Navbar from '../components/Navbar';

import { useRouter } from 'next/navigation';


const Login = () => {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e: any) => setEmail(e.target.value);
    const handlePasswordChange = (e: any) => setPassword(e.target.value);

    const [loading, setLoading] = useState(false);



    const handleSubmit = async (e: any) => {
        

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

                toast.success(`Login Successful!`, {
                    duration: 4000,
                });

                const { access_token } = data;
                localStorage.setItem('token', access_token);
                router.push('/home');

            } else {

                toast.error(`Login Failed: ${data.detail}!`, {
                    duration: 4000,
                });
                console.error('Login failed');

            }
        } catch (error: any) {
            toast.error(`Login Failed, please try again!`, {
                duration: 4000,
            });
            console.error('Error during login:', error);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <Navbar />
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
                                disabled={loading}
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
                                disabled={loading}
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
                            {!loading && <>
                                <button
                                    type="submit"
                                    className="w-full text-white font-bold bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Sign in
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Dont have an account yet?
                                    <Link href="/register" className="text-red-400 ml-2 font-medium text-primary-600 hover:underline dark:text-primary-500">
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
