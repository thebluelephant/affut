import { useContext } from 'react';
import { AppContext} from '../context/state';
import { coverLetter, followUp, premiumSubscription, research, starterSubscription } from '../variable/subscription';

export const useSubscriptionAccess = () => {
  const appContext = useContext(AppContext);

  const featureSubscription : Map<string, string[]> = new Map( [
    [coverLetter, [premiumSubscription]],
    [followUp, [starterSubscription, premiumSubscription]],
    [research, [starterSubscription, premiumSubscription]],
  ])
  
  const canAccess = (featureName : string) => featureSubscription.get(featureName)?.includes(appContext.subscription)
  return {
    canAccess
  }

}