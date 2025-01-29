import { nanoid } from 'nanoid';
import Classes from './page.module.css';
import CommentPosts from './comments_posts';

const comments = [
    {
        id: nanoid(),
        comment_img: "https://placehold.co/600x400.png?text=Post+Image",
        investor_name: "Bjorn Seegers",
        is_lead_investor: true,
        investment_amount: "Invested $25,000 this round + $25,000 previously",
        investor_message: `I was initially attracted to Qnetic because of its focus on clean energy.
                        What really convinced me to invest, however, was the team. The combined
                        experience of Mike, Malcolm, Loic, and Mathias—all at high levels in the
                        corporate world before moving into entrepreneurship—really impressed me.
                        When people with that kind of background come together with a shared
                        vision, it&apos;s a strong indicator of success.\n 
                        On top of that, I think the product is awesome. They have understood the
                        nuances of the problem and arrived at a stand-out solution. Lithium mining
                        and chemical batteries are big contradictions in the green energy space,
                        but Qnetic offers a genuine alternative. They&apos;re serious about making
                        green energy truly sustainable, and that&apos;s what sets them apart. With the
                        right financing, I believe this team can accomplish great things.`

    }
]

export default function Comments(){
    return(
    <div className="bg-[#0a0b1e] max-h-screen p-4">

        <div className='flex items-center flex-col'>
            <h1 className={Classes.h1}>What Investors Say</h1>

            {/*
            <div className={Classes.investor_card_2}>
                <Image
                    src="/company_dummy_logo.jpg"
                    alt="dummy"
                    className={Classes.investor_avatar}
                    width={20}
                    height={20}
                />
                <div className={Classes.investor_content}>
                    <h2 className={Classes.investor_name}>Bjorn Seegers</h2>
                    <div className={Classes.investor_meta}>
                        <span className={Classes.lead_investor_badge}>LEAD INVESTOR</span>
                        <span className={Classes.investment_info}>
                            Invested $25,000 this round + $25,000 previously
                        </span>
                    </div>
                    <p className={Classes.investor_quote}>
                        I was initially attracted to Qnetic because of its focus on clean energy.
                        What really convinced me to invest, however, was the team. The combined
                        experience of Mike, Malcolm, Loic, and Mathias—all at high levels in the
                        corporate world before moving into entrepreneurship—really impressed me.
                        When people with that kind of background come together with a shared
                        vision, it&apos;s a strong indicator of success.
                    </p>
                    <p className={Classes.investor_quote}>
                        On top of that, I think the product is awesome. They have understood the
                        nuances of the problem and arrived at a stand-out solution. Lithium mining
                        and chemical batteries are big contradictions in the green energy space,
                        but Qnetic offers a genuine alternative. They&apos;re serious about making
                        green energy truly sustainable, and that&apos;s what sets them apart. With the
                        right financing, I believe this team can accomplish great things.
                    </p>
                </div>
            </div>
            */}

            {
                comments.length ? (
                    comments.map((obj) => (
                        <CommentPosts key={obj.id} comment_img={obj.comment_img} investor_name={obj.investor_name} is_lead_investor={obj.is_lead_investor} investment_amount={obj.investment_amount} investor_message={obj.investor_message}></CommentPosts>
                    ))
                ) : null
            }

        </div>

    </div>
    );
}