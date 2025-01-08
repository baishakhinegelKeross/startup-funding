"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import useLogin from "@/hooks/useLogin";

const LoginForm = () => {
  const { login, isLoading, error } = useLogin(); // Destructure login, isLoading, and error from useLogin hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  // Handle email input change
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Handle password input change
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Call the login function from the custom hook
      await login({ email, password });
    } catch (err: any) {
      console.error("Login failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div className="flex flex-col gap-6">
        {/* Email input field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-lg md:text-xl font-bold">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="bg-[#d9e1ff] w-72 md:w-96 rounded-md text-black px-4 py-2"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        {/* Password input field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-lg md:text-xl font-bold">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            className="bg-[#d9e1ff] w-72 md:w-96 rounded-md text-black px-4 py-2"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        {/* Sign-in button */}
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-md w-72 md:w-96"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? 'Signing...' : 'Sign In'}
          </button>

          {/* Error display */}
          {error && <div className="text-red-500 mt-2">{error}</div>} {/* Show error if it exists */}

          {/* Additional links */}
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-3 mt-4">
            <Link href="/forgot">
              <p className="text-blue-600 font-bold text-sm">Forgot Password?</p>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium text-sm">
                Don't have an account?
              </span>
              <Link href="/role">
                <p className="text-blue-600 font-bold text-sm">Sign up</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
