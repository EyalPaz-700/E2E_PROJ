import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const ChosenPost = ({ currentUser }) => {
  const [comments, setComments] = useState([]);
  const { postId } = useParams();
  const [commentInput, setCommentInput] = useState("");
  useEffect(() => {
    getPost();
  }, [postId]);

  const getPost = async () => {
    fetch(`http://localhost:3000/posts/${postId}`)
      .then((data) => data.json())
      .then((data) => {
        setComments(data);
      })
      .catch(console.error("Error Fetching Post"));
  };
  const addComment = async (e) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: commentInput,
        user_id: currentUser.user_id,
      }),
    };

    try {
      let data = await fetch(
        `http://localhost:3000/comments/${postId}`,
        requestOptions
      );

      if (!data.ok) {
        console.error("Error Adding Comment");
      } else {
        setCommentInput("");
        getPost();
      }
    } catch (error) {
      console.error("Error Adding Comment:", error);
    }
  };

  const removeComment = async (comment_id) => {
    fetch(`http://localhost:3000/comments/${comment_id}`, { method: "DELETE" })
      .then((data) => data.json())
      .then(() => {
        setComments((prev) => {
          let copy = [...prev];
          copy = copy.filter((comment) => comment.comment_id !== comment_id);
          return copy;
        });
      });
  };
  return (
    <div className="large-post">
      {
        <>
          <h1>{comments[0]?.post_title}</h1>
          <h2>{comments[0]?.post_content}</h2>
          <div className="">
            {comments[0]?.comment_id &&
              comments.map((comment) => {
                return (
                  <div key={comment.comment_id}>
                    <h4>{comment.username}</h4>
                    <h5>{comment.comment_content}</h5>
                    {comment.user_id === currentUser.user_id && (
                      <button onClick={() => removeComment(comment.comment_id)}>
                        Remove Comment
                      </button>
                    )}
                  </div>
                );
              })}
            <input
              type="text"
              value={commentInput}
              onInput={(e) => setCommentInput(e.target.value)}
            />
            <button onClick={addComment}>Add Comment</button>
          </div>
        </>
      }
    </div>
  );
};

export default ChosenPost;
