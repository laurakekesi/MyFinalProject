import styled from "styled-components";

const Result = ({triviaIndex, shuffledAnswers, correctAnswer, currentQuestion}) => {
    // let currentQuestion = triviaQuestions[triviaIndex];
    // const createAnswersArray = () => {
    //   //incorrect & correct answers are stored in different keys in API, this function
    //   //puts them all together in one array and jumbles them (so that the correct answer
    //   //isn't always the first option) 
    //   let answersArray = [];
    //   answersArray.push(currentQuestion.correctAnswer);
    //   currentQuestion.incorrectAnswers.forEach((answer) =>
    //     answersArray.push(answer)
    //   );
    //   //shuffles the answers array
    //   const shuffled = answersArray.sort(() => {
    //     return Math.random() - 0.5;
    //   });
    //   return shuffled;
    // };

    // const shuffledAnswers = createAnswersArray();
    // const correctAnswer = currentQuestion.correctAnswer;

    console.log("PAUSE");

    return(
<Wrapper>

<BackgroundDiv>
  <GameDiv>
    <TimerDiv>
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
    )
}
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
  border: #ed2863 4px solid;
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
  background: pink;
  border: #c8ff8e 4px solid;
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
  width: 100%;

  /* added in because of navbar stuff */
  /* padding-top: 70px; */
`

export default Result;