import React, { FC, ReactElement } from 'react';
import s from './button.module.scss';

type ButtonProps = {
    title: string,
    type: 'primary' | 'secondary' | 'disabled',
    onButtonClick: () => void,
}

const Button: FC<ButtonProps> = ({ title, type, onButtonClick }): ReactElement => {

  return (
    <div className={`${s.button} ${s[`button__${type}`]}`} onClick={onButtonClick}>
      <p className='title'>{title}</p>
    </div>
  )
};

export default Button;