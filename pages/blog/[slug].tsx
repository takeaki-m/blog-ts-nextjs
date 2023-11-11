import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {marked} from 'marked'
import styles from '../../styles/Home.module.css'
import Image from 'next/image'
// import React from 'react'
// import Footer from "@/pages/components/Footer/footer";
// import Header from "@/pages/components/Header/header";

// Make BlogPost
// get frontMatter, slug and content from props
// key: retrieve the contents of the frontMatter based on keys such as title and description.
const BlogPost = (props: { frontMatter: { [key: string]: string }; slug: string; content: string}) => {
  return (
    <div className={styles.container} >
      <div className="prose prose-sm sm:prose lg:prose-lg mx-auto prose-slate">
        {/* <Image className="thumbnail" src={props.frontMatter.thumbnail} alt={props.frontMatter.title} width = { 30 } height= { 30 }/>
        {/* convert md to html with marked */}
        <div dangerouslySetInnerHTML={{ __html: marked(props.content) }} />
      </div>
    </div>
  )
}

export default BlogPost

export async function getStaticPaths() {
  // get files in `posts` dir
  const files = fs.readdirSync(path.join('posts'))
  // pick up only .md files
  const paths = 
    // slug
    // a part of URI
    // e.g https://example.com/posts/test-post => `test-post` is slug
     files
      .filter((filename) => filename.includes('.md'))
      .map((filename) => ({
        params: {
          slug: filename.replace('.md', ''),
        },
      }))
  // fallback false 
  // default error procedure isn't active
  // if true, redirecting to 404 page when some errors occur
  return {
    paths,
    fallback: false,
  }
}
// ({ params: { slug }}: never) 
// slug: return of getStaticPaths
// never: 
export async function getStaticProps({ params: { slug }}: never) {
  // get .md files from post dir
  const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8')
  // get frontMatter and content
  // matter: module gets metadata of md files
  const { data : frontMatter, content } = matter(markdownWithMeta)
  return {
    props: {
      frontMatter,
      slug,
      content,
    },
  }
}
