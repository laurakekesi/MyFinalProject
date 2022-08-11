import { createContext, useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';

export const Context = createContext();

export const ContextProvider = ({children}) => {
const [allPosts, setAllPosts] = useState(null);
const [allUsers, setAllUsers] = useState(null);
const [loggedInUser, setLoggedInUser] = useState(null);
const [pointsTally, setPointsTally] = useState(0);
const [selectedAnswer, setSelectedAnswer] = useState(null);
const [shuffledAnswers, setShuffledAnswers] = useState(null);

const { user: currentUser, isAuthenticated, isLoading } = useAuth0();

 //fetches all posts and sets allPosts
useEffect(() => {
    fetch('/api/posts')
    .then((res) => res.json())
    .then((data) => {
        setAllPosts(data.data.reverse());
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

//if isAuthenticated, takes the logged in user's email, and puts it in a fetch to get that same user
//from mongo, and setLoggedInUser to that user's data.
useEffect(() => {
    if(isAuthenticated){
    fetch(`/api/userByEmail/${currentUser.email}`)
    .then((res) => res.json())
    .then((data) => {
        setLoggedInUser(data.data);
    })
    .catch((err) => console.log("err", err))}
}, [currentUser])






    return(
       <Context.Provider value={{ allPosts, setAllPosts, allUsers, currentUser, loggedInUser,
        pointsTally, setPointsTally, selectedAnswer, setSelectedAnswer, shuffledAnswers,
        setShuffledAnswers,
       }}>
           {children}
       </Context.Provider>
    )
}