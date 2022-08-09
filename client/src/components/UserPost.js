import { useContext, useState } from "react";
import styled from "styled-components";
import { Context } from "../context/Context";


//remove these imports when fetches work.
import { allPosts } from "../data/posts";
import { usersData } from "../data/users";

const UserPost = ({postid}) => {

    const {allPosts, allUsers} = useContext(Context);
  

    if (allPosts && allUsers){
    const findPost = allPosts.filter((post) => post._id === postid);
    const postIndex = allPosts.findIndex((post) => post._id === postid);
    const post = allPosts[postIndex];
    const userId = allPosts[postIndex].userId;
    const userObject = allUsers.filter((user) => user._id === userId);
    const userIndex = allUsers.findIndex((user) => user._id === userId);
    const user = allUsers[userIndex];
    
    const numHearts = user.numHearts;
    
    console.log(user);

    
//  USERDATA
        // avatarSrc: "https://res.cloudinary.com/dwvlk8dfa/image/upload/v1659730303/Al_bhxkar.jpg"
        // bestSubject: "Society & Culture"
        // email: "alexkekesi@fake.email"
        // firstName: "Alexzandra"
        // highScore: 690
        // id: "690AlexKekesi"
        // lastName: "Kekesi"
        // _id: "62ed8173cf7890e9444928df"
// POST DATA
// numHearts: 1
// numPoos: 6
// postContent: "My new top subject is Music!"
// postId: "b6e442e2-2043-4304-802c-09b7863e4f38"
// userId: "62ed8173cf7890e9444928dd"
// _id: "62ed8173cf7890e9444928d4"
    

    //render and style data
    //heart and poo bar, updates post stats

    return(
        <Wrapper>

            <PersonInfo>
                <Img src = {user.avatarSrc} alt="avatar"/>
                <Column>
                    <Name><Bold>{user.firstName}</Bold> says:</Name>
                    <Post>{post.postContent}</Post>
                </Column>
            </PersonInfo>

            <PostStats>
                <HeartButton>💖<Number>{post.numHearts}</Number></HeartButton>
                <PooButton>💩<Number>{post.numPoos}</Number> </PooButton>
            </PostStats>
        </Wrapper>
    )
    }

}
const Column = styled.div`
display: flex;
flex-direction: column;
`
const Bold=styled.span`
font-weight: bold;
`
const Number = styled.div`
font-size: 10px;
margin-left: 33px;
margin-top: -15px;
`
const HeartButton = styled.button`
float: right;
font-size: 25px;
margin-top: -30px;
border: none;
background: none;
cursor: pointer;
margin-right: 10px;
`
const PooButton = styled.button`
float: right;
font-size: 25px;
margin-top: -30px;
border: none;
background: none;
cursor: pointer;
`
const Post = styled.div`
font-size: 18px;
`
const Name = styled.div`
font-family: var(--secondary-font-family);
margin-bottom: 5px;
`
const Img = styled.img`
border-radius: 50%;
width: 80px;
height: 80px;
object-fit: cover;
margin-left: 10px;
margin-top: 10px;
margin-right: 20px;
`
const PersonInfo = styled.div`
display: flex;
align-items: center;
font-family: var(--secondary-font-family);
`
const PostStats = styled.div`
width: 100%;
`
const Wrapper = styled.div`
display: flex;
flex-direction:column;
width: 100%;
height: 100%;
`

export default UserPost