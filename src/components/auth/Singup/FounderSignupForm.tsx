import React, { useState } from 'react';
import useRegister from '@/hooks/useFounderRegister'; // Import the custom hook

interface IState {
    name: string;
    email: string;
    password: string;
    companyName: string;
    industry: string;
    errors: string[];
}

const SignUpForm: React.FC = () => {
    const { register, error, isLoading } = useRegister(); // Use the hook
    const [formData, setFormData] = useState<IState>({
        name: '',
        email: '',
        password: '',
        companyName: '',
        industry: '',
        errors: [],
    });

    const validateForm = (): boolean => {
        const { name, email, password, companyName, industry } = formData;
        const errors: string[] = [];

        // Perform validation
        if (!name) errors.push('Name is required.');
        if (!email || !/\S+@\S+\.\S+/.test(email)) errors.push('Valid email is required.');
        if (!password || password.length < 8) errors.push('Password must be at least 8 characters long.');
        if (!companyName) errors.push('Company Name is required.');
        if (!industry) errors.push('Industry is required.');

        setFormData({ ...formData, errors });
        return errors.length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        if (validateForm()) {
            const { name, email, password, companyName, industry } = formData;
            
            // Call the register function from the custom hook
            await register({
                fullName: name,
                email,
                password,
                companyName,
                industry,
                role: 'Founder', // Default role
            });

            if (error) {
                setFormData({ ...formData, errors: [error] }); // Display error message
            }
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center mb-6">Sign Up as a Startup Founder</h2>

            {/* Display errors */}
            {formData.errors.length > 0 && (
                <div className="bg-red-100 text-red-600 p-3 rounded-md mb-6">
                    <ul>
                        {formData.errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Display loading state */}
        
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="flex flex-col gap-2">
                    <label className="text-lg">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-[#d9e1ff] rounded-md h-12 text-black px-4 focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-lg">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-[#d9e1ff] rounded-md h-12 text-black px-4 focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-lg">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full bg-[#d9e1ff] rounded-md h-12 text-black px-4 focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Startup Info */}
                <div className="flex flex-col gap-2">
                    <label className="text-lg">Company Name</label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="w-full bg-[#d9e1ff] rounded-md h-12 text-black px-4 focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-lg">Industry</label>
                    <input
                        type="text"
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="w-full bg-[#d9e1ff] rounded-md h-12 text-black px-4 focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-md transition-all duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        disabled={isLoading} // Disable the button while loading
                    >
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
