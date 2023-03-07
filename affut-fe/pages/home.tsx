import { useUser } from "@auth0/nextjs-auth0/client";
import { NextPage } from "next";
import SubscriptionCard from "../components/Home/SubscriptionCard/SubscriptionCard";
import Subscriptions from "../components/Home/Subscriptions/Subscriptions";
import styles from '../styles/home.module.scss';

interface HomeProps {
}

const Home: NextPage<HomeProps> = ({ }) => {
  const { user } = useUser()

  return (
    <div className={styles.home}>
      {(!user || user && !user.stripeId) && <Subscriptions/>}
      {(user && user.stripeId) && <SubscriptionCard/>}
    </div>
  )

}

export default Home;