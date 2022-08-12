import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Context } from "../context/Context";

const UserPost = ({ post, user }) => {
  const [isHearted, setIsHearted] = useState(false);
  const [isPooed, setIsPooed] = useState(false);
  const {loggedInUser} = useContext(Context);
  const history = useHistory();

  if (post && user && loggedInUser) {
    const numHearts = post.numHearts;
    const numPoos = post.numPoos;

//deletes the post using the post id
    const deletePost = (e)=> {
      e.preventDefault();
      fetch(`/api/post/${post._id}`, {
        method: "DELETE"
      })
      .then((res) => res.json())
      .catch((err) => console.log(err))
      window.location.reload();
    }
  //increments or decrements hearts on button & in mongo.
  const heartHandler = (e) => {
    e.preventDefault();
    if (isHearted === false) {
      fetch(`/api/post/incrementHearts/${post._id}`, {
        method: "PATCH",
      })
        .catch((err) => {
          history.push('/error');
        });
      setIsHearted(true);
    } else {
      fetch(`/api/post/decrementHearts/${post._id}`, {
        method: "PATCH",
      })
        .catch((error) => {
          history.push('/error');
        });
      setIsHearted(false);
    }
  };

    //increments or decrements poos on button & in mongo.
    const pooHandler = (e) => {
        e.preventDefault();
        if (isPooed === false) {
          fetch(`/api/post/incrementPoos/${post._id}`, {
            method: "PATCH",
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Poos incremented!", data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          setIsPooed(true);
        } else {
          fetch(`/api/post/decrementPoos/${post._id}`, {
            method: "PATCH",
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Poos decremented!", data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          setIsPooed(false);
        }
      };

  return (
    <Wrapper to={`/profile/${post.userId}`}>
      {user._id === loggedInUser._id? <DeletePost onClick={deletePost}>x</DeletePost>: <DeletePost></DeletePost>}
      
      <PersonInfo>
        <Img src={user.avatarSrc} alt="avatar" />
        <Column>
          <Name>
          
            <Bold>{user.firstName}</Bold> says:
          </Name>
          <Post>{post.postContent}</Post>
        </Column>
        
      </PersonInfo>

      <PostStats>
        <HeartButton onClick={heartHandler}>
          💖<Number>{isHearted? numHearts + 1 : numHearts}</Number>
        </HeartButton>
        <PooButton onClick={pooHandler}>
          💩<Number>{isPooed? numPoos + 1 : numPoos}</Number>{" "}
        </PooButton>
      </PostStats>
    </Wrapper>
  );
  }
};

const DeletePost = styled.button`
color: grey;
background: none;
border: none;
top: 5;
margin-left: 580px;
cursor: pointer;
position: relative;
height: 5px;

&:hover{
  color: #ff7d9e;
}
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
const Bold = styled.span`
  font-weight: bold;
`;
const Number = styled.div`
  font-size: 10px;
  margin-left: 33px;
  margin-top: -15px;
`;
const HeartButton = styled.button`
  float: right;
  font-size: 25px;
  margin-top: -30px;
  border: none;
  background: none;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    font-size: 30px;
    transition: 0.6s;
  }
`;
const PooButton = styled.button`
  float: right;
  font-size: 25px;
  margin-top: -30px;
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    font-size: 30px;
    transition: 0.6s;
  }
`;
const Post = styled.div`
  font-size: 18px;
`;
const Name = styled.div`
  font-family: var(--secondary-font-family);
  margin-bottom: 5px;
`;
const Img = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-left: 10px;
  margin-top: 10px;
  margin-right: 20px;
`;
const PersonInfo = styled.div`
  display: flex;
  align-items: center;
  font-family: var(--secondary-font-family);
  margin-top: -5px;
`;
const PostStats = styled.div`
  width: 100%;
`;
const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: black;
`;

export default UserPost;
