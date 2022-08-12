import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Context } from "../context/Context";
import Loading from "./Loading";
import UserPost from "./UserPost";
import { useHistory } from "react-router-dom"; 

const Homefeed = () => {
  const { loggedInUser, allUsers, allPosts, setAllPosts } = useContext(Context);
  const [isDisabled, setIsDisabled] = useState(true);

  const history = useHistory();


  useEffect(() => {
    fetch('/api/posts')
    .then((res) => res.json())
    .then((data) => {
        setAllPosts(data.data.reverse());
    })
    .catch((err) => history.push('/error'))
}, [])

//If there is nothing in the textarea, this function disables the submit button,
//not allowing the user to post.
  const buttonHandler = (e) => {
    if (e.target.value.length > 0) {
      setIsDisabled(false)
  } else {
    setIsDisabled(true)
  }
}

  //on submit, passes the logged in user's id, as well as the content of the text
  //area to the body to the backend, then reloads the page so user can see their post.
  const submitHandler = (e) => {
    e.preventDefault();
    fetch("/api/posts", {
      body: JSON.stringify({
        userId: loggedInUser._id,
        postContent: e.target[0].value,
      }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        res.json();
        window.location.reload();
      })
      .catch((err) => history.push("/error"));
  };

  if (allPosts && allUsers) {
    return (
      <Wrapper>
        <BackgroundDiv>
          <Form onSubmit={submitHandler}>
            <TextArea placeholder="What's on your mind?" onChange={buttonHandler}></TextArea>
            <Button disabled={isDisabled}>
              Post
            </Button>
          </Form>
          <PostContainer>
            {allPosts.map((post) => {
              const user = allUsers.find((user) => user._id === post.userId);
              return (
                <PostDiv>
                  <UserPost post={post} user={user} />
                </PostDiv>
              );
            })}
          </PostContainer>
        </BackgroundDiv>
      </Wrapper>
    );
  } else {
    return (
      <LoadingWrapper>
        <Loading />
      </LoadingWrapper>
    );
  }
};

const PostContainer = styled.div`
  font-size: 20px;
  margin-top: 30px;
  width: 60%;
`;
const PostDiv = styled.div`
  background: rgba(255, 255, 255, 0.7);
  width: 100%;
  height: 100px;
  border-radius: 5px;
  margin-bottom: 10px;
`;
const Button = styled.button`
  border: none;
  border-radius: 50%;
  height: 70px;
  width: 55px;
  color: white;
  font-family: var(--test-font);
  font-size: 25px;
  background: rgba(255, 125, 158, 0.7);
  margin-left: 89%;
  margin-bottom: 10px;
  cursor: pointer;

  &:disabled{
    cursor: not-allowed;
    opacity: 0.7;
    color: lightgray;
  }
`;
const TextArea = styled.textarea`
  resize: none;
  border: none;
  background: none;
  height: 100px;
  padding-left: 40px;
  padding-top: 15px;
  font-family: var(--secondary-font-family);
  color: black;
  font-size: 17px;

  &::placeholder {
    font-family: var(--secondary-font-family);
    color: black;
    font-size: 17px;
  }

  &:focus {
    outline: none;
  }
`;
const Form = styled.form`
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 100px;
  background: rgba(255, 255, 255, 0.7);
  width: 60%;
  border-radius: 15px;
  border: var(--orangey-yellow) 4px solid;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;
const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const BackgroundDiv = styled.div`
  height: 100%;
  width: 70%;
  background: rgba(172, 216, 210, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
`;

export default Homefeed;
