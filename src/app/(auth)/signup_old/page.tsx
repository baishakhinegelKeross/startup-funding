"use client"

import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import signupImage from '@/assets/signup.png';
import StartupFounderSignUpForm from '@/components/auth/Singup/FounderSignupForm';
import InvestorSignUpForm from '@/components/auth/Singup/InvestorSignUpForm';

const RegisterPage: React.FC = () => {
  const pathname = usePathname(); // Get current pathname
  const searchParams = useSearchParams(); // Get URL search params (e.g., ?role=founder)
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  useEffect(() => {
    const roleParam = searchParams.get('role'); // Retrieve the 'role' query parameter
    if (roleParam) {
      setSelectedRole(roleParam); // Set the selected role from query param
    }
  }, [searchParams]); // Re-run effect when searchParams change

  const handleRoleChange = (newRole: string) => {
    setSelectedRole(newRole);
    // Navigate to the same page with the updated query parameter
    window.history.pushState({}, '', `${pathname}?role=${newRole}`);
  };

  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-5 flex pt-96 h-screen justify-center items-center md:pt-80 lg:pt-10">
      {/* Left Side: Image Section */}
      <div className="pr-10 hidden md:hidden lg:flex lg:justify-center lg:mt-10">
        <Image
          src={signupImage}
          alt="Sign Up Illustration"
          width={400}
          height={600}
          className="h-[600px] object-contain"
          priority
        />
      </div>

      {/* Right Side: Signup Form */}
      <div>
        <div className="flex flex-col md:mt-0 gap-5 md:gap-10 md:p-10 items-center mt-14">
          {/* Role Selection */}
          {!selectedRole && (
            <div className="mb-6">
              <p className="text-white text-lg mb-2">Select Your Role:</p>
              <div className="flex gap-4 justify-center">
                <button
                  className="text-white bg-blue-500 px-6 py-3 rounded-md text-lg"
                  onClick={() => handleRoleChange('founder')}
                >
                  Startup Founder
                </button>
                <button
                  className="text-white bg-blue-500 px-6 py-3 rounded-md text-lg"
                  onClick={() => handleRoleChange('investor')}
                >
                  Investor
                </button>
              </div>
            </div>
          )}

          {/* Render the appropriate form based on selected role */}
          {selectedRole === 'founder' && <StartupFounderSignUpForm />}
          {selectedRole === 'investor' && <InvestorSignUpForm />}

          {/* If no role is selected, show an error or fallback */}
          {!selectedRole && (
            <div className="text-center text-red-500">Please select a role to continue.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
