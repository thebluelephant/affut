import { UserProvider } from '@auth0/nextjs-auth0/client';
import '../styles/globals.scss'
import Image from 'next/image'
import type { AppProps } from 'next/app'
import Menu from '../components/Menu/menu'
import UserFactory from '../components/userFactory/UserFactory';
import { AppContext } from '../services/context/state';

export default function App({ Component, pageProps }: AppProps) {
  return(
    <UserProvider>
      <UserFactory>
        <div className='app'>
          <Menu />
          <div className='appBody'>
            <AppContext.Consumer>
              { state => 
                <Component {...pageProps} appContext={state} />
              }
            </AppContext.Consumer>
          </div>

        </div>
      </UserFactory>
    </UserProvider>)
}
