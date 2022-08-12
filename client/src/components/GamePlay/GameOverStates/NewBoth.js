import { useContext, useState } from "react";
import styled from "styled-components";
import { Context } from "../../../context/Context";
import { useHistory } from "react-router-dom";

const NewBoth = () => {

    const {reloadPage, loggedInUser, pointsTally, bestSub} = useContext(Context);
    const [isPosted, setIsPosted] = useState("Post it!");
    const history = useHistory();

    const goHome = () => {
        history.push('/')
    }

    const postHighScore = () => {
        const userId = loggedInUser._id;
        fetch('/api/posts', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                userId: userId,
                postContent: `I have a new best subject (${bestSub}) AND a new high score(${pointsTally})!`
            })
        })
        .then(setIsPosted("Posted!"))
        .then(history.push('/'))
        // Get home page to reload so posts show?
        //Get page to actually push?
        .catch((err) => console.log(err))


    }
  return (
    <Wrapper>
      <PlayAgain>You have a new best subject: {bestSub} <Underline>and</Underline> a new high score: {pointsTally}!!! Want us to post it?</PlayAgain>
      <ButtonsDiv>
        <Container>
          <Button onClick={postHighScore}>
          📱
            <Overlay>
              <Text>{isPosted}</Text>
            </Overlay>
          </Button>
        </Container>
        <Container>
          <Button onClick={reloadPage}>
            🎉
            <Overlay>
              <Text>Play again!</Text>
            </Overlay>
          </Button>
        </Container>
        <Container>
          <Button onClick={goHome}>
            🏡
            <Overlay>
              <Text>Take me home!</Text>
            </Overlay>
          </Button>
        </Container>
      </ButtonsDiv>
    </Wrapper>
  );
};

const Underline = styled.span`
text-decoration: underline;
font-style: italic;
`
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
  margin-left: 90px;
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90%;
  width: 100%;
`;
export default NewBoth;
