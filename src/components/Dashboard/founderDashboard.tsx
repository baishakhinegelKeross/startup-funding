'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import MyCampaigns from '@/components/founder/myCampaigns/myCampaigns'; // Import the myCampaigns component
import UpdateProfile from '@/components/founder/updateProfile/updateProfile'; // Import the updateProfile component

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

interface SidebarProps {
  userRole: 'founder'; // Only founder role is considered
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [selectedSection, setSelectedSection] = useState<string>('My Campaigns');

  const handleToggleSidebar = () => {
    sidebarState.toggleCollapse();
    setIsSidebarOpen(sidebarState.getCollapseState());
  };

  const handleSelectSection = (section: string) => {
    setSelectedSection(section);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'My Campaigns':
        return <MyCampaigns />;
      case 'My Profile':
        return <UpdateProfile />;
      case 'Logout':
        return <h1 className="text-3xl">You have been logged out.</h1>;
      default:
        return <h1 className="text-3xl">Select a section to view content</h1>;
    }
  };

  const getButtonClass = (section: string) => {
    const baseClass = "flex items-center space-x-4 hover:bg-gray-700 py-2 px-4 rounded-lg w-full text-left transition-all duration-300 ease-in-out transform hover:scale-105";
    const activeClass = "bg-cyan-800 text-white font-semibold";

    return section === selectedSection ? `${baseClass} ${activeClass}` : baseClass;
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-gray-800 text-white h-screen p-4 space-y-6 flex-shrink-0 flex flex-col`}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className={`text-2xl font-bold text-white ${isSidebarOpen ? 'block' : 'hidden'} flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 hover:text-indigo-400`}
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

        <div className="space-y-4 mt-8 flex-1">
          {/* My Campaigns Link (only for Founder) */}
          <button
            onClick={() => handleSelectSection('My Campaigns')}
            className={getButtonClass('My Campaigns')}
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
            <span className={isSidebarOpen ? 'block' : 'hidden'}>My Campaigns</span>
          </button>

          {/* My Profile Link (for both Founder) */}
          <button
            onClick={() => handleSelectSection('My Profile')}
            className={getButtonClass('My Profile')}
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
        </div>

        {/* Logout Link (at the bottom) */}
        <button
          onClick={() => handleSelectSection('Logout')}
          className={`${getButtonClass('Logout')} mt-auto`}
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

      {/* Main Content */}
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default Sidebar;
