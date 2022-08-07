import { createContext, useEffect, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({children}) => {
// const [allPosts, setAllPosts] = useState(null);

    // useEffect(() => {
    //     fetch(`/api/posts`)
    //       .then((res) => res.json())
    //       .then((data) => {
    //         console.log(data);
    //         setAllPosts(data)
    //       })
    //       .catch((err) => console.log(err));
    //   }, []);

    //do the same ^ for allUsers



    return(
       <Context.Provider value={{}}>
           {children}
       </Context.Provider>
    )
}