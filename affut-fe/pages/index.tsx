import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import Button from "../components/shared/button/button";
import { Cross } from "../styles/icons/cross";
import { postNewEmail } from "../services/api/mailChimp";
import styles from '../styles/home.module.scss';
import JSConfetti from 'js-confetti';
import Head from "next/head";


interface HomeProps {
}

const Home: NextPage<HomeProps> = ({ }) => {
  const [openSubscriptionPopin, setOpenSubscriptionPopin] = useState(false);
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
          setOpenSubscriptionPopin(false)
        }
      })
    }
  }

  const subscribingPopin = <div className={styles.subscribePopin}>
    <div className={styles.container}>
      <div className={styles['container__header']}>
        <div className={styles.cross} onClick={() => setOpenSubscriptionPopin(false)}>
          <Cross />
        </div>
        <img className={styles.logo} src="Affut-Logo.png" alt="Logo" />
      </div>

      <span className={styles['container__body']}>
        <p className={styles.slogan}>Avec votre invitation, <span className={styles['slogan--bold']}>accédez aux dernières news</span> de Affut : <br /> Date de lancement, accès anticipé, code promo ! 🚀 </p>
        <input type="email" placeholder="Votre adresse email" onChange={e => setUserMail(e.target.value)} value={userMail} />
        <Button title={"Envoyer"} type={"primary"} onButtonClick={userSubscribes} />
      </span >
    </div>
  </div >

  return <div className={styles.home}>
    <Head>
      <title>Affut - Trouvez, postulez, suivez vos candidatures au même endroit ! </title>
      <meta
        name="description"
        content="Avec Affut, la recherche d'emploi n'a jamais été aussi simple : Trouvez, postulez, suivez vos candidatures au même endroit et décrochez votre job de rêve !  "
        key="desc"
      />
    </Head>
    {openSubscriptionPopin && subscribingPopin}

    <div className={styles['home__header']}>
      <img className={styles.logo} src="Affut-Logo.png" alt="Logo" />

      <div className={styles.button}>
        <Button type="primary" title="Recevoir mon invitation" onButtonClick={() => setOpenSubscriptionPopin(true)} />
      </div>
    </div>

    <div className={styles.title}>
      <p className={styles['title__firstLine']}>Avec Affut</p>
      <p className={styles['title__secondLine']}>Trouvez, postulez, <span className={styles['title__secondLine--primary']}>suivez vos candidatures</span>  </p>
      <span className={styles['title__thirdLine']}>
        <span className={`${styles.underline}`} />
        <p className={`${styles.text}`}>au même endroit</p>
      </span>
      <p className={styles['title__fourthLine']}>(et décrochez votre job de rêve !) </p>
    </div>

    <div className={styles.images}>
      <img className={styles['images__first']} src="/images/landingpage/001.jpg" alt="" />
      <img className={styles['images__second']} src="images/landingpage/002.jpg" alt="" />
      <img className={styles['images__third']} src="images/landingpage/003.jpg" alt="" />
      <img className={styles['images__fourth']} src="images/landingpage/004.jpg" alt="" />
    </div>

  </div>
};

export default Home;