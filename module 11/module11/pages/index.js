
import { Fragment } from 'react';
import Head from 'next/dist/shared/lib/head';

import Hero from '../components/home-page/hero';
import FeaturedPosts from '../components/home-page/featured-posts';
import {getFeaturedPosts} from '../lib/post-utils'




function HomePage(props) {

    return (<Fragment>
        <Head>
            <title>Major Blog</title>
           <meta name='description' content='I post about front end technologies'></meta>
        </Head>
        <Hero />
        <FeaturedPosts posts={props.posts} />
    </Fragment>
    );
} 

export function getStaticProps(){
    const featuredPosts = getFeaturedPosts();
    return {
        props:{
            posts:featuredPosts
        },
        // revalidate:60
    }
}


export default HomePage;