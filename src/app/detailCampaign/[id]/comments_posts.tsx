import Image from 'next/image';
import Classes from './page.module.css';
import { CommentPostProps } from './types';

const CommentPosts: React.FC<CommentPostProps> = ({comment_img, investor_name, is_lead_investor, investment_amount, investor_message}) => {
    return(
        <div className={Classes.investor_card_2}>
            <Image
                    src={comment_img}
                    alt="investor comment pic"
                    className={Classes.investor_avatar}
                    width={20}
                    height={20}
                />

            <div className={Classes.investor_content}>
                <h2 className={Classes.investor_name}>{investor_name}</h2>
                    <div className={Classes.investor_meta}>
                        {
                            is_lead_investor ? <span className={Classes.lead_investor_badge}>LEAD INVESTOR</span> : null
                        }
                        <span className={Classes.investment_info}>
                            {investment_amount}
                        </span>
                    </div>
                    <p className={Classes.investor_quote}>
                        {investor_message}
                    </p>
                </div>    
        </div>
    )
}

export default CommentPosts;