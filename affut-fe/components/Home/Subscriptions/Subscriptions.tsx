import { useRouter } from 'next/router';
import { FC } from 'react';
import { createSubscription } from '../../../services/api/stripe.api';
import { Product } from '../../../services/typing/product.interface';
import ProductCard from '../ProductCard/ProductCard';
import s from './Subscriptions.module.scss'

const Subscriptions: FC = () => {
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const router = useRouter();
  const subscriptions = [
    {
      id: null,
      title: 'Gratuit',
      price: '0€',
      advantages: [
        'Recherche des offres sur 1 site à la fois',
        'Quantité de suivis limité à 5'
      ],
    },
    {
      id: 'price_1MdHtZAyRmXxyyquxVwrIbp0',
      title: 'Starter',
      price: '6.90€',
      advantages: [
        'Recherche des offres sur tous les sites',
        'Quantité de suivis illimités'
      ],
    },
    {
      id: 'price_1MdHtzAyRmXxyyquTmTeHldz',
      title: 'Premium',
      price: '9.90€',
      advantages: [
        'Recherche des offres sur tous les sites',
        'Quantité de suivis illimités',
        'Accès au parcours candidatures spontanées',
        'Accès à l’évaluation des entreprises'
      ],
    }
  ]

  const onUserSubscribes = (productId: string) => {
    if (userId) {
      const userSubscription = {
        line_items: [
          { price: productId, quantity: 1 },
        ],
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
      {subscriptions?.map((product: Product) => 
        <ProductCard key={product.id} product={product} onSubscription={(productId) => onUserSubscribes(productId)} />
      )}
     
    </div>
  )
};

export default Subscriptions;