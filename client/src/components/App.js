import {BrowserRouter, Route, Switch} from "react-router-dom";
import GlobalStyles from "../styles/GlobalStyles";
import Navbar from "./Navbar";
import styled from "styled-components";
import Homefeed from "./Homefeed";
import GamePlay from "./GamePlay/GamePlay"
import Profile from "./Profile";
import Login from "./Auth0/Login";
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from "./Loading";


const App = () => {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  return (
   
    <BrowserRouter>
    {/* <Login/> */}
    <GlobalStyles/>
    <Wrapper>
    <Navbar/>
      <Switch>
        <Route exact path = '/'>
          <Homefeed/>
        </Route>
        <Route path = '/profile/:profileId'>
          <Profile/>
        </Route>
        <Route path = '/play'>
          <GamePlay/>
        </Route>
      </Switch>
    </Wrapper>
    </BrowserRouter>
  );
}

const Wrapper = styled.div`
background-image: url("https://img.freepik.com/free-vector/background-seamless-pattern-vector-with-cute-memphis_53876-105506.jpg?w=1480&t=st=1659814790~exp=1659815390~hmac=d053e59b650a27d3e92348fd2bff20febadb65aff578b8e4aa9c15fb82ce3145");
height: 100vh;
`
const LoadingWrapper = styled.div`
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`

export default withAuthenticationRequired(App, {
  // Show a loading component while the user waits to be redirected to the login page.
  onRedirecting: () => {
    return(
      <LoadingWrapper>
      <Loading/>
      </LoadingWrapper>
    )
  },
});

