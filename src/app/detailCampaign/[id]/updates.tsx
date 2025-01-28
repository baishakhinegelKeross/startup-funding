import Classes from './page.module.css';
//import Image from 'next/image';
import UpdatePosts from './update_posts';

const posts = [
    {
        id: Date.now(),
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
                id: Date.now(),
                text: "Sustainable Energy"
            },
            {
                id: Date.now(),
                text: "Clean Tech"
            },
            {
                id: Date.now(),
                text: "Renewable Power"
            },
            {
                id: Date.now(),
                text: "Energy storage"
            }
        ]
    }
];

export default function Updates(){
    return(
        <div className="bg-[#0a0b1e] max-h-screen p-4 flex justify-center">
            
           

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