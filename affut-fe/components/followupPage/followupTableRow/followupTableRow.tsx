import React, { FC } from 'react';
import styles from './followupTableRow.module.scss';
import { Followup } from '../../../services/typing/followup.interface';
import Button from '../../shared/button/button';

type FollowupTableRowProps = {
    followup: Followup;
    followUpInEdition: Followup | null;
    setFollowUpInEdition: (colHeader: string, newValue: string) => void;
}

const FollowupTableRow: FC<FollowupTableRowProps> = ({ followup, followUpInEdition, setFollowUpInEdition }) => {
  const headers = Object.keys(followup);
  const currentRowIsInEdition = followUpInEdition && followUpInEdition.id === followup.id;

  const renderInput = (colHeader: string) => {
    const data = followUpInEdition && followUpInEdition[colHeader as keyof typeof followUpInEdition];

    if (colHeader === "status") {
      return <select value={data ?? 'toSend'} className={styles['text__select']} name="status" onChange={(e) => { setFollowUpInEdition(colHeader, e.target.value) }}>
        <option value="toSend">A envoyer</option>
        <option value="sent">Candidature envoyée</option>
        <option value="meetingPlanned">Entretien planifié</option>
        <option value="refused">Candidature refusée</option>
        <option value="accepted">En attente doffre</option>
      </select>
    } else {
      // We need to use followUpInEdition data when editing to see real time changes
      return <input className={styles['text__input']} type="text" value={data ?? ''} key={colHeader}
        onChange={(e) => { setFollowUpInEdition(colHeader, e.target.value) }} />
    }
  }

  const renderReadOnlyData = (colHeader: string) => {
    const data = followup[colHeader as keyof typeof followup];

    if (data && colHeader === "announceUrl") {
      return <a rel="noreferrer" target="_blank" href={data}>
        <Button title={"Voir l'annonce"} type={'secondary'} onButtonClick={() => ''} />
      </a>
    } else if (colHeader === "status") {
      return <div className={styles.statusContainer}>
        <span className={`${styles.dot} ${styles[`dot--${data}`]} `}></span>
        <p className={styles['text__data']}>{data}</p>
      </div>
    } else {
      return <p className={styles['text__data']}>{data}</p>
    }
  }

  return <>
    {headers.map(colHeader => {
      if (colHeader === "userId" || colHeader === "id") {
        return;
      }
      if (currentRowIsInEdition) {
        return (
          renderInput(colHeader)
        )
      } else return (
        <div key={colHeader} className={styles.text}>
          <p className={styles['text__colName']}>{colHeader}</p>
          {renderReadOnlyData(colHeader)}
        </div>
      )
    })}
  </>
};

export default FollowupTableRow;