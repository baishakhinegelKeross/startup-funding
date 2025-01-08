"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import PendingStartups from '@/components/admin/pendingStartups/PendingStartups';
import UpdateProfile from '@/components/admin/updateProfile/updateProfile';

// Define the Sidebar class to handle toggling and manage state
class SidebarState {
  private isCollapsed: boolean;

  constructor() {
    this.isCollapsed = false;
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  getCollapseState() {
    return this.isCollapsed;
  }
}

const sidebarState = new SidebarState();

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [selectedSection, setSelectedSection] = useState<string>('Dashboard');

  const handleToggleSidebar = () => {
    sidebarState.toggleCollapse();
    setIsSidebarOpen(sidebarState.getCollapseState());
  };

  const handleSelectSection = (section: string) => {
    setSelectedSection(section);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'Dashboard':
        return <h1 className="text-3xl">Welcome to the Admin Dashboard</h1>;
      case 'Manage Users':
        return <h1 className="text-3xl">Manage Users Section</h1>;
      case 'Pending Startups':
        return <PendingStartups />;
      case 'myProfile':
        return <UpdateProfile />;
      case 'Logout':
        return <h1 className="text-3xl">You have been logged out.</h1>;
      default:
        return <h1 className="text-3xl">Select a section to view content</h1>;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? 'w-64' : 'w-16'
          } transition-all duration-300 bg-gray-800 text-white h-screen p-4 space-y-6 flex-shrink-0`}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className={`text-2xl font-bold text-white ${isSidebarOpen ? 'block' : 'hidden'
              } flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 hover:text-indigo-400`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 12H5"
              />
            </svg>
            <span>Back</span>
          </Link>

          <button
            onClick={handleToggleSidebar}
            className="lg:hidden text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12h18M3 6h18M3 18h18"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4 mt-8">
          {/* Dashboard Link */}
          <button
            onClick={() => handleSelectSection('Dashboard')}
            className="flex items-center space-x-4 hover:bg-gray-700 py-2 px-4 rounded-lg w-full text-left transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12h18M3 6h18M3 18h18"
              />
            </svg>
            <span className={isSidebarOpen ? 'block' : 'hidden'}>Dashboard</span>
          </button>

          {/* Manage Users Link */}
          <button
            onClick={() => handleSelectSection('Manage Users')}
            className="flex items-center space-x-4 hover:bg-gray-700 py-2 px-4 rounded-lg w-full text-left transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 3v18m0 0l7-7m-7 7l7 7"
              />
            </svg>
            <span className={isSidebarOpen ? 'block' : 'hidden'}>Manage Users</span>
          </button>

          {/* Pending Startups Link */}
          <button
            onClick={() => handleSelectSection('Pending Startups')}
            className="flex items-center space-x-4 hover:bg-gray-700 py-2 px-4 rounded-lg w-full text-left transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 3v18m0 0l7-7m-7 7l7 7"
              />
            </svg>
            <span className={isSidebarOpen ? 'block' : 'hidden'}>Pending Startups</span>
          </button>

          {/* Settings Link */}
          <button
            onClick={() => handleSelectSection('myProfile')}
            className="flex items-center space-x-4 hover:bg-gray-700 py-2 px-4 rounded-lg w-full text-left transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v12M3 12h12"
              />
            </svg>
            <span className={isSidebarOpen ? 'block' : 'hidden'}>My Profile</span>
          </button>

          {/* Logout Link */}
          <button
            onClick={() => handleSelectSection('Logout')}
            className="flex items-center space-x-4 hover:bg-gray-700 py-2 px-4 rounded-lg w-full text-left transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 17l4-4m0 0l-4-4m4 4H7"
              />
            </svg>
            <span className={isSidebarOpen ? 'block' : 'hidden'}>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default Sidebar;
