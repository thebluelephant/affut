import React, { FC } from 'react';
import styles from './jobDetails.module.scss';
import Button from '../../shared/button/button';
import { PoleEmploiJob } from '../../../services/typing/poleemploi.interfaces';

type JobDetailsProps = {
    job: PoleEmploiJob;
}

const renderPoleEmploiJobUrl = (jobId: string) => {
    return `https://candidat.pole-emploi.fr/offres/recherche/detail/${jobId}`

}
const JobDetails: FC<JobDetailsProps> = ({ job }) => {
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
                <a className={`${styles.originalOffer}`} rel="noreferrer" href={renderPoleEmploiJobUrl(job.id)} target="_blank">Voir loffre originale</a>
                <Button title={"Ajouter a ma liste"} type={"primary"} onButtonClick={function (): void {
                    throw new Error("Function not implemented.");
                }} />
            </div>
        </div>
    )
};

export default JobDetails;