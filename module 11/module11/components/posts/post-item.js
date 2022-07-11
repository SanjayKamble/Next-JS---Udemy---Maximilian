import Link from 'next/link';
import Image from 'next/image';
import classes from './post-item.module.css';

function PostItem(props) {
    const { title, image, excerpt, date, slug } = props.post;

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // the image which we get will be just image filename, so we need to construct the full path
    const imagePath =`/images/posts/${slug}/${image}`;
    // const imagePath =`/images/site/${image}`;
    // const imagePath =`/images/posts/${image}`;

    console.log(imagePath);

    const linkPath = `/posts/${slug}`;

    return <li className={classes.post}>

        <Link href={linkPath}>
            <a>
                <div className={classes.image}>
                    <Image src={imagePath} alt={title} width={300} height={200} layout='responsive'/>
                </div>
                <div className={classes.content}>
                    <h3>{title}</h3>
                    <time>{formattedDate}</time>
                    <p>{excerpt}</p>
                </div>
            </a>
        </Link>
    </li>
} export default PostItem;