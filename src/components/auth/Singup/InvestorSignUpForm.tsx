import React, { useState } from 'react';
import useInvestorRegister from '@/hooks/useInvestorRegister';

interface IProps {
  fields: {
    fullName: string;
    email: string;
    password: string;
    investmentFocus: string;
    investmentBudget: string;
    investmentSector: string;
    investmentExperience: string;
    linkedInProfile: string;
  };
}

const InvestorSignUpForm: React.FC<IProps> = ({ fields }) => {
  const { register, isLoading, error } = useInvestorRegister();
  const [formData, setFormData] = useState({
    ...fields,
    role: 'investor', // Adding the role field
    errors: [] as string[],
    currentStep: 1,
  });

  const validateForm = (): boolean => {
    const {
      fullName,
      email,
      password,
      investmentFocus,
      investmentBudget,
      investmentExperience,
      linkedInProfile,
      currentStep,
    } = formData;
    const errors: string[] = [];

    if (currentStep === 1) {
      if (!fullName) errors.push('Full Name is required.');
      if (!email || !/\S+@\S+\.\S+/.test(email)) errors.push('Valid email is required.');
      if (!password || password.length < 6) errors.push('Password must be at least 6 characters long.');
    } else if (currentStep === 2) {
      if (!investmentFocus) errors.push('Investment Focus is required.');
      if (!investmentBudget || isNaN(Number(investmentBudget))) errors.push('Investment Budget must be a valid number.');
    } else if (currentStep === 3) {
      if (!investmentExperience) errors.push('Investment Experience is required.');
      if (!linkedInProfile) errors.push('LinkedIn Profile is required.');
    }

    setFormData((prevData) => ({ ...prevData, errors }));
    return errors.length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNextStep = (): void => {
    if (validateForm()) {
      setFormData((prevData) => ({ ...prevData, currentStep: prevData.currentStep + 1 }));
    }
  };

  const handlePreviousStep = (): void => {
    setFormData((prevData) => ({ ...prevData, currentStep: prevData.currentStep - 1 }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (validateForm()) {
      const { currentStep, errors, ...payload } = formData;
      await register(payload);
    }
  };

  const { fullName, email, password, investmentFocus, investmentBudget, investmentSector, investmentExperience, linkedInProfile, errors, currentStep } = formData;

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Sign Up as an Investor</h2>

      {errors.length > 0 && (
        <div className="bg-red-100 text-red-600 p-3 rounded-md mb-6">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-md mb-6">
          <p className='text-red-700'>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === 1 && (
          <>
            <div className="flex flex-col gap-2">
              <label className="text-lg">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={fullName}
                onChange={handleInputChange}
                className="bg-[#d9e1ff] w-full rounded-md h-12 text-black px-4 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                className="bg-[#d9e1ff] w-full rounded-md h-12 text-black px-4 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                className="bg-[#d9e1ff] w-full rounded-md h-12 text-black px-4 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className="flex flex-col gap-2">
              <label className="text-lg">Investment Focus</label>
              <input
                type="text"
                name="investmentFocus"
                value={investmentFocus}
                onChange={handleInputChange}
                className="bg-[#d9e1ff] w-full rounded-md h-12 text-black px-4 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg">Investment Budget ($)</label>
              <input
                type="text"
                name="investmentBudget"
                value={investmentBudget}
                onChange={handleInputChange}
                className="bg-[#d9e1ff] w-full rounded-md h-12 text-black px-4 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg">Investment Sector</label>
              <select
                name="investmentSector"
                value={investmentSector}
                onChange={handleInputChange}
                className="bg-[#d9e1ff] w-full rounded-md h-12 text-black px-4 focus:ring-2 focus:ring-indigo-500"
              >
                <option>Tech</option>
                <option>Agriculture</option>
                <option>Garment</option>
              </select>
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <div className="flex flex-col gap-2">
              <label className="text-lg">Investment Experience</label>
              <textarea
                name="investmentExperience"
                value={investmentExperience}
                onChange={handleInputChange}
                rows={4}
                className="bg-[#d9e1ff] w-full rounded-md text-black px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg">LinkedIn Profile</label>
              <input
                type="text"
                name="linkedInProfile"
                value={linkedInProfile}
                onChange={handleInputChange}
                className="bg-[#d9e1ff] w-full rounded-md h-12 text-black px-4 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </>
        )}

        <div className="flex justify-between">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePreviousStep}
              className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Previous
            </button>
          )}
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className={`px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default InvestorSignUpForm;
