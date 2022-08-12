import styled, { keyframes } from "styled-components";

//timer animation above the trivia question
const TimerBar = () => {
  return (
    <>
      <BarDiv></BarDiv>
    </>
  );
};

const elapse = keyframes`
    from {
        width: 100%;
    }
    to {
        width: 0%;
    }
`;

const colourChange = keyframes`
    from {
        background-color: var(--orangey-yellow);
    }
    to {
        background-color: var(--pink);
    }
`;

const BarDiv = styled.div`
  height: 30px;
  border-radius: 15px;
  animation: ${elapse} 15s cubic-bezier(1, 0.99, 0, -0.02),
    ${colourChange} 15s cubic-bezier(1, 0.99, 0, -0.02);
`;

export default TimerBar;
