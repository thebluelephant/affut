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

  const details = <div className={styles.jobDetails}>
    <div className={styles.header}>
      <p className={styles.header__intitule}>{job.intitule}</p>

      <div className={styles.header__modality}>
        {job.entreprise.nom && <p><span>Entreprise : </span> {job.entreprise.nom}</p>}
        {job.lieuTravail.libelle && <p><span>Ville : </span> {job.lieuTravail.libelle}</p>}
        {(job.typeContratLibelle || job.typeContrat) && <p className={styles.type}><span >Contrat :</span>  {job.typeContratLibelle ?? job.typeContrat}</p>}
        {(job.dureeTravailLibelle || job.salaire.libelle) && <p className={styles.complement}><span >Durée de travail :</span> {job.dureeTravailLibelle} - {job.salaire.libelle}</p>}
      </div>
    </div>

    <div className={styles.body}>
      <span>Description 
      </span> 
      <p className={styles.description}>{job.description}</p>
    </div>

    <div className={styles.footer}>
      <a className={styles.originalOffer} rel="noreferrer" href={job.origineOffre.urlOrigine} target="_blank">Voir l'offre originale</a>
      <Button title={"Candidater sur Pole emploi et ajouter à mes suivis"} type={"primary"} onButtonClick={() => onUserCandidates(job)} />
    </div>
  </div>

  const mobileDetail = <Popin shouldOpen={popInOpen} onPopinCrossClicked={() => {setPopInOpen(false)}}>{details}</Popin>

  useEffect(() => {
    setPopInOpen(!!job)
  }, [job]);
  
  return (
    <>
      { windowWidth && windowWidth > 900 ? details : mobileDetail}
    </>
  )
};

export default JobDetails;