import { nanoid } from 'nanoid';
import Classes from './page.module.css';
//import Image from 'next/image';
import UpdatePosts from './update_posts';

const posts = [
    {
        id: nanoid(),
        postTitle: "CEO Interviewed on Kingscrowd's Podcast",
        postImg: {
            src: "https://placehold.co/600x400.png?text=Post+Image",
            alt: "Beyond Lithium-Ion: Qnetic's Sustainable Energy Solution",
            class: Classes.podcast_image,
            height: 20,
            width: 20
        },
        postedBy: {
            src: "/company_dummy_logo.jpg",
            alt: "CEO",
            name: "Michael Pratt",
            date: "12/01/2024",
            role: "Founder, CEO @ Qnetic Corporation",
            class: Classes.profile_image,
            width: 20,
            height: 20
        },
        postTags: [
            {
                id: nanoid(),
                text: "Sustainable Energy"
            },
            {
                id: nanoid(),
                text: "Clean Tech"
            },
            {
                id: nanoid(),
                text: "Renewable Power"
            },
            {
                id: nanoid(),
                text: "Energy storage"
            }
        ]
    }
];

export default function Updates(){
    return(
        <div className="bg-[#0a0b1e] max-h-screen p-4 flex justify-center">
            
            {/*
            <div className={Classes.post_card}>
                <div className={Classes.engagement}>
                    <div className={Classes.engagement_item}>
                        <span className={Classes.heart_icon}>♥</span>
                        <span>7</span>
                    </div>
                    <div className={Classes.engagement_item}>
                        <span>💬</span>
                        <span>3</span>
                    </div>
                </div>
                
                <h2 className={Classes.post_title}>CEO Interviewed on Kingscrowd&apos;s Podcast</h2>

                <div className={Classes.podcast_content}>
                    <Image
                        src="/company_dummy_logo.jpg"
                        alt="Beyond Lithium-Ion: Qnetic's Sustainable Energy Solution"
                        className={Classes.podcast_image}
                        width={20}
                        height={20}
                    />
                </div>

                <div className={Classes.profile}>
                    <Image 
                        src="/company_dummy_logo.jpg" 
                        alt="CEO" 
                        className={Classes.profile_image}
                        width={20}
                        height={20} 
                    />
                    <div className={Classes.profile_info}>
                        <a href="#" className={Classes.profile_name}>
                            Michael Pratt
                        </a>{" "}
                        on Jan 12
                        <div className={Classes.profile_title}>
                            Founder, CEO @ Qnetic Corporation
                        </div>
                    </div>
                </div>

                <div className={Classes.tags}>
                    <a href="#" className={Classes.tag}>
                        sustainable energy
                    </a>
                    <a href="#" className={Classes.tag}>
                        clean tech
                    </a>
                    <a href="#" className={Classes.tag}>
                        renewable power
                    </a>
                    <a href="#" className={Classes.tag}>
                        Energy storage
                    </a>
                </div>

                <div className={Classes.likes}>
                    <span className={Classes.heart_icon}>♥</span>
                    Michael Pratt, Gunter Van Den Bossche, Mario Johnson, and 4 others
                </div>
            </div>
            */}

            {
                posts.length ? (
                    posts.map((obj) => (
                        <UpdatePosts key={obj.id} postTitle={obj.postTitle} postImg={obj.postImg} postedBy={obj.postedBy} postTags={obj.postTags}></UpdatePosts>
                    ))
                ) : null
            }

        </div>
    );
}