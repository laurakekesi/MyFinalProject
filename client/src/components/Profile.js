import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "./Loading";
import UserPost from "./UserPost";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const { profileId } = useParams();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const history = useHistory();

  //fetches user info based on their id in params.
  useEffect(() => {
    fetch(`/api/user/${profileId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
      })
      .catch((err) => {
        history.push("/error");
      });
  }, [profileId]);

  //fetches user posts based on their id in params.
  useEffect(() => {
    fetch(`/api/posts/user/${profileId}`)
      .then((res) => res.json())
      .then((data) => {
        setUserPosts(data.data);
      })
      .catch((err) => {
        history.push("/error");
      });
  }, [profileId]);

  if (user && userPosts) {
    return (
      <Wrapper>
        <BackgroundDiv>
          <PersonInfo>
            <Img src={user.avatarSrc} alt={user.firstName} />
            <Column>
              <Name>
                {user.firstName} {user.lastName}
              </Name>
              <StatsDiv>
                <Column>
                  <Bold>Best Subject:</Bold>
                  <BestSubject> {user.bestSubject}</BestSubject>
                </Column>
                <Column>
                  <Bold>High Score: </Bold>
                  <HighScore>{user.highScore}</HighScore>
                </Column>
              </StatsDiv>
            </Column>
          </PersonInfo>
          <PostsByPerson>
            <Div>Posts by {user.firstName}</Div>
            <PostContainer>
              {userPosts.reverse().map((post, index) => {
                return (
                  <PostDiv>
                    <UserPost post={post} user={user} key={`post-${index}`} />
                  </PostDiv>
                );
              })}
            </PostContainer>
          </PostsByPerson>
        </BackgroundDiv>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }
};
const PostContainer = styled.div`
  height: 230px;
  width: 600px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PostDiv = styled.div`
  background: rgba(255, 255, 255, 0.7);
  border-radius: 5px;
  margin-bottom: 10px;
  padding-bottom: 10px;
`;
const Div = styled.div`
  font-size: 30px;
  font-family: var(--test-font);
  margin-bottom: 20px;
`;
const StatsDiv = styled.div`
  display: flex;
  font-size: 20px;
  margin-left: 25px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
`;
const Bold = styled.span`
  font-weight: bold;
`;
const HighScore = styled.div``;
const BestSubject = styled.div``;
const Name = styled.div`
  font-size: 40px;
  font-family: var(--test-font);
  margin-left: 25px;
  margin-bottom: 25px;
  margin-top: 10px;
`;
const Img = styled.img`
  border-radius: 50%;
  width: 200px;
  height: 200px;
  object-fit: cover;
`;
const PersonInfo = styled.div`
  font-family: var(--secondary-font-family);
  display: flex;
  padding: 30px;
  justify-content: center;
`;
const PostsByPerson = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BackgroundDiv = styled.div`
  width: 800px;
  height: 85%;
  background: rgba(172, 216, 210, 0.5);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
  padding-top: 70px;
`;

export default Profile;
