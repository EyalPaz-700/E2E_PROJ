import React, { useState, useEffect } from "react";
import Post from "./Post";

const Posts = ({ currentUser }) => {
  const [range, setRange] = useState({ start: 1, end: 10 });
  const [posts, setPosts] = useState([]);
  const [addPostToggle, setAddPostToggle] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "Title",
    content: "Content",
  });
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

  async function removePost(postId) {
    fetch(`http://localhost:3000/posts/${postId}`, { method: "DELETE" })
      .then((data) => data.json())
      .then(() => {
        setPosts((prev) => {
          let copy = [...prev];
          copy = copy.filter((post) => post.post_id !== postId);
          return copy;
        });
      });
  }

  const changeFormValue = async (e) => {
    setFormValues((prev) => {
      const copy = { ...prev };
      copy[e.target.name] = e.target.value;
      return copy;
    });
  };

  const addPost = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    };
    let data = await fetch(
      `http://localhost:3000/posts/${currentUser.user_id}}`,
      requestOptions
    );
    if (!data.ok) {
      console.error("Error Adding Post");
    } else {
      data = await data.json();
      setPosts((prev) => [...prev, data]);
    }
  };

  return (
    <>
      <button onClick={() => setAddPostToggle((prev) => !prev)}>
        Add Post
      </button>
      {addPostToggle && (
        <>
          <input onInput={changeFormValue} type="text" name="title" />
          <input onInput={changeFormValue} type="text" name="content" />
          <input type="button" onClick={addPost} />
        </>
      )}
      {posts.map((post) => (
        <Post
          removeSelf={() => removePost(post.post_id)}
          key={post.post_id}
          postData={post}
        />
      ))}
    </>
  );
};

export default Posts;
