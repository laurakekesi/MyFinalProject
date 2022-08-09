import { useEffect, useState } from "react";
import styled from "styled-components";
import TimerBar from "./TimerBar";

const GamePlay = () => {
  const [triviaQuestions, setTriviaQuestions] = useState(null);
  const [triviaIndex, setTriviaIndex] = useState(null);
  const [pointTally, setPointTally] = useState(0);
  const [gameState, setGameState] = useState("pause");

  useEffect(() => {
    fetch("/api/triviaQuestions")
      .then((res) => res.json())
      .then((data) => {
        setTriviaQuestions(data.data);
        setTriviaIndex(0);
        console.log("Use effect", data.data);
      })
      .catch((err) => console.log("err", err));
  }, []);


  useEffect(() => {
      
    setGameState("play");
    setTimeout(() => {
      setGameState("result");
      setTimeout(() => {
          if (triviaIndex < 19) {
          setTriviaIndex(triviaIndex+1)
        } else {
            setGameState("gameOver");
        }
      }, 5000)
    }, 15000);
    
  }, [triviaIndex]);

  
  //if state ==== play, settimeout 15s

  if (triviaQuestions && gameState === "play") {
    // console.log(triviaQuestions[0]);
    let currentQuestion = triviaQuestions[triviaIndex];

    const createAnswersArray = (object) => {
      let answersArray = [];
      answersArray.push(currentQuestion.correctAnswer);
      currentQuestion.incorrectAnswers.forEach((answer) =>
        answersArray.push(answer)
      );
      //shuffles the answers array
      const shuffled = answersArray.sort(() => {
        return Math.random() - 0.5;
      });
      return shuffled;
    };

    const shuffledAnswers = createAnswersArray();
    const correctAnswer = currentQuestion.correctAnswer;
    //set timeout, after 15 seconds, if no answer is selected, points = 0
    //else
    //create a function where on click,
    // 1) if correct answer, give points, else 0 points
    // push points to points tally (array?)
    // change border colours to red or green
    //either way, after 15 seconds, move on to next question.

    return (
      <Wrapper>
        <BackgroundDiv>
          <GameDiv>
            <TimerDiv>
              <TimerBar />
            </TimerDiv>
            <QuestionDiv>
              <QuestionIndex>{triviaIndex + 1}/20</QuestionIndex>
              <div>{currentQuestion.question}</div>
            </QuestionDiv>
            <AnswersDiv>
              {shuffledAnswers.map((answer) => {
                return answer === correctAnswer ? (
                  <CorrectAnswer value={answer}>{answer}</CorrectAnswer>
                ) : (
                  <IncorrectAnswer value={answer}>{answer}</IncorrectAnswer>
                );
              })}
            </AnswersDiv>
          </GameDiv>
        </BackgroundDiv>
      </Wrapper>
    );
  }
};
const QuestionIndex = styled.div`
  font-family: var(--header-font-family);
  font-size: 30px;
  margin-bottom: 10px;
`;

const TimerDiv = styled.div`
  height: 15%;
  display: flex;
  align-items: center;
`;
const IncorrectAnswer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40%;
  width: 45%;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.5);
  border: var(--orangey-yellow) 4px solid;
  font-family: var(--secondary-font-family);
  font-size: 25px;
  cursor: pointer;
`;
const CorrectAnswer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40%;
  width: 45%;
  border-radius: 10px;
  /* background: rgba(255,255,255,0.5); */
  background: pink;
  border: var(--orangey-yellow) 4px solid;
  cursor: pointer;
  font-family: var(--secondary-font-family);
  font-size: 25px;
`;
const QuestionDiv = styled.div`
  height: 30%;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.5);
  border: var(--orangey-yellow) 4px solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 25px;
`;
const AnswersDiv = styled.div`
  height: 50%;
  column-count: 2;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;
const GameDiv = styled.div`
  width: 85%;
  height: 90%;
  font-family: var(--secondary-font-family);
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

  /* added in because of navbar stuff */
  padding-top: 70px;
`;
export default GamePlay;
