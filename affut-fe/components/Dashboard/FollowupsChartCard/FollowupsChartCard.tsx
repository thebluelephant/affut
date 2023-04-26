import { FC, useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { getUserFollowUps } from '../../../services/api/followup.api';
import { useUser } from '@auth0/nextjs-auth0/client';
import s from "./FollowupsChartCard.module.scss"

import { followupStatus, followupStatusColor } from '../../../services/utils/followupTable';
import DashboardCard from '../DashboardCard/DashboardCard';
import { useRouter } from 'next/router';
import { Followup } from '../../../services/typing/followup.interface';

const FollowupsChartCard: FC = () => {
  const router = useRouter()
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const [followUps, setFollowUps] = useState<Followup[]>([]);
  const [followupsChart, setFollowupsChart] = useState<{title : string, value : string, color : string}[]>([])
  const { user } = useUser()
  
  useEffect(() => {
    if (userId && user)
      getUserFollowUps(userId, user.stripeId as string).then((followups) => setFollowUps(followups))
  }, []);

  useEffect(() => {
    if (followUps)
      filterFollowups()
  }, [followUps]);

  // Get follow ups 
  const filterFollowups = () => {
    const fuStatus = ['toSend' , 'sent' , 'meetingPlanned' , 'refused', 'accepted']
    setFollowupsChart([])
    fuStatus.forEach((status) => {
      const followUpsWithThisStatus = followUps.filter((fu) => fu.status === status).length;
      const value = {title : status, value : followUpsWithThisStatus, color : followupStatusColor.get(status) }
      setFollowupsChart(followupsChart => [...followupsChart, value])
    });
  }
  
  return (
    <div className={s.followupsChartCard}>
      {
        followupsChart && 
        <DashboardCard 
          title="Suivis"  
          button={{
            title: 'Voir mes suivis',
            type: 'primary',
            onButtonClick: () => router.push('/followup')
          }}>
          <div className={s.followupsChartCard__body}>
            <div className={s.followupsChartCard__body__chart}>
              <p className={s.totalFollowups}><span>{followUps.length}</span> suivis en cours</p>
              <span className={s.chart}>
                <PieChart
                  data={followupsChart}
                  lineWidth={30}
                  rounded
                  totalValue={followUps.length}/>
              </span>
            </div>
            <div className={s.followupsChartCard__body__legend}>
              {followupsChart.map((followup) =>  {
                if (followup.value) {
                  return (
                    <div key={followup.title} className={s.title}>
                      <div className={`${s.title__dot} ${s[`title__dot--${followup.title}`]} `}/>
                      <p>{followupStatus.get(followup.title)} : <span>{followup.value}</span></p>
                    </div>
                  )
                }
              })}
             
            </div>

          </div>
        </DashboardCard>
      }
    </div>
  )
};

export default FollowupsChartCard;