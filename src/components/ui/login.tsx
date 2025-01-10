'use client'
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Lock, Mail, LogIn } from 'lucide-react';


const Login: React.FC = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [userDetails, setUserDetails] = useState({
        username: {
            value: null,
            ref: usernameRef,
        },
        password: {
            value: null,
            ref: passwordRef,
        },
    });

    const userFields = Object.keys(userDetails);
    const missingFields = userFields.filter(e => !userDetails[e].value);

    const [hasError, setHasError] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const hasMissingFields = userFields.some(key => !userDetails[key].value);
        setHasError(hasMissingFields);

        if (hasMissingFields) {
            const invalidFields = userFields.filter(key => !userDetails[key].value);
            invalidFields.forEach(key => {
                const ref = userDetails[key].ref;
                if (ref && ref.current) {
                    ref.current.focus();
                }
            });
            return;
        }

        const userDetails_ = new Object();
        userDetails_.username = userDetails.username.value
        userDetails_.password = userDetails.password.value

        const submittedData = JSON.stringify(userDetails_)

        // Submit the form or proceed with the login
        try {
            const response = await axios.post('http://192.168.3.7:8080/auth/login', submittedData, { headers: { 'Content-Type': 'application/json', }, });
            console.log('Form submitted successfully', response);
        }
        catch (error) {
            console.error('Form submission error', error);
        }
    };

    return (
        <div className="min-h-screen from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 border-e-slate-800 rounded-lg shadow-lg">
                <div className="text-center">
                    <LogIn className="mx-auto h-12 w-12 text-indigo-600" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome back</h2>
                    <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
                </div>
                {/* {hasError  && missingFields.length > 0 && <MissingFields fields={missingFields} />} */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="username"
                                    name="username"
                                    type="username"
                                    data-tip="hey"
                                    ref={usernameRef}
                                    onChange={(event) => {
                                        setUserDetails((prev) => {
                                            const newestUserDetails = { ...prev };
                                            newestUserDetails.username.value = event.target.value;
                                            return newestUserDetails;
                                        });
                                    }}
                                    className="bg-[#d9e1ff] appearance-none relative block w-full px-2 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Username"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    ref={passwordRef}
                                    onChange={(event) => {
                                        setUserDetails((prev) => {
                                            const newestUserDetails = { ...prev };
                                            newestUserDetails.password.value = event.target.value;
                                            return newestUserDetails;
                                        });
                                    }}
                                    className="bg-[#d9e1ff] appearance-none relative block w-full px-2 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="bg-[#d9e1ff] h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mb-1"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                    >
                        Sign in
                    </button>
                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/role" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</Link>
                    </p>

                </form>
            </div>
        </div>
    );
}

export default Login;
