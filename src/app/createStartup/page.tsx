"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useCreateStartup from '@/hooks/useCreateStartup';

// Define types for form data and errors
interface FormData {
    campaignTitle: string;
    campaignDescription: string;
    campaignCategory: string;
    campaignImage: string;
    proofOfEligibility: string;
    motivationLetter: string;
    personalizedMessage: string;
    name: string;
    phone: string;
    address: string;
    email: string;
    fundingType: string;
    targetAmount: string;
    deadline: string;
    minInvestment: string;
}

interface Errors {
    [key: string]: string;
}

// Define the form variants for animation
const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
};

// Get createStartup, isLoading, and error from the hook


// Main class component that holds form state and logic
const MultiStepForm: React.FC = () => {
    const { createStartup, isLoading, error } = useCreateStartup();
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [formData, setFormData] = useState<FormData>({
        campaignTitle: '',
        campaignDescription: '',
        campaignCategory: '',
        proofOfEligibility: '',
        campaignImage: '',
        motivationLetter: '',
        personalizedMessage: '',
        name: '',
        phone: '',
        address: '',
        email: '',
        fundingType: '',
        targetAmount: '',
        deadline: '',
        minInvestment: '',
    });
    const [errors, setErrors] = useState<Errors>({});

    // Load saved form data and step from localStorage on component mount
    useEffect(() => {
        const savedFormData = localStorage.getItem('multiStepFormData');
        if (savedFormData) {
            setFormData(JSON.parse(savedFormData));
        }
        const savedStep = localStorage.getItem('multiStepFormStep');
        if (savedStep) {
            setCurrentStep(parseInt(savedStep, 10));
        }
    }, []);

    // Save form data and current step to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('multiStepFormData', JSON.stringify(formData));
    }, [formData]);

    useEffect(() => {
        localStorage.setItem('multiStepFormStep', currentStep.toString());
    }, [currentStep]);

    // Handle input changes for form fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: '',
            }));
        }
    };

    // Validate the current step of the form
    const validateStep = (): boolean => {
        const newErrors: Errors = {};
        switch (currentStep) {
            case 1:
                if (!formData.campaignTitle.trim()) newErrors.campaignTitle = 'Campaign title is required';
                if (!formData.campaignDescription.trim()) newErrors.campaignDescription = 'Campaign description is required';
                if (!formData.campaignCategory) newErrors.campaignCategory = 'Campaign Category is required';
                if (!formData.campaignImage) newErrors.campaignImage = 'Campaign Image is required';
                break;
            case 2:
                if (!formData.proofOfEligibility) newErrors.proofOfEligibility = 'Proof Of Eligibility file is required';
                break;
            case 3:
                if (!formData.targetAmount) newErrors.targetAmount = 'Target Amount is required';
                if (!formData.fundingType) newErrors.fundingType = 'Funding Type is required';
                if (!formData.deadline) newErrors.deadline = 'Deadline is required';
                if (!formData.minInvestment) newErrors.minInvestment = 'Minimum Investment is required';
                break;
            case 4:
                if (!formData.name.trim()) newErrors.name = 'Name is required';
                if (!formData.email.trim()) newErrors.email = 'Email is required';
                if (!formData.email.includes('@')) newErrors.email = 'Invalid Email';
                if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
                if (!formData.address.trim()) newErrors.address = 'Address is required';
                break;
            default:
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Save the form data and continue to the next step or submit the form
    const saveAndContinue = () => {
        if (validateStep()) {
            if (currentStep < 5) {
                setCurrentStep((prevStep) => prevStep + 1);
            } else {
                // Handle form submission
                console.log('Form submitted:', formData);
                alert('Form submitted successfully!');
                // Clear localStorage after successful submission
                localStorage.removeItem('multiStepFormData');
                localStorage.removeItem('multiStepFormStep');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Optionally, add form validation logic here

        try {
            // Call the createStartup function with formData
            await createStartup(formData);
            // Optionally, reset the form after successful submission

        } catch (error) {
            console.error('Error creating startup:', error);
        }
    };


    // Navigate to the previous step
    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prevStep) => prevStep - 1);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <motion.div
                        key="step1"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <h2 className="text-2xl text-gray-800 font-bold mb-4">Campaign Information</h2>

                        <div className='py-2'>
                            <label htmlFor="campaignTitle" className="text-md text-gray-700 mb-1 block">
                                Campaign Title <span className="text-red-500">*</span>
                            </label>
                            <p className="text-xs text-gray-600 mb-2">Enter the Campaign Title of your campaign</p>
                            <input
                                type="text"
                                name="campaignTitle"
                                value={formData.campaignTitle}
                                onChange={handleInputChange}
                                className={`w-full md:w-1/2 p-2 mb-2 border ${errors.campaignTitle ? 'border-red-500' : 'border-gray-500'} rounded`}
                            />
                            {errors.campaignTitle && <p className="text-red-500 text-sm mb-2">{errors.campaignTitle}</p>}
                        </div>

                        <div className='py-4'>
                            <label htmlFor="campaignDescription" className="text-md text-gray-700 mb-1 block">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <p className="text-xs text-gray-600 mb-2">Provide a Description for your campaign</p>
                            <textarea
                                name="campaignDescription"
                                value={formData.campaignDescription}
                                onChange={handleInputChange}
                                className={`w-full text-gray-600 md:w-1/2 p-2 mb-2 border ${errors.campaignDescription ? 'border-red-500' : 'border-gray-500'} rounded`}
                            />
                            {errors.campaignDescription && <p className="text-red-500 text-sm mb-2">{errors.campaignDescription}</p>}
                        </div>

                        <div className='py-4'>
                            <label htmlFor="campaignCategory" className="text-md text-gray-700 mb-1 block">
                                Campaign Category <span className="text-red-500">*</span>
                            </label>
                            <p className="text-xs text-gray-600 mb-2">Select the Campaign Category</p>
                            <select
                                name="campaignCategory"
                                value={formData.campaignCategory}
                                onChange={handleInputChange}
                                className={`w-full md:w-1/2 p-2 mb-2 border ${errors.campaignCategory ? 'border-red-500' : 'border-gray-500'} rounded`}
                            >
                                <option value="">Select a campaign category</option>
                                <option value="education">Education & Learning</option>
                                <option value="environment">Environment & Sustainability</option>
                                <option value="technology">Technology & Innovation</option>
                                <option value="healthcare">Healthcare & Wellness</option>
                                <option value="socialImpact">Social Impact & Community Development</option>
                                <option value="artsCulture">Arts & Culture</option>
                                <option value="business">Business & Entrepreneurship</option>
                                <option value="nonprofit">Nonprofit & Charity</option>
                            </select>
                            {errors.campaignCategory && <p className="text-red-500 text-sm mb-2">{errors.campaignCategory}</p>}
                        </div>
                        <div className='py-4'>
                            <label htmlFor="campaignImage" className="text-md text-gray-700 mb-1 block">
                                Campaign Image <span className="text-red-500">*</span>
                            </label>
                            <p className="text-xs text-gray-600 mb-2">Upload an image for your campaign</p>
                            <input
                                type="file"
                                name="campaignImage"
                                onChange={handleInputChange}
                                className={`w-full md:w-1/2 p-2 mb-2 border ${errors.campaignImage ? 'border-red-500' : 'border-gray-500'} rounded`}
                            />
                            {errors.campaignImage && <p className="text-red-500 text-sm mb-2">{errors.campaignImage}</p>}
                        </div>
                    </motion.div>
                );

            case 2:
                return (
                    <motion.div
                        key="step2"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <h2 className="text-2xl text-gray-800 font-bold mb-4">Eligibility Documents and Approval</h2>
                        <div className="py-4">
                            <label htmlFor="proofOfEligibility" className="text-md text-gray-700 mb-1 block">
                                Proof of Eligibility <span className="text-red-500">*</span>
                            </label>
                            <p className="text-xs text-gray-600 mb-2">
                                Upload a document or evidence verifying your eligibility for the platform (e.g., company registration, legal compliance).
                            </p>
                            <input
                                type="file"
                                name="proofOfEligibility"
                                onChange={handleInputChange}
                                className={`w-full md:w-1/2 p-2 mb-2 border ${errors.proofOfEligibility ? 'border-red-500' : 'border-gray-500'} rounded`}
                            />
                            {errors.proofOfEligibility && <p className="text-red-500 text-sm mb-2">{errors.proofOfEligibility}</p>}
                        </div>
                        <div className="py-4">
                            <label htmlFor="motivationLetter" className="text-md text-gray-700 mb-1 block">
                                Motivation Letter <span className="text-gray-500">(optional)</span>
                            </label>
                            <p className="text-xs text-gray-600 mb-2">Explain why investors should fund this campaign and your passion for it</p>
                            <textarea
                                name="motivationLetter"
                                value={formData.motivationLetter}
                                onChange={handleInputChange}
                                rows={5}
                                className={`w-full md:w-1/2 p-2 mb-2 border text-gray-600 border-gray-500 rounded`}
                            ></textarea>
                        </div>

                        <div className="py-4">
                            <label htmlFor="personalizedMessage" className="text-md text-gray-700 mb-1 block">
                                Personalized Message <span className="text-gray-500">(optional)</span>
                            </label>
                            <p className="text-xs text-gray-600 mb-2">A personal message from the fundraiser to potential investors</p>
                            <textarea
                                name="personalizedMessage"
                                value={formData.personalizedMessage}
                                onChange={handleInputChange}
                                rows={5}
                                className={`w-full md:w-1/2 p-2 mb-2 border text-gray-600 border-gray-700 rounded`}
                            ></textarea>
                        </div>


                    </motion.div>
                );
            case 3:
                return (
                    <motion.div
                        key="step3"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >

                        <h2 className="text-2xl text-gray-800 font-bold mb-4">Funding Details</h2>
                        <div className="py-4">
                            <label htmlFor="targetAmount" className="text-md text-gray-700 mb-1 block">
                                Target Amount<span className="text-red-500 pl-1">*</span>
                            </label>
                            <p className="text-sm text-gray-600 mb-2">
                                The amount of funding the fundraiser aims to raise.
                            </p>
                            <input
                                type="number"
                                name="targetAmount"
                                value={formData.targetAmount}
                                onChange={handleInputChange}
                                className={`w-full md:w-1/2 p-2 mb-2 border ${errors.targetAmount ? 'border-red-500' : 'border-gray-500'
                                    } rounded`}
                            />
                            {errors.targetAmount && (
                                <p className="text-red-500 text-sm mb-2">{errors.targetAmount}</p>
                            )}
                        </div>

                        <div className="py-4">
                            <label htmlFor="fundingType" className="text-md text-gray-700 mb-1 block">
                                Funding Type<span className="text-red-500 pl-1">*</span>
                            </label>
                            <p className="text-sm text-gray-600 mb-2">
                                Equity, debt, grants, etc.
                            </p>
                            <input
                                type="text"
                                name="fundingType"
                                value={formData.fundingType}
                                onChange={handleInputChange}
                                className={`w-full md:w-1/2 p-2 mb-2 border ${errors.fundingType ? 'border-red-500' : 'border-gray-500'
                                    } rounded`}
                            />
                            {errors.fundingType && (
                                <p className="text-red-500 text-sm mb-2">{errors.fundingType}</p>
                            )}
                        </div>

                        <div className="py-4">
                            <label htmlFor="deadline" className="text-md text-gray-700 mb-1 block">
                                Deadline<span className="text-red-500 pl-1">*</span>
                            </label>
                            <p className="text-sm text-gray-600 mb-2">
                                End date for the fundraising campaign.
                            </p>
                            <input
                                type="date"
                                name="deadline"
                                value={formData.deadline}
                                onChange={handleInputChange}
                                className={`w-full md:w-1/2 p-2 mb-2 border ${errors.deadline ? 'border-red-500' : 'border-gray-500'
                                    } rounded`}
                            />
                            {errors.deadline && (
                                <p className="text-red-500 text-sm mb-2">{errors.deadline}</p>
                            )}
                        </div>

                        <div className="py-4">
                            <label htmlFor="minInvestment" className="text-md text-gray-700 mb-1 block">
                                Minimum Investment<span className="text-red-500 pl-1">*</span>
                            </label>
                            <p className="text-sm text-gray-600 mb-2">
                                The minimum amount an investor can contribute.
                            </p>
                            <input
                                type="number"
                                name="minInvestment"
                                value={formData.minInvestment}
                                onChange={handleInputChange}
                                className={`w-full md:w-1/2 p-2 mb-2 border ${errors.minInvestment ? 'border-red-500' : 'border-gray-500'
                                    } rounded`}
                            />
                            {errors.minInvestment && (
                                <p className="text-red-500 text-sm mb-2">{errors.minInvestment}</p>
                            )}
                        </div>
                    </motion.div>

                );
            case 4:
                return (
                    <motion.div
                        key="step3"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <h2 className="text-2xl text-gray-800 font-bold mb-4">Contact Information</h2>
                        <div className="py-4">
                            <label htmlFor="name" className="text-md text-gray-700 mb-1 block">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <p className="text-sm text-gray-600 mb-2">
                                Please enter your full legal name as it appears on your identification.
                            </p>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-full md:w-1/2 p-2 mb-2 border ${errors.name ? 'border-red-500' : 'border-gray-500'
                                    } rounded`}
                            />
                            {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}
                        </div>

                        <div className="py-4">
                            <label htmlFor="email" className="text-md text-gray-700 mb-1 block">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <p className="text-sm text-gray-600 mb-2">
                                Please enter a valid email address where we can contact you.
                            </p>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                required
                                onChange={handleInputChange}
                                className={`w-full md:w-1/2 p-2 mb-2 border ${errors.email ? 'border-red-500' : 'border-gray-500'
                                    } rounded`}
                            />
                            {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}
                        </div>

                        <div className="py-4">
                            <label htmlFor="phone" className="text-md text-gray-700 mb-1 block">
                                Phone <span className="text-red-500">*</span>
                            </label>
                            <p className="text-sm text-gray-600 mb-2">
                                Please enter a valid phone number where we can contact you.
                            </p>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={`w-full md:w-1/2 p-2 mb-2 border ${errors.phone ? 'border-red-500' : 'border-gray-500'
                                    } rounded`}
                            />
                            {errors.phone && <p className="text-red-500 text-sm mb-2">{errors.phone}</p>}
                        </div>

                        <div className="py-4">
                            <label htmlFor="address" className="text-md text-gray-700 mb-1 block">
                                Address <span className="text-red-500">*</span>
                            </label>
                            <p className="text-sm text-gray-600 mb-2">
                                Please enter your full physical address, including street, city, state, and zip code.
                            </p>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className={`w-full md:w-1/2 p-2 mb-2 border ${errors.address ? 'border-red-500' : 'border-gray-500'
                                    } rounded`}
                            />
                            {errors.address && <p className="text-red-500 text-sm mb-2">{errors.address}</p>}
                        </div>
                    </motion.div>
                );
            case 5:
                return (
                    <motion.div
                        key="step5"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <h2 className="text-4xl text-gray-900 font-bold mb-6 text-center">Review and Submit</h2>
                        <div className="campaign-preview max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
                            <h1 className="text-4xl text-cyan-800 font-extrabold mb-6">{formData.campaignTitle.toUpperCase()}</h1>

                            <div className="mb-6">
                                <h2 className="text-2xl text-gray-700 font-semibold mb-2">Campaign Description</h2>
                                <p className="text-gray-600 leading-relaxed">{formData.campaignDescription}</p>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-2xl text-gray-700 font-semibold mb-2">Campaign Category</h2>
                                <p className="text-gray-600">{formData.campaignCategory}</p>
                            </div>

                            {/* <div className="mb-6">
                                <h2 className="text-2xl text-gray-700 font-semibold mb-2">Proof of Eligibility</h2>
                                <a href={formData.proofOfEligibility} className="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                    View Document
                                </a>
                            </div> */}

                            {formData.motivationLetter && (
                                <div className="mb-6">
                                    <h2 className="text-2xl text-gray-700 font-semibold mb-2">Motivation Letter</h2>
                                    <p className="text-gray-600">{formData.motivationLetter}</p>
                                </div>
                            )}

                            {formData.personalizedMessage && (
                                <div className="mb-6">
                                    <h2 className="text-2xl text-gray-700 font-semibold mb-2">Personalized Message</h2>
                                    <p className="text-gray-600">{formData.personalizedMessage}</p>
                                </div>
                            )}

                            <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
                                <h2 className="text-2xl text-gray-700 font-semibold mb-2">Funding Details</h2>
                                <p className="text-gray-600">Funding Type: <span className="font-medium">{formData.fundingType}</span></p>
                                <p className="text-gray-600">Target Amount: <span className="font-medium">${formData.targetAmount.toLocaleString()}</span></p>
                                <p className="text-gray-600">Deadline: <span className="font-medium">{formData.deadline}</span></p>
                                <p className="text-gray-600">Minimum Investment: <span className="font-medium">${formData.minInvestment.toLocaleString()}</span></p>
                            </div>

                            <div className="mb-6 mt-4 bg-gray-50 p-4 rounded-lg shadow-sm">
                                <h2 className="text-2xl text-gray-700 font-semibold mb-2">Contact Information</h2>
                                <p className="text-gray-600">Name: <span className="font-medium">{formData.name}</span></p>
                                <p className="text-gray-600">Phone: <span className="font-medium">{formData.phone}</span></p>
                                <p className="text-gray-600">Address: <span className="font-medium">{formData.address}</span></p>
                                <p className="text-gray-600">Email: <span className="font-medium">{formData.email}</span></p>
                            </div>

                            <div className="mt-8 flex justify-center">
                                <button
                                    onClick={handleSubmit}
                                    className={`px-6 py-3 text-white font-semibold text-lg rounded-lg shadow-md transition-all ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-500'}`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Submitting...' : 'Submit Campaign'}
                                </button>
                            </div>
                            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
            <div className="pt-12 md:pt-16 lg:pt-20">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Create Your Campaign</h2>
                <p className="pt-2 text-base md:text-lg lg:text-xl">Fill in the details to start your fundraising journey.</p>
            </div>
            <div className='flex justify-center items-center'>
                <div className="w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
                    <div className="flex justify-between mb-8">
                        {[1, 2, 3, 4, 5].map(step => (
                            <div key={step} className="flex flex-col justify-center items-center"> {/* Move key here */}
                                <div
                                    key={step}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${currentStep >= step ? 'bg-green-500 scale-110' : 'bg-gray-300'} transition-all duration-300`}
                                >
                                    {step}
                                </div>
                                <div className="hidden md:block text-gray-600">
                                    {step === 1 ? 'Campaign Info' : step === 2 ? 'Eligibility Documents and Approval' : step === 3 ? ' Funding Details' : step === 4 ? 'Contact Info' : step === 5 ? 'Review and Submit' : null}
                                </div>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <AnimatePresence mode="wait">
                            {renderStep()}
                        </AnimatePresence>

                        <div className="flex flex-col md:flex-row justify-between mt-8">
                            <button
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className={`px-4 py-2 rounded ${currentStep === 1
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                                    } transition-colors duration-300`}
                            >
                                Previous
                            </button>
                            {currentStep < 5 && (
                                <button
                                    onClick={saveAndContinue}
                                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors duration-300"
                                >
                                    Save and Continue
                                </button>
                            )}
                        </div>

                    </form>
                </div>
            </div>

        </div>
    );
};

export default MultiStepForm;