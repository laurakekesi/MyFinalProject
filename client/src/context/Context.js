import { createContext, useEffect } from "react";

export const Context = createContext();

export const ContextProvider = ({children}) => {

    // useEffect(()=>{

    // }, [])

    return(
       <Context.Provider value={{}}>
           {children}
       </Context.Provider>
    )
}