import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import React, { FC, useEffect } from 'react';
import { BurgerMenu } from '../../styles/icons/burgerMenu';
import s from './menu.module.scss';
import Image from 'next/image'

const Menu: FC = () => {
  const { user } = useUser();
  // For clarity, we save a formatted version of Auth0 user ID in the local storage.
  // We had to use useMemo because useEffect doesn't work. We need to have a function called from userProvider to have access to the user data.
  useEffect(() => {
    if (user?.sub) {
      localStorage.setItem('userId', user.sub.substring(6));
    }
  }, [user?.sub]);

  const onLogout = () => {
    // Seems we can't custom enough auth0 + nextJs to remove the localStorage on logout, middleware doesn't seems to work too, so here it is.
    localStorage.removeItem('userId')
  }

  return (
    <header className={s.header} >
      <div className={s.header__container}>        
        <div className={s.logo}>
          <Image src="/images/affut-logo.png" className={s.img} alt="background texture" fill quality={100} />
        </div>
        <>       
          <input className={s.menuBtn} type="checkbox" id={s.menuBtn} />
          <label className={s.menuIcon} htmlFor={s.menuBtn}><span className="navicon"><BurgerMenu /></span></label>
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