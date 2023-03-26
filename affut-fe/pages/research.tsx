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
import BinaryPopin from "../components/shared/binaryPopin/binaryPopin";
import JobOffers from "../components/researchPage/jobOffers/jobOffers";
import { Followup } from "../services/typing/followup.interface";
import { useUser } from "@auth0/nextjs-auth0/client";
import Loader from "../components/shared/loader/loader";

const Research: NextPage = () => {
  const { user } = useUser()
  const [jobOffers, setJobOffers] = useState<Job[] | null>(null);
  const [popInOpen, setPopInOpen] = useState<boolean>(false);
  const [researchInProgress, setResearchInProgress] = useState<boolean>(false);
  const [errorPopin, setErrorPopin] = useState<{open : boolean, message : string | null}>({open : false, message : null});
  const [pendingFollowup, setPendingFollowup] = useState<Followup>();
  const alreadyCandidatesPopin = useRef<{ openPopin: () => void } | null>(null);
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  
  useEffect(() => {
    if (pendingFollowup) {
      onUserCandidates()
    }
  }, [pendingFollowup]);

  const onJobResearch = (jobKeyWord: string, locality: { city: string; code: number; }) => {
    setResearchInProgress(true)
    const verifiedLocality = locality.code > 0 ? locality : undefined
    searchJobOffers(jobKeyWord, verifiedLocality, user?.stripeId).then((offers) => {
      setJobOffers(offers)
      setResearchInProgress(false)
    })
  }

  const createPendingFollowup = (job : Job) => {
    if (userId) {  
      setPendingFollowup({
        company: job.entreprise.nom ?? "inconnu",
        applicationDate: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        jobName: job.intitule,
        announceUrl: job.origineOffre.urlOrigine ?? job.origineOffre.origine,
        status: "sent",
        userId: userId
      })
    } 
  }

  const onUserCandidates = () => {
    if (userId && pendingFollowup)
      hasUserAlreadyCandidates(userId, pendingFollowup.company, pendingFollowup.jobName).then((hasUserAlreadyCandidates) => {
        if (hasUserAlreadyCandidates) {
          alreadyCandidatesPopin.current?.openPopin();
        } else {
          createAFollowup()
        }
      })
  }

  const createAFollowup = () => {
    if (pendingFollowup) {
      createFollowup(pendingFollowup, user.stripeId).then((resp) => {
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
    {researchInProgress ? <Loader/> : <JobOffers jobOffers={jobOffers} onUserCandidates={createPendingFollowup} /> }
  </div>;
};

export const getServerSideProps = withPageAuthRequired();
export default Research;

