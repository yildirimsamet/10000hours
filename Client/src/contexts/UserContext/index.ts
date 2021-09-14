import {createContext,useContext} from 'react';
const UserContext = createContext(null);
export const UserProvider:any = UserContext.Provider;
export const useUser = ():any => useContext(UserContext);
