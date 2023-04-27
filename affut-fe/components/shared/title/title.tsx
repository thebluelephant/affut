import React, { FC, ReactElement } from 'react';
import s from './title.module.scss';

type TitleProps = {
    title: string
    type?: string
}

const Title: FC<TitleProps> = ({ title, type = 'primary' }): ReactElement => {

  return (
    <div className={`${s.title} ${s[`title__${type}`]}`}>
      <span className={`${s.underline}`} />
      <p className={`${s.text}`}>{title}</p>

    </div>
  )
};

export default Title;