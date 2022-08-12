import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../../context/Context";
import TimerBar from "../TimerBar";

const Play = ({triviaIndex, correctAnswer, currentQuestion, shuffledAnswers}) => {
  const {setSelectedAnswer, pointsTally,} = useContext(Context);


  //sets the user's selected answer to a state in Context, to be used in Result.js
  //to determine if the user selected the correct answer.
  const answerHandler = (e) => {
    setSelectedAnswer(e.target.value);
  }

    return(
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
      {shuffledAnswers.map((answer, index) => {
        return answer === correctAnswer ? (
          <CorrectAnswer value={answer} onClick={answerHandler} key={`correctAnswer-${index}`}>{answer}</CorrectAnswer>
        ) : (
          <IncorrectAnswer value={answer} onClick={answerHandler} key={`correctAnswer-${index}`}>{answer}</IncorrectAnswer>
        );
      })}
    </AnswersDiv>
    <Points>Points: {pointsTally}</Points>
  </GameDiv>
</BackgroundDiv>
</Wrapper>
    )
}

const Points = styled.div`
color: white;
margin-left: 90%;
font-family: var(--test-font);
font-size: 25px;
width: 100%;
`
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
  &:focus{
    background: rgba(255,204,14,0.3);
  }
`;
const CorrectAnswer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40%;
  width: 45%;
  border-radius: 10px;
  background: rgba(255,255,255,0.5);
  border: var(--orangey-yellow) 4px solid;
  cursor: pointer;
  font-family: var(--secondary-font-family);
  font-size: 25px;
  &:focus{
    background: rgba(255,204,14,0.3);
  }
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
  width: 100%;
`

export default Play;