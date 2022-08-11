import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Play from "./Play";
import Result from "./Result";
import Loading from "../Loading";
import TimerBar from "../TimerBar";
import { Context } from "../../context/Context";

const GamePlay = () => {
  const [triviaQuestions, setTriviaQuestions] = useState(null);
  const [triviaIndex, setTriviaIndex] = useState(null);
  const [gameState, setGameState] = useState("pause");
  const {setPointsTally} = useContext(Context);
  const shuffledAnswers = [];
  
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
        console.log("check answer",setTriviaIndex);
        // console.log("Use effect", data.data);
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
      }, 5000)
    }, 15000);
    
  }, [triviaIndex]);

  if (triviaQuestions && triviaIndex >=0) {

 
  const currentQuestion = triviaQuestions[triviaIndex];

  
  const createAnswersArray = () => {
    // const shuffledAnswersArray=[]
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

    shuffled.forEach((question) => shuffledAnswers.push(question))
    // setShuffledAnswers(shuffledAnswersArray)
  };

createAnswersArray();
const correctAnswer = currentQuestion.correctAnswer;


  if (triviaQuestions && gameState === "play" && shuffledAnswers) {
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
}
  else {
    return (
      <Wrapper>
        <Loading/>
      </Wrapper>
    )
  }
};
// const Question = styled.div`
// display: flex;
// justify-content: center;
// width: 100%;
// padding: 15px;
// `
// const QuestionIndex = styled.div`
//   font-family: var(--header-font-family);
//   font-size: 30px;
//   margin-bottom: 10px;
// `;

// const TimerDiv = styled.div`
//   height: 15%;
//   display: flex;
//   align-items: center;
// `;
// const IncorrectAnswer = styled.button`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 40%;
//   width: 45%;
//   border-radius: 10px;
//   background: rgba(255, 255, 255, 0.5);
//   border: var(--orangey-yellow) 4px solid;
//   font-family: var(--secondary-font-family);
//   font-size: 25px;
//   cursor: pointer;
// `;
// const CorrectAnswer = styled.button`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 40%;
//   width: 45%;
//   border-radius: 10px;
//   /* background: rgba(255,255,255,0.5); */
//   background: pink;
//   border: var(--orangey-yellow) 4px solid;
//   cursor: pointer;
//   font-family: var(--secondary-font-family);
//   font-size: 25px;
// `;
// const QuestionDiv = styled.div`
//   height: 30%;
//   border-radius: 10px;
//   background: rgba(255, 255, 255, 0.5);
//   border: var(--orangey-yellow) 4px solid;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   font-size: 25px;
// `;
// const AnswersDiv = styled.div`
//   height: 50%;
//   column-count: 2;
//   display: flex;
//   flex-direction: column;
//   flex-wrap: wrap;
//   justify-content: center;
//   align-items: center;
//   gap: 15px;
// `;
// const GameDiv = styled.div`
//   width: 85%;
//   height: 90%;
//   font-family: var(--secondary-font-family);
// `;
// const BackgroundDiv = styled.div`
//   width: 85%;
//   height: 85%;
//   background: rgba(172, 216, 210, 0.5);
//   border-radius: 15px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;

  /* added in because of navbar stuff */
  padding-top: 70px;
`;
export default GamePlay;
