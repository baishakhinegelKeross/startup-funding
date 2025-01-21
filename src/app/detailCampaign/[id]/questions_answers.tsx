import Image from "next/image";

export default function QnA(){
    return(
        <div className="bg-[#0a0b1e] min-h-screen p-4">
            <div className="max-w-3xl mx-auto">
                {/* Question Input */}
                <div className="bg-white rounded-lg shadow-sm mb-8 p-4">
                    <input type="text" 
                            placeholder="Ask a question" 
                            className="w-full p-3 text-gray-600 placeholder-gray-400 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    />
                    <div className="flex justify-end mt-3">
                        <button className="px-6 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                            SUBMIT
                        </button>
                    </div>
                </div>

                {/* Sort Options */}
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-gray-700">Sort by relevance</span>
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

                {/* Questions and Answers */}
                <div className="space-y-6">
                    {/* Question */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex gap-4 mb-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-full relative bg-gray-200">
                                    <Image src='/company_dummy_logo.jpg' alt="photo" fill></Image>
                                </div>
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-semibold text-gray-800">Martin D.</h3>
                                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">Top Contributor</span>
                                    <span className="text-gray-400 text-sm">Jan 11, 2023</span>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    You mentioned noise levels are part of your regular evaluations and would be published when available. Do your evaluations include measuring vibrations and noise levels outside human limits that may pose an impact on the environment? More specifically, impacts on vibration/noise sensitive life forms dwelling underground that may alter their behavior as a result of the technology? Thanks! 11.Jan.2022
                                </p>
                                <div className="flex items-center gap-2 mt-3">
                                    <span className="text-blue-600 font-medium">4</span>
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M5 15l7-7 7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Answer */}
                        <div className="ml-16">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full relative bg-gray-200">
                                        <Image src='/company_dummy_logo.jpg' alt="photo" fill></Image>
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-semibold text-gray-800">Loïc Bastard</h3>
                                        <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">Founder, CTO</span>
                                        <span className="text-gray-400 text-sm">Jan 14, 2023</span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed mb-3">
                                        Dear Martin, thanks for your questions. We are very careful about vibrations and noise, for the environment and for our mechanical system. Vibration means fatigue and wear, it is our worst enemy. The system is mounted on silent blocks that filters the big majority of the vibration between the system and the ground. The system maximum speed is 8000RPM, so the main potential excitation is at low frequency (below 135Hz). These, combined with the low stiffness of the bearing and the fact the rotor is in a vacuum, make Qnetic extremely silent. We plan to measure vibrations and noise on a broad spectrum and optimize the system. All in all, we believe the risk to subterranean...
                                    </p>
                                    <span className="text-blue-600 hover:underline">See more</span>
                                    <div className="flex items-center gap-2 mt-3">
                                        <span className="text-blue-600 font-medium">6</span>
                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M5 15l7-7 7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}