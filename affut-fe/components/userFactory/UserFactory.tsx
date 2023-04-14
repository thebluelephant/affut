import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import { getUserSubscriptions } from '../../services/api/stripe.api';
import { AppContext } from '../../services/context/state';

const UserFactory = ({children}) => {
  const [userSubscription, setUserSubscription] = useState<string>()
  const { user } = useUser()

  // For clarity, we save a formatted version of Auth0 user ID in the local storage.
  // We had to use useMemo because useEffect doesn't work. We need to have a function called from userProvider to have access to the user data.
  useEffect(() => {
    if (user?.sub) {
      localStorage.setItem('userId', user.sub.substring(6));
    }
  }, [user?.sub]);


  useEffect(() => {
    if (user && user.stripeId) {
      getUserSubscriptions(user.stripeId).then((subscription) => setUserSubscription(subscription))
    }
  }, [user]);
  
  return <AppContext.Provider value={{subscription : userSubscription, userId : user?.sub?.substring(6) ?? '' }}>{children}</AppContext.Provider>
};

export default UserFactory;