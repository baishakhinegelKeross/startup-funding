"use client"
import '@/styles/styles.css';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Campaign } from '@/types';

const LandingPage = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    const [faqs, setFaqs] = useState([
        { id: 1, question: 'Streamline the Investment Process', answer: 'Fundraising platforms offer tools to manage deal flow, track investments, and monitor portfolio performance.', isOpen: false },
        { id: 2, question: 'Collaborate with Investors', answer: 'Startups and investors can securely share documents, communicate, and coordinate on next steps.', isOpen: false },
        { id: 3, question: 'Optimize Tax and Compliance', answer: 'Automated features help ensure investments adhere to regulatory requirements and tax considerations.', isOpen: false },
    ]);

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const staggerChildren = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const [campaignData, setCampaignData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch campaign data when the component mounts
    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/fundraiser`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setCampaignData(result.filter(x => x.status === "active"));
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(campaignData.length / itemsPerPage);

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const getCurrentPageItems = () => {
        const start = currentPage * itemsPerPage;
        return campaignData.slice(start, start + itemsPerPage);
    };

    const toggleFAQ = (id: number) => {
        setFaqs((prevFaqs) => {
            const updatedFaqs = prevFaqs.map((faq) =>
                faq.id === id ? { ...faq, isOpen: !faq.isOpen } : faq
            );
            return updatedFaqs;
        });
    };

    // Skeleton UI Component
    const SkeletonCampaignCard = () => (
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 animate-pulse">
            <div className="bg-gray-700 rounded-lg h-48 mb-4"></div>
            <div className="bg-gray-700 h-6 w-3/4 rounded mb-2"></div>
            <div className="bg-gray-700 h-4 w-1/2 rounded mb-4"></div>
            <div className="bg-gray-700 h-2 rounded-full mb-2">
                <div className="bg-gray-600 h-2 rounded-full" style={{ width: '50%' }}></div>
            </div>
            <div className="flex justify-between">
                <div className="bg-gray-700 h-4 w-1/4 rounded"></div>
                <div className="bg-gray-700 h-4 w-1/4 rounded"></div>
            </div>
        </div>
    );
    //progressbar




    return (
        <div className="landing-page bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80"
                        fill
                        alt="Background"
                        className="object-cover opacity-20"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                </div>

                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                            Funding Innovation, Enabling Success
                        </h1>
                        <p className="text-xl text-gray-300">
                            Fundraising platforms connect ambitious entrepreneurs with accredited investors, offering tools to pitch ideas, analyze ventures, and manage investments effectively
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/campaigns">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition-colors"
                                >
                                    Explore Campaigns
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[500px] hidden md:block"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80"
                            fill
                            alt="Meeting"
                            className="object-cover rounded-2xl"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Features Section */}
            <motion.div
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={staggerChildren}
                className="py-20 bg-gray-900/50"
            >
                <div className="container mx-auto px-4">
                    <motion.h2
                        variants={fadeInUp}
                        className="text-4xl font-bold text-center mb-16"
                    >
                        Connect Startups and Investors
                    </motion.h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Startup Discovery",
                                description: "Platforms allow investors to easily browse and discover promising startups across various industries and stages of growth."
                            },
                            {
                                title: "Investor Matching",
                                description: "Startups can find the right investors that align with their vision, funding needs, and growth stage."
                            },
                            {
                                title: "Relationship Building",
                                description: "These platforms facilitate conversations and connections between entrepreneurs and investors."
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                            >
                                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Tools Section */}
            <motion.div
                initial="hidden"
                animate={controls}
                variants={staggerChildren}
                className="py-20"
            >
                <div className="container mx-auto px-4">
                    <motion.h2
                        variants={fadeInUp}
                        className="text-4xl font-bold text-center mb-16"
                    >
                        Tools for Startup Pitches
                    </motion.h2>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            {[
                                {
                                    number: "01",
                                    title: "Pitch Deck Builder",
                                    description: "Create polished pitch decks using pre-designed templates and customization tools."
                                },
                                {
                                    number: "02",
                                    title: "Video Pitches",
                                    description: "Record and share compelling video pitches to engage investors."
                                },
                                {
                                    number: "03",
                                    title: "Investor Analytics",
                                    description: "Track investor engagement and feedback to refine presentations."
                                }
                            ].map((tool, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    className="flex gap-6"
                                >
                                    <div className="text-3xl font-bold text-blue-500">{tool.number}</div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                                        <p className="text-gray-400">{tool.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div
                            variants={fadeInUp}
                            className="relative h-[400px]"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80"
                                fill
                                alt="Pitch"
                                className="object-cover rounded-2xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Benefits Section */}
            <motion.div
                initial="hidden"
                animate={controls}
                variants={staggerChildren}
                className="py-20 bg-gray-900/50"
            >
                <div className="container mx-auto px-4">
                    <motion.h2
                        variants={fadeInUp}
                        className="text-4xl font-bold text-center mb-16"
                    >
                        Benefits for Startups
                    </motion.h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            {
                                icon: "🎯",
                                title: "Visibility",
                                description: "Reach a wider pool of potential investors."
                            },
                            {
                                icon: "🤝",
                                title: "Connections",
                                description: "Forge meaningful relationships with investors."
                            },
                            {
                                icon: "⚡",
                                title: "Efficiency",
                                description: "Streamline the fundraising process."
                            },
                            {
                                icon: "📈",
                                title: "Growth",
                                description: "Access capital to fuel business expansion."
                            }
                        ].map((benefit, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 text-center"
                            >
                                <div className="text-4xl mb-4">{benefit.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                                <p className="text-gray-400">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Top Campaigns Section */}
            <div className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-8">
                        Top Campaigns
                    </h2>
                    <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                        Discover the most innovative and promising campaigns currently seeking funding
                    </p>

                    <div className="relative">
                        <div className="overflow-hidden">
                            <motion.div className="grid grid-cols-4 gap-6" initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
                                {loading ? (
                                    Array.from({ length: itemsPerPage }).map((_, index) => <SkeletonCampaignCard key={index} />)
                                ) : (
                                    <AnimatePresence mode="wait">
                                        {getCurrentPageItems().map((campaign) => {
                                            if (!campaign.amount_raised) {
                                                campaign.amount_raised = 0;
                                            }
                                            if (campaign.current_amount) {
                                                campaign.amount_raised = campaign.current_amount;
                                            }

                                            const progress = (campaign.amount_raised / campaign.goal_amount) * 100;
                                            const daysLeft = Math.ceil(
                                                (new Date(campaign.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                                            );

                                            return (
                                                <motion.div key={campaign._id} animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }}>
                                                    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 flex flex-col h-full group">
                                                        <div
                                                            className="w-full h-[260px] bg-cover bg-center bg-no-repeat rounded-lg mb-4"
                                                            style={{ backgroundImage: `url('${campaign.image_url}')` }}
                                                        />
                                                        <h3 className="text-xl font-semibold mb-2 truncate group-hover:truncate-none group-hover:overflow-visible group-hover:whitespace-normal">
                                                            {campaign.title}
                                                        </h3>
                                                        <p className="text-gray-400 text-sm truncate group-hover:truncate-none group-hover:overflow-visible group-hover:whitespace-normal">
                                                            {campaign.creator}
                                                        </p>
                                                        <div className="mt-4 flex-grow">
                                                            <div className="w-full bg-gray-700 rounded-full h-2">
                                                                <div
                                                                    className="bg-[#4e958b] h-2 rounded-full transition-all duration-500"
                                                                    style={{ width: `${Math.min(progress, 100)}%` }}
                                                                />
                                                            </div>
                                                            <div className="flex justify-between text-sm text-gray-400 mt-2">
                                                                <span>${campaign.amount_raised.toLocaleString()} raised</span>
                                                                <span>{daysLeft} days left</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </AnimatePresence>
                                )}
                            </motion.div>
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            onClick={prevPage}
                            className="absolute -left-12 top-1/2 -translate-y-1/2 p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                            aria-label="Previous page"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextPage}
                            className="absolute -right-12 top-1/2 -translate-y-1/2 p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                            aria-label="Next page"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Page Indicators */}
                        <div className="flex justify-center gap-2 mt-8">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index)}
                                    className={`w-2 h-2 rounded-full transition-colors ${currentPage === index ? 'bg-blue-500' : 'bg-gray-600'}`}
                                    aria-label={`Go to page ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default LandingPage;