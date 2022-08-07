import styled from "styled-components";
import TimerBar from "./TimerBar";

const GamePlay = () => {
const fetch =  {
    "category": "General Knowledge",
    "id": "622a1c357cc59eab6f94fc94",
    "correctAnswer": "Blatherskite",
    "incorrectAnswers": [
      "Agastopia",
      "Cacophony",
      "Impignorate"
    ],
    "question": "Which word is defined as 'a person who talks at great length without making much sense'?",
    "tags": [
      "words",
      "general_knowledge"
    ],
    "type": "Multiple Choice",
    "difficulty": "hard",
    "regions": []
  }

//map over the whole fetched quesstion array, do this for each item. 

  //creates an array consisting of the 3 incorrect answers and the 1 correct answer.
const createAnswersArray = () => {
    let answersArray = [];
    answersArray.push(fetch.correctAnswer);
    fetch.incorrectAnswers.map((answer) => answersArray.push(answer))
    // return answersArray;
    const shuffled = answersArray.sort(()=>{
        return Math.random() - 0.5;
    })
    return shuffled;
}

const shuffledAnswers = createAnswersArray();
const correctAnswer = fetch.correctAnswer;

    return(
        <Wrapper>
            <BackgroundDiv>
                <GameDiv>
                    <TimerDiv>
                        <TimerBar/>
                    </TimerDiv>
                    <QuestionDiv>
                        {fetch.question}
                    </QuestionDiv>
                    <AnswersDiv>
                        {shuffledAnswers.map((answer)=>{
                            return(
                                (answer===correctAnswer)? 
                                <CorrectAnswer>
                                    {answer}
                                </CorrectAnswer>
                            :
                                <IncorrectAnswer>
                                    {answer}
                                </IncorrectAnswer>
                            )
                        })}
                    </AnswersDiv>
                </GameDiv>
            </BackgroundDiv>
        </Wrapper>
    )
}

const TimerDiv = styled.div`
height: 15%;
display: flex; 
align-items: center;
`
const IncorrectAnswer = styled.button`
display: flex;
justify-content: center;
align-items: center;
height: 40%;
width: 45%;
border-radius: 10px;
background: rgba(255,255,255,0.5);
border: var(--orangey-yellow) 4px solid;
font-family: var(--secondary-font-family);
font-size: 25px;
cursor: pointer;
`
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
`
const QuestionDiv = styled.div`
height: 30%;
border-radius: 10px;
background: rgba(255,255,255,0.5);
border: var(--orangey-yellow) 4px solid;
display: flex;
justify-content: center;
align-items: center;
font-size: 25px;
`
const AnswersDiv = styled.div`
height: 50%;
column-count: 2;
display: flex;
flex-direction: column;
flex-wrap: wrap;
justify-content: center;
align-items: center;
gap: 15px;
`
const GameDiv = styled.div`
width: 85%;
height: 90%;
font-family: var(--secondary-font-family);
`
const BackgroundDiv = styled.div`
width: 85%;
height: 85%;
background: rgba(172,216,210, 0.5);
border-radius: 15px;
display: flex;
justify-content: center;
align-items: center;
`
const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 90%;
`
export default GamePlay;