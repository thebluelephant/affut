import React, { FC } from 'react';
import styles from './followupTableRow.module.scss';
import { Followup } from '../../../services/typing/followup.interface';

type FollowupTableRowProps = {
    followup: Followup;
    followUpInEdition: Followup | null;
    setFollowUpInEdition: (colHeader: string, newValue: string) => void;
}

const FollowupTableRow: FC<FollowupTableRowProps> = ({ followup, followUpInEdition, setFollowUpInEdition }) => {
    const headers = Object.keys(followup);

    return <>
        {headers.map(colHeader => {
            if (colHeader === "userId" || colHeader === "id") {
                return;
            }

            // We need to use followUpInEdition data when editing to see real time changes
            if (followUpInEdition && followUpInEdition.id === followup.id) {
                return (
                    <input className={styles['text__input']} type="text" value={followUpInEdition[colHeader as keyof typeof followUpInEdition] ?? ''} key={colHeader}
                        onChange={(e) => { setFollowUpInEdition(colHeader, e.target.value) }} />
                )
            } else return (
                <div key={colHeader} className={styles.text}>
                    <p className={styles['text__colName']}>{colHeader}</p>
                    <p className={styles['text__data']}>{followup[colHeader as keyof typeof followup]}</p>
                </div>)
        })}
    </>
};

export default FollowupTableRow;