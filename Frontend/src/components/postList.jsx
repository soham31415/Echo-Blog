
import React from 'react';

const PostList = ({ posts }) => {
  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.post_id} className="post-item">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <small>Status: {post.status}</small>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default PostList;
