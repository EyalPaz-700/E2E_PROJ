import React, { useState, useEffect } from "react";
import Post from "./Post";
import "../posts.css";
const Posts = ({ currentUser }) => {
  const [range, setRange] = useState({ start: 1, end: 5 });
  const [posts, setPosts] = useState([]);
  const [addPostToggle, setAddPostToggle] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [formValues, setFormValues] = useState({
    title: "Title",
    content: "Content",
  });

  async function getPostCount() {
    try {
      const headRes = await fetch(`http://localhost:3000/posts`, {
        method: "HEAD",
      });

      if (!headRes.ok) {
        throw new Error("Failed to fetch post count");
      } else {
        const postCount = parseInt(headRes.headers.get("post_count"));
        setPostCount(postCount);
        getPosts();
      }
    } catch (error) {
      console.error("Problem Getting Post Count:", error.message);
    }
  }

  async function getPosts() {
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
    getPostCount();
  }, [range]);

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
      setPosts((prev) => [
        ...prev,
        { ...data, username: currentUser.username },
      ]);
    }
  };

  return (
    <div className="posts">
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
      <div className="posts-container">
        {posts.map((post) => (
          <Post
            removeSelf={() => removePost(post.post_id)}
            key={post.post_id}
            postData={post}
          />
        ))}
      </div>
      {range.end < postCount && (
        <button
          onClick={() => {
            setRange((prev) => {
              const copy = { ...prev };
              copy.start += 5;
              copy.end += 5;
              return copy;
            });
          }}
        >
          Next
        </button>
      )}
      {range.start > 5 && (
        <button
          onClick={() => {
            setRange((prev) => {
              const copy = { ...prev };
              copy.start -= 5;
              copy.end -= 5;
              return copy;
            });
          }}
        >
          Previous
        </button>
      )}
    </div>
  );
};

export default Posts;
