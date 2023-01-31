import React, { useRef } from "react";
import { NextPage } from "next";
import { useState } from "react";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import JobDetails from "../components/researchPage/jobDetails/jobDetails";
import { searchJobOffers } from "../services/api/jobs.api";
import JobReseachContainer from "../components/researchPage/jobResearchContainer/jobReseachContainer";
import Popin from "../components/shared/popin/popin";
import { useWindowDimensions } from "../services/hooks/windowDimension";
import styles from '../styles/researchPage.module.scss'
import { Job } from "../services/typing/job.interface";
import { createFollowup, hasUserAlreadyCandidates } from "../services/api/followup.api";
import Followup from "./followup";
import BinaryPopin from "../components/shared/binaryPopin/binaryPopin";



interface ResearchProps {
}

const Research: NextPage<ResearchProps> = ({ }) => {
  const [jobOffers, setJobOffers] = useState<Job[]>();
  const [jobDetails, setJobDetails] = useState<Job>();
  const [popInOpen, setPopInOpen] = useState<boolean>(false);
  const [pendingFollowup, setPendingFollowup] = useState<Followup>();
  const { windowWidth } = useWindowDimensions();
  const alreadyCandidatesPopin = useRef<{ openPopin: () => void } | null>(null);
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

  const onJobResearch = (jobKeyWord: string, locality: number) => {
    const verifiedLocality = locality > 0 ? locality : undefined
    searchJobOffers(jobKeyWord, verifiedLocality)
      .then((offers) => {
        setJobOffers(offers)
        setJobDetails(offers[0])
      })
  }

  const selectJobOffer = (offer: Job) => {
    setJobDetails(offer);
    if (windowWidth && windowWidth < 900) {
      setPopInOpen(true);
    }
  }

  const hasUserAlreadyCandidatesToThisOffer = (company: string, jobName: string) => {
    if (userId) {
      return hasUserAlreadyCandidates(userId, company, jobName).then(resp => { return resp })
    }
  }

  const onUserCandidates = async (job: Job) => {

    if (userId) {
      setPendingFollowup({
        company: job.entreprise.nom,
        applicationDate: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        jobName: job.intitule,
        announceUrl: job.origineOffre.urlOrigine ?? job.origineOffre.origine,
        status: "sent",
        userId: userId
      })
    }

    const hasUserAlreadyCandidates = await hasUserAlreadyCandidatesToThisOffer(job.entreprise.nom, job.intitule);

    if (hasUserAlreadyCandidates) {
      alreadyCandidatesPopin.current?.openPopin();
    } else {
      createAFollowup()
    }
  }

  const createAFollowup = () => {
    if (pendingFollowup) {

      createFollowup(pendingFollowup).then((resp) => {
        if (resp === 200) {
          if (pendingFollowup.announceUrl) {
            window?.open(pendingFollowup.announceUrl, '_blank')?.focus();
          }
          if (popInOpen) {
            setPopInOpen(false)
          }
        }
      })
    }
  }

  const renderJobDetails = () => {
    if (jobDetails) {
      if (windowWidth && windowWidth > 900) {
        return <JobDetails onUserCandidates={onUserCandidates} job={jobDetails} />
      } else {
        return <Popin shouldOpen={popInOpen} onPopinCrossClicked={() => setPopInOpen(false)} ><JobDetails job={jobDetails} onUserCandidates={onUserCandidates} /></Popin>
      }
    }
  }

  return <div className={styles.researchPage}>
    <JobReseachContainer onResearch={onJobResearch} />
    <BinaryPopin ref={alreadyCandidatesPopin} onConfirm={() => createAFollowup()} text={"Il semble que vous ayez deja postulé à cette offre, souhaitez-vous poursuivre et ajouter un nouveau suivi ?"} />

    <div className={styles.offers}>
      <div className={styles.offers__jobs}>
        {jobOffers?.map((offer) => {
          return (
            <div className={`${styles.job} ${offer?.id === jobDetails?.id ? styles['job--selected'] : ''}`} key={offer.id} onClick={() => { selectJobOffer(offer) }}>
              {offer.intitule && <p className={`${styles.job__name}`}>{offer.intitule}</p>}
              {offer.lieuTravail.libelle && <p className={`${styles.job__place}`}>{offer.lieuTravail.libelle}</p>}
            </div>
          )
        })}
      </div>

      {renderJobDetails()}

    </div>

  </div>;
};

export const getServerSideProps = withPageAuthRequired();
export default Research;