
import React, { FC } from 'react';

type CheckProps = {
    height?: number
    color?: string
}

export const Check: FC<CheckProps> = ({ height = 48, color }) =>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${height} ${height}`}>
        <path d="M18.9 35.7 7.7 24.5l2.15-2.15 9.05 9.05 19.2-19.2 2.15 2.15Z"/>
    </svg>
