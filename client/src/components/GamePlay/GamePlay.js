import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Play from "./Play";
import Result from "./Result";
import Loading from "../Loading";
import { Context } from "../../context/Context";
import GameOver from "./GameOver";

const GamePlay = () => {
  const [triviaQuestions, setTriviaQuestions] = useState(null);
  const [triviaIndex, setTriviaIndex] = useState(null);
  const [gameState, setGameState] = useState("pause");
  const {setPointsTally} = useContext(Context);
  const [shuffledAnswers, setShuffledAnswers] = useState([])
  
  //sets the points back to 0 at the beginning of every game.
  if (gameState === "pause"){
    setPointsTally(0);
  }

  useEffect(() => {
    fetch("/api/triviaQuestions")
      .then((res) => res.json())
      .then((data) => {
        setTriviaQuestions(data.data);
        //when data is fetched, sets triviaIndex && pointsTally to 0, beginning the game
        setTriviaIndex(0);
      })
      .catch((err) => console.log("err", err));
  }, []);

  useEffect(() => {
    //when triviaIndex is changed, game state is set to play for 15 seconds
    setGameState("play");
    setTimeout(() => {
      //after 15 seconds, game is set to "result" state for 5 seconds
      //after 5 seconds, if the index is under 19, add a number to index, allowing
      //the useEffect to repeat all over again but with a new question. 
      setGameState("result");
      setTimeout(() => {
          if (triviaIndex < 19 ) {
          setTriviaIndex(triviaIndex + 1)
          //if index is 19, there are no more questions, game state set to game over.
        } else {
            setGameState("gameOver");
        }
      }, 3000)
    }, 15000);
    
  }, [triviaIndex]);

  const createAnswersArray = () => {
    const currentQuestion = triviaQuestions[triviaIndex];
    //incorrect & correct answers are stored in different keys in API, this function
    //puts them all together in one array and jumbles them (so that the correct answer
    //isn't always the first option) 
    let answersArray = [];
    answersArray.push(currentQuestion.correctAnswer);
    currentQuestion.incorrectAnswers.forEach((answer) =>
      answersArray.push(answer)
    );
    //shuffles the answers array
    const shuffled = answersArray.sort(() => {
      return Math.random() - 0.5;
    });

    setShuffledAnswers([...shuffled])

  };

  //calls the createAnswersArray one time, so both the Play and Result components get the shuffled
  //answers in the same order.
useEffect(()=>{
  if (triviaQuestions && triviaIndex >=0) {
    createAnswersArray();
    }
  
},[triviaQuestions, triviaIndex])
  
if (triviaQuestions && triviaIndex >=0){
  const currentQuestion = triviaQuestions[triviaIndex];
  const correctAnswer = currentQuestion.correctAnswer;
  if (gameState === "play" ) {
    return (
      <Wrapper>
        <Play triviaIndex = {triviaIndex} 
        shuffledAnswers = {shuffledAnswers}
        correctAnswer = {correctAnswer}
        currentQuestion = {currentQuestion}
        />
      </Wrapper>
    );
  }  
  if (gameState === "result") {
    return (
    <Wrapper>
      <Result triviaIndex = {triviaIndex} 
        shuffledAnswers = {shuffledAnswers}
        correctAnswer = {correctAnswer}
        currentQuestion = {currentQuestion}
        />
    </Wrapper>
    );
  }
  if (gameState === "gameOver") {
    return(
      <Wrapper>
        <GameOver/>
      </Wrapper>
    )
  }

}
  else {
    return (
      <Wrapper>
        <Loading/>
      </Wrapper>
    )
  }
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
  padding-top: 70px;
`;
export default GamePlay;
