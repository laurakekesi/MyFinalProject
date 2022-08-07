import {BrowserRouter, Route, Switch} from "react-router-dom";
import GlobalStyles from "../styles/GlobalStyles";
import Navbar from "./Navbar";
import styled from "styled-components";
import Homefeed from "./Homefeed";

const App = () => {
  return (
   
    <BrowserRouter>
    <GlobalStyles/>
    <Wrapper>
    <Navbar/>
      <Switch>
        <Route exact path = '/'>
          <Homefeed/>
        </Route>
        <Route exact path = '/profile/:profileId'>
          Profile page
        </Route>
        <Route exact path = '/play'>
          Quiz page
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
export default App;
