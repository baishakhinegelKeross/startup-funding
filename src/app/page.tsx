"use client"

import { Context, useState,useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '@/styles/styles.css';

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
    //  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
    //  if(isLoggedIn)
    //     useAuth();
    // console.log("user auth in landing page  => ",user);

    
    // console.log(isLoggedIn) 
    const [faqs, setFaqs] = useState([
        { id: 1, question: 'Streamline the Investment Process', answer: 'Fundraising platforms offer tools to manage deal flow, track investments, and monitor portfolio performance.', isOpen: false },
        { id: 2, question: 'Collaborate with Investors', answer: 'Startups and investors can securely share documents, communicate, and coordinate on next steps.', isOpen: false },
        { id: 3, question: 'Optimize Tax and Compliance', answer: 'Automated features help ensure investments adhere to regulatory requirements and tax considerations.', isOpen: false },
    ]);

    const toggleFAQ = (id: number) => {
        setFaqs((prevFaqs) => {
            const updatedFaqs = prevFaqs.map((faq) =>
                faq.id === id ? { ...faq, isOpen: !faq.isOpen } : faq
            );
            return updatedFaqs;
        });
    };

    return (
        <div className="landing-page p-0">
            <div className="header-container p-0 h-screen" >
                <div className="sub-heading w-1/2 min-w-[50%] p-14 gap-8 flex flex-col ">
                    <h1 className='text-[72px]'>Funding Platforms for Startups</h1>
                    <h3 className='color-[#aaaa]'>Fundraising platforms connect ambitious startups with accredited investors, providing tools to pitch ideas, research companies, and manage investments.</h3>
                    <div className="py-4">
                        <Link href="/role">
                            <button className="explore-btn py-4 px-8">
                                Explore Platforms
                            </button>
                        </Link>
                        <Link href="/role">
                            <button className="find_investor_btn py-4 px-8">
                                Find Investors
                            </button>
                        </Link>
                    </div>
                </div>
                <div className=" w-1/2">
                        <Image className='w-full h-screen object-cover' src={meeting} width={400} height={400} alt="Meeting illustration" style={{clipPath: "polygon(25% 0%, 100% 0%, 100% 99%, 0% 100%)"}} />
                </div>
            </div>

            <div className="course__container">
                <div className="course_sub_container">
                    <div className="py-10">
                        <h2 className="main__heading">Connect Startups and Investors</h2>
                    </div>
                    <div className="catalog__container">
                        <div className="catalog-item">
                            <h3 className="heading">Startup Discovery</h3>
                            <p className="mt-2">Platforms allow investors to easily browse and discover promising startups across various industries and stages of growth.</p>
                        </div>
                        <div className="catalog-item">
                            <h3 className="heading">Investor Matching</h3>
                            <p className="mt-2">Startups can find the right investors that align with their vision, funding needs, and growth stage.</p>
                        </div>
                        <div className="catalog-item">
                            <h3 className="heading">Relationship Building</h3>
                            <p className="mb-6">These platforms facilitate conversations and connections between entrepreneurs and investors.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="feature-container flex">
                <div className="top-container">
                    <div>
                        <h2 className="main_heading">Tools for Startup Pitches</h2>
                    </div>
                    <div className="feature-sub-container">
                        <div className="pitch_deck">
                            <div className="number_img_container">
                                <Image src={one} width={96} height={96} alt="1" />
                            </div>
                            <div>
                                <h3 className="sub-heading2">Pitch Deck Builder</h3>
                                <p>Startups can create polished pitch decks using pre-designed templates and customization tools.</p>
                            </div>
                        </div>
                        <div className="pitch_deck">
                            <div className="number_img_container">
                                <Image src={two} width={96} height={96} alt="2" />
                            </div>
                            <div>
                                <h3 className="sub-heading2">Video Pitches</h3>
                                <p>Platforms enable startups to record and share compelling video pitches to engage investors.</p>
                            </div>
                        </div>
                        <div className="pitch_deck">
                            <div className="number_img_container">
                                <Image src={three} width={96} height={96} alt="3" />
                            </div>
                            <div>
                                <h3 className="sub-heading2">Investor Analytics</h3>
                                <p>Startups can track investor engagement and feedback to refine their presentations.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="image-container">
                    <Image src={pitch} width={400} height={400} alt="Pitching process illustration" />
                </div>
            </div>

            <div className="assessment_container">
                <div className="assessment_heading_container">
                    <h2 className="comprensive-heading">
                        Research Investors and Companies
                    </h2>
                </div>
                <div className="assesment_sub_container">
                    <div className="ass_first_container">
                        <div className="flex justify-center">
                            <div>
                                <Image src={num_one} width={100} height={100} alt="1" />
                            </div>
                            <div className="assesments">
                                <h3>Company Profiles</h3>
                                <p>Detailed information on startups' products, team, financials, and milestones.</p>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div>
                                <Image src={num_two} width={100} height={100} alt="2" />
                            </div>
                            <div className="assesments">
                                <h3>Investor Portfolios</h3>
                                <p>Insights into the investment history, thesis, and portfolio of individual investors.</p>
                            </div>
                        </div>
                    </div>

                    <div className="ass_second_container">
                        <div className="flex justify-center">
                            <div>
                                <Image src={num_three} width={100} height={100} alt="3" />
                            </div>
                            <div className="assesments">
                                <h3>Personalized Feedback</h3>
                                <p>Data-driven industry analysis to identify emerging opportunities and competitive landscapes.</p>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div>
                                <Image src={num_four} width={100} height={100} alt="4" />
                            </div>
                            <div className="assesments">
                                <h3>Networking</h3>
                                <p>Connect with other investors and founders to expand professional networks.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="faq-top-container">
                <div id="faq" className="faq-container">
                    {faqs.map((faq) => (
                        <div key={faq.id} className="faq-item">
                            <div className="faq-header">
                                <button
                                    className={`dropdown-button ${faq.isOpen ? 'open' : ''}`}
                                    onClick={() => toggleFAQ(faq.id)}
                                >
                                    {faq.isOpen ? '▼' : '►'}
                                </button>
                                <h4>{faq.question}</h4>
                            </div>
                            {faq.isOpen && <h4 className="answer">{faq.answer}</h4>}
                        </div>
                    ))}
                </div>
            </div> */}
            <div className=" px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div id="faq" className=" grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                    {faqs.map((faq,index) => (
                        <a key={index} className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800" href="#">
                        <div className="p-4 md:p-5">
                          <div className="flex gap-x-5">
                            {/* <svg className="mt-1 shrink-0 size-5 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                   */}
                            <div className="grow">
                              <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200">
                              {faq.question}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-neutral-500">
                              {faq.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                </div>
            </div>

            <div className="startup_benefit_container">
                <div className="assessment_heading_container">
                    <h2 className="comprensive-heading">
                        Benefits for Startups
                    </h2>
                </div>
                <div className="assesment_sub_container">
                    <div className="startup_sub_container">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="-mb-6">
                                <Image width={54} height={54} src="https://img.icons8.com/3d-fluency/94/visible.png" alt="visible" />
                            </div>
                            <div className="assesments text-center">
                                <h3>Visibility</h3>
                                <p>Reach a wider pool of potential investors.</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="-mb-6">
                                <Image width={54} height={54} src="https://img.icons8.com/external-beshi-flat-kerismaker/48/external-Connections-startup-beshi-flat-kerismaker.png" alt="Connections" />
                            </div>
                            <div className="assesments text-center">
                                <h3>Connections</h3>
                                <p>Forge meaningful relationships with investors.</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="-mb-6">
                                <Image width={54} height={54} src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-efficiency-productivity-flaticons-lineal-color-flat-icons-2.png" alt="Efficiency" />
                            </div>
                            <div className="assesments text-center">
                                <h3>Efficiency</h3>
                                <p>Streamline the fundraising process.</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="-mb-6">
                                <Image width={54} height={64} src="https://img.icons8.com/external-parzival-1997-outline-color-parzival-1997/64/external-efficiency-digital-globalization-parzival-1997-outline-color-parzival-1997.png" alt="Growth" />
                            </div>
                            <div className="assesments text-center">
                                <h3>Growth</h3>
                                <p>Access capital to fuel business expansion.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="management_container">
                <h2 className="comprehensive-heading text-center py-4">
                    Benefits for Investors
                </h2>
                <div className="management_sub">
                    <div className="management_image">
                        <Image width={400} height={400} src="https://res.cloudinary.com/dso7gnmps/image/upload/v1721547217/51ZRsH_30He2mCH9Jxrf7_gcvxqd.png" alt="Meeting illustration" />
                    </div>

                    <div>
                        <div className="number_image">
                            <span className="pr-6">
                                <Image width={100} height={100} src="https://img.icons8.com/clouds/100/1.png" alt="1" />
                            </span>
                            <div>
                                <h3 className="mb-1">Discovery</h3>
                                <p>Easily browse a curated selection of promising startups.</p>
                            </div>
                        </div>

                        <div className="number_image">
                            <span className="pr-6">
                                <Image width={110} height={110} src="https://img.icons8.com/clouds/100/2--v2.png" alt="2" />
                            </span>
                            <div>
                                <h3 className="mb-1">Evaluation</h3>
                                <p>Analyze comprehensive company profiles and performance data.</p>
                            </div>
                        </div>

                        <div className="number_image">
                            <span className="pr-6">
                                <Image width={100} height={100} src="https://img.icons8.com/clouds/100/3.png" alt="3" />
                            </span>
                            <div>
                                <h3 className="mb-1">Investment</h3>
                                <p>Streamline the investment process and manage your portfolio.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="footer-container">
                <div className="footer-sub">
                    <h1>Funding Platforms for Startups</h1>
                    <p>Fundraising platforms connect ambitious startups with accredited investors, providing tools to pitch ideas, research companies, and manage investments.</p>
                    <div className="py-4 text-center md:text-left">
                        <Link href="/role">
                            <button className="explore-btn w-3/4 md:w-auto">
                                Explore Platforms
                            </button>
                        </Link>
                        <Link href="/role">
                            <button className="find_investor_btn w-full md:w-auto mt-4 md:mt-0 md:ml-4">
                                Find Investors
                            </button>
                        </Link>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default LandingPage;




