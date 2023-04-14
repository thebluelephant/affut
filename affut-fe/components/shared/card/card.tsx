import React, { FC, ReactElement, ReactNode } from 'react';
import s from './card.module.scss';

type CardProps = {
  children?: ReactNode;
}

const Button: FC<CardProps> = ({ children }): ReactElement => {

  return (
    <div className={s.card}>
      {children}
    </div>
  )
};

export default Button;