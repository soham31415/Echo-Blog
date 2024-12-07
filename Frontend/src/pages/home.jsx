import React, { useState, useEffect } from 'react';
import PostList from '../components/postList.jsx';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch blog posts from API (simulating with a static array)
    const fetchPosts = async () => {
      const response = await axios.get('http://localhost:5000/posts'); // Replace with real API
      setPosts(response.data.posts);
      console.log(response.data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to Echo Journal</h1>
      <PostList posts={posts} />
    </div>
  );
};

export default Home;
