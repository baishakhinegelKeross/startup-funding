'use client'

import Image from "next/image";
import axios from 'axios';
import { useRef } from "react";
import { QuestionAnswersPostProps } from "./types";

const QuestionAnswersPost: React.FC<QuestionAnswersPostProps> = ({posts})=>{
    console.log("Inside QuestionAnswersPost: ", posts);
    const inputRef = useRef<HTMLInputElement>(null);

    debugger;

    const postReply = async (key: React.KeyboardEvent<HTMLInputElement>) => {
        if (key.key === 'Enter' && inputRef && inputRef.current) {

            console.log('Reply send:', inputRef.current.value);
            // Your logic to handle the reply

            const postURL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/QnA/Reply`;
    
            const data = {
                replyingToId: '679b2c770d0062fbc0b8494d',
                userId: '679b2c770d0062fbc0b8494e',
                replyComment: inputRef.current.value,
                userPic: "/company_dummy_logo.jpg",
                userName: "Dummy User 1",
                userRole: "Dummy Role 1",
                replyDate: new Date().toLocaleString()
            };
    
            try {
                const response = await axios.post(postURL, data);
                console.log('Response:', response.data);
            } catch (error) {
                console.error('An error occurred while posting data:', error);
            }
        }

    };

    const toggleReplyInput = function(){
        if(inputRef?.current){
            if(inputRef.current.classList.contains('hidden')){
                inputRef.current.classList.remove('hidden');
            }
            else{
                inputRef.current.classList.add('hidden');
            }
        }
    } 


    return(
        <>
            {/* Comment */}
            <div className="flex gap-4 mb-4">
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full relative bg-gray-200">
                        <Image src={posts.userPic ? posts.userPic : '/company_dummy_logo.jpg'} alt="photo" fill></Image>
                    </div>
                </div>
                <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-gray-800">{posts.userName}</h3>
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">{posts.userRole}</span>
                        <span className="text-gray-400 text-sm">{posts.commentDate}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                        {posts.comment}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                        {/* <span className="text-blue-600 font-medium">4</span>
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M5 15l7-7 7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg> */}
                        <span onClick={toggleReplyInput}>Reply</span>
                        <input 
                            type='text' 
                            className="hidden"
                            placeholder={`Reply to ${posts.userName}`} 
                            onKeyUp={postReply}
                            onBlur={toggleReplyInput}
                            ref={inputRef}
                        ></input>
                    </div>
                </div>
            </div>
            
            {/* Reply */}

            {
                posts.reply.length > 0 ? (
                    posts.reply.map((obj)=>(
                        <div key={obj.userId} className="ml-16">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full relative bg-gray-200">
                                        <Image src={obj.userPic ? obj.userPic : '/company_dummy_logo.jpg'} alt="photo" fill></Image>
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-semibold text-gray-800">{obj.userName}</h3>
                                        <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">{obj.userRole}</span>
                                        <span className="text-gray-400 text-sm">{obj.replyDate}</span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed mb-3">
                                        {obj.replyComment}
                                    </p>
                                    {/* <span className="text-blue-600 hover:underline">See more</span>
                                    <div className="flex items-center gap-2 mt-3">
                                        <span className="text-blue-600 font-medium">6</span>
                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M5 15l7-7 7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    ))
                ) : null
            }

        </>
    )
}

export default QuestionAnswersPost;
