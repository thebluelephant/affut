import { useContext } from 'react';
import { AppContext} from '../context/state';
import { coverLetter, followUp, premiumSubscription, research, starterSubscription } from '../variable/subscription';

export const useSubscriptionAccess = () => {
  const appContext = useContext(AppContext);

  const featureSubscription : Map<string, string> = new Map( [
    [coverLetter, premiumSubscription],
    [followUp, starterSubscription],
    [research, starterSubscription],
  ])

  const canAccess = (featureName : string) => appContext.subscription?.includes(featureSubscription.get(featureName))

  return {
    canAccess
  }

}