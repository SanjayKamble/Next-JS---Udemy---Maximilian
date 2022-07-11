import PostHeader from './post-header';
import classes from './post-content.module.css';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

// const DUMMY_POST = {
//     slug: 'b-1',
//     title: 'Getting started with NextJS',
//     image: 'a.png',
//     date: '2022-08-20',
//     content: '# This is first post' //this is markdown
// }

function PostContent(props) {
    const { post } = props;
    const imagePath = `/images/posts/${post.slug}/${post.image}`;
    return <article className={classes.content}>
        <PostHeader title={post.title} image={imagePath}></PostHeader>
        <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
} export default PostContent;