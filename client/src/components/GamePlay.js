import styled from "styled-components";

const GamePlay = () => {
const fetch =   {
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
                    <QuestionDiv>
                        {fetch.question};
                    </QuestionDiv>
                    <AnswersDiv>
                        {shuffledAnswers.map((answer)=>{
                            return(
                                (answer===correctAnswer)? 
                                <IncorrectAnswer>
                                    {answer}
                                </IncorrectAnswer>
                            :
                                <CorrectAnswer>
                                    {answer}
                                </CorrectAnswer>
                            )
                        })}
                    </AnswersDiv>
                </GameDiv>
            </BackgroundDiv>
        </Wrapper>
    )
}


const IncorrectAnswer = styled.div`
border: 2px green solid;
display: flex;
justify-content: center;
align-items: center;
height: 40%;
width: 40%;
`
const CorrectAnswer = styled.div`
border: black 1px solid;
display: flex;
justify-content: center;
align-items: center;
height: 40%;
width: 40%;
`
const QuestionDiv = styled.div`
height: 30%;
margin-bottom: 5%;
border-radius: 10px;
background: #FCF6F2;
border: var(--orangey-yellow) 4px solid;
display: flex;
justify-content: center;
align-items: center;
`
const AnswersDiv = styled.div`
border: black solid 1px;
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