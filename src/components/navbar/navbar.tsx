'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Header from '../header/header';
import TopMenuUser from '../top-menu-user';
import { Button } from '../ui/button';
import { useAuth } from '@/lib/auth-context';

interface NavbarProps {
  userRole: 'unauthorized' | 'founder' | 'investor' | 'admin';
}

const Navbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollUp, setScrollUp] = useState(false);
  const pathname = usePathname();  // Get the current pathname
  const { user } = useAuth();

  const userRole = user?.role === 'admin' ? 'admin' : user?.role === 'fundraiser' ? 'founder' : 'investor';

  useEffect(() => {
    const handleScroll = () => {
      setScrollUp(window.pageYOffset > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setShowMenu(!showMenu);

  const navClassName = `fixed top-0 left-0 w-full py-2 z-30 ${scrollUp ? 'backdrop-blur-sm bg-opacity-60' : 'bg-transparent'}`;
  const textColorClass = 'text-white';
  const linkStyle = {
    fontSize: '14px',
    fontFamily: '"Unbounded", sans-serif',
  };

  // Reusable Link component
  const NavLink = ({ to, children, className = '' }: { to: string; children: React.ReactNode; className?: string }) => (
    <Link
      href={to}
      className={`${textColorClass} hover:text-gray-300 px-3 py-2 rounded-md ${className}`}
      style={linkStyle}
    >
      {children}
    </Link>
  );

  // Render role-based links
  const renderAuthLinks = () => {
    // if (userRole === 'unauthorized') {
    //   return (
    //     <>
    //       <NavLink to="/signin" className="px-6 py-2 rounded-md text-sm">Login</NavLink>
    //       <Link
    //         className="text-white hover:text-gray-200 px-6 py-2 rounded-md text-sm font-medium ml-2"
    //         href="/role"
    //         style={{
    //           ...linkStyle,
    //           backgroundImage: 'radial-gradient(circle, #8061ff, #8669ff, #8c70ff, #9278ff, #987fff)',
    //         }}
    //       >
    //         Sign Up for Free
    //       </Link>

    //     </>
    //   );
    // }

    // Role-based links (for authorized users)
    // if (userRole === 'founder') {
    //   return (
    //     <>
    //       <NavLink to="/dashboard">Dashboard</NavLink>
    //       <NavLink to="/campaigns">Campaigns</NavLink>
    //       <NavLink to="/profile">Profile</NavLink>
    //     </>
    //   );
    // }

    // if (userRole === 'investor') {
    
      return (
        <>
          <NavLink className='cursor-pointer' to="/campaigns">Explore</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          { ! user?.username?<NavLink to="/login"> <Button className='bg-blue-600' variant="profilebtn">Login</Button></NavLink>:<TopMenuUser /> }
          

        </>
      );
    //}

    // if (userRole === 'admin') {
    //   return (
    //     <>
    //       <NavLink to="/admin-dashboard">Admin Dashboard</NavLink>
    //       <NavLink to="/users">Users</NavLink>
    //       <NavLink to="/settings">Settings</NavLink>
    //     </>
    //   );
    // }

    return null;
  };

  // Check if the current route is `/admin` or starts with `/admin`
  const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/dashboard");

  // Do not render Navbar if on /admin route
  if (isAdminRoute) return null;

  return (
<nav className={navClassName}>
      <div className="px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <NavLink to="/">
              <div className="flex items-center justify-center text-2xl font-bold">
                QuantM AI
              </div>
            </NavLink>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search campaigns, startups, or investors..."
                className="w-full text-white h-full px-4 py-2 bg-gray-800/50 border border-gray-700 focus:border-blue-500 rounded-lg pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="pl-6 md:hidden">
            <button onClick={toggleMenu} className="text-white mobile_btns px-3 py-2 rounded-md">
              {showMenu ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop navigation links */}
          <div className="hidden items-center md:flex space-x-4">
            {renderAuthLinks()}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${showMenu ? 'block' : 'hidden'} navbar_bg`}>
        {/* Search Bar - Mobile */}
        <div className="px-4 pb-3 pt-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full text-white px-4 py-2 bg-gray-800/50 border border-gray-700 focus:border-blue-500 rounded-lg pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col px-2 pb-3 space-y-1 sm:px-3">
          {!user ? (
            <>
              <NavLink to="/signin">Login</NavLink>
              <NavLink to="/role">Sign Up for Free</NavLink>
            </>
          ) : (
            renderAuthLinks()
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
