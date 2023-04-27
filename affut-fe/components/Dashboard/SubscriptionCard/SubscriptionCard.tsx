import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { FC, useContext } from 'react';
import { createUserSubscriptionPortal } from '../../../services/api/stripe.api';
import { CheckCircle } from '../../../styles/icons/check-circle';
import s from './SubscriptionCard.module.scss';
import { AppContext } from '../../../services/context/state';
import { subscriptionName } from '../../../services/utils/subscription';
import DashboardCard from '../DashboardCard/DashboardCard';

const SubscriptionCard: FC = () => {
  const { user } = useUser()
  const router = useRouter();
  const appContext = useContext(AppContext);

  const redirectToSubscriptionPortal = () => {
    if ( user && user.stripeId) {
      createUserSubscriptionPortal(user.stripeId as string).then((resp) => {
        if (resp.status === 200) {
          router.push(resp.data)
        }
      })
    }
  }

  return (
    <DashboardCard 
      title="Votre abonnement"
      button={{
        title:  subscriptionName.get(appContext.subscription) ? 'Gérer mon abonnement' : 'Devenir membre',
        type: 'primary',
        onButtonClick: () => subscriptionName.get(appContext.subscription) ? redirectToSubscriptionPortal : router.push('/hello')
      }}>
      <div className={s.subscriptionCard}>
        <p className={s.subscriptionCard__planName}> Offre {subscriptionName.get(appContext.subscription) ?? 'Découverte'}</p>
        <div className={s['subscriptionCard__logo']}>
          <CheckCircle color="green" />
        </div>
      </div> 
    </DashboardCard>
  )
};

export default SubscriptionCard;