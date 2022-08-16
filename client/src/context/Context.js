import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [pointsTally, setPointsTally] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState(null);
  const [bestSub, setBestSub] = useState("test");
  const [allPosts, setAllPosts] = useState(null);
  const history = useHistory();

  const { user: currentUser, isAuthenticated } = useAuth0();

  //fetches all users and sets allUsers
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data.data);
      })
      .catch((err) => history.push("/error"));
  }, []);

  //if isAuthenticated, takes the logged in user's email, and puts it in a fetch to get that same user
  //from mongo, and setLoggedInUser to that user's data.
  useEffect(() => {
    if (isAuthenticated) {
      fetch(`/api/userByEmail/${currentUser.email}`)
        .then((res) => res.json())
        .then((data) => {
          setLoggedInUser(data.data);
        })
        .catch((err) => history.push("/error"));
    }
  }, [currentUser]);

  //used in gameOver components to restart game
  const reloadPage = () => {
    window.location.reload();
  };

  //used in gameOver components to send the user home if they don't want to play again
  const goHome = () => {
    history.push("/");
  };

  return (
    <Context.Provider
      value={{
        allPosts,
        setAllPosts,
        allUsers,
        currentUser,
        loggedInUser,
        pointsTally,
        setPointsTally,
        selectedAnswer,
        setSelectedAnswer,
        shuffledAnswers,
        setShuffledAnswers,
        reloadPage,
        goHome,
        bestSub,
        setBestSub,
      }}
    >
      {children}
    </Context.Provider>
  );
};
