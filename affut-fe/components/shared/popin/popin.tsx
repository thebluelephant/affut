import React, { FC, ReactElement, ReactNode, useEffect, useState } from 'react';
import styles from './popin.module.scss';

type PopinProps = {
    children: ReactNode;
    shouldOpen: boolean;
    onPopinCrossClicked : () => void;
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
        isOpen &&
        <div className={`${styles.popin} ${isOpen ? styles['popin--open'] : ''}`}>
            <p className={`${styles.cross}`} onClick={() => closePopin()}>Cross</p>
            <div className={`${styles.container}`}>
                {children}
            </div>
        </div>
    )

};

export default Popin;