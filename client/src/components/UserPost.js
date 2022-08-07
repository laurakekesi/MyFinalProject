import { useState } from "react";
import styled from "styled-components";

//remove these imports when fetches work.
import { allPosts } from "../data/posts";
import { usersData } from "../data/users";

const UserPost = ({postId}) => {
    //import all posts from context, use below method with different var;

    
    // const post = allPosts.filter((post) => post.postId === postId);
    // const userId = post[0].userId;
    // const user = usersData.filter((user) => user.id = userId);
    // console.log(user);

    //with post Id, fetch data on specific post
    //render and style data
    //heart and poo bar, updates post stats

    // console.log(allPosts[1]);
    return(
        <>
        </>
    )
}

export default UserPost