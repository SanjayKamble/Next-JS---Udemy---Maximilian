import Head from "next/dist/shared/lib/head";

import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/post-utils";

function AllPostPage(props) {
    return <>
    <Head>
        <title>All posts</title>
        <meta name="description" content='Here all the posts are being seen'></meta>
    </Head>
    <AllPosts posts={props.posts} />
    </>
    

    
} 

export function getStaticProps(){
        const allPosts = getAllPosts();

        return {
            props :{
                posts:allPosts
            } 
        }
}


export default AllPostPage;