import React from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-white/10 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <nav className="container mx-auto flex justify-between p-4 text-white">
        <Link href="/" className="text-lg font-bold font-grotesk">
          NKMAG
        </Link>
        <ul className="flex items-center gap-x-4">
          <li>
            <Link href="/blog" className="hover:text-gray-300">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/research" className="hover:text-gray-300">
              Research
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
