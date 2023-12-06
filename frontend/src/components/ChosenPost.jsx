import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const ChosenPost = () => {
  const [comments, setComments] = useState([]);
  const { postId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${postId}`)
      .then((data) => data.json())
      .then((data) => {
        setComments(data);
      })
      .catch(console.error("Error Fetching Post"));
  }, [postId]);
  return (
    <div>
      {
        <>
          <h1>{comments[0]?.post_title}</h1>
          <h2>{comments[0]?.post_content}</h2>
          <div>
            {comments[0]?.comment_id &&
              comments.map((comment) => {
                return (
                  <div key={comment.comment_id}>
                    <h4>{comment.username}</h4>
                    <h5>{comment.comment_content}</h5>
                  </div>
                );
              })}
          </div>
        </>
      }
    </div>
  );
};

export default ChosenPost;
