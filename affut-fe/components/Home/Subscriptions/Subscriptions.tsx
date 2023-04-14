import { useRouter } from 'next/router';
import { FC } from 'react';
import { createSubscription } from '../../../services/api/stripe.api';
import { Product } from '../../../services/typing/product.interface';
import Title from '../../shared/title/title';
import ProductCard from '../ProductCard/ProductCard';
import s from './Subscriptions.module.scss'

const Subscriptions: FC = () => {
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const router = useRouter();
  const subscriptions = [
    {
      priceId: null,
      title: 'Gratuit',
      price: '0€',
      advantages: [
        "Résultats des recherches d'offres d'emploi limité a 25",
        'Maximum 5 suivis'
      ],
    },
    {
      priceId: 'price_1MdHtZAyRmXxyyquxVwrIbp0',
      title: 'Starter',
      price: '6.90€',
      advantages: [
        "Résultats des recherches d'offres d'emploi limité a 50",
        'Quantité de suivis illimités'
      ],
    },
    {
      priceId: 'price_1MdHtzAyRmXxyyquTmTeHldz',
      title: 'Premium',
      price: '9.90€',
      advantages: [
        "Résultats des recherches d'offres d'emploi illimité",
        'Quantité de suivis illimités',
        'Accès au générateur de lettre de motivation',
      ],
    }
  ]

  const onUserSubscribes = (productId: string) => {
    if (userId && productId) {
      const userSubscription = {
        line_items: { price: productId },
        mode: 'subscription',
        client_reference_id: userId
      }

      createSubscription(userSubscription, userId).then((resp) => {
        if (resp.status === 200) {
          router.push(resp.data.url)
        }
      })
    } else {
      router.push('api/auth/login')
    }
  }

  return (
    <div className={s.subscriptions}>
      <span className={s.subscriptions__title}>
        <Title title='Abonnements'/>
      </span>
      
      {subscriptions?.map((product: Product) => 
        <ProductCard key={product.priceId} product={product} onSubscription={(priceId) => onUserSubscribes(priceId)} />
      )}
     
    </div>
  )
};

export default Subscriptions;