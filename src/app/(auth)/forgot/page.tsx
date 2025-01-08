"use client";

import React, { Component } from 'react';
import Link from 'next/link';

interface ForgotPasswordState {
    email: string;
}

class ForgotPassword extends Component<{}, ForgotPasswordState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            email: ''
        };
    }

    handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ email: e.target.value });
    };

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle the password reset logic here
        const { email } = this.state;
        console.log('Email:', email);
        this.setState({ email: '' }); // Reset the email input field
    };

    render() {
        const { email } = this.state;

        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col md:items-start md:gap-7 gap-5 items-center">
                    <h2 className="text-white md:text-3xl text-xl font-bold">Forgot Password</h2>
                    <form className="flex flex-col gap-5 items-center" onSubmit={this.handleSubmit}>
                        <div className="flex flex-col gap-3 w-full md:w-[500px]">
                            <label className="text-white text-lg md:text-xl font-medium">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={this.handleEmailChange}
                                className="w-full  transition ease-in-out duration-300"
                            />
                        </div>
                        <div className="flex flex-col gap-3 w-full md:w-[500px]">
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#8061ff] to-[#987fff] text-white rounded-lg p-3 text-lg font-semibold md:h-[50px] hover:bg-gradient-to-r hover:from-[#987fff] hover:to-[#8061ff] focus:outline-none focus:ring-2 focus:ring-[#8061ff] transition duration-300"
                            >
                                Send Email
                            </button>
                            <div className="flex gap-2 justify-center">
                                <h6 className="text-white font-bold text-sm">Don't have an account?</h6>
                                <Link href="/role">
                                    <h6 className="text-[#8061ff] font-bold text-sm">Signup</h6>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ForgotPassword;
