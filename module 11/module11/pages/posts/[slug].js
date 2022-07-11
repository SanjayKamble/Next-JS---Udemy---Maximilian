import Head from "next/dist/shared/lib/head";
import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/post-utils";

function PostDetailPage(props) {
    return <>
    <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt}></meta>
    </Head>
    <PostContent post ={props.post}/>
    </>
} 

export function getStaticProps(context){
    const {params} = context;
    const {slug} = params;

   const postData = getPostData(slug);


    return {
        props:{
            post:postData
        },revalidate : 600
    }
}
// we use getStaticPath() to let nextjs to know which concrete slug value it should pregenerate 
export function getStaticPaths(){
    const postFileNames = getPostsFiles();
    const slugs = postFileNames.map(fileName=>fileName.replace(/\.md$/,''));
    return {
        paths : slugs.map((slug) => ({params :{slug:slug}})),
        fallback : 'blocking'
    }
}

export default PostDetailPage;