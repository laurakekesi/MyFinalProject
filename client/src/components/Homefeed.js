import { useEffect } from "react";
import styled from "styled-components";
import UserPost from "./UserPost";



const Homefeed = () => {

    //fetch all posts in context
    //import here
    return(
        <Wrapper>
            <BackgroundDiv>
                <Form>
                    <TextArea>
                    </TextArea>
                    <Button>Post!</Button>
                </Form>

        {/* map over all posts, pass down post.postId as prop */}
        <UserPost postId={"123"}/>
            </BackgroundDiv>
        </Wrapper>
    )
}
const Button = styled.button`
`
const TextArea = styled.textarea`
resize: none;
`
const Form = styled.form`
height: 30%;
border: black 1px solid;
display: flex;
flex-direction: column;
justify-content: center;
margin-top: 30px;



`
const Wrapper = styled.div`
display: flex;
justify-content: center;
height: 90%;
`
const BackgroundDiv = styled.div`
height: 100%;
width: 70%;
background: rgba(172,216,210, 0.5);
display: flex;
justify-content: center;

`

export default Homefeed;