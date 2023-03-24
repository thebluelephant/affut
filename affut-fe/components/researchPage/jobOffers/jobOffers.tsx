import React, { FC, useEffect, useState } from 'react';
import styles from './jobOffers.module.scss';
import { Job } from '../../../services/typing/job.interface';
import JobDetails from '../jobDetails/jobDetails';

type JobOffersProps = {
    jobOffers : Job[] | undefined,
    onUserCandidates : (job : Job) => void
}

const JobOffers: FC<JobOffersProps> = ({jobOffers, onUserCandidates}) => {
  const [jobDetails, setJobDetails] = useState<Job>();

  useEffect(() => {
    if (jobOffers)
      setJobDetails(jobOffers[0])
  }, [jobOffers]);
  
  return (    
    <div className={styles.offers}>
      <div className={styles.offers__jobs}>
        {jobOffers?.map((offer) => {
          return (
            <div className={`${styles.job} ${offer?.id === jobDetails?.id ? styles['job--selected'] : ''}`} key={offer.id} onClick={() => { setJobDetails(offer) }}>
              {offer.intitule && <p className={`${styles.job__name}`}>{offer.intitule}</p>}
              {offer.lieuTravail.libelle && <p className={`${styles.job__place}`}>{offer.lieuTravail.libelle}</p>}
            </div>
          )
        })}
      </div>
      {jobDetails && <JobDetails onUserCandidates={onUserCandidates} job={jobDetails} />}
    </div>
  )
};

export default JobOffers;