import React, { useEffect, useRef } from "react";
import { NextPage } from "next";
import { useState } from "react";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { searchJobOffers } from "../services/api/jobs.api";
import JobReseachContainer from "../components/researchPage/jobResearchContainer/jobReseachContainer";
import Popin from "../components/shared/popin/popin";
import styles from '../styles/researchPage.module.scss'
import { Job } from "../services/typing/job.interface";
import { createFollowup, hasUserAlreadyCandidates } from "../services/api/followup.api";
import Followup from "./followup";
import BinaryPopin from "../components/shared/binaryPopin/binaryPopin";
import { useSubscriptionAccess } from "../services/hooks/subscriptionAccess";
import { research } from "../services/variable/subscription";
import JobOffers from "../components/researchPage/jobOffers/jobOffers";


const Research: NextPage = () => {
  const {canAccess} = useSubscriptionAccess()
  const [canAccessUnlimitedFollowups, setCanAccessUnlimitedFollowups] = useState<boolean>(false)
  const [jobOffers, setJobOffers] = useState<Job[]>();

  const [popInOpen, setPopInOpen] = useState<boolean>(false);
  const [errorPopin, setErrorPopin] = useState<{open : boolean, message : string | null}>({open : false, message : null});
  const [pendingFollowup, setPendingFollowup] = useState<Followup>();
  const alreadyCandidatesPopin = useRef<{ openPopin: () => void } | null>(null);
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

  useEffect(() => {
    setCanAccessUnlimitedFollowups(canAccess(research))
  }, []);


  const onJobResearch = (jobKeyWord: string, locality: number) => {
    const verifiedLocality = locality > 0 ? locality : undefined
    searchJobOffers(jobKeyWord, verifiedLocality)
      .then((offers) => {
        console.log('hello');
        setJobOffers(offers)
      })
  }
  

  const onUserCandidates = async (job: Job) => {
    if (userId) {
      setPendingFollowup({
        company: job.entreprise.nom ?? "inconnu",
        applicationDate: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        jobName: job.intitule,
        announceUrl: job.origineOffre.urlOrigine ?? job.origineOffre.origine,
        status: "sent",
        userId: userId
      })
    
      hasUserAlreadyCandidates(userId, job.entreprise.nom, job.intitule).then((hasUserAlreadyCandidates) => {
        if (hasUserAlreadyCandidates) {
          alreadyCandidatesPopin.current?.openPopin();
        } else {
          createAFollowup()
        }
      })
    }
  }

  const createAFollowup = () => {
    if (pendingFollowup) {
      createFollowup(pendingFollowup, canAccessUnlimitedFollowups).then((resp) => {
        if (!resp.success) {
          setErrorPopin({open : true, message : resp.data})
        }

        if (pendingFollowup.announceUrl) {
          window?.open(pendingFollowup.announceUrl, '_blank')?.focus();

          if (popInOpen) {
            setPopInOpen(false)
          }
        }
      })
    }
  }



  return <div className={styles.researchPage}>
    <JobReseachContainer onResearch={onJobResearch} />
    <BinaryPopin ref={alreadyCandidatesPopin} onConfirm={() => createAFollowup()} text={"Il semble que vous ayez deja postulé à cette offre, souhaitez-vous poursuivre et ajouter un nouveau suivi ?"} />
    <Popin shouldOpen={errorPopin.open} onPopinCrossClicked={() => setErrorPopin({open : false, message : null})}>
      <p>{errorPopin.message}</p>
    </Popin>
    <JobOffers jobOffers={jobOffers} onUserCandidates={onUserCandidates} />
  </div>;
};

export const getServerSideProps = withPageAuthRequired();
export default Research;

