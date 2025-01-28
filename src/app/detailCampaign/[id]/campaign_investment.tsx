'use client';

import Image from "next/image";
import Link from "next/link";
import { CampaignInvestmentProps } from "./types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Eye } from "lucide-react";

const CampaignInvestment: React.FC<CampaignInvestmentProps> = ({ campaignId }) => {
    return (
        <div className="min-h-screen bg-[#0a0b1e]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                {/* Header Section */}
                <div className="space-y-4 mb-12">
                    <Badge
                        variant="secondary"
                        className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                    >
                        INVEST IN FASTOPPS
                    </Badge>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Next-Gen Software for the
                        </span>
                        <br className="hidden md:block" />
                        <span className="text-primary">Modern Professional</span>
                    </h1>
                </div>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-[2fr_1fr] gap-8 items-start">
                    {/* Campaign Image Section */}
                    <Card className="border-0 shadow-xl bg-card/50 backdrop-blur overflow-hidden">
                        <CardContent className="p-0">
                            <div className="aspect-video relative">
                                <Image
                                    src="https://placehold.co/600x400?text=Campaign+Photo.png"
                                    alt="campaign image"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Investment Card */}
                    <Card className="border-0 shadow-xl bg-card/50 backdrop-blur">
                        <CardContent className="p-6 space-y-6">
                            {/* Progress Section */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-lg font-semibold text-primary">Almost Funded</h3>
                                    <span className="text-sm text-muted-foreground">99.5%</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-[99.5%]"></div>
                                </div>
                            </div>

                            {/* Amount Section */}
                            <div className="space-y-1">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-primary">$9,950</span>
                                    <span className="text-muted-foreground">raised</span>
                                </div>
                                <p className="text-sm text-muted-foreground">of a $10,000 goal</p>
                            </div>

                            {/* Investment Form */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-primary mb-2">
                                        INVESTMENT AMOUNT
                                    </label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="number"
                                            min="10"
                                            className="pl-9 bg-background border-primary/10"
                                            placeholder="Enter amount"
                                            defaultValue={10}
                                        />
                                    </div>
                                    <p className="mt-1 text-sm text-muted-foreground">Minimum $10</p>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    <Button
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                                        asChild
                                    >
                                        <Link href={`/api/fundraiser/campaign/checkout/${campaignId}`}>
                                            INVEST NOW
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className="w-full bg-secondary/50 hover:bg-secondary/70"
                                    >
                                        <Eye className="mr-2 h-4 w-4" />
                                        WATCH FOR UPDATES
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Gradient Background Effect */}
            <div className="fixed inset-0 -z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
            </div>
        </div>
    );
};

export default CampaignInvestment;