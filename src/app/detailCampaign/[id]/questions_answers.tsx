'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ChevronUp, MessageSquare } from "lucide-react";

export default function QnA() {
    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
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
                    <Card className="border-0 shadow-lg bg-card/50 backdrop-blur">
                        <CardContent className="p-6">
                            {/* Question */}
                            <div className="flex gap-4 mb-8">
                                <Avatar className="h-12 w-12 border-2 border-primary/10">
                                    <AvatarImage src="/company_dummy_logo.jpg" alt="Martin D." />
                                    <AvatarFallback>MD</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow space-y-3">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h3 className="font-semibold text-white">Martin D.</h3>
                                        <Badge variant="secondary" className="bg-orange-500/10 text-orange-400 hover:bg-orange-500/20">
                                            Top Contributor
                                        </Badge>
                                        <span className="text-gray-400 text-sm">Jan 11, 2023</span>
                                    </div>
                                    <p className="text-gray-200 leading-relaxed">
                                        You mentioned noise levels are part of your regular evaluations and would be published when available. Do your evaluations include measuring vibrations and noise levels outside human limits that may pose an impact on the environment? More specifically, impacts on vibration/noise sensitive life forms dwelling underground that may alter their behavior as a result of the technology? Thanks! 11.Jan.2022
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="text-white hover:text-white hover:bg-primary/20 gap-1"
                                        >
                                            <ChevronUp className="h-4 w-4" />
                                            4
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Answer */}
                            <div className="ml-16 pl-8 border-l border-primary/10">
                                <div className="flex gap-4">
                                    <Avatar className="h-12 w-12 border-2 border-primary/10">
                                        <AvatarImage src="/company_dummy_logo.jpg" alt="Loïc Bastard" />
                                        <AvatarFallback>LB</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow space-y-3">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h3 className="font-semibold text-white">Loïc Bastard</h3>
                                            <Badge className="bg-blue-600 text-white hover:bg-blue-700">
                                                Founder, CTO
                                            </Badge>
                                            <span className="text-gray-400 text-sm">Jan 14, 2023</span>
                                        </div>
                                        <p className="text-gray-200 leading-relaxed">
                                            Dear Martin, thanks for your questions. We are very careful about vibrations and noise, for the environment and for our mechanical system. Vibration means fatigue and wear, it is our worst enemy. The system is mounted on silent blocks that filters the big majority of the vibration between the system and the ground. The system maximum speed is 8000RPM, so the main potential excitation is at low frequency (below 135Hz). These, combined with the low stiffness of the bearing and the fact the rotor is in a vacuum, make Qnetic extremely silent. We plan to measure vibrations and noise on a broad spectrum and optimize the system. All in all, we believe the risk to subterranean...
                                        </p>
                                        <span
                                            
                                            className="px-0 h-auto font-normal text-blue-400 hover:text-blue-300"
                                        >
                                            See more
                                        </span>
                                        <div className="flex items-center gap-4">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="text-white hover:text-white hover:bg-primary/20 gap-1"
                                            >
                                                <ChevronUp className="h-4 w-4" />
                                                6
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}