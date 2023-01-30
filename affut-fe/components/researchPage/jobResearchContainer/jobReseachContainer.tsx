import React, { FC, ReactElement, useState } from 'react';
import debounce from 'lodash.debounce';
import styles from './jobReseachContainer.module.scss';
import Button from '../../shared/button/button';
import Title from '../../shared/title/title';
import { getCityPostalCode } from '../../../services/api/address.api';

type JobSearchContainerProps = {
    onResearch: (jobKeyWord: string, locality: number) => void;
}

const JobReseachContainer: FC<JobSearchContainerProps> = ({ onResearch }): ReactElement => {
    const [jobKeyWord, setJobKeyWord] = useState<string>('');
    const [locality, setLocality] = useState<{ city: string, code: number }>({ city: '', code: 0 });
    const [localitySuggestions, setLocalitySuggestions] = useState<{ city: string, code: number }[]>([])


    const onLocalityChange = (value: string | React.SetStateAction<{ city: string; code: number; }>) => {
        setLocality(value);
        getSuggestions(value);
    }

    const getSuggestions = debounce((value) => {
        if (value.length > 3) {
            getCityPostalCode(value).then((resp) => setLocalitySuggestions(resp))
        } else if (value.length === 0) {
            setLocalitySuggestions([])
        }
    }, 500)

    return (
        <div className={styles.jobReseachContainer}>
            <div className={styles.title}>
                <Title title={'Rechercher une offre'} />
            </div>
            <input type="text" placeholder='Intitulé du job' onChange={(e) => setJobKeyWord(e.target.value)} />
            <div className={styles.postalCode}>
                <input type="text" placeholder='Code postale' onChange={(e) => onLocalityChange(e.target.value)} value={locality?.city} />
                <li >
                    {localitySuggestions.map((suggestion) => <ul onClick={() => { setLocality(suggestion), setLocalitySuggestions([]) }} key={suggestion.code}>{suggestion.city}</ul>)}
                </li>
            </div>
            <Button title={'Rechercher'} type={"primary"} onButtonClick={() => onResearch(jobKeyWord, locality?.code)
            } />

        </div>
    )
};

export default JobReseachContainer;