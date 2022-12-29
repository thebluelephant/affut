import React, { FC, ReactElement, ReactNode, useEffect, useState } from 'react';
import { Cross } from '../../../styles/icons/cross';
import styles from './popin.module.scss';

type PopinProps = {
    children: ReactNode;
    shouldOpen: boolean;
    onPopinCrossClicked: () => void;
}

const Popin: FC<PopinProps> = ({ children, shouldOpen, onPopinCrossClicked }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        setIsOpen(shouldOpen ?? false)
    }, [shouldOpen])

    const closePopin = () => {
        setIsOpen(false);
        onPopinCrossClicked();
    }
    return (
        <>
            {
                isOpen &&
                <div className={`${styles.popin} ${isOpen ? '' : styles['popin--closed']}`}>
                    <div className={`${styles['popin__container']}`} >
                        <div className={`${styles.cross}`} onClick={() => closePopin()}>
                            <Cross />
                        </div>
                        <div>
                            {children}
                        </div>
                    </div>

                </div>
            }
        </>

    )

};

export default Popin;