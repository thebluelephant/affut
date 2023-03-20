import React, { FC, ReactElement } from 'react';
import s from './loader.module.scss';

const Loader: FC = (): ReactElement => <span className={s.loader}></span>

export default Loader;