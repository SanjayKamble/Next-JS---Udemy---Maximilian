import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

//this is absolute path to overall project folder
const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostsFiles(){
    return fs.readdirSync(postsDirectory);
}

//function to read and fetch data from markdown
export function getPostData(postIdentifier) {

    const postSlug = postIdentifier.replace(/\.md$/, '');// removes file extension
    const filePath = path.join(postsDirectory,`${postSlug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);


    const postData = {
        slug: postSlug,
        ...data,
        content,
    };

    return postData;
}


export function getAllPosts() {
    const postFiles = getPostsFiles();

   const allPosts= postFiles.map(postFile => {
        return getPostData(postFile)
    });

    const sortedPosts = allPosts.sort((postA, postB) => postA.date > postB.date ? -1 :1);

    return sortedPosts;
}

export function getFeaturedPosts(){
    const allPosts = getAllPosts();
    const featuredPost = allPosts.filter(post=>post.isFeatured);
    return featuredPost;
}