import { useContext, useState } from "react";
import styled from "styled-components";
import { Context } from "../../context/Context";

const GameOver = () => {
const {pointsTally, loggedInUser, gameOVerState, gameOverHandler} = useContext(Context);

// pass down game state, && gamestate === gameOver?
if(loggedInUser) {
gameOVerState
}

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