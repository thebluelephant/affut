import { NextPage } from "next";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useEffect, useRef, useState } from "react";
import { createFollowup, deleteFollowup, getUserFollowUps, updateFollowup } from "../services/api/followup.api";
import s from '../styles/followupPage.module.scss'
import { Followup } from "../services/typing/followup.interface";
import { Edit } from "../styles/icons/edit";
import { Delete } from "../styles/icons/delete";
import { Check } from "../styles/icons/check";
import { Cross } from "../styles/icons/cross";
import FollowupTableRow from "../components/followupPage/followupTableRow/followupTableRow";
import Button from "../components/shared/button/button";
import BinaryPopin from "../components/shared/binaryPopin/binaryPopin";
import { useSubscriptionAccess } from "../services/hooks/subscriptionAccess";
import { followUp } from "../services/variable/subscription";
import { useUser } from "@auth0/nextjs-auth0/client";
import { followupColName } from "../services/utils/followupTable";

interface FollowupProps {
}

const Followup: NextPage<FollowupProps> = ({ }) => {
  const {canAccess} = useSubscriptionAccess()
  const {user} = useUser()
  const [followUps, setFollowUps] = useState<Followup[]>([]);
  const [followUpInEdition, setFollowUpInEdition] = useState<Followup | null>(null);
  const [followupIdToDelete, setFollowUpIdToDelete] = useState<string | null>(null);

  const deletePopinRef = useRef<{ openPopin: () => void } | null>(null);
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const canCreateFollowup = canAccess(followUp) || canAccess(followUp) === false && followUps.length < 5 


  useEffect(() => {
    getUserFollowups();
  }, []);

  // Get follow ups 
  const getUserFollowups = () => {
    if (user && userId) {
      getUserFollowUps(userId, user.stripeId).then((resp) => setFollowUps(resp));
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
      createFollowup(followUpInEdition, user.stripeId).then((resp) => {
        if (resp.success) {
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
  return <div className={s.followupPage}>

    <BinaryPopin ref={deletePopinRef} onConfirm={() => deleteAFollowup()} text="Voulez-vous vraiment supprimer ce suivi ?" />
    <div className={s['followupPage__header']}>
      <Button title={"Créer"} type={canCreateFollowup ? 'primary' : 'disabled'} onButtonClick={createNewLine} />
    </div>

    <div className={s['followupPage__table']}>
      <div className={s['row__header']}>
        {
          followUps?.length ? Object.keys(followUps[0]).map((colName) => {
            if (colName === "userId" || colName === "id") {
              return
            } else {
              return <span key={colName}>{followupColName.get(colName)}</span>
            }
          }) : null
        }
      </div>
      {
        !followUps.length && <p className={s.noFollowups}>Vous n'avez pas encore de suivi</p>
      }

      {
        followUps?.map((followUp) => {
          const currentLineIsInEdition = followUpInEdition && followUp.id === followUpInEdition?.id;
          const currentLineIsInCreation = followUpInEdition && !followUp.id && !followUpInEdition.id;
          return (
            <>
              <div className={s.row} key={followUp.id}>
                <div className={s['row__data']}>
                  <FollowupTableRow followup={followUp} followUpInEdition={followUpInEdition} setFollowUpInEdition={(colName, newValue) => setFollowUpInEdition({
                    ...followUpInEdition,
                    ...{ [colName]: newValue }
                  })} />
                </div>

                {
                  <div className={s['row__actions']}>
                    {
                      currentLineIsInEdition || currentLineIsInCreation ?
                          <>
                            <div className={`${s.actionButton} ${s['actionButton--green']}`} onClick={() => currentLineIsInCreation ? saveNewFollowup() : saveEditedFollowup()}>
                              <span className={s.icon}>
                                <Check color="green" />
                              </span>
                            </div>
                            <div className={`${s.actionButton} ${s['actionButton--red']}`}>
                              <span className={s.icon} onClick={() => currentLineIsInCreation ? deleteNewLine() : setFollowUpInEdition(null)}>
                                <Cross color="red" />
                              </span>
                            </div>
                          </>
                        :
                          <div className={s.actionButton} onClick={() => onEditButtonClick(followUp)}>
                            <span className={s.icon}>
                              <Edit />
                            </span>
                          </div>
                    }
                    {
                      !currentLineIsInCreation && <div className={s.actionButton} onClick={() => onDeleteButtonClick(followUp.id)}>
                        <span className={s.icon}>
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