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
import { useSubscriptionAccess } from "../services/hooks/subscriptionAccess";
import { coverLetter } from "../services/variable/subscription";
import { useUser } from "@auth0/nextjs-auth0/client";

const CoverLetter: NextPage = () => {
  const {canAccess} = useSubscriptionAccess();
  const {user} = useUser();
  const [letter, setLetter] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [count, setCount] = useState<number>()
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const letterCountOver3 = !!(count && count >= 3)
 
  useEffect(() => {
    if (canAccess(coverLetter) && userId && !count)
      getCoverLetterCount(userId).then((response) => setCount(response.data.count))
  }, []);

  const generateLetter = (form : { lastname: string | null; firstname: string | null; job: string | null; strenght: string | null }) => {
    if (userId) {
      setIsLoading(true)
      generate(userId, {form}, user?.stripeId).then((resp) => {
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
        <CoverLetterExplanations cantAccess={!canAccess(coverLetter)}/>
        <CoverLetterForm generateLetter={(form) => generateLetter(form)} disabledField={{limitReached: letterCountOver3, cantAccess: !canAccess(coverLetter)}}/>
        <CoverLetterExport saveAs={(letterName, type) => saveAs(letterName, letter, type)} disabledField={letterCountOver3 || !canAccess(coverLetter)}/>
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