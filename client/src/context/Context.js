import { createContext, useEffect, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({children}) => {
const [allPosts, setAllPosts] = useState(null);
const [allUsers, setAllUsers] = useState(null);

useEffect(() => {
    fetch('/api/posts')
    .then((res) => res.json())
    .then((data) => {
        setAllPosts(data.data);
    })
    .catch((err) => console.log("err", err))
}, [])

useEffect(() => {
    fetch('/api/users')
    .then((res) => res.json())
    .then((data) => {
        setAllUsers(data.data);
    })
    .catch((err) => console.log("err", err))
}, [])


    //do the same ^ for allUsers



    return(
       <Context.Provider value={{ allPosts, allUsers }}>
           {children}
       </Context.Provider>
    )
}