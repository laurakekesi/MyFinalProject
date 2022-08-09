import { useContext, useState } from "react";
import styled from "styled-components";
import { Context } from "../context/Context";


//remove these imports when fetches work.
import { allPosts } from "../data/posts";
import { usersData } from "../data/users";

const UserPost = ({postid}) => {

    const {allPosts, allUsers} = useContext(Context);
  

    if (allPosts && allUsers){
    const post = allPosts.filter((post) => post._id === postid);
    const postIndex = allPosts.findIndex((post) => post._id === postid);
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
        <>
        <div>{user.firstName}</div>
        </>
    )
    }

}

export default UserPost