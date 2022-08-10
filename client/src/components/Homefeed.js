import { useContext, useEffect } from "react";
import styled from "styled-components";
import { Context } from "../context/Context";
import Loading from "./Loading";
import UserPost from "./UserPost";

const Homefeed = () => {
  const { loggedInUser, allPosts, setAllPosts, allUsers } = useContext(Context);
    
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
      .catch((err) => console.log(err));
  };

  if (allPosts && allUsers) {
    return (
      <Wrapper>
        <BackgroundDiv>
          <Form onSubmit={submitHandler}>
            <TextArea placeholder="What's on your mind?"></TextArea>
            <Button>
              {/* <img
                src="https://giphy.com/embed/AXHkWhNemfGjGjoG1p"
                width="70"
                height="70"
              ></img> */}
              Post
            </Button>
          </Form>
          <PostContainer>
            {/* map over all posts, pass down post.postId as prop */}
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
  width: 80px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 125, 158, 0.2);
  margin-left: 85%;
  margin-bottom: 10px;
  cursor: pointer;
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
  /* align-items: center; */
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
