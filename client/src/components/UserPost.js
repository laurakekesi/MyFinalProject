import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Context } from "../context/Context";


const UserPost = ({postid}) => {

    const {allPosts, allUsers} = useContext(Context);
    let numHearts;
    let numPoos;

    if (allPosts && allUsers){
    const findPost = allPosts.filter((post) => post._id === postid);
    const postIndex = allPosts.findIndex((post) => post._id === postid);
    const post = allPosts[postIndex];
    const userId = allPosts[postIndex].userId;
    const userObject = allUsers.filter((user) => user._id === userId);
    const userIndex = allUsers.findIndex((user) => user._id === userId);
    const user = allUsers[userIndex];
    numHearts = post.numHearts;
    numPoos = post.numPoos;
    
    let isHearted = false;
    let isPooed = false;

    //increments or decrements hearts on button & in mongo.
    const heartHandler = (e) => {
        e.preventDefault();
        if (isHearted === false) {
            fetch(`/api/post/incrementHearts/${postid}`, {
            method: 'PATCH',
            })
            .then((res) => res.json())
            .then((data) => {
            console.log('Hearts incremented!', data);
            })
            .catch((error) => {
            console.error('Error:', error);
            });
            isHearted = true;
            numHearts = numHearts + 1;
            
        }
        else {
            fetch(`/api/post/decrementHearts/${postid}`, {
                method: 'PATCH',
                })
                .then((res) => res.json())
                .then((data) => {
                console.log('Hearts decremented!', data);
                })
                .catch((error) => {
                console.error('Error:', error);
                });
                isHearted = false;
                numHearts = numHearts -1;
        }
    }


    return(
        <Wrapper to= {`/profile/${postid}`}>
            
            <PersonInfo>
                <Img src = {user.avatarSrc} alt="avatar"/>
                <Column>
                    <Name><Bold>{user.firstName}</Bold> says:</Name>
                    <Post>{post.postContent}</Post>
                </Column>
            </PersonInfo>

            <PostStats>
                <HeartButton value={numHearts} onClick={heartHandler}>💖<Number>{numHearts}</Number></HeartButton>
                <PooButton>💩<Number>{numPoos}</Number> </PooButton>
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

&:hover{
    font-size: 30px;
    transition: 0.6s;

}
`
const PooButton = styled.button`
float: right;
font-size: 25px;
margin-top: -30px;
border: none;
background: none;
cursor: pointer;

&:hover{
    font-size: 30px;
    transition: 0.6s;
}
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
const Wrapper = styled(Link)`
display: flex;
flex-direction:column;
width: 100%;
height: 100%;
text-decoration: none;
color: black;
`

export default UserPost