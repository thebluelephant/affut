import React, { useState, forwardRef, useImperativeHandle } from 'react';
import styles from './deleteFollowupPopin.module.scss';
import Button from '../../shared/button/button';
import Popin from '../../shared/popin/popin';

type DeleteFollowupPopinProps = {
    onConfirmDeletion: () => void;
}
type DeleteFollowupPopinRef = {
    openPopin: () => void;
}

const DeleteFollowupPopin = forwardRef<DeleteFollowupPopinRef, DeleteFollowupPopinProps>(
    ({ onConfirmDeletion }, ref) => {

        DeleteFollowupPopin.displayName = 'DeleteFollowupPopin';
        const [popInOpen, setPopInOpen] = useState<boolean>(false);

        useImperativeHandle(ref, () => ({
            openPopin: () => setPopInOpen(true)
        }));

        return (
            <Popin shouldOpen={popInOpen} onPopinCrossClicked={() => setPopInOpen(false)}>
                <div className={styles['popin-body']}>
                    <p>Voulez-vous vraiment supprimer ce suivi ?</p>

                    <div className={styles['popin-body__buttons']}>
                        <Button title={'Foui'} type={"primary"} onButtonClick={() => { onConfirmDeletion(), setPopInOpen(false) }
                        } />
                        <Button title={'Naon'} type={"primary"} onButtonClick={() => { setPopInOpen(false) }
                        } />
                    </div>
                </div>
            </Popin>
        );
    }
);

export default DeleteFollowupPopin;