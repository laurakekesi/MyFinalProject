import { useEffect } from "react";
import styled from "styled-components";
import UserPost from "./UserPost";



const Homefeed = () => {

    //fetch all posts in context
    //import here
    return(
        <>
        <div>Home!</div>
        {/* map over all posts, pass down post.postId as prop */}
        <UserPost postId={"123"}/>
        </>
    )
}

export default Homefeed;