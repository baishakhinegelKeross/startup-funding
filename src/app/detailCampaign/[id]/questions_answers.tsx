import { nanoid } from 'nanoid';
import QuestionAnswersPost from "./question_answers_posts";

const posts = [
    {
        id: nanoid(),
        comment: "You mentioned noise levels are part of your regular evaluations and would be published when available. Do your evaluations include measuring vibrations and noise levels outside human limits that may pose an impact on the environment? More specifically, impacts on vibration/noise sensitive life forms dwelling underground that may alter their behavior as a result of the technology? Thanks! 11.Jan.2022",
        userPic: "/company_dummy_logo.jpg",
        userName: "Martin D.",
        userRole: "Top Contributor",
        commentDate: "Jan 11, 2023",
        reply: [
            {
                id: nanoid(),
                replyComment: "Dear Martin, thanks for your questions. We are very careful about vibrations and noise, for the environment and for our mechanical system. Vibration means fatigue and wear, it is our worst enemy. The system is mounted on silent blocks that filters the big majority of the vibration between the system and the ground. The system maximum speed is 8000RPM, so the main potential excitation is at low frequency (below 135Hz). These, combined with the low stiffness of the bearing and the fact the rotor is in a vacuum, make Qnetic extremely silent. We plan to measure vibrations and noise on a broad spectrum and optimize the system. All in all, we believe the risk to subterranean...",
                userPic: "/company_dummy_logo.jpg",
                userName: "Loïc Bastard",
                userRole: "Founder, CTO",
                replyDate: "Jan 14, 2023",
            }
        ]
    }
]

export default function QnA(){
    return(
        <div className="bg-[#0a0b1e] p-4">
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

                        {
                            posts.length > 0 ? (
                                posts.map((obj)=>(
                                    <QuestionAnswersPost key={obj.id} posts={obj}></QuestionAnswersPost>
                                ))
                            ) : null
                        }

                        
                    </div>
                </div>
            </div>
        </div>
    );
}