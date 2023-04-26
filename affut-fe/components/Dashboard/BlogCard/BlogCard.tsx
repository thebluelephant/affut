import { useRouter } from 'next/router';
import s from './BlogCard.module.scss';
import Title from '../../shared/title/title';
import Card from '../../shared/card/card';
import { FC } from 'react';
import Button from '../../shared/button/button';
import DashboardCard from '../DashboardCard/DashboardCard';

interface BlogCardProps {
  lastPost : { frontmatter: { banner: string; date: string; title: string; }; slug: string; }
}

const BlogCard : FC<BlogCardProps> = ({lastPost}) => {
  const router = useRouter();
  const article = lastPost.frontmatter

  return (
    <DashboardCard 
      title="Blog"  
      button={{
        title: 'Accéder au blog',
        type: 'primary',
        onButtonClick: () => router.push('/blog')
      }}>
      <div className={s.blogCard}>
        <p className={s.blogCard__title}>Retrouvez les dernières nouveautés d'Affut sur le blog !</p>
        <div>
          <p className={s.blogCard__subtitle}>Lisez le dernier article :</p>
          <div className={s.blogCard__article} onClick={() => router.push(`/blog/posts/${lastPost.slug}`)}>
            <img src={`/images/blog/${article.banner}`} alt={`image-article-${article.title}`}/>
            <div className={s.title}>
              <p>{article.title}</p> - <p>{article.date}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>

  )
};

export default BlogCard