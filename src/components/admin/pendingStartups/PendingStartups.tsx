import React, { useState } from 'react';

const PendingStartups = () => {
    // Sample data for pending startups
    const sampleData = [
        {
            _id: '1',
            campaignTitle: 'Porro omnis molestia',
            campaignDescription: 'Consequat Rerum aut',
            campaignCategory: 'education',
            proofOfEligibility: 'C:\\fakepath\\Document_(31)ethno[1].docx',
            campaignImage: 'C:\\fakepath\\12.jpg',
            motivationLetter: 'Necessitatibus a qui',
            personalizedMessage: 'Esse et consequatur ',
            name: 'Melanie Tucker',
            phone: '+1 (438) 838-2498',
            address: 'Esse dolores et eli',
            email: 'tozirequmo@mailinator.com',
            fundingType: 'Aut exercitationem v',
            targetAmount: 48,
            deadline: '2012-05-01',
            minInvestment: 91,
            status: 'pending',
        },
        {
            _id: '2',
            campaignTitle: 'Rerum Quaerat Facilis',
            campaignDescription: 'Aliquam provident magnam.',
            campaignCategory: 'healthcare',
            proofOfEligibility: 'C:\\fakepath\\Document_example.pdf',
            campaignImage: 'C:\\fakepath\\image_example.jpg',
            motivationLetter: 'Vitae temporibus ut',
            personalizedMessage: 'Ducimus doloremque mollitia',
            name: 'John Doe',
            phone: '+1 (438) 111-2222',
            address: '123 Main Street',
            email: 'johndoe@mail.com',
            fundingType: 'Culpa voluptas',
            targetAmount: 200,
            deadline: '2023-12-31',
            minInvestment: 100,
            status: 'pending',
        },
    ];

    const [pendingStartups, setPendingStartups] = useState(sampleData);
    const [selectedStartup, setSelectedStartup] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handle selecting a startup to view its details in modal
    const handleViewDetails = (startupId: string) => {
        const selected = pendingStartups.find(startup => startup._id === startupId);
        setSelectedStartup(selected || null);
        setIsModalOpen(true); // Open modal
    };

    // Handle closing the modal
    const handleCloseModal = () => {
        setIsModalOpen(false); // Close modal
        setSelectedStartup(null);
    };

    // Handle Accept or Reject action
    const handleAction = (action: 'accept' | 'reject') => {
        console.log(`${action}ing startup: ${selectedStartup?.campaignTitle}`);
        // Implement further action logic such as API call to update the status
        handleCloseModal(); // Close modal after action
    };

    return (
        <div>
            <h2 className="text-3xl mb-6">Pending Startups</h2>

            <table className="min-w-full table-auto border-collapse mb-6">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-black text-left">Campaign Title</th>
                        <th className="px-4 py-2 text-black text-left">Founder</th>
                        <th className="px-4 py-2 text-black text-left">Target Amount</th>
                        <th className="px-4 py-2 text-black text-left">Status</th>
                        <th className="px-4 py-2 text-black text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pendingStartups.map((startup) => (
                        <tr key={startup._id}>
                            <td className="px-4 py-2">{startup.campaignTitle}</td>
                            <td className="px-4 py-2">{startup.name}</td>
                            <td className="px-4 py-2">${startup.targetAmount.toLocaleString()}</td>
                            <td className="px-4 py-2">
                                <span
                                    className={`px-2 py-1 rounded-full ${startup.status === 'pending' ? 'bg-yellow-300' : ''
                                        }`}
                                >
                                    {startup.status}
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => handleViewDetails(startup._id)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-8 shadow-xl rounded-lg w-full max-w-3xl h-auto max-h-[80vh] overflow-y-auto relative border-2 border-gray-300">
                        {/* Close Button at Top-Right */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-gray-600 text-2xl font-bold"
                        >
                            ×
                        </button>

                        <h3 className="text-3xl font-extrabold mb-6 text-center text-blue-600">Startup Details</h3>

                        {/* Modal Content - Two Columns Layout */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Left Column: Main Details */}
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <i className="text-3xl text-gray-500 fas fa-heading"></i>
                                    <div className="flex flex-col">
                                        <strong className="text-lg font-semibold text-gray-700">Campaign Title:</strong>
                                        <p className="text-gray-800 text-lg">{selectedStartup.campaignTitle}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <i className="text-3xl text-gray-500 fas fa-align-left"></i>
                                    <div className="flex flex-col">
                                        <strong className="text-lg font-semibold text-gray-700">Campaign Description:</strong>
                                        <p className="text-gray-800 text-lg">{selectedStartup.campaignDescription}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <i className="text-3xl text-gray-500 fas fa-cogs"></i>
                                    <div className="flex flex-col">
                                        <strong className="text-lg font-semibold text-gray-700">Category:</strong>
                                        <p className="text-gray-800 text-lg">{selectedStartup.campaignCategory}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <i className="text-3xl text-gray-500 fas fa-pencil-alt"></i>
                                    <div className="flex flex-col">
                                        <strong className="text-lg font-semibold text-gray-700">Motivation Letter:</strong>
                                        <p className="text-gray-800 text-lg">{selectedStartup.motivationLetter}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <i className="text-3xl text-gray-500 fas fa-user"></i>
                                    <div className="flex flex-col">
                                        <strong className="text-lg font-semibold text-gray-700">Founder Name:</strong>
                                        <p className="text-gray-800 text-lg">{selectedStartup.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <i className="text-3xl text-gray-500 fas fa-phone-alt"></i>
                                    <div className="flex flex-col">
                                        <strong className="text-lg font-semibold text-gray-700">Phone:</strong>
                                        <p className="text-gray-800 text-lg">{selectedStartup.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <i className="text-3xl text-gray-500 fas fa-envelope"></i>
                                    <div className="flex flex-col">
                                        <strong className="text-lg font-semibold text-gray-700">Email:</strong>
                                        <p className="text-gray-800 text-lg">{selectedStartup.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Media and Links */}
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <i className="text-3xl text-gray-500 fas fa-file-alt"></i>
                                    <div className="flex flex-col">
                                        <strong className="text-lg font-semibold text-gray-700">Proof of Eligibility:</strong>
                                        <a href={selectedStartup.proofOfEligibility} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-lg hover:underline">
                                            View Document
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <i className="text-3xl text-gray-500 fas fa-comment-dots"></i>
                                    <div className="flex flex-col">
                                        <strong className="text-lg font-semibold text-gray-700">Personalized Message:</strong>
                                        <p className="text-gray-800 text-lg">{selectedStartup.personalizedMessage}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <i className="text-3xl text-gray-500 fas fa-briefcase"></i>
                                    <div className="flex flex-col">
                                        <strong className="text-lg font-semibold text-gray-700">Funding Type:</strong>
                                        <p className="text-gray-800 text-lg">{selectedStartup.fundingType}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <i className="text-3xl text-gray-500 fas fa-image"></i>
                                    <div className="flex flex-col">
                                        <strong className="text-lg font-semibold text-gray-700">Campaign Image:</strong>
                                        <img src={selectedStartup.campaignImage} alt="Campaign" className="w-full h-auto rounded-lg shadow-md" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Accept or Reject Buttons */}
                        <div className="mt-8 flex justify-between">
                            <button
                                onClick={() => handleAction('accept')}
                                className="px-8 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all duration-200"
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => handleAction('reject')}
                                className="px-8 py-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all duration-200"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingStartups;
