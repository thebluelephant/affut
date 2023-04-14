import { useUser } from "@auth0/nextjs-auth0/client";
import { NextPage } from "next";
import SubscriptionCard from "../components/Dashboard/SubscriptionCard/SubscriptionCard";
import s from '../styles/dashboard.module.scss';
import FollowupsChartCard from "../components/Dashboard/FollowupsChartCard/FollowupsChartCard";
import Title from "../components/shared/title/title";
import BlogCard from "../components/Dashboard/BlogCard/BlogCard";

interface HomeProps {
}

const Home: NextPage<HomeProps> = ({ }) => {
  const { user } = useUser()

  return (
    <div className={s.dashboard}>
      <div className={s.dashboard__header}>
        <Title title="Hello !"/>
      </div>   
      <div className={s.dashboard__body}>
        <SubscriptionCard/>
        <FollowupsChartCard/>
        <BlogCard/>
      </div>

    </div>
  )

}

export default Home;