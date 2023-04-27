import { useUser } from '@auth0/nextjs-auth0/client';
import  { useRouter } from 'next/router';
import { FC, useEffect, useState,  } from "react";
import Popin from '../components/shared/popin/popin';
import s from '../styles/checkout.module.scss';
import {  getUserSubscriptions, updateUserMetadata } from "../services/api/stripe.api";
import Title from '../components/shared/title/title';


const Checkout: FC = () => {
  const router = useRouter()
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const {user} = useUser()
  const [isLoaded, setIsLoaded] = useState(false)
  const [stripeSessionId, setStripeSessionId] = useState<string>()
  const [stripeUserId, setStripeUserId] = useState<string>()
  const [shouldOpen, setShouldOpen] = useState<boolean>(false)

  useEffect(() => {
    // We need to use a timeOut to let the component load the router and the user from auth0
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const showLogoutPopinAndLogout =() => {
    const timer = setTimeout(() => {
      setShouldOpen(false)
      router.push('api/auth/logout')
    }, 3000);
    return () => clearTimeout(timer);
  }

  const userNeedMetadataUpdate = () => {
    if (stripeSessionId && userId) {
      // If user just subscribed
      updateUserMetadata(stripeSessionId, userId).then(() => {setShouldOpen(true) ;  showLogoutPopinAndLogout()})
    } else if (stripeUserId && userId) {
      // If we have a stripeId in Auth0 metadata, we get the stripe subscription linked to it
      getUserSubscriptions(stripeUserId).then((subscription) => {
        if (!subscription.length){
          // If there's no subscription, it means the user has no active plan and we need to delete the auth0 metadata "stripeId" by passing 'null' value
          updateUserMetadata(null, userId).then(() => {setShouldOpen(true) ; showLogoutPopinAndLogout()})
        } else {router.push('/dashboard')}
      })
    }
  }

  useEffect(() => {
    if (stripeSessionId || stripeUserId)
      userNeedMetadataUpdate()
  }, [stripeSessionId, stripeUserId]);

  useEffect(() => {
    if (isLoaded){
      if (router.query.session_id){
        setStripeSessionId(router.query.session_id as string)    
      }
      if (user && user.stripeId) {
        setStripeUserId(user.stripeId as string)
      }
      if (!router.query.session_id && !user?.stripeId){        
        router.push('/dashboard')
      }
    }
  }, [isLoaded]);


  return (
    <Popin shouldOpen={shouldOpen} onPopinCrossClicked={() => setShouldOpen(false)}>
      <span className={s.checkout__popin}>      
        <Title title={'Un petit détour pour de grandes améliorations !'} />
        <p> Nous devons vous déconnecter pour mettre à jour vos informations. <br/> Connectez-vous simplement à nouveau pour continuer à utiliser l'application 😉</p>
      </span>
    </Popin>
  )
}

export default Checkout;