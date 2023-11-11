import Image from 'next/image'
import { Inter } from 'next/font/google'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import styles from '../styles/Home.module.css'
import Link from 'next/link'



const inter = Inter({ subsets: ['latin'] })

const Home = (props: {
  posts: [
    {
      slug: string
      frontMatter: { [key: string]: string}
    }
  ]
}) => {
    return (
      <div className={styles.container}>
        {props.posts.map(({ slug, frontMatter: { title, description }}) => (
          // By specifying passHref, an a tag can be specified for a child element.
          <Link key={slug} href={`blog/${slug}`} passHref>
            <h5>{title}</h5>
            <p>{description}</p>
            <hr />
          </Link>
        ) )}
      </div>
    )
}

export async function getStaticProps() {
  // get files at post dir
  const files = fs.readdirSync(path.join('posts'))

  const posts = files
    .filter((filename) => filename.includes('.md'))
    .map((filename) => {
      const slug = filename.replace('.md', '')
      const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
      const { data: frontMatter } = matter(markdownWithMeta)
      return {
        slug,
        frontMatter
      }
    })
    .sort((a,b) => new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime())

  return {
    props: {
      posts,
    },
  }
}

export default Home


