import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { createUserSubscriptionPortal } from '../../../services/api/stripe.api';
import { CheckCircle } from '../../../styles/icons/check-circle';
import Button from '../../shared/button/button';
import styles from './SubscriptionCard.module.scss';

const SubscriptionCard: FC = () => {
  const { user } = useUser()
  const router = useRouter();

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
    <div className={`${styles.subscriptionCard}`}>
      <p>Votre abonnement</p>
      <div className={styles['subscriptionCard__logo']}>
        <CheckCircle color="green" />
      </div>
     
      <Button title={'Gérer mon abonnement'} type={'primary'} onButtonClick={redirectToSubscriptionPortal}/>
     
    </div>
  )
};

export default SubscriptionCard;