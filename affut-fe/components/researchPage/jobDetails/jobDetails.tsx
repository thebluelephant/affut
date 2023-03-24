import React, { FC, useEffect, useState } from 'react';
import styles from './jobDetails.module.scss';
import Button from '../../shared/button/button';
import { Job } from '../../../services/typing/job.interface';
import { useWindowDimensions } from '../../../services/hooks/windowDimension';
import Popin from '../../shared/popin/popin';

type JobDetailsProps = {
    job: Job;
    onUserCandidates : (job : Job) => void;
}

const JobDetails: FC<JobDetailsProps> = ({ job, onUserCandidates }) => {
  const { windowWidth } = useWindowDimensions();
  const [popInOpen, setPopInOpen] = useState<boolean>(false);
  const [jobDetails, setJobDetails] = useState<Job | null>(null)

  useEffect(() => {
    if (job) {
      setJobDetails(job)
    }
    if (windowWidth && windowWidth < 900){
      setPopInOpen(!!jobDetails)
    }
    
  }, [job, jobDetails, windowWidth]);

  const desktopDetail = <>
    <div className={styles.header}>
      <p className={styles.header__intitule}>{job.intitule}</p>
      <p className={styles.header__place}> {job.entreprise.nom} {job.lieuTravail.libelle} </p>

      <div className={styles.header__modality}>
        <p className={styles.type}>{job.typeContrat} {job.typeContratLibelle}</p>
        <p className={styles.complement}>{job.dureeTravailLibelle} {job.salaire.libelle}</p>
      </div>
    </div>

    <div className={styles.body}>
      <p className={styles.description}>{job.description}</p>
    </div>

    <div className={styles.footer}>
      <a className={styles.originalOffer} rel="noreferrer" href={job.origineOffre.urlOrigine} target="_blank">Voir l'offre originale</a>
      <Button title={"Candidater sur Pole emploi et ajouter à mes suivis"} type={"primary"} onButtonClick={() => onUserCandidates(job)} />
    </div>
  </>

  const mobileDetail = <Popin shouldOpen={popInOpen} onPopinCrossClicked={() => {setPopInOpen(false), setJobDetails(null)}}><JobDetails job={job} onUserCandidates={onUserCandidates} /></Popin>

  return (
    <div className={styles.jobDetails}>
      { windowWidth && windowWidth > 900 ? desktopDetail : mobileDetail}
    </div>
  )
};

export default JobDetails;