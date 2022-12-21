import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useWindowDimensions } from "../services/hooks/windowDimension";
import { PoleEmploiJob } from "../services/typing/poleemploi.interfaces";
import { getUserFollowUps } from "../services/api/followup.api";
import styles from '../styles/followupPage.module.scss'
import { Followup } from "../services/typing/followup.interface";
import { Edit } from "../styles/icons/edit";
import { Delete } from "../styles/icons/delete";


interface FollowupProps {
}

const Followup: NextPage<FollowupProps> = ({ }) => {
  const [followUps, setFollowUps] = useState<Followup[]>();
  const { windowWidth } = useWindowDimensions();


  useEffect(() => {
    getUserFollowup();
  }, []);

  const getUserFollowup = () => {
    getUserFollowUps("2").then((resp) => setFollowUps(resp));
  }

  return <div className={styles.followupPage}>
    <div className={styles.table}>
      <div className={styles['row__header']}>
        <span>Entreprise</span>
        <span>Date de candidature</span>
        <span>Titre du poste</span>
        <span>Lien de lannonce</span>
        <span>Status</span>
      </div>

      {
        followUps?.map((followUp) => {
          return (
            <div className={styles.row} key={followUp.id}>
              <div className={styles['row__data']}>
                <span>{followUp.company}</span>
                <span>{followUp.applicationDate}</span>
                <span>{followUp.jobName}</span>
                <span>{followUp.announceUrl}</span>
                <span>{followUp.status}</span>
              </div>
              <div className={styles['row__actions']}>
                <div className={styles.actionButton}>
                  <span className={styles.icon}>
                    <Edit />
                  </span>
                </div>
                <div className={styles.actionButton}>
                  <span className={styles.icon}>
                    <Delete />
                  </span>
                </div>

              </div>
            </div>
          )
        })
      }
    </div>


  </div>;
};

export default Followup;