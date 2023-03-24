import { createContext, useContext } from 'react';

export interface AppContext {
    subscription : string,
    userId : string
}
export const AppContext = createContext({subscription : [], userId : ''});
