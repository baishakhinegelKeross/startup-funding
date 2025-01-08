import React, { useState } from 'react';

const ProfileUpdate = () => {
    // Sample initial data
    const initialProfileData = {
        fullName: 'John Doe',
        email: 'john.doe@mail.com',
    };

    const [profileData, setProfileData] = useState(initialProfileData);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle profile update
    const handleProfileUpdate = () => {
        setIsLoading(true);
        // Simulating a mock API call
        setTimeout(() => {
            alert('Profile updated successfully!');
            setIsEditing(false); // Stop editing after successful update
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div className="p-8 max-w-xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100">
            <h2 className="text-4xl font-bold text-center text-indigo-600 mb-6">Profile Update</h2>

            <div className="space-y-6">
                {/* Full Name Field */}
                <div>
                    <label htmlFor="fullName" className="block text-lg font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={profileData.fullName}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                        disabled={!isEditing}
                    />
                </div>

                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                        disabled={!isEditing}
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
                                className="px-6 py-2 bg-gray-500 text-white rounded-full shadow-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
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
