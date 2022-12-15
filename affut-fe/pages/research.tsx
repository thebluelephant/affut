import { NextPage } from "next";
import { useState } from "react";
import JobReseachContainer from "../components/jobResearchContainer/jobReseachContainer";
import { searchJobOffers } from "../services/api/poleemploi.api";
import { PoleEmploiJob } from "../services/typing/poleemploi.interfaces";
import styles from '../styles/researchPage.module.scss'


interface ResearchProps {
}

const Research: NextPage<ResearchProps> = ({ }) => {
  const [jobOffers, setJobOffers] = useState<PoleEmploiJob[]>();
  const [jobDetails, setJobDetails] = useState<PoleEmploiJob>();

  const onJobResearch = (jobKeyWord: string, locality: number) => {
    searchJobOffers(jobKeyWord, locality).then((offers) => setJobOffers(offers))
  }


  return <div className={styles.researchPage}>
    <JobReseachContainer onResearch={onJobResearch} />
    <div className={styles.offers}>
      <div className={styles.offers__jobs}>
        {jobOffers?.map((offer) => {
          return (
            <div className={`${styles.job}`} key={offer.id} onClick={() => setJobDetails(offer)}>{offer.intitule}</div>
          )
        })}
      </div>
      <div className={`${styles.offers__jobdetails}`}>
        {jobDetails?.intitule}
      </div>
    </div>

  </div>;
};

export default Research;