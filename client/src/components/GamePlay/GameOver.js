import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Context } from "../../context/Context";
import Loading from "../Loading";
import NewBestSub from "./GameOverStates/NewBestSub";
import NewBoth from "./GameOverStates/NewBoth";
import NewHighScore from "./GameOverStates/NewHighScore";
import { useHistory } from "react-router-dom";

const GameOver = () => {
  const { pointsTally, loggedInUser, setBestSub } = useContext(Context);
  const [gameOverState, setGameOverState] = useState(null);
  


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
    const highestValue = Number(Math.max(...setToNum));
    
    const getObjKey = (obj, value) => {
        return Object.keys(obj).find(key => obj[key] === value);
    }
    const newBestSubject = getObjKey(correctAnswers, highestValue);
    
    console.log("currentBestSub",Number(correctAnswers[currentBestSubject]))
    console.log("highestVal",highestValue)
    console.log("newBestSubject", newBestSubject)
    //if the user has a new best subject and a new high score, both patches will be done
    //and the gameOverState will be updated
    if (Number(correctAnswers[currentBestSubject]) < highestValue && pointsTally>currentHighScore){
    setBestSub(newBestSubject);
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
    .catch((err) => history.push("/error"))
    
    //highScore patch
    fetch(`/api/highScore/${loggedInUser._id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            highScore : pointsTally
        })
    })
    .then((res) => res.json())
    .catch((err) => history.push("/error"))
    
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
    .catch((err) => history.push("/error"));
    
    //if the user has only a new best subject, the corresponding patch will happen and
    //the gameOverState will be set to "newBestSubject"
    } else if (Number(correctAnswers[currentBestSubject]) < highestValue) {
    setBestSub(newBestSubject);
    setGameOverState("newBestSubject");
        fetch(`/api/bestSubject/${loggedInUser._id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            bestSubject: newBestSubject
        })
    })
    .then((res) => res.json())
    .catch((err) => history.push("/error"));
    }
    
    //if none of the above take place, the state will be set to "noNewTops"
    else {
    setGameOverState("noNewTops")
    }
}
    }




  //calls the gameOver func (lives in context) when this page is rendered, which will set
  //the appropriate gameOverState.
  useEffect(() => {
    gameOverHandler();
  }, [])

  const history = useHistory();

  const reloadPage = () => {
    window.location.reload();
  };

  const goHome = () => {
    history.push("/");
  };



  //depending on what state the game ends on, a different message will appear, and options to post a
  //predetermined message depending on the user's achievements.
  if (gameOverState === "newBoth") {
    return (
      <Wrapper>
        <BackgroundDiv>
          <SecondaryBackDiv>
            <TopMessage>Congrats! You scored {pointsTally} points!</TopMessage>
            <BottomMessage>
              <NewBoth />
            </BottomMessage>
          </SecondaryBackDiv>
        </BackgroundDiv>
      </Wrapper>
    );
  } else if (gameOverState === "newBestSubject") {
    return (
      <Wrapper>
        <BackgroundDiv>
          <SecondaryBackDiv>
            <TopMessage>Congrats! You scored {pointsTally} points!</TopMessage>
            <BottomMessage>
              <NewBestSub />
            </BottomMessage>
          </SecondaryBackDiv>
        </BackgroundDiv>
      </Wrapper>
    );
  } else if (gameOverState === "newHighScore") {
    return (
      <Wrapper>
        <BackgroundDiv>
          <SecondaryBackDiv>
            <TopMessage>Congrats! You scored {pointsTally} points!</TopMessage>
            <BottomMessage>
              <NewHighScore />
            </BottomMessage>
          </SecondaryBackDiv>
        </BackgroundDiv>
      </Wrapper>
    );
  } else if (gameOverState === "noNewTops")
    return (
      <Wrapper>
        <BackgroundDiv>
          <SecondaryBackDiv>
            <TopMessage>Congrats! You scored {pointsTally} points!</TopMessage>
            <BottomMessage>
              <PlayAgain>Play again?</PlayAgain>
              <ButtonsDiv>
                <Container>
                  <Button onClick={reloadPage}>
                    🎉
                    <Overlay>
                      <Text>Let's do it!</Text>
                    </Overlay>
                  </Button>
                </Container>
                <Container>
                  <Button onClick={goHome}>
                    🏡
                    <Overlay>
                      <Text>No Thanks!</Text>
                    </Overlay>
                  </Button>
                </Container>
              </ButtonsDiv>
            </BottomMessage>
          </SecondaryBackDiv>
        </BackgroundDiv>
      </Wrapper>
    );
  else {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }
};

const Overlay = styled.div`
  position: absolute;

  left: -10px;
  top: -10px;
  height: 70px;
  width: 70px;
  opacity: 0;
  transition: 0.5s ease;
  background-color: rgba(255, 125, 158, 0.5);
  border-radius: 50%;

  &:hover {
    opacity: 1;
  }

  cursor: pointer;
`;
const Container = styled.span`
  position: relative;
  width: 30%;
  margin-left: 150px;
`;

const Text = styled.span`
  color: white;
  font-family: var(--test-font);
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
`;
const Button = styled.button`
  background: none;
  border: none;
  font-size: 40px;
  cursor: pointer;
`;
const ButtonsDiv = styled.div`
  display: flex;
  margin-top: 50px;
  width: 70%;
  justify-content: center;
`;
const PlayAgain = styled.div`
  font-family: var(--test-font);
  font-size: 30px;
  margin-top: 40px;
`;
const BottomMessage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TopMessage = styled.div`
  font-family: var(--test-font);
  font-size: 40px;
  margin-top: 40px;
`;
const SecondaryBackDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 85%;
  width: 85%;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.5);
  border: var(--orangey-yellow) 4px solid;
`;
const BackgroundDiv = styled.div`
  width: 85%;
  height: 85%;
  background: rgba(172, 216, 210, 0.5);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
  width: 100%;
`;
export default GameOver;
