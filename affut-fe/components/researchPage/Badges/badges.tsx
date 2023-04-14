import React, { FC, ReactElement } from 'react';

import s from './badges.module.scss';


type BadgesProps = {
  typeContrat : string,
  lieuTravail : string,
  salaire : string
}

const Badges: FC<BadgesProps> = ({ typeContrat, lieuTravail, salaire }) => 
  <div className={s.badges}>
    {typeContrat && <div className={`${s.badge} ${s['badge--pink']}`}>{typeContrat}</div>}
    {lieuTravail && <div className={`${s.badge} ${s['badge--blue']}`}>{lieuTravail}</div>}
    {salaire && <div className={`${s.badge} ${s['badge--red']}`}>{salaire}</div>}
  </div>


export default Badges;