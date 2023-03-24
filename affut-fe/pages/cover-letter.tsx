import { NextPage } from "next";
import { useState, useEffect } from "react";
import { generate, getCoverLetterCount } from "../services/api/coverLetter.api";
import s from '../styles/cover-letter.module.scss';
import { saveAs } from "../services/utils/saveFile";
import Loader from "../components/shared/loader/loader";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { CoverLetterForm } from "../components/coverLetterPage/coverLetterForm/coverLetterForm";
import { CoverLetterExport } from "../components/coverLetterPage/coverLetterExport/CoverLetterExport";
import { CoverLetterExplanations } from "../components/coverLetterPage/coverLetterExplanations/CoverLetterExplanations";
import { AppContext } from "../services/context/state";
import { useSubscriptionAccess } from "../services/hooks/subscriptionAccess";

interface CoverLetterProps {
  appContext : AppContext
}

const CoverLetter: NextPage<CoverLetterProps> = ({ appContext }) => {
  const [letter, setLetter] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [count, setCount] = useState<number>()
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const letterCountOver3 = !!(count && count >= 3)
 
  useEffect(() => {
    if (userId && !count)
      getCoverLetterCount(userId).then((response) => setCount(response.data.count))
  }, []);

  const generateLetter = (form : { lastname: string | null; firstname: string | null; job: string | null; strenght: string | null }) => {
    if (userId) {
      setIsLoading(true)
      generate(userId, {form}).then((resp) => {
        if (!resp.success) {
          setIsLoading(false)
        } else {
          setLetter(resp.data)
          setCount(resp.count)
          setIsLoading(false)
        }
      })
    }
  }

  return (
    <div className={s.container}>
      <div className={s.container__settings}>    
        <CoverLetterExplanations/>
        <CoverLetterForm generateLetter={(form) => generateLetter(form)} disabledField={letterCountOver3}/>
        <CoverLetterExport saveAs={(letterName, type) => saveAs(letterName, letter, type)} disabledField={letterCountOver3}/>
      </div>

      <div className={s.container__letter}>
        {isLoading &&  <div className={s.loader}><Loader/></div>}
        <textarea  className={`${s.text} ${letter ? '': s['text--disabled']}`} value={letter} onChange={(e) =>setLetter(e.target.value)} disabled={!letter}/>
      </div>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired();
export default CoverLetter;