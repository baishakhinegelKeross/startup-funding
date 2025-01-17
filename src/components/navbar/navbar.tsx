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

  const userRole = 'investor';

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
    console.log("Indranil ::" ,user)
      return (
        <>
          {user?.roles.includes("Admin")?<NavLink to="/campaigns">Campaigns</NavLink>:null}
          <NavLink to="/dashboard">Dashboard</NavLink>
          
          {user?.roles.includes("Admin")?<NavLink to="/approval">Admin</NavLink>:null}
          { ! user?.username?<NavLink to="/login"> <Button variant="profilebtn">Login</Button></NavLink>:<TopMenuUser /> }
          

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
              <div className="flex items-center justify-center text-4xl font-bold">
                QuantM AI
              </div>
            </NavLink>
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
        <div className="flex flex-col px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {userRole === 'unauthorized' ? (
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
