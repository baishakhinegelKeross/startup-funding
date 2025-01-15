'use client'

import Classes from './page.module.css';
import { useState } from 'react';
import Details from './details';
import Updates from './updates';
import Comments from './comments';
import QnA from './questions_answers';

export default function OtherDetails(){
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
                        <button type="button" className={`text-sm ${active == 'Q & A' ? Classes.btn_active : Classes.btn_inactive}`} onClick={()=>toggleBtnState('Q & A')}>Q &amp; A</button>
                    </div>
                </article>
                    
                <article className={active == 'DETAILS' ? 'p-2' : Classes.art_inactive}>
                    <Details></Details>
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
            </section>
        </>
    )
}

