import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Add keyframes for blinking animation
const blinkingStyle = `
  @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

export default function Home() {
  const router = useRouter();
  const [loginError, setLoginError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        router.push('/feed');
      } else {
        setLoginError(data.message);
      }
    } catch (error) {
      setLoginError('Failed to login');
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <Image
          src="/images/capitol.png"
          alt="Capitol Building"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/90" />

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Top bar */}
        <div className="fixed top-0 left-0 w-full h-10 bg-[#991B1B] flex justify-end items-center px-5">
          <button className="text-white border border-white px-3 py-1 rounded hover:bg-white/10">
            Learn More
          </button>
        </div>

        {/* Main content */}
        <div className="flex flex-col items-center pt-[25vh] px-4">
          <h1 className="text-4xl md:text-6xl font-black text-[#991B1B] tracking-widest mb-8 transform scale-y-150 scale-x-80">
            WELCOME TO PROGRUS
          </h1>

          {/* Login Box */}
          <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:border-[#991B1B]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mb-2 border rounded focus:outline-none focus:border-[#991B1B]"
            />
            <div className="text-center mb-4">
              <a href="#" className="text-[#991B1B] text-sm hover:underline">
                Forgot my Username or Password
              </a>
            </div>
            <button
              onClick={handleLogin}
              className="w-full py-2 bg-[#991B1B] text-white rounded mb-4 hover:bg-[#7a1515]"
            >
              Log In
            </button>
            <button className="w-full py-2 bg-[#991B1B] text-white rounded hover:bg-[#7a1515]">
              Sign Up
            </button>
          </div>

          {/* Info Box */}
          <div className="w-full max-w-sm p-4 border-2 border-[#991B1B] rounded-lg text-[#cc0000] text-base font-bold text-center leading-relaxed">
            The Sign Up button will redirect you to a new webpage. For more information about your data privacy and our site, please click the "Learn More" button at the top of the page.
          </div>
        </div>

        {/* Bottom bar */}
        <div className="fixed bottom-0 left-0 w-full h-10 bg-[#991B1B] flex justify-center items-center text-white">
          © 2025 ProgrUS Inc.
        </div>
      </div>
    </div>
  );
} 