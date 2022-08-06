import styled from "styled-components";
import { NavLink } from "react-router-dom";
import homeIcon from "../images/homeIcon.png";

const Navbar = () => {
return (
    <Wrapper>
        <Links to = "/" exact>
            <Img src = {homeIcon} alt="Home icon"/>
        </Links>
        <Links to = "/play">
            Play Now!
        </Links>
        <Links to = "/profile/:profileId">
            Hello, user!
        </Links>
    </Wrapper>
)
}

const Img = styled.img`
height: 45px;
`
const Links = styled(NavLink)`
color: white;
text-decoration: none;
font-family: var(--header-font-family);
font-size: 40px;
`
const Wrapper = styled.div`
background: var(--pale-yellow);
height: 70px;
display: flex;
justify-content: space-between;
align-items: center;
padding-left: 50px;
padding-right: 50px;
`

export default Navbar;
