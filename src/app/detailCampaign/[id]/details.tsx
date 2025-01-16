import Image from 'next/image';
import Classes from './page.module.css';

export default function Details(){
    return(
        <div className={'bg-white p-4 body'}>
            <h1 className={Classes.h1}>Company Highlights</h1>

            <div className={Classes.highlights_grid}>
                <div className={Classes.highlight_card}>
                    <h3 className={Classes.h3}>VC-Backed</h3>
                    <p>Raised $250K or more from a venture firm</p>
                </div>

                <div className={Classes.highlight_card}>
                    <h3 className={Classes.h3}>Fast Growth</h3>
                    <p>Revenue growing 2X/yr for at least prior 6 months</p>
                </div>

                <div className={Classes.highlight_card}>
                    <h3 className={Classes.h3}>$5M+ Revenue</h3>
                    <p>Earned over the last 12 months</p>
                </div>
            </div>

            <div className={Classes.key_points}>
                <div className={Classes.key_point}>
                    <p>1. Revenue grew 5.2x to $7.2M in 2023</p>
                </div>
                <div className={Classes.key_point}>
                    <p>2. Pioneering transformation of a $438B personal security market with AI-powered platform</p>
                </div>
                <div className={Classes.key_point}>
                    <p>3. Signed deal with a global brand that aims to offer Bond to its ~200M customers worldwide</p>
                </div>
                <div className={Classes.key_point}>
                    <p>4. Customers among the top 3 in smartphone, credit card, sports apparel, home health, and other sectors</p>
                </div>
                <div className={Classes.key_point}>
                    <p>5. Founder has two previous tech exits totaling over $900M</p>
                </div>
                <div className={Classes.key_point}>
                    <p>6. Over $100M and 250 engineering years invested in developing the platform</p>
                </div>
                <div className={Classes.key_point}>
                    <p>7. Existing investors include prominent venture capital firms and multiple billionaires</p>
                </div>
                <div className={Classes.key_point}>
                    <p>8. Proven: We&apos;ve already helped members in over a million situations, including emergencies</p>
                </div>
            </div>

            <h1 className={`mt-4 ${Classes.h1}`}>Featured Investors</h1>

            <div className={Classes.investor_card}>
                <div className={Classes.investor_header}>
                    <div>
                        <Image src="/company_dummy_logo.jpg" alt="dummy_logo" height={50} width={50} />
                    </div>
                    <div>
                        <h3 className={Classes.investor_name}>Adam Draizin</h3>
                        <p className={Classes.investor_title}>Syndicate Lead</p>
                    </div>
                </div>
                <p className={Classes.investment_amount}>Invested $365,530</p>
                <p className={Classes.p_text}>&quot;I have known Doron for nearly 30 years, since we met in our daily first year Business School study group. I have known Doron to be a born leader and trailblazer. I have successfully bet on his success before, and I am doing it again. With Bond, Doron is creating a new market with an innovative AI-powered platform that revolutionizes personal security and safety. The opportunity could be the next Unicorn. If corporations, governments and consumers value the dynamic offering that Bond provi...&quot;</p>
                <a href="#" className={Classes.read_more}>Read More</a>
            </div>

            <div className={Classes.investor_card}>
                <div className={Classes.investor_header}>
                    <div>
                        <Image src="/company_dummy_logo.jpg" alt="dummy_logo" height={50} width={50} />
                    </div>
                    <div>
                        <h3 className={Classes.investor_name}>Kingscrowd Capital</h3>
                    </div>
                </div>
                <p className={Classes.investment_amount}>Invested $20,000</p>
                <p className={Classes.p_text}>Kingscrowd Capital is the first Data-Driven Fund in the Online Private Market.</p>
                <a href="https://kingscrowd.com" className={Classes.company_link}>kingscrowd.com</a>
                <p className={Classes.p_text}>&quot;Kingscrowd Capital has chosen to invest $20,000 in Our Bond. This decision reflects our confidence in the company&apos;s disruptive potential and ability to significantly impact the personal security space. Despite the inherent risks associated with such a high-growth, capital-intensive startup, Our Bond&apos;s innovative approach and strong leadership make it a compelling investment opportunity with the potential to shape the future of personal safety.&quot;</p>
            </div>

            <div className={Classes.see_more}>
                <a href="#">See more investor reviews</a>
            </div>

            <h1 className={Classes.h1}>Our Team</h1>

            <div className={Classes.team_card}>
                <div className='items-center'>
                    <div className='h-full min-w-28 me-2 relative'>
                        <Image src="/company_dummy_logo.jpg" fill alt="dummy_logo" />
                    </div>
                </div>
                <div>
                    <div className={Classes.team_member}>
                        <div>
                            <h3 className={Classes.team_name}>Doron Kempel</h3>
                            <p className={Classes.team_title}>CEO</p>
                        </div>
                    </div>
                    <p className={Classes.p_text}>Successful serial entrepreneur whose prior two startups were acquired for a combined value of ~$900,000,000. A former elite special ops commander, Doron advises leaders and heads of state on personal and national security. US citizen and Harvard MBA.</p>
                </div>
            </div>

            <div className={Classes.team_card}>
                <div className='items-center'>
                    <div className='h-full min-w-28 me-2 relative'>
                        <Image src="/company_dummy_logo.jpg" fill alt="dummy_logo" />
                    </div>
                </div>

                <div>
                    <div className={Classes.team_member}>
                        <div>
                            <h3 className={Classes.team_name}>Joe DeSalvo</h3>
                            <p className={Classes.team_title}>Global Head of Security and Professional Security Consulting Services</p>
                        </div>
                    </div>
                    <p className={Classes.p_text}>More than 20 years of experience in corporate security and investigations. Former Chief Security Officer of Blackstone, Charles Schwab & Co. and other corporations. Former FBI Special Agent, and United States Army veteran. Joe is an MBA graduate.</p>
                </div>
            </div>

            <div className={Classes.team_card}>
                <div className='items-center'>
                    <div className='h-full min-w-28 me-2 relative'>
                        <Image src="/company_dummy_logo.jpg" fill alt="dummy_logo" />
                    </div>
                </div>

                <div>
                    <div className={Classes.team_member}>
                        <div>
                            <h3 className={Classes.team_name}>Hezi Sayar</h3>
                            <p className={Classes.team_title}>Head of Engineering Operations</p>
                        </div>
                    </div>
                    <p className={Classes.p_text}>Hezi has 20 years of experience innovating in the fields of software development, data security and AI. Held positions at technology giants like Hewlett Packard and Micro Focus, as well as numerous startups. Hezi has a BCS in Computer Science.</p>
                </div>
                    
            </div>

            <div className={Classes.see_more}>
                <a href="#">Show More</a>
            </div>


        </div>
    );
}