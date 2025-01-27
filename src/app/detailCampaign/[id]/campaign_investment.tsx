import Image from "next/image";
import Link from "next/link";
import { CampaignInvestmentProps } from "./types";

const CampaignInvestment: React.FC<CampaignInvestmentProps> = ({campaignId})=>{
    return (
        <div className="bg-[#0a0b1e] text-white">
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Section */}
                <div className="space-y-4 mb-12">
                    <div className="text-sm font-medium text-blue-400">INVEST IN FASTOPPS</div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Next-Gen Software for the<br className="hidden md:block"/> Modern Professional
                    </h1>
                </div>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-[75%_25%] gap-8 items-start">
                    {/* Campaign Image Section */}
                    <div className="h-full bg-gray-800/50 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="h-full aspect-video bg-gray-700">
                            <div className="w-full h-full relative">
                                <Image src="https://placehold.co/600x400?text=Campaign+Photo.png" alt={"campaign image"} fill unoptimized></Image>
                            </div>
                        </div>
                    </div>

                    {/* Investment Card */}
                    <div className="h-full bg-white rounded-2xl p-8 shadow-2xl">
                        <div className="space-y-6">
                            {/* Progress Section */}
                            <div>
                                <h3 className="text-gray-900 font-semibold mb-2">Almost Funded</h3>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full w-[99.5%]"></div>
                                </div>
                            </div>

                            {/* Amount Section */}
                            <div>
                                <div className="flex flex-col items-baseline gap-1">
                                    <span className="text-4xl font-bold text-gray-900">$9,950</span>
                                    <span className="text-gray-500">of a $10,000 goal</span>
                                </div>
                            </div>

                            {/* Investment Form */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-900 font-medium mb-2">FUND</label>
                                    <div className="relative">
                                        <span className="absolute left-[14px] top-[14px] text-gray-500">$</span>
                                        <input type="number" min="10"
                                            className="m-0 w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter amount" 
                                            defaultValue={10}/>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">min $10</p>
                                </div>

                                {/* Action Buttons */}
                                <button className="w-full text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors">
                                    <Link className="w-full" href={`/api/fundraiser/campaign/checkout/${campaignId}`}>FUND</Link>
                                </button>
                                <button className="w-full text-sm bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 rounded-lg transition-colors">
                                    WATCH FOR UPDATES
                                </button>
                                <button className="w-full text-sm bg-gray-500 hover:bg-gray-700 text-white font-semibold py-4 rounded-lg transition-colors">
                                    <Link className="w-full" href={`/dispute/${campaignId}`}>Report Dispute</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gradient Background Effect */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-blue-900/20 pointer-events-none"></div>
        </div>
    )
}

export default CampaignInvestment;