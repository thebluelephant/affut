import { useRouter } from 'next/router';
import { FC } from 'react';
import s from './BlogCard.module.scss';
import Title from '../../shared/title/title';
import Card from '../../shared/card/card';

const BlogCard: FC = () => {
  const router = useRouter();


  return (
    <div className={s.blogCard}>
      <Card>
        <Title title="Blog"/>
        <div className={s.blogCard__body}>
          <p>Retrouvez les dernières nouveautés d'Affut sur le blog !</p>
          <div>
            <p>Lisez le dernier article</p>
          </div>
        </div>
      </Card>
    </div>
  )
};

export default BlogCard;