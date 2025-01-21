import Classes from './page.module.css';
import Image from 'next/image';
import { UpdatePostsProps } from './types';

const UpdatePosts: React.FC<UpdatePostsProps> = ({postTitle, postImg, postedBy, postTags})=>{
    return(
        <div className={Classes.post_card}>
            <h2 className={Classes.post_title}>{postTitle}</h2>

            <div className={Classes.podcast_content}>
                    <Image
                        src={postImg.src}
                        alt={postImg.alt}
                        className={Classes.podcast_image}
                        width={postImg.height}
                        height={postImg.width}
                    />
            </div>

            <div className={Classes.profile}>
                    <Image 
                        src={postedBy.src}
                        alt={postedBy.alt} 
                        className={Classes.profile_image}
                        width={postedBy.height}
                        height={postedBy.width} 
                    />
                    <div className={Classes.profile_info}>
                        <a href="#" className={Classes.profile_name}>
                            {postedBy.name}
                        </a>{" "}
                        {postedBy.date}
                        <div className={Classes.profile_title}>
                            {postedBy.role}
                        </div>
                    </div>

                    <div className={Classes.tags}>
                        {
                            postTags.length > 0 ? (
                                postTags.map((obj)=>(
                                    <a key={obj.id} href="#" className={Classes.tag}>
                                        {obj.text}
                                    </a>
                                ))
                            ) : null
                        }
                    </div>
                </div>
        </div>
    );
}

export default UpdatePosts;