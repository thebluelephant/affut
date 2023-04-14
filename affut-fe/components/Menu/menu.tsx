import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import { BurgerMenu } from '../../styles/icons/burgerMenu';
import s from './menu.module.scss';
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useWindowDimensions } from '../../services/hooks/windowDimension';

const Menu: FC = () => {
  const { user } = useUser()
  const router = useRouter();
  const { windowWidth } = useWindowDimensions();

  const onLogout = () => {
    // Seems we can't custom enough auth0 + nextJs to remove the localStorage on logout, middleware doesn't seems to work too, so here it is.
    localStorage.removeItem('userId')
  }

  // Automatically close the reponsive menu when user navigates
  useEffect(() => {
    if (windowWidth && windowWidth < 900) {
      const handleRouteChangeStart = () => {
        const checkbox = document.getElementById('menuBtn') as HTMLInputElement
        if (checkbox) {
          checkbox.checked = false;
        }
      };
      router.events.on('routeChangeStart', handleRouteChangeStart);
      return () => {
        router.events.off('routeChangeStart', handleRouteChangeStart);
      };
    }
  }, [router, windowWidth]);

  return (
    <header className={s.header} >
      <div className={s.header__container}>        
        <div className={s.logo}>
          <Image src="/images/affut-logo.png" className={s.img} alt="background texture" fill quality={100} />
        </div>
        <>       
          <input className={s.menuBtn} type="checkbox" id='menuBtn' />
          <label className={s.menuIcon} htmlFor='menuBtn'><span className="navicon"><BurgerMenu /></span></label>
          <ul className={s.menu}>
            <li><Link href="/home">Accueil</Link></li>
            {
              user && 
              <>    
                <li><Link href="/research">Rechercher</Link></li>
                <li><Link href="/followup">Suivi</Link></li>
                <li><Link href="/cover-letter">Lettre de motivation</Link></li>
              </>
            }
            <li ><Link onClick={onLogout} href={`/api/auth/${user ? 'logout' : 'login'}`}>{user ? 'Déconnexion' : 'Connexion'}</Link></li>
          </ul>
        </>
      </div>
    </header>
  )
};

export default Menu;