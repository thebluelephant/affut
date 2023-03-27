import { NextPage } from "next";
import styles from '../styles/hello.module.scss';
import Head from "next/head";

const Hello: NextPage = () => {
  return <div className={styles.home}>
    <Head>
      <title>Affut : l'assistant en ligne pour votre recherche d'emploi ! </title>
      <meta
        name="description"
        content="Trouvez votre job idéal avec Affut : accédez à des milliers d'offres d'emploi de plus de 5 moteurs de recherche, générez une lettre de motivation en quelques minutes et suivez facilement vos candidatures ! Que vous soyez débutant, étudiant, à temps partiel, saisonnier ou à distance, Affut est votre assistant personnel pour trouver le travail qui vous correspond !"
        key="desc"
      />
    </Head>
    
    <div className={styles.title}>
      <h2 className={styles['title__firstLine']}>Avec Affut</h2>
      <h1>Trouvez, postulez, <span className={styles.primary}>suivez vos candidatures</span>  </h1>
      <span className={styles['title__thirdLine']}>
        <span className={`${styles.underline}`} />
        <p className={`${styles.text}`}>au même endroit</p>
      </span>
      <h3 className={styles['title__fourthLine']}>(et décrochez votre job de rêve !) </h3>
    </div>

    <div className={styles.images}>
      <img className={styles['images__first']} src="/images/landingpage/001.jpg" alt="" />
      <img className={styles['images__second']} src="images/landingpage/002.jpg" alt="" />
      <img className={styles['images__third']} src="images/landingpage/003.jpg" alt="" />
      <img className={styles['images__fourth']} src="images/landingpage/004.jpg" alt="" />
    </div>

  </div>
};

export default Hello;
