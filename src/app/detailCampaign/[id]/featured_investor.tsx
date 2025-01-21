import Image from 'next/image';
import Classes from './page.module.css';
import React from 'react';
import { FeaturedInvestorProps } from './types';

const FeaturedInvestor: React.FC<FeaturedInvestorProps> = ({ investorPic, investorName, investorTitle, investmentAmt, investorCmt }) => {
    return (
      <div className={Classes.investor_card}>
        <div className={Classes.investor_header}>
          <div>
            <Image src={investorPic} alt="dummy_logo" height={50} width={50} />
          </div>
          <div>
            <h3 className={Classes.investor_name}>{investorName}</h3>
            <p className={Classes.investor_title}>{investorTitle}</p>
          </div>
        </div>
        <p className={Classes.investment_amount}>{investmentAmt}</p>
        <p className={Classes.p_text}>
          {investorCmt}
        </p>
        <a href="#" className={Classes.read_more}>Read More</a>
      </div>
    );
  };
  
  export default FeaturedInvestor;