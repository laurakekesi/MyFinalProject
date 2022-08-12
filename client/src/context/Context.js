import { createContext, useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from "react-router-dom";

export const Context = createContext();

export const ContextProvider = ({children}) => {
const [allPosts, setAllPosts] = useState(null);
const [allUsers, setAllUsers] = useState(null);
const [loggedInUser, setLoggedInUser] = useState(null);
const [pointsTally, setPointsTally] = useState(0);
const [selectedAnswer, setSelectedAnswer] = useState(null);
const [shuffledAnswers, setShuffledAnswers] = useState(null);
const [gameOverState, setGameOverState] = useState(null);
const [bestSub, setBestSub] = useState("test");
const history = useHistory();

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

const gameOverHandler = () => {
    if (loggedInUser){
    //maps over all the values in the correctAnswers object, and if any of them have a higher 
    //value than the current bestSubject's value, the bestSubject is replaced by the the new category 
    //that holds the higher value.
    const currentHighScore = Number(loggedInUser.highScore);
    const currentBestSubject = loggedInUser.bestSubject;
    const correctAnswers = loggedInUser.correctAnswers;
    const allValues = Object.values(correctAnswers);
    const setToNum = allValues.map((num) => Number(num));
    const highestValue = Math.max(...setToNum);
    
    const getObjKey = (obj, value) => {
        return Object.keys(obj).find(key => obj[key] === value);
    }
    const newBestSubject = getObjKey(correctAnswers, highestValue);
    setBestSub(newBestSubject);
    
    //if the user has a new best subject and a new high score, both patches will be done
    //and the gameOverState will be updated
    if (Number(correctAnswers[currentBestSubject]) < highestValue  && pointsTally>currentHighScore){
    setGameOverState("newBoth");
    //best subject patch
    fetch(`/api/bestSubject/${loggedInUser._id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            bestSubject : newBestSubject
        })
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
    
    //highScore patch
    fetch(`/api/highScore/${loggedInUser._id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            highScore : pointsTally
        })
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
    
    //if the user has only a new high score, the corresponding patch will happen and
    //the gameOverState will be set to "newHighScore"
    } else if (pointsTally>currentHighScore) {
    setGameOverState("newHighScore");
    fetch(`/api/highScore/${loggedInUser._id}`, {
        method: "PATCH",
        headers: {"Content-Type" : "application/json"},
        body : JSON.stringify({
            highScore: pointsTally
        })
    })
    .then((res) => res.json())
    .then((data)=> console.log(data))
    .catch((err) => console.log(err))
    
    //if the user has only a new best subject, the corresponding patch will happen and
    //the gameOverState will be set to "newBestSubject"
    } else if (Number(correctAnswers[currentBestSubject]) < highestValue) {
    setGameOverState("newBestSubject")
        fetch(`/api/bestSubject${loggedInUser._id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            bestSubject: newBestSubject
        })
    })
    .then((res) => res.json)
    .then((data) => console.log(data))
    .catch((err) => console.log)
    }
    
    //if none of the above take place, the state will be set to "noNewTops"
    else {
    setGameOverState("noNewTops")
    }
}
    }


    //used in gameOver components to restart game
    const reloadPage = () => {
        window.location.reload();
    }

    //used in gameOver components to send the user home if they don't want to play again
    const goHome = () => {
        history.push('/')
    }


    return(
       <Context.Provider value={{ allPosts, setAllPosts, allUsers, currentUser, loggedInUser,
        pointsTally, setPointsTally, selectedAnswer, setSelectedAnswer, shuffledAnswers,
        setShuffledAnswers, gameOverState, gameOverHandler, reloadPage, goHome, bestSub
       }}>
           {children}
       </Context.Provider>
    )
}