import { NextPage } from "next";
import { useState } from "react";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import JobDetails from "../components/researchPage/jobDetails/jobDetails";
import JobReseachContainer from "../components/researchPage/jobResearchContainer/jobReseachContainer";
import Popin from "../components/shared/popin/popin";
import { searchJobOffers } from "../services/api/poleemploi.api";
import { useWindowDimensions } from "../services/hooks/windowDimension";
import { PoleEmploiJob } from "../services/typing/poleemploi.interfaces";
import styles from '../styles/researchPage.module.scss'


interface ResearchProps {
}

const Research: NextPage<ResearchProps> = ({ }) => {
  const [jobOffers, setJobOffers] = useState<PoleEmploiJob[]>();
  const [jobDetails, setJobDetails] = useState<PoleEmploiJob>();
  const [popInOpen, setPopInOpen] = useState<boolean>(false);
  const { windowWidth } = useWindowDimensions();

  const onJobResearch = (jobKeyWord: string, locality: number) => {
    searchJobOffers(jobKeyWord, locality)
      .then((offers) => {
        setJobOffers(offers)
        setJobDetails(offers[0])
      })
  }

  const selectJobOffer = (offer: PoleEmploiJob) => {
    setJobDetails(offer);
    if (windowWidth < 900) {
      setPopInOpen(true);
    }
  }

  const renderJobDetails = () => {
    if (jobDetails) {
      if (windowWidth && windowWidth > 900) {
        return <JobDetails job={jobDetails} />
      } else {
        return <Popin shouldOpen={popInOpen} onPopinCrossClicked={() => setPopInOpen(false)} ><JobDetails job={jobDetails} /></Popin>
      }
    }

  }

  return <div className={styles.researchPage}>
    <JobReseachContainer onResearch={onJobResearch} />
    <div className={styles.offers}>
      <div className={styles.offers__jobs}>
        {jobOffers?.map((offer) => {
          return (
            <div className={`${styles.job} ${offer.id === jobDetails?.id ? styles['job--selected'] : ''}`} key={offer.id} onClick={() => { selectJobOffer(offer) }}>
              <p className={`${styles.job__name}`}>{offer.intitule}</p>
              <p className={`${styles.job__place}`}>{offer.lieuTravail.libelle}</p>
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