import Image from 'next/image';
import Classes from './page.module.css';
import React from 'react';
import { TeamMemberProps } from './types';

const TeamMember: React.FC<TeamMemberProps> = ({ teamMemberPic })=>{
    return(
        <div className={Classes.team_card}>
            <div className='items-center'>
                <div className='h-full min-w-28 me-2 relative'>
                    <Image src={teamMemberPic} fill alt="dummy_logo" />
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
    )
}

export default TeamMember;