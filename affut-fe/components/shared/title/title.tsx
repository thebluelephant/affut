import React, { FC, ReactElement } from 'react';
import styles from './title.module.scss';

type TitleProps = {
    title: string
    type?: string
}

const Title: FC<TitleProps> = ({ title, type = 'primary' }): ReactElement => {

    return (
        <div className={`${styles.title}`}>
            <span className={`${styles.underline}`} />
            <p className={`${styles.text} ${type === "primary" ? styles.text__primary : ''}`}>{title}</p>

        </div>
    )
};

export default Title;