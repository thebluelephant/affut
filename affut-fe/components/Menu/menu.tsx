import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import React, { FC, useEffect } from 'react';
import { BurgerMenu } from '../../styles/icons/burgerMenu';
import styles from './menu.module.scss';

type MenuProps = {
}

const Menu: FC<MenuProps> = () => {
    const { user } = useUser();

    // For clarity, we save a formatted version of Auth0 user ID in the local storage.
    // We had to use useMemo because useEffect doesn't work. We need to have a function called from userProvider to have access to the user data.
    useEffect(() => {
        if (user?.sub) {
            localStorage.setItem('userId', user.sub.substring(6));
        }
    }, [user?.sub]);

    return (
        <>
            <header className={`${styles.header}`}>
                <input className={`${styles.menuBtn}`} type="checkbox" id={`${styles.menuBtn}`} />
                <label className={`${styles.menuIcon}`} htmlFor={`${styles.menuBtn}`}><span className="navicon"><BurgerMenu /></span></label>
                <ul className={`${styles.menu}`}>
                    <li><Link href="/">Accueil</Link></li>
                    <li><Link href="/research">Rechercher</Link></li>
                    <li><Link href="/followup">Suivi</Link></li>
                    <li><Link href={`/api/auth/${user ? 'logout' : 'login'}`}>{user ? 'Déconnexion' : 'Connexion'}</Link></li>
                </ul>
            </header>
        </>

    )
};

export default Menu;