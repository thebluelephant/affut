import { NextPage } from "next";
import fs from 'fs';
import matter from 'gray-matter';
import SubscriptionCard from "../components/Dashboard/SubscriptionCard/SubscriptionCard";
import s from '../styles/dashboard.module.scss';
import FollowupsChartCard from "../components/Dashboard/FollowupsChartCard/FollowupsChartCard";
import Title from "../components/shared/title/title";
import path from "path";
import BlogCard from "../components/Dashboard/BlogCard/BlogCard";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface HomeProps {
  blogPosts : { frontmatter: { banner: string; date: string; title: string; }; slug: string; }[]
}

const Dashboard: NextPage<HomeProps> = ({blogPosts}) => {
  const {user} = useUser() 
  const router = useRouter()

  // Need to use this trick because we can't combine "getServerSideProps = withPageAuthRequired()" and "getStaticProps()"
  useEffect(() => {
    if (!user) router.push('/hello') 
  }, [user]);
  
  return (
    <>
      {
        user && <div className={s.dashboard}>
          <div className={s.dashboard__header}>
            <div className={s.dashboard__header__title}>
              <Title title="Hello !" type="major"/>
              &#128075;
            </div>
           
          </div>   
          <div className={s.dashboard__body}>
            <span className={s.cards}>
              <SubscriptionCard/>
              <FollowupsChartCard/>
              <BlogCard lastPost={blogPosts?.[0]}/>
            </span>
          </div>

        </div>
      }
    </>
  )

}

export default Dashboard;

//Generating the Static Props for the Blog Page
export async function getStaticProps(){
  // get list of files from the posts fsolder
  const files = fs.readdirSync(path.join(process.cwd(), 'pages/blog/posts')).filter((file) => file.includes(".md"))

  // get frontmatter & slug from each post
  const blogPosts = files.map((fileName : string) => {
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
      blogPosts,
    },
  };
}

