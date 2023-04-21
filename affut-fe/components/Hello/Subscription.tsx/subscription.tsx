import { NextPage } from "next";
import { useState } from "react";
import Button from "../../../components/shared/button/button";
import { Cross } from "../../../styles/icons/cross";
import { postNewEmail } from "../../../services/api/mailChimp.api";
import s from './subscription.module.scss';
import JSConfetti from 'js-confetti';

interface SubscriptionProps {
    isOpen : boolean
    onClose : () => void
}
const Subscription: NextPage<SubscriptionProps> = ({isOpen, onClose}) => {
  const [userMail, setUserMail] = useState('')
  let jsConfetti: JSConfetti;

  if (typeof window !== 'undefined') {
    jsConfetti = new JSConfetti()
  }

  const userSubscribes = () => {
    if (userMail.length) {
      postNewEmail(userMail).then((resp) => {
        if (resp.status === 200) {
          jsConfetti.addConfetti()
          setUserMail('')
          onClose()
        }
      })
    }
  }

  return <div className={s.subscription}>
    {isOpen &&  <div className={s.subscribePopin}>
      <div className={s.container}>
        <div className={s['container__header']}>
          <div className={s.cross} onClick={() => onClose()}>
            <Cross />
          </div>
          <img className={s.logo} src="/images/Affut-Logo.png" alt="Logo" />
        </div>

        <span className={s['container__body']}>
          <p className={s.slogan}>Avec votre invitation, <span className={s['slogan--bold']}>accédez aux dernières news</span> de Affut : <br /> Date de lancement, accès anticipé, code promo ! 🚀 </p>
          <input type="email" placeholder="Votre adresse email" onChange={e => setUserMail(e.target.value)} value={userMail} />
          <Button title={"Envoyer"} type={"primary"} onButtonClick={userSubscribes} />
        </span >
      </div>
    </div >}
  </div>  

};

export default Subscription;


