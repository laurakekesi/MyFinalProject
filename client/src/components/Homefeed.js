import { useContext, useEffect } from "react";
import styled from "styled-components";
import { Context } from "../context/Context";
import UserPost from "./UserPost";



const Homefeed = () => {

    const {allPosts} = useContext(Context);

    if (allPosts){
    return(
        <Wrapper>
            <BackgroundDiv>
                <Form>
                    <TextArea placeholder="What's on your mind?">
                    </TextArea>
                    <Button>

                    <iframe src="https://giphy.com/embed/AXHkWhNemfGjGjoG1p" width="70" height="70" ></iframe>
                    </Button>
                </Form>
        
        {/* map over all posts, pass down post.postId as prop */}
        {allPosts.map((post) => {
            return (
                <div>
                <UserPost postid={post._id}/>
                </div>
            )
        })}
        
            </BackgroundDiv>
        </Wrapper>
    )}
    else {
        return(
            <div>Loading</div>
        )
    }
}
const Button = styled.button`
width: 80px;
border: none;
border-radius: 50%;
background: rgba(255,125,158,0.2);
margin-left: 85%;
margin-bottom: 10px;
`
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

&::placeholder{
font-family: var(--secondary-font-family);
color: black;
font-size: 17px;
}

&:focus{
    outline: none;
}
`
const Form = styled.form`
height: 20%;
display: flex;
flex-direction: column;
justify-content: center;
margin-top: 100px;
background: rgba(255,255,255,0.7);
width: 60%;
border-radius: 15px;
border: var(--orangey-yellow) 4px solid;
`
const Wrapper = styled.div`
display: flex;
justify-content: center;
height: 100%;
`
const BackgroundDiv = styled.div`
height: 100%;
width: 70%;
background: rgba(172,216,210, 0.5);
display: flex;
justify-content: center;
`

export default Homefeed;