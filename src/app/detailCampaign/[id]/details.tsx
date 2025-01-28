//import Image from 'next/image';
import Classes from './page.module.css';
import FeaturedInvestor from './featured_investor';
import TeamMember from './team';
import Highlights from './highlights';
import KeyPoints from './keypoints';
import { DetailsProps } from './types';
import React from 'react';

const Details: React.FC<DetailsProps> = ({highlights, keypoints, featuredInvestor, teamMember})=>{
    return(
        <div className={'bg-[#0a0b1e] p-4 body'}>
            <h1 className={Classes.h1}>Company Highlights</h1>

            <div className={Classes.highlights_grid}>
                {
                    highlights.length ? (
                        highlights.map((obj) => (
                            <Highlights key={obj.id} title={obj.title} desc={obj.desc} />
                        ))
                    ) : null
                }


                
            </div>

            <div className={Classes.key_points}>
                {
                    keypoints.length ? (
                        keypoints.map((obj) => (
                            <KeyPoints key={obj.id} desc={obj.text} />
                        ))
                    ) : null
                }

            </div>

            <h1 className={`mt-4 ${Classes.h1}`}>Featured Investors</h1>

            {
                featuredInvestor.length ? (
                    featuredInvestor.map((obj) => (
                        <FeaturedInvestor key={obj.id} investorPic={obj.investorPic} investorName={obj.investorName} investorTitle={obj.investorTitle} investmentAmt={obj.investmentAmt} investorCmt={obj.investorCmt} />
                    ))
                ) : null
            }

            

            

            <div className={Classes.see_more}>
                <a href="#">See more investor reviews</a>
            </div>

            <h1 className={Classes.h1}>Our Team</h1>

            

            {
                teamMember.length ? (
                    teamMember.map((obj) => (
                        <TeamMember key={obj.id} teamMemberPic={obj.teamMemberPic} teamMemberName={obj.teamMemberName} teamMemberTitle={obj.teamMemberTitle} />
                    ))
                ) : null
            }

            {/*
            <TeamMember teamMemberPic={"/company_dummy_logo.jpg"}></TeamMember>
            */}

            <div className={Classes.see_more}>
                <a href="#">Show More</a>
            </div>


        </div>
    );
}

export default Details;