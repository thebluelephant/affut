import fs from "fs";
import matter from "gray-matter";
import md from 'markdown-it';
import Link from "next/link";
import path from "path";
import s from "../../../styles/slug.module.scss"

// The page for each post
export default function Post({frontmatter, content}) {
  const {title, date, banner, tags} = frontmatter
  return (
    <main className={s.slug} >
      <div className={s.slug__header}>
        <Link href={'/blog'}>Retour</Link>
      </div>
      <article className={s.article}>
        <img src={`/images/blog/${banner}`} alt={`image-article-${title}`}/>
        <div className={s.article__data}>
          <h1>{title}</h1>
          <div className={s.content} dangerouslySetInnerHTML={{ __html: md().render(content) }} />
          <h3 className={s.footer}>
            {date}
            <span>{tags?.map((tag : string) => <p className={s.tag} key={tag}>{tag}</p>)}</span> 
          </h3>
        </div>
      </article>
    </main>
  )
}

// Generating the paths for each post
export async function getStaticPaths() {
  const postPath = path.join(process.cwd(), `pages/blog/posts/`)
  const files = fs.readdirSync(postPath).filter((file) => file.includes(".md"));

  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}


// Generate the static props for the page
export async function getStaticProps({ params: { slug } }) {
  const articlePath = path.join(process.cwd(), `pages/blog/posts/${slug}.md`)
  const fileName = fs.readFileSync(articlePath, 'utf-8');
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
    },
  };
}