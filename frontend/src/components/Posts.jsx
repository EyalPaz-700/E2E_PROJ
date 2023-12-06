import React, { useState, useEffect } from "react";
import Post from "./Post";

const Posts = () => {
  const [range, setRange] = useState({ start: 1, end: 10 });
  const [posts, setPosts] = useState([]);
  let length;
  async function getPosts() {
    // try {
    //   const headRes = await fetch(`http://localhost:3000/posts`, {
    //     method: "HEAD",
    //   });
    //   if (!headRes.ok) {
    //     throw "";
    //   } else {
    //     length = headRes.length;
    //   }
    // } catch {}
    try {
      const response = await fetch(
        `http://localhost:3000/posts/?from=${range.start}&to=${range.end}`
      );
      if (!response.ok) {
        console.error("Error Fetching Posts");
      } else {
        const postsArr = await response.json();
        console.log("posts ", postsArr);
        if (Object.keys(postsArr).length === 0) {
          ////message
        } else {
          setPosts(postsArr);
        }
      }
    } catch {}
  }
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {posts.map((post) => (
        <Post key={post.post_id} postData={post} />
      ))}
    </>
  );
};

export default Posts;
