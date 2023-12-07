import React from "react";
import { useNavigate } from "react-router-dom";
export default function Post({ postData, removeSelf }) {
  const nav = useNavigate();
  return (
    <div onClick={() => nav(`${postData.post_id}`)}>
      <h4> {postData.username}</h4>
      <h2>{postData.title}</h2>
      <h3>{postData.content}</h3>
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
