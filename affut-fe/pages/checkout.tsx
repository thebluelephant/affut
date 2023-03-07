import { useUser } from '@auth0/nextjs-auth0/client';
import  { useRouter } from 'next/router';
import { useCallback, useEffect, useState,  } from "react";

import {  getUserSubscriptions, updateUserMetadata } from "../services/api/stripe.api";


const Checkout: () => void = () => {
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const [stripeSessionId, setStripeSessionId] = useState()
  const [stripeUserId, setStripeUserId] = useState()
  const router = useRouter()
  const {user} = useUser()

  useEffect(() => {
    if (router.query.session_id){
      setStripeSessionId(router.query.session_id)
    }
    if (user && user.stripeId){
      setStripeUserId(user.stripeId)
    }
  }, [router.query.session_id, user]);

  const userNeedMetadataUpdate = useCallback(() => {
    if (stripeSessionId && userId) {
      // If user just subscribed
      updateUserMetadata(stripeSessionId, userId).then(() => router.push('api/auth/logout'))
    } else if (stripeUserId && userId) {
      // If user has a StripeID in metadata, but doesn't have a subscription anymore, we delete the StripeId metadata by passing 'null' value
      getUserSubscriptions(stripeUserId).then((subscription) => {
        if (subscription && !subscription.length){
          updateUserMetadata(null, userId).then(() => router.push('api/auth/logout'))
        }
      })
    } else {
      router.push('/home')
    }
  }, [router, stripeSessionId, stripeUserId, userId]);

  useEffect(() => {
    userNeedMetadataUpdate()
  }, [stripeSessionId, stripeUserId, userNeedMetadataUpdate]); 
}

export default Checkout;