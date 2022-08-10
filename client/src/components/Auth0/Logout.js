import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const Logout = () => {
  const { logout } = useAuth0();

  return (
    <Container>
    <Button onClick={() => logout({ returnTo: window.location.origin })}>
      👋 
    </Button>
    <Overlay>
    <Text>Log Out</Text>
    </Overlay>
    </Container>
  );
};

const Overlay = styled.div`
  position: absolute;
  top: -25px;
  left: 3px;
  height: 50px;
  width: 50px;
  opacity: 0;
  transition: .5s ease;
  background-color: rgba(255, 125, 158, 0.5);
  border-radius: 50%;

  &:hover{
    opacity: 1;
  }

  cursor: pointer;
`
const Container = styled.span`
  position: relative;
  width: 50%;
`

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
`
const Button = styled.button`
background: none;
border: none;
font-size: 40px;
cursor: pointer;
`

export default Logout;