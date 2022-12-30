import { NextPage } from "next";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useEffect, useRef, useState } from "react";
import { createFollowup, deleteFollowup, getUserFollowUps, updateFollowup } from "../services/api/followup.api";
import styles from '../styles/followupPage.module.scss'
import { Followup } from "../services/typing/followup.interface";
import { Edit } from "../styles/icons/edit";
import { Delete } from "../styles/icons/delete";
import { Check } from "../styles/icons/check";
import { Cross } from "../styles/icons/cross";
import DeleteFollowupPopin from "../components/followupPage/deleteFollowupPopin/deleteFollowupPopin";
import FollowupTableRow from "../components/followupPage/followupTableRow/followupTableRow";
import Button from "../components/shared/button/button";

interface FollowupProps {
}

const Followup: NextPage<FollowupProps> = ({ }) => {
  const [followUps, setFollowUps] = useState<Followup[]>();
  const [followUpInEdition, setFollowUpInEdition] = useState<Followup | null>(null);
  const [followupIdToDelete, setFollowUpIdToDelete] = useState<string | null>(null);
  const deletePopinRef = useRef<{ openPopin: () => void } | null>(null);
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;



  useEffect(() => {
    getUserFollowups();
  }, []);

  // Get follow ups 
  const getUserFollowups = () => {
    if (userId) {
      getUserFollowUps(userId).then((resp) => setFollowUps(resp));

    }
  }

  // Create follow ups
  const createNewLine = () => {
    const newFollowup: Followup = {
      company: '',
      applicationDate: '',
      jobName: '',
      announceUrl: '',
      status: 'toSend',
      userId: userId ?? '',
    }
    setFollowUps(followups => [newFollowup, ...followups ?? []])
    setFollowUpInEdition(newFollowup)
  }

  const deleteNewLine = () => {
    const initialFollowups = [...followUps ?? []];
    setFollowUps(initialFollowups.splice(1))
    setFollowUpInEdition(null);
  }

  const saveNewFollowup = () => {
    if (followUpInEdition) {
      createFollowup(followUpInEdition).then((resp) => {
        if (resp === 200) {
          setFollowUpInEdition(null);
          getUserFollowups();
        }
      });
    }
  }

  // Edit follow ups 
  const onEditButtonClick = (followUp: Followup) => {
    const isCreatingAFollowup = followUpInEdition && !followUpInEdition.id

    //If we click on edit button while creating a new follow up, we cancel this creation
    if (isCreatingAFollowup) {
      deleteNewLine();
    }

    setFollowUpInEdition(followUp);
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

  // Delete follow ups 
  const onDeleteButtonClick = (followupId: string) => {
    const isCreatingAFollowup = followUpInEdition && !followUpInEdition.id

    //If we click on delete button while creating a new follow up, we cancel this creation
    if (isCreatingAFollowup) {
      deleteNewLine();
      setFollowUpInEdition(null);
    }

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
    <div className={styles['followupPage__header']}>
      <Button title={"Créer"} type={"primary"} onButtonClick={createNewLine} />
    </div>

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
          const currentLineIsInCreation = followUpInEdition && !followUp.id && !followUpInEdition.id;
          return (
            <>
              <div className={styles.row} key={followUp.id}>
                <div className={styles['row__data']}>
                  <FollowupTableRow followup={followUp} followUpInEdition={followUpInEdition} setFollowUpInEdition={(colName, newValue) => setFollowUpInEdition({
                    ...followUpInEdition,
                    ...{ [colName]: newValue }
                  })} />
                </div>

                {
                  <div className={styles['row__actions']}>
                    {
                      currentLineIsInEdition || currentLineIsInCreation ?
                        <>
                          <div className={`${styles.actionButton} ${styles['actionButton--green']}`} onClick={() => currentLineIsInCreation ? saveNewFollowup() : saveEditedFollowup()}>
                            <span className={styles.icon}>
                              <Check color="green" />
                            </span>
                          </div>
                          <div className={`${styles.actionButton} ${styles['actionButton--red']}`}>
                            <span className={styles.icon} onClick={() => currentLineIsInCreation ? deleteNewLine() : setFollowUpInEdition(null)}>
                              <Cross color="red" />
                            </span>
                          </div>
                        </>
                        :
                        <div className={styles.actionButton} onClick={() => onEditButtonClick(followUp)}>
                          <span className={styles.icon}>
                            <Edit />
                          </span>
                        </div>
                    }
                    {
                      !currentLineIsInCreation && <div className={styles.actionButton} onClick={() => onDeleteButtonClick(followUp.id)}>
                        <span className={styles.icon}>
                          <Delete />
                        </span>
                      </div>
                    }


                  </div>
                }

              </div>
            </>
          )
        })
      }
    </div>
  </div>;
};

export const getServerSideProps = withPageAuthRequired();
export default Followup;