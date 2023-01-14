import React, { useState, forwardRef, useImperativeHandle } from 'react';
import styles from './binaryPopin.module.scss';
import Button from '../button/button';
import Popin from '../popin/popin';

type BinaryPopinProps = {
    text: string,
    onConfirm: () => void;
}
type BinaryPopinRef = {
    openPopin: () => void;
}

const BinaryPopin = forwardRef<BinaryPopinRef, BinaryPopinProps>(
    ({ onConfirm, text }, ref) => {

        BinaryPopin.displayName = 'BinaryPopin';
        const [popInOpen, setPopInOpen] = useState<boolean>(false);

        useImperativeHandle(ref, () => ({
            openPopin: () => setPopInOpen(true)
        }));

        return (
            <Popin shouldOpen={popInOpen} onPopinCrossClicked={() => setPopInOpen(false)}>
                <div className={styles['popin-body']}>
                    <p>{text}</p>

                    <div className={styles['popin-body__buttons']}>
                        <Button title={'Foui'} type={"primary"} onButtonClick={() => { onConfirm(), setPopInOpen(false) }
                        } />
                        <Button title={'Naon'} type={"primary"} onButtonClick={() => { setPopInOpen(false) }
                        } />
                    </div>
                </div>
            </Popin>
        );
    }
);

export default BinaryPopin;