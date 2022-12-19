
import React, { FC } from 'react';

type BurgerMenuProps = {
    height?: number
    color?: string
}


export const BurgerMenu: FC<BurgerMenuProps> = ({ height = 48, color }) =>
    <svg height={height} width={height}>
        <svg xmlns="http://www.w3.org/2000/svg" fill={color} height={height} width={height}><path d="M6 36v-3h36v3Zm0-10.5v-3h36v3ZM6 15v-3h36v3Z" /></svg>
    </svg>
