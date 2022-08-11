import styled from "styled-components";
import errorPic from "../images/ErrorPage.png";

const Error = () => {
return (
    <Wrapper>
        <Img src = {errorPic} alt="Error!"/>
        <Div>Uh oh! Something went wrong...</Div>
    </Wrapper>
)
}
const Div = styled.div`
font-size: 30px;
color: #3f3d56;
font-family: var(--secondary-font-family);
`
const Img = styled.img`
width: 800px;
margin-top: 40px;
`
const Wrapper = styled.div`
width: 100%;
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

export default Error;