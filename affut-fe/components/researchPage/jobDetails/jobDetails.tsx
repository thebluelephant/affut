import React, { FC } from 'react';
import styles from './jobDetails.module.scss';
import Button from '../../shared/button/button';
import { Job } from '../../../services/typing/job.interface';

type JobDetailsProps = {
    job: Job;
    onUserCandidates : (job : Job) => void;
}



const JobDetails: FC<JobDetailsProps> = ({ job, onUserCandidates }) => {
    return (
        <div className={`${styles.jobDetails}`}>
            <div className={`${styles.header}`}>
                <p className={`${styles.header__intitule}`}>{job.intitule}</p>
                <p className={`${styles.header__place}`}> {job.entreprise.nom} {job.lieuTravail.libelle} </p>

                <div className={`${styles.header__modality}`}>
                    <p className={`${styles.type}`}>{job.typeContrat} {job.typeContratLibelle}</p>
                    <p className={`${styles.complement}`}>{job.dureeTravailLibelle} {job.salaire.libelle}</p>
                </div>
            </div>

            <div className={`${styles.body}`}>
                <p className={`${styles.description}`}>{job.description}</p>
            </div>

            <div className={`${styles.footer}`}>
                <a className={`${styles.originalOffer}`} rel="noreferrer" href={job.origineOffre.urlOrigine} target="_blank">Voir l'offre originale</a>
                <Button title={"Candidater sur Pole emploi et ajouter à mes suivis"} type={"primary"} onButtonClick={() => onUserCandidates(job)} />
            </div>
        </div>
    )
};

export default JobDetails;