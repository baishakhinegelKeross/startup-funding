"use client"

import React, { Component } from 'react';
import Link from 'next/link';

class Role extends Component {
    render() {
        return (
            <div className="h-screen flex flex-col justify-center items-center gap-5 md:gap-10">
                {/* Page Title */}
                <div>
                    <h1 className="text-white font-bold text-2xl md:text-5xl">Select Your Role</h1>
                </div>

                {/* Role Selection */}
                <div className="flex flex-col md:flex-row items-center gap-5">
                    {/* Investor Role */}
                    <div className="flex flex-col items-center gap-5 p-5 md:p-8 rounded-lg border border-white">
                        <h3 className="text-white text-xl md:text-3xl">Investor</h3>
                        <div>
                            <p className="text-center text-sm md:text-xl">
                                Join as an investor to discover
                            </p>
                            <p className="text-center text-sm md:text-xl">
                                and invest in promising projects
                            </p>
                            <p className="text-center text-sm md:text-xl">
                                and startups.
                            </p>
                        </div>
                        <Link href="/signup/investor">
                            <p className="bg-blue-600 text-white py-2 px-4 rounded-md text-sm md:text-xl">
                                Continue
                            </p>
                        </Link>
                    </div>

                    {/* Fund Raiser Role */}
                    <div className="flex flex-col items-center gap-5 p-5 md:p-8 rounded-lg border border-white">
                        <h3 className="text-white text-xl md:text-3xl">Fund Raiser</h3>
                        <div>
                            <p className="text-center text-sm md:text-xl">
                                Join as a fund raiser to present
                            </p>
                            <p className="text-center text-sm md:text-xl">
                                your project and raise funds from
                            </p>
                            <p className="text-center text-sm md:text-xl">
                                investors.
                            </p>
                        </div>
                        <Link href="/signup/founder">
                            <p className="bg-blue-600 text-white py-2 px-4 rounded-md text-sm md:text-xl">
                                Continue
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Role;
