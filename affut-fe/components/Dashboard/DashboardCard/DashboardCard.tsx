import { useRouter } from 'next/router';
import s from './DashboardCard.module.scss';
import Title from '../../shared/title/title';
import Card from '../../shared/card/card';
import { FC, ReactNode } from 'react';
import Button from '../../shared/button/button';

interface DashboardCardProps {
  title : string
  children : ReactNode
  button : {
    title : string,
    type : "primary" | "secondary" | "disabled",
    onButtonClick : () => void
  }
}

const DashboardCard : FC<DashboardCardProps> = ({title, children, button}) => 
  <div className={s.dashboardCard}>
    <Card>
      <Title title={title}/>
      <div className={s.dashboardCard__body}>
        {children}
      </div>
      <div className={s.dashboardCard__footer}>
        <Button title={button.title} type={button.type} onButtonClick={() => button.onButtonClick()}/>
      </div>
      
    </Card>
  </div>

export default DashboardCard