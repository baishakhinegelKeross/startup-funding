import { nanoid } from 'nanoid';
import QuestionAnswersPost from "./question_answers_posts";
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur">
                    <CardContent className="p-6">
                        <Input
                            type="text"
                            placeholder="What would you like to know?"
                            className="bg-background border-primary/10 text-primary placeholder:text-muted-foreground"
                        />
                        <div className="flex justify-end mt-4">
                            <Button className="px-6 bg-blue-600 hover:bg-blue-700 text-white">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Ask Question
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Sort Options */}
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white">Recent Questions</h2>
                    <Select defaultValue="relevance">
                        <SelectTrigger className="w-[180px] bg-card/50 border-primary/10 text-white">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="relevance">Sort by relevance</SelectItem>
                            <SelectItem value="recent">Most recent</SelectItem>
                            <SelectItem value="votes">Most votes</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Questions and Answers */}
                <div className="space-y-6">
                   
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