import { FC, useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { getUserFollowUps } from '../../../services/api/followup.api';
import { useUser } from '@auth0/nextjs-auth0/client';
import Card from '../../shared/card/card';
import s from "./FollowupsChartCard.module.scss"
import Title from '../../shared/title/title';
import Link from 'next/link';
import { followupStatus, followupStatusColor } from '../../../services/utils/followupTable';

const FollowupsChartCard: FC = () => {
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const [followupsChart, setFollowupsChart] = useState<{title : string, value : string, color : string}[]>([])
  const [followupsLength, setFollowupsLength] = useState<number>(0)
  const { user } = useUser()
  
  useEffect(() => {
    getUserFollowups()
  }, []);

  // Get follow ups 
  const getUserFollowups = () => {
    setFollowupsChart([])
    if (user && userId) {
      const fuStatus = ['toSend' , 'sent' , 'meetingPlanned' , 'refused', 'accepted',]
      getUserFollowUps(userId, user.stripeId).then((followups) => {
        setFollowupsLength(followups.length)
        fuStatus.forEach(status => {
          const followUpsWithThisStatus = followups.filter((fu) => fu.status === status).length;
          const value = {title : status, value : followUpsWithThisStatus, color : followupStatusColor.get(status) }
          setFollowupsChart(followupsChart => [...followupsChart, value])
        })
      });
    }
  }
  
  return (
    <div className={s.followupsChartCard}>
      {
        followupsChart && <Card>
          <Title title='Suivis'/>
          <span className={s.chart}>
            <PieChart 
              data={followupsChart} 
              lineWidth={30} 
              rounded 
              totalValue={followupsLength} 
              labelPosition={70} 
              label={({ dataEntry }) => dataEntry.value ? `${followupStatus.get(dataEntry.title)} ${dataEntry.value}` : null}/>
          </span>
          <Link href={'/followup'}>Voir mes suivis {'>'} </Link>
        </Card>
      }
      
    </div>

    
  )
};

export default FollowupsChartCard;