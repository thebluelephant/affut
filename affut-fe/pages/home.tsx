import { useUser } from "@auth0/nextjs-auth0/client";
import { NextPage } from "next";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import ProductCard from "../components/Home/ProductCard";
import { createSubscription, createUserSubscriptionPortal, getUserSubscriptions, updateUserMetadata } from "../services/api/stripe.api";
import { Product } from "../services/typing/product.interface";
import styles from '../styles/home.module.scss';


interface HomeProps {
}

const Home: NextPage<HomeProps> = ({ }) => {
  const {user} = useUser()
  const [success, setSuccess] = useState(false);
  const [stripeSessionId, setStripeSessionID] = useState('');
  const router = useRouter();
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const products = [
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

  useEffect(() => {
    const stripeSessionId = router.query.session_id as string
    if (stripeSessionId) {
      setSuccess(true);
      setStripeSessionID(stripeSessionId)
      updateUserMetadata(stripeSessionId, userId)
    }
  }, [router.query, userId]);

  const SuccessDisplay = () => {
    return (
      <section>
        <div className="product Box-root">
          <div className="description Box-root">
            <h3>Subscription to starter plan successful!</h3>
          </div>
        </div>
        <button id="checkout-and-portal-button" type="submit" onClick={() => onSubscriptionPortalCreation()}>
          Manage your billing information
        </button>

      </section> 
    );
  };

  const onUserSubscribes = (productId : string) => {
    if (userId) {
      const userSubscription = {
        line_items: [
          { price: productId, quantity: 1 },
        ],
        mode: 'subscription',
        success_url : 'http://localhost:3000/home?session_id={CHECKOUT_SESSION_ID}',
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

  const onSubscriptionPortalCreation = () => { 
    if (stripeSessionId) {
      createUserSubscriptionPortal(stripeSessionId).then((resp) => {
        if (resp.status === 200) {
          router.push(resp.data) 
        }
      })
    }
  }

  return (
    <div className={styles.home}>
      <div className={styles['home__buttons']}>
        {!success && products?.map((product: Product) => <ProductCard key={product.id} product={product} onSubscription={(productId) => onUserSubscribes(productId) } />)}
      </div>
      {success && stripeSessionId !== '' && <SuccessDisplay />}
    </div>
  )

}

export default Home;