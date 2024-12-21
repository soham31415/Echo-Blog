import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postService } from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postService.getPostById(id);
        setPost(response.data.post);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit-post/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <article className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="flex justify-between items-center mb-4 text-gray-600">
            <span>Published on {new Date(post.created_at).toLocaleDateString()}</span>
            {isAuthenticated 
            && user.uid === post.uid 
            && (
              <div>
                <button 
                  onClick={handleEdit}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
          <div className="prose max-w-none">
            {post.content}
          </div>
        </article>
      </div>
    </div>
  );
};

export default PostDetail;