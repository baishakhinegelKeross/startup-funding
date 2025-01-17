"use client"
import '@/styles/styles.css';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Importing images
import meeting from '@/assets/meeting.png';
import pitch from '@/assets/pitch.png';
import one from '@/assets/icons8-one-96.png';
import two from '@/assets/icons8-two-96.png';
import three from '@/assets/icons8-three-96.png';
import num_one from '@/assets/icons8-one-100 (1).png';
import num_two from '@/assets/icons8-two-100.png';
import num_three from '@/assets/icons8-three-100 (1).png';
import num_four from '@/assets/icons8-circled-4-100.png';
import { LoginContext } from "@/components/context/loginContext";
import { useAuth } from '@/lib/auth-context';

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

    const toggleFAQ = (id: number) => {
        setFaqs((prevFaqs) => {
            const updatedFaqs = prevFaqs.map((faq) =>
                faq.id === id ? { ...faq, isOpen: !faq.isOpen } : faq
            );
            return updatedFaqs;
        });
    };

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
                            Funding Platforms for Startups
                        </h1>
                        <p className="text-xl text-gray-300">
                            Fundraising platforms connect ambitious startups with accredited investors, providing tools to pitch ideas, research companies, and manage investments.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/role">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition-colors"
                                >
                                    Explore Platforms
                                </motion.button>
                            </Link>
                            <Link href="/role">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-transparent border-2 border-white/20 hover:border-white/40 rounded-full font-semibold transition-colors"
                                >
                                    Find Investors
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

            {/* FAQ Section */}
            <div className="py-20">
                <div className="container mx-auto px-4">
                    <motion.h2
                        variants={fadeInUp}
                        className="text-4xl font-bold text-center mb-16"
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    <div className="grid sm:grid-cols-3 gap-6">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                            >
                                <h3 className="text-xl font-semibold mb-4">{faq.question}</h3>
                                <p className="text-gray-400">{faq.answer}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <motion.div
                initial="hidden"
                animate={controls}
                variants={fadeInUp}
                className="py-20"
            >
                <div className="container mx-auto px-4">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
                            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                                Join thousands of startups and investors building the future
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link href="/role">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                                    >
                                        Explore Platforms
                                    </motion.button>
                                </Link>
                                <Link href="/role">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 bg-transparent border-2 border-white rounded-full font-semibold hover:bg-white/10 transition-colors"
                                    >
                                        Find Investors
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LandingPage;




