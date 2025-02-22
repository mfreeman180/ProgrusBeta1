import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Post {
  id: number;
  content: string;
  image?: string;
  createdAt: string;
  author: {
    id: number;
    username: string;
    name: string;
    avatar?: string;
  };
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/'); // Redirect to login if not authenticated
      return;
    }

    // Fetch posts
    fetch('http://localhost:5000/api/posts', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top bar */}
      <div className="fixed top-0 left-0 w-full h-[55px] bg-[#991B1B] flex justify-center items-center px-5">
        <span className="absolute left-1/2 -translate-x-1/2 text-4xl font-black text-white tracking-widest transform scale-y-150 scale-x-80 leading-[55px]">
          PROGRUS
        </span>
        <button 
          onClick={() => {
            localStorage.removeItem('token');
            router.push('/');
          }}
          className="absolute right-20 text-white border border-white px-3 py-1 rounded hover:bg-white/10"
        >
          Logout
        </button>
      </div>

      {/* Posts container */}
      <div className="max-w-2xl mx-auto mt-[75px] p-5">
        {posts.map(post => (
          <div 
            key={post.id}
            className="bg-white rounded-lg p-5 mb-5 shadow"
          >
            <div className="flex items-center mb-3">
              {post.author.avatar && (
                <img 
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
              )}
              <div>
                <div className="font-bold">{post.author.name}</div>
                <div className="text-gray-600 text-sm">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            <p className="my-3">{post.content}</p>
            {post.image && (
              <img 
                src={post.image}
                alt="Post image"
                className="w-full rounded-lg mt-3"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 