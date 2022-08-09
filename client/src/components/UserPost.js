import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const UserPost = ({ post, user }) => {
    const numHearts = post.numHearts;
    const numPoos = post.numPoos;
    const [isHearted, setIsHearted] = useState(false);
    const [isPooed, setIsPooed] = useState(false);

  //increments or decrements hearts on button & in mongo.
  const heartHandler = (e) => {
    e.preventDefault();
    if (isHearted === false) {
      fetch(`/api/post/incrementHearts/${post._id}`, {
        method: "PATCH",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Hearts incremented!", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      setIsHearted(true);
    } else {
      fetch(`/api/post/decrementHearts/${post._id}`, {
        method: "PATCH",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Hearts decremented!", data);
        })
        .catch((error) => {
          console.error("Error:", error);
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
};

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
