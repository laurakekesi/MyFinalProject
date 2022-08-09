import { useParams } from "react-router-dom";
import styled from "styled-components";

const Profile = () => {
    const {profileId} = useParams();
    console.log(profileId);

    //use params to get id
    //create top div with profile pic, name, high score, top subject

    //create bottom div with all posts by person
    //map over all posts by person, render userPost with {postid = not sure yet} as prop
    return(
        <Wrapper>
            <PersonInfo></PersonInfo>
            <PostsByPerson></PostsByPerson>
        </Wrapper>
    )
}

const PersonInfo = styled.div`
`
const PostsByPerson = styled.div`
`
const Wrapper = styled.div`
`

export default Profile;