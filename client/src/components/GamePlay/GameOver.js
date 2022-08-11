import { useContext, useState } from "react";
import styled from "styled-components";
import { Context } from "../../context/Context";

const GameOver = () => {
const {pointsTally, loggedInUser} = useContext(Context);
const [gameOverState, setGameOverState] = useState("noNewTops")

if(loggedInUser) {


// const gameOverHandler = () => {
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

if (Number(correctAnswers[currentBestSubject]) < highestValue){
// setGameOverState("newBestSubject")
console.log(newBestSubject);

//patch best subject 

} else if (pointsTally>currentHighScore) {
// setGameOverState("newHighScore");

//patch high score

} else if (Number(correctAnswers[currentBestSubject]) < highestValue && pointsTally>currentHighScore) {
// setGameOverState("newBoth");
//patch bestSubject
//patch highScore
}

else {
// setGameOverState("noNewTops")
}
}
// }




    //compare pointsTally to highscore, Math.Max objectValues of correctAnswers

    //if the associated key !== loggedInUser.bestSubject OR pointsTally > loggedInUser.highScore
    //OR both!

    //<div> that says You have a new best subject/highscore/both! Want us to post it?
    //3 buttons: 1) "Yeah lets do it" (onclick, creates a post with a pre-determined value)
//2) No thanks, let's play again! (onclick, window.location.reload())
//3) No thanks, take me home with home emoji, (onclick, history.push('/'))

//else Want to play again?
//2 buttons "Let's do it!" Window.reload(), "No thanks" push.history('/')


    return (
        <Wrapper>
            <BackgroundDiv>
                <SecondaryBackDiv>
                <TopMessage>Congrats! You scored {pointsTally} points!</TopMessage>
                </SecondaryBackDiv>
            </BackgroundDiv>
        </Wrapper>
    )
}

const TopMessage = styled.div`
  font-family: var(--test-font);
  font-size: 40px;
  margin-top: 40px;
`
const SecondaryBackDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 85%;
  width: 85%;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.5);
  border: var(--orangey-yellow) 4px solid;

`
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
export default GameOver;