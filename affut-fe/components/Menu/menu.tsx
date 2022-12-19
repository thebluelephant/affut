import Link from 'next/link';
import React, { FC } from 'react';
import { BurgerMenu } from '../../styles/icons/burgerMenu';
import styles from './menu.module.scss';

type MenuProps = {
}

const Menu: FC<MenuProps> = () => {
    return (<header className={`${styles.header}`}>
        <input className={`${styles.menuBtn}`} type="checkbox" id={`${styles.menuBtn}`} />
        <label className={`${styles.menuIcon}`} for={`${styles.menuBtn}`}><span className="navicon"><BurgerMenu /></span></label>
        <ul className={`${styles.menu}`}>
            <li><Link href="/">Accueil</Link></li>
            <li><Link href="/research">Rechercher</Link></li>
            <li><Link href="/followup">Suivi</Link></li>

        </ul>
    </header>
    )
};

export default Menu;