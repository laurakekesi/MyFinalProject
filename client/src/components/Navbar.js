import styled from "styled-components";
import { NavLink } from "react-router-dom";
import homeIcon from "../images/homeIcon.png";
import Logout from "./Auth0/Logout";

const Navbar = () => {
return (
    <Wrapper>
        <Div>
        <Links to = "/" exact>
            <Img src = {homeIcon} alt="Home icon"/>
        </Links>
        <Links to = "/play">
            Play Now!
        </Links>
        <Logout/>
        <Links to = "/profile/:profileId">
            Hello, user!
        </Links>
        </Div>
    </Wrapper>
)
}

const Img = styled.img`
height: 45px;
`
const Links = styled(NavLink)`
color: white;
text-decoration: none;
font-family: var(--test-font);
font-size: 40px;
`
const Wrapper = styled.div`

/* background: var(--pale-yellow); */
/* height: 70px; */
/* display: flex;
justify-content: space-between;
align-items: center; */
/* padding-left: 50px;
padding-right: 50px; */
    position: fixed;
    width: 100%;
    background: var(--pale-yellow);
 &::after{
    background: linear-gradient(150deg, var(--pale-yellow) 16px, transparent 0), linear-gradient(-150deg, var(--pale-yellow) 16px, transparent 0);
    background-size: 40px 40px;
    content: " ";
    position: absolute;
    width: 100%;
    height: 32px;
}

`
const Div = styled.div`
width: 93%;
height: 110%;
display: flex;
justify-content: space-between;
align-items: center;
padding-left: 50px;
padding-top: 10px;
`

export default Navbar;
