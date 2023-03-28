import { UserProvider } from '@auth0/nextjs-auth0/client';
import '../styles/globals.scss'
import Image from 'next/image'
import type { AppProps } from 'next/app'
import Menu from '../components/Menu/menu'
import Subscription from '../components/Hello/Subscription.tsx/subscription';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const [openSubscriptionPopin, setOpenSubscriptionPopin] = useState<boolean>(false)
  const { push } = useRouter();

  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/_error")
      push('/hello');
  }, []);

  return <UserProvider>
    <>
      <div className='app'>
        <Menu onSubscriptionClick={() => setOpenSubscriptionPopin(true)}/>
        <div className='appBody'>
          <Component {...pageProps}/>
        </div>
      </div>
      <Subscription onClose={() => setOpenSubscriptionPopin(false)} isOpen={openSubscriptionPopin}/>
    </>
  </UserProvider>
}
