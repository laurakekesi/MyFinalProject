import { useContext, useState } from "react";
import styled from "styled-components";
import { Context } from "../context/Context";


//remove these imports when fetches work.
import { allPosts } from "../data/posts";
import { usersData } from "../data/users";

const UserPost = ({postId}) => {

    const {allPosts, allUsers} = useContext(Context);
    //import all posts from context, use below method with different var;


    const post = allPosts.filter((post) => post._id === postId);
    // console.log(post);
    const userId = post.userId;
    if (allUsers){
        console.log(allUsers)
    const user = allUsers.filter((user) => user._id = userId);}
    // console.log(user);}

    // const userId = post[0].userId;
    // console.log(user);

    //with post Id, fetch data on specific post
    //render and style data
    //heart and poo bar, updates post stats

    // console.log(allPosts[1]);
    return(
        <>
        <div></div>
        </>
    )
}

export default UserPost