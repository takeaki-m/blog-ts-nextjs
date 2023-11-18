import Image from 'next/image'
import { Inter } from 'next/font/google'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import PostCard from '../components/PostCard'




const inter = Inter({ subsets: ['latin'] })


export async function getStaticProps() {
  // get files at post dir
  const files = fs.readdirSync(path.join('posts'))

  const posts = files
    .filter((filename) => filename.includes('.md'))
    .map((filename) => {
      const slug = filename.replace('.md', '')
      const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
      const { data } = matter(markdownWithMeta)
      return {
        frontMatter: data,
        slug,
      }
    })
    .sort((a,b) => new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime())

  return {
    props: {
      posts,
    },
  }
}

// gap-4は並べた記事の間にスペースを空ける設定
export default function Home({ posts }) {
  return (
    <div className='my-8'>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
// export default Home

// NOTE 最初の実装。tailwindcssを参照するサイトの実装に変更するためこちらはコメントアウト
//const Home = (props: {
//  posts: [
//    {
//      slug: string
//      frontMatter: { [key: string]: string}
//    }
//  ]
//}) => {
//    return (
//      <div className={styles.container}>
//        {props.posts.map(({ slug, frontMatter: { title, description }}) => (
//          // By specifying passHref, an a tag can be specified for a child element.
//          <Link key={slug} href={`blog/${slug}`} passHref>
//            <h5>{title}</h5>
//            <p>{description}</p>
//            <hr />
//          </Link>
//        ) )}
//      </div>
//    )
//}
//
//
