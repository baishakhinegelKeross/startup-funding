import React, { useState } from 'react';

const ProfileUpdate = () => {
    const initialProfileData = {
        fullName: 'Genevieve Benson',
        email: 'sezem@mailinator.com',
        companyName: 'Lindsay and Rogers Inc',
        industry: 'Quia dolore mollit e',
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
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-8 max-w-lg w-full rounded-xl  shadow-lg">
                <h2 className="text-3xl font-extrabold text-center text-indigo-600 mb-8">Update Your Profile</h2>

                <div className="space-y-6">
                    {/* Full Name Field */}
                    <div>
                        <label htmlFor="fullName" className="block text-lg font-medium text-white mb-2">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={profileData.fullName}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-white rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            disabled={!isEditing}
                            placeholder="Genevieve Benson"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-white mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-white rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            disabled={!isEditing}
                            placeholder="sezem@mailinator.com"
                        />
                    </div>

                    {/* Company Name Field */}
                    <div>
                        <label htmlFor="companyName" className="block text-lg font-medium text-white mb-2">Company Name</label>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={profileData.companyName}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-white rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            disabled={!isEditing}
                            placeholder="Lindsay and Rogers Inc"
                        />
                    </div>

                    {/* Industry Field */}
                    <div>
                        <label htmlFor="industry" className="block text-lg font-medium text-white mb-2">Industry</label>
                        <input
                            type="text"
                            id="industry"
                            name="industry"
                            value={profileData.industry}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-white rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            disabled={!isEditing}
                            placeholder="Quia dolore mollit e"
                        />
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
        </div>
    );
};

export default ProfileUpdate;
