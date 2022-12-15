import React, { FC, ReactElement, useState } from 'react';
import styles from './jobReseachContainer.module.scss';
import Button from '../shared/button/button';

type JobSearchContainerProps = {
    onResearch: (jobKeyWord: string, locality: number) => void;
}

const JobReseachContainer: FC<JobSearchContainerProps> = ({ onResearch }): ReactElement => {
    const [jobKeyWord, setJobKeyWord] = useState<string>('');
    const [locality, setLocality] = useState<number>(0);

    return (
        <div className={styles.jobReseachContainer}>
            <p className='title'>Rechercher une offre</p>
            <input type="text" placeholder='Intitulé du job' onChange={(e) => setJobKeyWord(e.target.value)} />
            <input type="number" placeholder='Code postale' onChange={(e) => setLocality(e.target.value)} />
            <Button title={'Rechercher'} type={"primary"} onButtonClick={() => onResearch(jobKeyWord, locality)
            } />

        </div>
    )
};

export default JobReseachContainer;