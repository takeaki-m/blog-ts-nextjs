import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {Marked} from 'marked'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import hljs from 'highlight.js'
import {markedHighlight} from 'marked-highlight'




// const marked = new Marked(
//   markedHighlight({
//     langPrefix: 'hljs language-',
//     highlight(code, lang) {
//       const language = hljs.getLanguage(lang) ? lang : 'plaintext';
//       return hljs.highlight(code, { language }).value;
//     }
//   })
// );

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);

// Make BlogPost
// get frontMatter, slug and content from props
// key: retrieve the contents of the frontMatter based on keys such as title and description.
const BlogPost = ({ frontMatter, content, slug }) => {
  return (
    <>
      <NextSeo
        title={frontMatter.title}
        description={frontMatter.description}
        openGraph={{
          type: 'website',
          url: `TODO`,
          title: frontMatter.title,
          description: frontMatter.description,
        }}
      />
      <div className="prose dark:prose-invert">
        <h1 className="mt-12">{frontMatter.title}</h1>
        <span>{frontMatter.date}</span>
        <div dangerouslySetInnerHTML={{ __html: marked.parse(content) }} />
      </div>
    </>
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
  const { data, content } = matter(markdownWithMeta)
  return {
    props: {
      frontMatter: data,
      content,
      slug: slug
    }
  }
}
