import React, { useState, useEffect } from "react";

const Posts = () => {
  const [range, setRange] = useState({ start: 0, end: 10 });
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
        throw "";
      } else {
        const postsArr = await response.json();
        console.log(postsArr);
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
      {" "}
      <h1>posts</h1>
      <ul>
        {posts.map((post) => (
          <div key={post.id}></div>
        ))}
      </ul>
    </>
  );
};

export default Posts;
