import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { postService } from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        // Note: You might want to add a backend route to fetch posts by user ID
        const response = await postService.getPostsByUserId(user.uid);
        const userPosts = response.data.posts;
        setPosts(userPosts);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch posts', err);
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [user]);

  const handleEditPost = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Posts</h2>
            {posts.length === 0 ? (
              <p>You haven't created any posts yet.</p>
            ) : (
              posts.map(post => (
                <div 
                  key={post.post_id} 
                  className="bg-white p-6 rounded-lg shadow-md mb-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">{post.title}</h3>
                    <div>
                      <span className="text-sm text-gray-500 mr-2">
                        {post.status}
                      </span>
                      <button
                        onClick={() => handleEditPost(post.post_id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2 line-clamp-2">{post.content}</p>
                  <div className="text-sm text-gray-500 mt-2">
                    Created: {new Date(post.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Profile Summary</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <p>{user.uname}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <p>{user.uemail}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Total Posts</label>
                <p>{posts.length}</p>
              </div>
              <button
                onClick={() => navigate('/edit-profile')}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;