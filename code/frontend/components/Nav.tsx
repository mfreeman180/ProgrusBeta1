import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Nav() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-[#991B1B] flex items-center justify-between px-5 z-20">
      <Link href="/" className="text-white text-xl font-bold">ProgrUS</Link>
      <div className="flex gap-4">
        <Link href="/" className="text-white hover:underline">Home</Link>
        <Link href="/feed" className="text-white hover:underline">Feed</Link>
        {router.pathname === '/feed' && (
          <button
            onClick={handleLogout}
            className="text-white hover:underline"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}