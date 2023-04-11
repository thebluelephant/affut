import React, { FC, useEffect, useState } from 'react';
import s from './jobOffers.module.scss';
import { Job } from '../../../services/typing/job.interface';
import JobDetails from '../jobDetails/jobDetails';
import { useWindowDimensions } from '../../../services/hooks/windowDimension';
import Badges from '../Badges/badges';

type JobOffersProps = {
    jobOffers : Job[] | null,
    onUserCandidates : (job : Job) => void
}

const JobOffers: FC<JobOffersProps> = ({jobOffers, onUserCandidates}) => {
  const { windowWidth } = useWindowDimensions();
  const [jobDetails, setJobDetails] = useState<Job>();
  const shouldDisplayOffers = Boolean(!!jobOffers && jobOffers?.length ) 
  const shouldDiplayNoOffersAvailable =  Boolean(!!jobOffers && !jobOffers.length)

  useEffect(() => {
    if (jobOffers &&  windowWidth && windowWidth > 900)
      setJobDetails(jobOffers[0])
  }, [jobOffers, windowWidth]);

  const offers = jobOffers?.map((offer) => 
    <div className={`${s.job} ${offer?.id === jobDetails?.id ? s['job--selected'] : ''}`} key={offer.id} onClick={() => { setJobDetails(offer) }}>
      <div className={s.details}>
        {offer.intitule && <p className={`${s.details__name}`}>{offer.intitule}</p>}
        {offer.entreprise.nom && <p className={`${s.details__place}`}>{offer.entreprise.nom}</p>}
      </div>

      <Badges typeContrat={offer.typeContrat} lieuTravail={offer.lieuTravail.libelle} salaire={offer.salaire.libelle}/>
    </div>
  )
  
  return (    
    <div className={s.offers}>
      <div className={s.offers__jobs}>
        {shouldDisplayOffers && offers}
        {shouldDiplayNoOffersAvailable && <p>Mauvaise pioche ! Il n'y a apparement aucune offre disponible pour votre recherche.</p>}
      </div>
      {jobDetails && <JobDetails onUserCandidates={onUserCandidates} job={jobDetails} />}
    </div>
  )
};

export default JobOffers;