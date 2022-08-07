import { useEffect } from "react";
import styled from "styled-components";

const Homefeed = () => {

    useEffect(() => {
        fetch(`/api/posts`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          })
          .catch((err) => console.log(err));
      }, []);



    //fetch all posts 
    //map over posts
    // for each, return userpost with the passed down prop of postId
    return(
        <>
        </>
    )
}

export default Homefeed;