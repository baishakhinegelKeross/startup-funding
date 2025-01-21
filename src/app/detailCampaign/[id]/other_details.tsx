'use client'

import { nanoid } from 'nanoid';
import { useState } from 'react';
import Classes from './page.module.css';
import Details from './details';
import Updates from './updates';
import Comments from './comments';
import QnA from './questions_answers';
import PITCH from './pitch';

const highlights = [
    {
        id: nanoid(),
        title: "VC-Backed",
        desc: "Raised $250K or more from a venture firm"
    },
    {
        id: nanoid(),
        title: "Fast Growth",
        desc: "Revenue growing 2X/yr for at least prior 6 months"
    },
    {
        id: nanoid(),
        title: "$5M+ Revenue",
        desc: "Earned over the last 12 months"
    }
]

const keypoints = [
    {
        id: nanoid(),
        text: '1. Revenue grew 5.2x to $7.2M in 2023'
    },
    {
        id: nanoid(),
        text: '2. Pioneering transformation of a $438B personal security market with AI-powered platform'
    },
    {
        id: nanoid(),
        text: '3. Signed deal with a global brand that aims to offer Bond to its ~200M customers worldwide'
    },
    {
        id: nanoid(),
        text: '4. Customers among the top 3 in smartphone, credit card, sports apparel, home health, and other sectors'
    },
    {
        id: nanoid(),
        text: '5. Founder has two previous tech exits totaling over $900M'
    },
    {
        id: nanoid(),
        text: '6. Over $100M and 250 engineering years invested in developing the platform'
    },
    {
        id: nanoid(),
        text: '7. Existing investors include prominent venture capital firms and multiple billionaires'
    },
    {
        id: nanoid(),
        text: '8. We have already helped members in over a million situations, including emergencies'
    },
]

const featuredInvestor = [
    {
        id: nanoid(),
        investorPic: "/company_dummy_logo.jpg",
        investorName: "Adam Draizin",
        investorTitle: "Syndicate Lead",
        investmentAmt: "Invested $365,530",
        investorCmt: "I have known Doron for nearly 30 years, since we met in our daily first year Business School study group. I have known Doron to be a born leader and trailblazer. I have successfully bet on his success before, and I am doing it again. With Bond, Doron is creating a new market with an innovative AI-powered platform that revolutionizes personal security and safety. The opportunity could be the next Unicorn. If corporations, governments and consumers value the dynamic offering that Bond provi..."
    },
]

const teamMember = [
    {
        id: nanoid(),
        teamMemberPic: "/company_dummy_logo.jpg",
        teamMemberName: "Doron Kempel",
        teamMemberTitle: "CEO"
    }
]

const OtherDetails = ()=>{
    const [active, setActive] = useState<string>('DETAILS');

    const toggleBtnState = function (val : string){
        setActive(val);
    }

    return(
        <>
            <section className="flex flex-col w-full mt-10 p-2">
                <article className='mb-10'>
                    <div>
                        <button type="button" className={`me-2 text-sm ${active == 'DETAILS' ? Classes.btn_active : Classes.btn_inactive}`} onClick={()=>toggleBtnState('DETAILS')}>DETAILS</button>
                        <button type="button" className={`me-2 text-sm ${active == 'UPDATES' ? Classes.btn_active : Classes.btn_inactive}`} onClick={()=>toggleBtnState('UPDATES')}>UPDATES</button>
                        <button type="button" className={`me-2 text-sm ${active == 'Comments' ? Classes.btn_active : Classes.btn_inactive}`} onClick={()=>toggleBtnState('Comments')}>COMMENTS</button>
                        <button type="button" className={`me-2 text-sm ${active == 'Q & A' ? Classes.btn_active : Classes.btn_inactive}`} onClick={()=>toggleBtnState('Q & A')}>Q &amp; A</button>

                        <button type="button" className={`text-sm ${active == 'PITCH' ? Classes.btn_active : Classes.btn_inactive}`} onClick={()=>toggleBtnState('PITCH')}>PITCH</button>
                    </div>
                </article>
                    
                <article className={active == 'DETAILS' ? 'p-2' : Classes.art_inactive}>
                    <Details highlights={highlights} keypoints={keypoints} featuredInvestor={featuredInvestor} teamMember={teamMember}></Details>
                </article>
                
                <article className={active == 'UPDATES' ? 'p-2' : Classes.art_inactive}>
                    <Updates></Updates>    
                </article>
                
                <article className={active == 'Comments' ? 'p-2' : Classes.art_inactive}>
                   <Comments></Comments>    
                </article>

                <article className={active == 'Q & A' ? 'p-2' : Classes.art_inactive}>
                    <QnA></QnA>     
                </article>

                <article className={active == 'PITCH' ? 'p-2' : Classes.art_inactive}>
                    <PITCH></PITCH>     
                </article>
            </section>
        </>
    )
}

export default OtherDetails;