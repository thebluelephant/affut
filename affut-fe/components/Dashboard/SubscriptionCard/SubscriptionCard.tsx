import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { FC, useContext } from 'react';
import { createUserSubscriptionPortal } from '../../../services/api/stripe.api';
import { CheckCircle } from '../../../styles/icons/check-circle';
import Button from '../../shared/button/button';
import s from './SubscriptionCard.module.scss';
import Title from '../../shared/title/title';
import { AppContext } from '../../../services/context/state';
import { subscriptionName } from '../../../services/utils/subscription';
import Card from '../../shared/card/card';

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
    <div className={s.subscriptionCard}>
      <Card>
        <Title title="Votre abonnement"/>
        <div className={s.subscriptionCard__body}>
          <>
            <p className={s.subscriptionCard__body__planName}>{subscriptionName.get(appContext.subscription) ?? 'Découverte'}</p>
            <div className={s['subscriptionCard__logo']}>
              <CheckCircle color="green" />
            </div>
            {
              subscriptionName.get(appContext.subscription) ?  
                  <Button title={'Gérer mon abonnement'} type={'primary'} onButtonClick={redirectToSubscriptionPortal}/> : 
                  <Button title={'Devenir membre'} type={'primary'} onButtonClick={() => router.push('/home')}/>
            }
           
          </>  
        </div>
      </Card>
    </div>
  )
};

export default SubscriptionCard;