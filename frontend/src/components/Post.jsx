import React from "react";
import { useNavigate } from "react-router-dom";
export default function Post({ postData, removeSelf }) {
  const nav = useNavigate();
  return (
    <div className="post" onClick={() => nav(`${postData.post_id}`)}>
      <h3> {postData.username}</h3>
      <h3>{postData.title}</h3>
      <h3>{postData.post_content}</h3>
      <button
        onClick={(e) => {
          e.stopPropagation();
          removeSelf();
        }}
      >
        Remove
      </button>
    </div>
  );
}
