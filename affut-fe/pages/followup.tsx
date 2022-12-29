import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { deleteFollowup, getUserFollowUps, updateFollowup } from "../services/api/followup.api";
import styles from '../styles/followupPage.module.scss'
import { Followup } from "../services/typing/followup.interface";
import { Edit } from "../styles/icons/edit";
import { Delete } from "../styles/icons/delete";
import { Check } from "../styles/icons/check";
import { Cross } from "../styles/icons/cross";
import DeleteFollowupPopin from "../components/followupPage/deleteFollowupPopin/deleteFollowupPopin";
import FollowupTableRow from "../components/followupPage/followupTableRow/followupTableRow";


interface FollowupProps {
}

const Followup: NextPage<FollowupProps> = ({ }) => {
  const [followUps, setFollowUps] = useState<Followup[]>();
  const [followUpInEdition, setFollowUpInEdition] = useState<Followup | null>(null);
  const [followupIdToDelete, setFollowUpIdToDelete] = useState<string | null>(null);
  const deletePopinRef = useRef<{ openPopin: () => void } | null>(null);

  useEffect(() => {
    getUserFollowups();
  }, []);

  const getUserFollowups = () => {
    getUserFollowUps("2").then((resp) => setFollowUps(resp));
  }

  const saveEditedFollowup = () => {
    if (followUpInEdition) {
      updateFollowup(followUpInEdition).then((resp) => {
        if (resp === 200) {
          getUserFollowups();
          setFollowUpInEdition(null);
        }
      })
    }
  }

  const onDeleteButtonClick = (followupId: string) => {
    setFollowUpIdToDelete(followupId);
    deletePopinRef?.current?.openPopin();
  }

  const deleteAFollowup = () => {
    if (followupIdToDelete) {
      deleteFollowup(followupIdToDelete).then((resp) => {
        if (resp) {
          getUserFollowups();
        }
      })
    }
  }

  return <div className={styles.followupPage}>

    <DeleteFollowupPopin ref={deletePopinRef} onConfirmDeletion={() => deleteAFollowup()} />

    <div className={styles['followupPage__table']}>
      <div className={styles['row__header']}>
        {
          followUps && Object.keys(followUps[0]).map((headerTitle) => {
            if (headerTitle === "userId" || headerTitle === "id") {
              return
            } else {
              return <span key={headerTitle}>{headerTitle}</span>
            }
          })
        }
      </div>

      {
        followUps?.map((followUp) => {
          const currentLineIsInEdition = followUpInEdition && followUp.id === followUpInEdition?.id;

          return (
            <>
              <div className={styles.row} key={followUp.id}>
                <div className={styles['row__data']}>
                  <FollowupTableRow followup={followUp} followUpInEdition={followUpInEdition} setFollowUpInEdition={(colName, newValue) => setFollowUpInEdition({
                    ...followUpInEdition,
                    ...{ [colName]: newValue }
                  })} />
                </div>

                <div className={styles['row__actions']}>
                  {
                    currentLineIsInEdition ?
                      <>
                        <div className={`${styles.actionButton} ${styles['actionButton--green']}`} onClick={() => saveEditedFollowup()}>
                          <span className={styles.icon}>
                            <Check color="green" />
                          </span>
                        </div>
                        <div className={`${styles.actionButton} ${styles['actionButton--red']}`}>
                          <span className={styles.icon} onClick={() => setFollowUpInEdition(null)}>
                            <Cross color="red" />
                          </span>
                        </div>
                      </>
                      :
                      <div className={styles.actionButton} onClick={() => setFollowUpInEdition(followUp)}>
                        <span className={styles.icon}>
                          <Edit />
                        </span>
                      </div>
                  }
                  <div className={styles.actionButton} onClick={() => onDeleteButtonClick(followUp.id)}>
                    <span className={styles.icon}>
                      <Delete />
                    </span>
                  </div>

                </div>
              </div>
            </>
          )
        })
      }
    </div>
  </div>;
};

export default Followup;