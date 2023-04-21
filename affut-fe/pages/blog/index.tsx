import fs from 'fs';
import matter from 'gray-matter';
import { NextPage } from "next";
import { useRouter } from 'next/router';
import path from 'path';
import s from '../../styles/blog.module.scss';

interface BlogProps { 
  posts : any
}

const Blog: NextPage<BlogProps> = ({posts}) => {
  const router = useRouter()

  return (
    <div className={s.blog}>
      <div className={s.articles}>
        {posts.map(post => {
          const {slug, frontmatter} = post
          const {title, date, banner} = frontmatter
          return (
            <article onClick={() => router.push(`/blog/posts/${slug}`)} className={s.article} key={title}>
              <img src={`images/blog/${banner}`} alt="article image" />
              <div className={s.article__data}>
                <h1>{title}</h1>
                <h3>{date}</h3>
              </div>
            </article>
          )
        })}

      </div>

    </div>
  )
}

export default Blog;
//Generating the Static Props for the Blog Page
export async function getStaticProps(){
  // get list of files from the posts fsolder
  const files = fs.readdirSync(path.join(process.cwd(), 'pages/blog/posts')).filter((file) => file.includes(".md"))

  // get frontmatter & slug from each post
  const posts = files.map((fileName : string) => {
    const slug = fileName.replace('.md', '');
    const postPath = path.join(process.cwd(), `pages/blog/posts/${fileName}`)
    const readFile = fs.readFileSync(postPath, 'utf-8');
    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      frontmatter,
    };
  });

  // Return the pages static props
  return {
    props: {
      posts,
    },
  };
}