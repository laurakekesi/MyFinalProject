import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Logout from "./Auth0/Logout";
import { useContext } from "react";
import { Context } from "../context/Context";
import { Icon } from "react-icons-kit";
import { home } from "react-icons-kit/feather/home";

const Navbar = () => {
  const { loggedInUser } = useContext(Context);

  return (
    <Wrapper>
      <Div>
        <Links to="/" exact>
          <Icon size={40} icon={home} />
        </Links>
        <Links to="/play">
          <PlayDiv>Play Now!</PlayDiv>
        </Links>

        {loggedInUser ? (
          <div>
            <Links to={`/profile/${loggedInUser._id}`}>
              Hello, {loggedInUser.firstName}
              <Avatar src={loggedInUser.avatarSrc} />
            </Links>
            <LogoutDiv>
              <Logout />
            </LogoutDiv>
          </div>
        ) : (
          <EmptyDiv></EmptyDiv>
        )}
      </Div>
    </Wrapper>
  );
};

const EmptyDiv = styled.div`
width: 300px;
`
const PlayDiv = styled.div`
  padding-left: 200px;
`;
const LogoutDiv = styled.span`
  margin-left: 30px;
`;
const Avatar = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  object-fit: cover;
  margin-left: 10px;
  margin-bottom: -10px;
`;

const Links = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-family: var(--test-font);
  font-size: 40px;
`;
const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  background: var(--pale-yellow);
  &::after {
    background: linear-gradient(150deg, var(--pale-yellow) 16px, transparent 0),
      linear-gradient(-150deg, var(--pale-yellow) 16px, transparent 0);
    background-size: 40px 40px;
    content: " ";
    position: absolute;
    width: 100%;
    height: 32px;
  }
`;
const Div = styled.div`
  width: 93%;
  height: 110%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 50px;
  padding-top: 10px;
`;

export default Navbar;
