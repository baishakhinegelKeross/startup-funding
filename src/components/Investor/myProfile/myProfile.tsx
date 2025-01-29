'use client';

import React, { useState } from 'react';

const ProfileUpdate = () => {
    const initialProfileData = {
        fullName: 'John Smith',
        email: 'test@gmail.com',
        investmentFocus: 'Aspernatur minus rer',
        investmentBudget: '345',
        investmentSector: 'Garment',
        linkedInProfile: 'Et tempora vel sed v',
        investmentExperience: 'Voluptas sit ea magn Voluptas sit ea magnVoluptas',
    };

    const [profileData, setProfileData] = useState(initialProfileData);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleProfileUpdate = () => {
        setIsLoading(true);
        setTimeout(() => {
            alert('Profile updated successfully!');
            setIsEditing(false);
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center border border-white">
            <div className="p-8 max-w-4xl w-full rounded-xl shadow-lg ">
                <h2 className="text-2xl font-extrabold text-center text-indigo-600 mb-6">Update Your Profile</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div>
                        <h3 className="text-xl text-white font-semibold mb-4">Personal Information</h3>
                        <div>
                            <label htmlFor="fullName" className="block text-lg font-medium text-white mb-1">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={profileData.fullName}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-white rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                                disabled={!isEditing}
                                placeholder="John Smith"
                            />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="email" className="block text-lg font-medium text-white mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={profileData.email}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-white rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                                disabled={!isEditing}
                                placeholder="test@gmail.com"
                            />
                        </div>
                    </div>

                    {/* Investment Information */}
                    <div>
                        <h3 className="text-xl text-white font-semibold mb-4">Investment Information</h3>
                        <div>
                            <label htmlFor="investmentFocus" className="block text-lg font-medium text-white mb-1">Investment Focus</label>
                            <input
                                type="text"
                                id="investmentFocus"
                                name="investmentFocus"
                                value={profileData.investmentFocus}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-white rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                                disabled={!isEditing}
                                placeholder="Aspernatur minus rer"
                            />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="investmentBudget" className="block text-lg font-medium text-white mb-1">Investment Budget</label>
                            <input
                                type="text"
                                id="investmentBudget"
                                name="investmentBudget"
                                value={profileData.investmentBudget}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-white rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                                disabled={!isEditing}
                                placeholder="345"
                            />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="investmentSector" className="block text-lg font-medium text-white mb-1">Investment Sector</label>
                            <input
                                type="text"
                                id="investmentSector"
                                name="investmentSector"
                                value={profileData.investmentSector}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-white rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                                disabled={!isEditing}
                                placeholder="Garment"
                            />
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="mt-4">
                        <label htmlFor="linkedInProfile" className="block text-lg font-medium text-white mb-1">LinkedIn Profile</label>
                        <input
                            type="text"
                            id="linkedInProfile"
                            name="linkedInProfile"
                            value={profileData.linkedInProfile}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-white rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            disabled={!isEditing}
                            placeholder="Et tempora vel sed v"
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="investmentExperience" className="block text-lg font-medium text-white mb-1">Investment Experience</label>
                        <input
                            type="text"
                            id="investmentExperience"
                            name="investmentExperience"
                            value={profileData.investmentExperience}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-white rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            disabled={!isEditing}
                            placeholder="Voluptas sit ea magn"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-8">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleProfileUpdate}
                                disabled={isLoading}
                                className="px-6 py-2 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
                            >
                                {isLoading ? 'Updating...' : 'Update Profile'}
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-2 bg-white text-red-400 rounded-full shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-105"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-6 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileUpdate;
