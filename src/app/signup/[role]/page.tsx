'use client';
import React, { useEffect, useRef, useState } from 'react';
import { UserPlus, Mail, Lock, User, Building } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';



interface SignupProps {
  params: {
    role: string;
  };
}

const Signup: React.FC<SignupProps> = ({ params }) => {
  //const { role } = params; // `params` is now synchronous and directly passed
  
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const [role, setRole] = useState('');

  useEffect(() => { params.then((resolvedParams) => { setRole(resolvedParams.role); }); }, [params]);

  const [userDetails, setUserDetails] = useState({
    firstName: { value: '', ref: firstNameRef },
    lastName: { value: '', ref: lastNameRef },
    email: { value: '', ref: emailRef },
    password: { value: '', ref: passwordRef },
    confirmPassword: { value: '', ref: confirmPasswordRef },
    company: { value: '', ref: companyRef },
  });

  const userFields = Object.keys(userDetails);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // const hasMissingFields = userFields.some(
    //   (key) => !userDetails[key as keyof typeof userDetails].value
    // );
    // setHasError(hasMissingFields);

    // if (hasMissingFields) {
    //   const invalidFields = userFields.filter(
    //     (key) => !userDetails[key as keyof typeof userDetails].value
    //   );
    //   invalidFields.forEach((key) => {
    //     const ref = userDetails[key as keyof typeof userDetails].ref;
    //     if (ref && ref.current) {
    //       ref.current.focus();
    //     }
    //   });
    //   return;
    // }

    const formData = {
      username: `${userDetails.firstName.value} ${userDetails.lastName.value}`,
      email: userDetails.email.value,
      password: userDetails.password.value,
    };
    
    try {
      const response = await axios.post('http://192.168.3.7:8080/auth/signup', JSON.stringify(formData), {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Form submitted successfully', response);
      
    } catch (error) {
      console.error('Form submission error', error);
    }
  };

  const handleInputChange = (key: keyof typeof userDetails, value: string) => {
    setUserDetails((prev) => ({
      ...prev,
      [key]: { ...prev[key], value },
    }));
  };

  return (
    <div className="min-h-screen from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account as an {role}
          </h2>
          <p className="mt-2 text-sm text-gray-600">Join us and start your journey</p>
        </div>
        {/* {hasError && (
          <MissingFields
            fields={userFields.filter((key) => !userDetails[key as keyof typeof userDetails].value)}
          />
        )} */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  id="firstName"
                  type="text"
                  ref={firstNameRef}
                  placeholder="First Name"
                  value={userDetails.firstName.value}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="input bg-[#d9e1ff]"
                  required
                />
              </div>
              <div>
                <input
                  id="lastName"
                  type="text"
                  ref={lastNameRef}
                  placeholder="Last Name"
                  value={userDetails.lastName.value}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="input bg-[#d9e1ff]"
                  required
                />
              </div>
            </div>
            <input
              id="email"
              type="email"
              ref={emailRef}
              placeholder="Email address"
              value={userDetails.email.value}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="input bg-[#d9e1ff]"
              required
            />
            {role !== 'fundraiser' && (
              <input
                id="company"
                type="text"
                ref={companyRef}
                placeholder="Company (Optional)"
                value={userDetails.company.value}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="input bg-[#d9e1ff]"
              />
            )}
            <input
              id="password"
              type="password"
              ref={passwordRef}
              placeholder="Password"
              value={userDetails.password.value}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="input bg-[#d9e1ff]"
              required
            />
            <input
              id="confirmPassword"
              type="password"
              ref={confirmPasswordRef}
              placeholder="Confirm Password"
              value={userDetails.confirmPassword.value}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="input bg-[#d9e1ff]"
              required
            />
            <button type="submit" className="btn">
              Sign up
            </button>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
