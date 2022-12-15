import React, { FC, ReactElement } from 'react';
import styles from './title.module.scss';

type TitleProps = {
    title: string
}

const Title: FC<TitleProps> = ({ title }): ReactElement => {

    return (
        <p>{title}</p>
    )
};

export default Title;