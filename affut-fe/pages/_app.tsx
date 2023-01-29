import { UserProvider } from '@auth0/nextjs-auth0/client';
import '../styles/globals.scss'
import Image from 'next/image'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {

  return <UserProvider>
    <>
      <div className='app'>
        <div className='appBody'>
          <Component {...pageProps} />
        </div>
        <Image className='background-texture' src="/background-texture.png" alt="background texture" fill
          objectFit='cover'
          quality={100} />
      </div>
    </>
  </UserProvider>
}
