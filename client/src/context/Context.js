import { createContext, useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';

export const Context = createContext();

export const ContextProvider = ({children}) => {
const [allPosts, setAllPosts] = useState(null);
const [allUsers, setAllUsers] = useState(null);
const [loggedInUser, setLoggedInUser] = useState(null);
const { user: currentUser, isAuthenticated, isLoading } = useAuth0();

 //fetches all posts and sets allPosts
useEffect(() => {
    fetch('/api/posts')
    .then((res) => res.json())
    .then((data) => {
        setAllPosts(data.data);
    })
    .catch((err) => console.log("err", err))
}, [])

//fetches all users and sets allUsers 
useEffect(() => {
    fetch('/api/users')
    .then((res) => res.json())
    .then((data) => {
        setAllUsers(data.data);
    })
    .catch((err) => console.log("err", err))
}, [])


useEffect(() => {
    if(isAuthenticated){
    fetch(`/api/userByEmail/${currentUser.email}`)
    .then((res) => res.json())
    .then((data) => {
        setLoggedInUser(data.data);
    })
    .catch((err) => console.log("err", err))}
}, [currentUser])




console.log(loggedInUser);
// currentUser =>
// email: "laurakekesi@gmail.com"
// email_verified: true
// family_name: "kekesi"
// given_name: "laura"
// locale: "en-GB"
// name: "laura kekesi"
// nickname: "laurakekesi"
// picture: "https://lh3.googleusercontent.com/a-/AFdZucpCEg4xzRjY0yPeTkOmJxVPzC86tbjGlwSYPADoSw=s96-c"
// sub: "google-oauth2|114732156286624958710"
// updated_at: "2022-08-10T15:59:56.002Z"



    return(
       <Context.Provider value={{ allPosts, allUsers, currentUser, loggedInUser}}>
           {children}
       </Context.Provider>
    )
}