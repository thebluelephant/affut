import { NextPage } from "next";
import { useEffect, useState } from "react";
import { getUserFollowUps, updateFollowup } from "../services/api/followup.api";
import styles from '../styles/followupPage.module.scss'
import { Followup } from "../services/typing/followup.interface";
import { Edit } from "../styles/icons/edit";
import { Delete } from "../styles/icons/delete";
import { Check } from "../styles/icons/check";
import { Cross } from "../styles/icons/cross";


interface FollowupProps {
}

const Followup: NextPage<FollowupProps> = ({ }) => {
  const [followUps, setFollowUps] = useState<Followup[]>();
  const [rowInEdition, setRowInEdition] = useState<Followup | null>(null);

  useEffect(() => {
    getUserFollowups();
  }, []);

  const getUserFollowups = () => {
    getUserFollowUps("2").then((resp) => setFollowUps(resp));
  }

  const saveEditedRow = () => {
    if (rowInEdition) {
      updateFollowup(rowInEdition).then((resp) => {
        if (resp === 200) {
          getUserFollowups();
          setRowInEdition(null);
        }
      })
    }
  }

  const returnRow = (row: Followup) => {
    const colNames = Object.keys(row);

    return colNames.map(colName => {

      if (colName === "userId" || colName === "id") {
        return
      }
      
      if (rowInEdition && rowInEdition.id === row.id) {
        return (
          <input type="text" value={rowInEdition[colName as keyof typeof rowInEdition] ?? ''} key={colName} onChange={(e) => {
            setRowInEdition((rowInEdition) => ({
              ...rowInEdition,
              ...{ [colName]: e.target.value }
            }))
          }} />
        )
      } else {
        return (<span key={colName}>{row[colName as keyof typeof row]}</span>)
      }
    })
  }

  return <div className={styles.followupPage}>
    <div className={styles.table}>
      <div className={styles['row__header']}>
        <span>Entreprise</span>
        <span>Date de candidature</span>
        <span>Titre du poste</span>
        <span>Lien de lannonce</span>
        <span>Status</span>
      </div>

      {
        followUps?.map((followUp) => {
          return (
            <div className={styles.row} key={followUp.id}>

              <div className={styles['row__data']}>
                {returnRow(followUp)}
              </div>

              <div className={styles['row__actions']}>
                {
                  rowInEdition && followUp.id === rowInEdition?.id && <>
                    <div className={`${styles.actionButton} ${styles['actionButton--green']}`} onClick={() => saveEditedRow()}>
                      <span className={styles.icon}>
                        <Check color="green" />
                      </span>
                    </div>
                    <div className={`${styles.actionButton} ${styles['actionButton--red']}`}>
                      <span className={styles.icon} onClick={() => setRowInEdition(null)}>
                        <Cross color="red" />
                      </span>
                    </div>
                  </>
                }

                {
                  followUp.id !== rowInEdition?.id &&
                  <div className={styles.actionButton} onClick={() => setRowInEdition(followUp)}>
                    <span className={styles.icon}>
                      <Edit />
                    </span>
                  </div>
                }

                <div className={styles.actionButton}>
                  <span className={styles.icon}>
                    <Delete />
                  </span>
                </div>

              </div>
            </div>
          )
        })
      }
    </div>


  </div>;
};

export default Followup;