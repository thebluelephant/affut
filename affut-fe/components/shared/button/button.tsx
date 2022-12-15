import React, { FC, ReactElement } from 'react';
import styles from './button.module.scss';

type ButtonProps = {
    title: string,
    type: 'primary',
    onButtonClick: () => void,
}

const Button: FC<ButtonProps> = ({ title, type, onButtonClick }): ReactElement => {

    return (
        <div className={`${styles.button} ${type === "primary" ? styles.button__primary : ''}`} onClick={onButtonClick}>
            <p className='title'>{title}</p>
        </div>
    )
};

export default Button;